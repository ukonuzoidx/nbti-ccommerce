import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import isAuth from "../../../Middleware/isAuth";
import DateFormat from "../../../utils/DateFormat";
import apiRequest from "../../../utils/apiRequest";
import auth from "../../../utils/auth";
import languageModel from "../../../utils/languageModel";
import settings from "../../../utils/settings";
import wordCount from "../../../utils/wordCount";
import { fetchCart } from "../../store/Cart";
import EmptyCardError from "../EmptyCardError";
import InputCom from "../Helpers/InputCom";
import LoaderStyleOne from "../Helpers/Loaders/LoaderStyleOne";
import PageTitle from "../Helpers/PageTitle";
import Selectbox from "../Helpers/Selectbox";
import CheckProductIsExistsInFlashSale from "../Shared/CheckProductIsExistsInFlashSale";

function CheakoutPage() {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const { currency_icon } = settings();
  const router = useRouter();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const [totalWeight, setTotalWeight] = useState(null);
  const [totalQty, setQty] = useState(null);
  const [fName, setFname] = useState("");
  const [lName, setlname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [home, setHome] = useState(true);
  const [office, setOffice] = useState(false);
  const [countryDropdown, setCountryDropdown] = useState(null);
  const [country, setCountry] = useState(null);
  const [stateDropdown, setStateDropdown] = useState(null);
  const [state, setState] = useState(null);
  const [cityDropdown, setCityDropdown] = useState(null);
  const [city, setcity] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState(null);
  const [activeAddress, setActiveAddress] = useState("billing");
  const [newAddress, setNewAddress] = useState(false);
  const [selectedShipping, setShipping] = useState(null);
  const [selectedBilling, setBilling] = useState(null);
  const [subTotal, setSubTotal] = useState(null);
  const [shippingRules, setShipppingRules] = useState(null);
  const [shippingRulesByCityId, setShippingRulesByCityId] = useState([]);
  const [selectPayment, setPaymentMethod] = useState(null);
  const [selectedRule, setSelectedRule] = useState(null);
  const [shippingCharge, setShippingCharge] = useState(null);
  const [strpeNumber, setStrpeNumber] = useState("");
  const [expireDate, setExpireDate] = useState(null);
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setHolderName] = useState("");
  const [stripeError, setStrpError] = useState(null);
  const [strpLoad, setStrpLoading] = useState(false);
  const [inputCoupon, setInputCoupon] = useState("");
  const [couponCode, setCouponCode] = useState(null);
  const [bankInfo, setBankInfo] = useState(null);
  const [discountCoupon, setDiscountCoupon] = useState(0);
  useEffect(() => {
    if (couponCode) {
      if (couponCode.offer_type === "2") {
        let price = totalPrice - parseInt(couponCode.discount);
        setDiscountCoupon(totalPrice - price);
      } else {
        let price =
          (parseInt(couponCode.discount) / 100) * parseInt(totalPrice);
        setDiscountCoupon(price);
      }
    }
  }, [couponCode, totalPrice]);

  const [transactionInfo, setTransactionInfo] = useState("");
  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);
  //bank status
  const [cashOnDeliveryStatus, setCashOnDeliveryStatus] = useState(null);
  // const [stripeStatus, setStripeStatus] = useState(null);
  // const [rezorPayStatue, setRezorPay] = useState(null);
  // const [flutterWaveStatus, setFlutterWaveStatus] = useState(null);
  // const [mollieStatus, setMollieStatus] = useState(null);
  // const [instaMojoStatus, setInstaMojoStatus] = useState(null);
  const [payStackStatus, setPayStackStatus] = useState(null);
  const [remitaStatus, setRemitaStatus] = useState(null);
  // const [paypalStatus, setPaypalStatus] = useState(null);
  const [bankPaymentStatus, setBankPaymentStatus] = useState(null);
  // const [sslStatus, setSslStatus] = useState(null);
  const submitCoupon = () => {
    if (auth()) {
      apiRequest
        .applyCoupon(auth().access_token, inputCoupon)
        .then((res) => {
          setInputCoupon("");
          if (res.data) {
            if (totalPrice >= parseInt(res.data.coupon.min_purchase_price)) {
              setCouponCode(res.data.coupon);
              localStorage.setItem(
                "coupon",
                JSON.stringify(res.data && res.data.coupon)
              );
              let currDate = new Date().toLocaleDateString();
              localStorage.setItem("coupon_set_date", currDate);

              toast.success(langCntnt && langCntnt.Coupon_Applied);
            } else {
              toast.error(
                langCntnt && langCntnt.Your_total_price_not_able_to_apply_coupon
              );
            }
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response && err.response.data.message);
        });
    } else {
      return false;
    }
  };

  const dateHandler = (e) => {
    setExpireDate({
      value: e.target.value,
      formated: DateFormat(e.target.value, false),
    });
  };

  const getAllAddress = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/user/checkout?token=${
          auth().access_token
        }`
      )
      .then((res) => {
        setPayStackStatus(
          !!(
            res.data &&
            res.data.paystackAndMollie &&
            parseInt(res.data.paystackAndMollie.paystack_status) === 1
          )
        );
        setRemitaStatus(
          !!(
            res.data &&
            res.data.remitaPayment &&
            parseInt(res.data.remitaPayment.status) === 1
          )
        );
        setCashOnDeliveryStatus(
          !!(
            res.data &&
            res.data.bankPaymentInfo &&
            parseInt(res.data.bankPaymentInfo.cash_on_delivery_status) === 1
          )
        );
        setBankPaymentStatus(
          !!(
            res.data &&
            res.data.bankPaymentInfo &&
            parseInt(res.data.bankPaymentInfo.status) === 1
          )
        );
        setBankInfo(
          res.data && res.data.bankPaymentInfo && res.data.bankPaymentInfo
        );
        setShipppingRules(res.data && res.data.shippings);
        setShippingRulesByCityId(() => {
          const getShippingById =
            res.data &&
            res.data.shippings.length > 0 &&
            res.data.shippings.filter((f) => parseInt(f.city_id) === 0);
          return getShippingById;
        });
        res.data && setAddresses(res.data.addresses);
        setShipping(res.data && res.data.addresses[0].id);
        setBilling(res.data && res.data.addresses[0].id);

        const cp = localStorage.getItem("coupon");
        if (cp) {
          let crrDate = new Date().toLocaleDateString();
          let storeDate = localStorage.getItem("coupon_set_date");
          if (crrDate === storeDate) {
            let dataK = JSON.parse(cp);
            setCouponCode(dataK);
          } else {
            localStorage.removeItem("coupon_set_date");
            localStorage.removeItem("coupon");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (auth()) {
      getAllAddress();
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/user/address/create?token=${
            auth().access_token
          }`
        )
        .then((res) => {
          if (res.data) {
            setCountryDropdown(res.data.countries);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const getState = (value) => {
    if (auth() && value) {
      setCountry(value.id);
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/user/state-by-country/${
            value.id
          }?token=${auth().access_token}`
        )
        .then((res) => {
          setCityDropdown(null);
          setStateDropdown(res.data && res.data.states);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return false;
    }
  };

  const getcity = (value) => {
    if (auth() && value) {
      setState(value.id);
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/user/city-by-state/${
            value.id
          }?token=${auth().access_token}`
        )
        .then((res) => {
          setCityDropdown(res.data && res.data.cities);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      return false;
    }
  };

  const selectCity = (value) => {
    if (auth() && value) {
      setcity(value.id);
    }
  };

  const saveAddress = async () => {
    setLoading(true);
    if (auth()) {
      apiRequest
        .saveAddress(auth().access_token, {
          name: fName && lName ? fName + " " + lName : null,
          email: email,
          phone: phone,
          address: address,
          // type: home ? home : office ? office : null,
          type: home === true ? "home" : "office",
          country: country,
          state: state,
          city: city,
        })
        .then((res) => {
          setLoading(false);
          setFname("");
          setlname("");
          setEmail("");
          setPhone("");
          setAddress("");
          setCountryDropdown(null);
          setStateDropdown(null);
          setCityDropdown(null);
          setErrors(null);
          getAllAddress();
          setNewAddress(false);
          toast.success(res.data && res.data.notification, {
            autoClose: 1000,
          });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          err.response && setErrors(err.response.data.errors);
        });
    } else {
      return false;
    }
  };

  const checkProductExistsInFlashSale = (id, price) => {
    if (websiteSetup) {
      const flashSaleOffer =
        websiteSetup.payload.flashSale && websiteSetup.payload.flashSale.offer;
      const flashSaleIds =
        websiteSetup.payload.flashSaleProducts.length > 0 &&
        websiteSetup.payload.flashSaleProducts.find(
          (item) => parseInt(item.product_id) === parseInt(id)
        );
      if (flashSaleOffer && flashSaleIds) {
        const offer = parseInt(flashSaleOffer);
        const discountPrice = (offer / 100) * parseFloat(price); //confusion
        const mainPrice = parseFloat(price) - discountPrice;
        return mainPrice;
      } else {
        return price;
      }
    }
  };

  const totalPrice = subTotal && subTotal.reduce((prev, curr) => prev + curr);

  // useEffect(() => {
  //   if (products && products.length > 0) {
  //     setSubTotal(
  //       products.map((v) => {
  //         let prices = [];
  //         v.variants.map(
  //           (item) =>
  //             item.variant_item &&
  //             prices.push(parseInt(item.variant_item.price))
  //         );
  //         const sumCal = prices.length > 0 && prices.reduce((p, c) => p + c);
  //         if (v.product.offer_price) {
  //           if (v.variants && v.variants.length > 0) {
  //             const v_price = sumCal + parseInt(v.product.offer_price);

  //             const checkFlshPrdct = checkProductExistsInFlashSale(
  //               v.product_id,
  //               v_price
  //             );
  //             return checkFlshPrdct * v.qty;
  //             // return checkProductExistsInFlashSale(v.product_id, v_price);
  //           } else {
  //             const wo_v_price = checkProductExistsInFlashSale(
  //               v.product_id,
  //               parseInt(v.product.offer_price)
  //             );
  //             return wo_v_price * v.qty;
  //           }
  //         } else {
  //           if (v.variants && v.variants.length > 0) {
  //             const v_price = sumCal + parseInt(v.product.price);
  //             const checkFlshPrdct = checkProductExistsInFlashSale(
  //               v.product_id,
  //               v_price
  //             );
  //             return checkFlshPrdct * v.qty;
  //           } else {
  //             const wo_v_price = checkProductExistsInFlashSale(
  //               v.product_id,
  //               parseInt(v.product.price)
  //             );
  //             return wo_v_price * v.qty;
  //           }
  //         }
  //       })
  //     );
  //   }
  // }, [products]);

  const [mainTotalPrice, setMainTotalPrice] = useState(null);

  useEffect(() => {
    if (shippingCharge) {
      setMainTotalPrice((totalPrice + parseFloat(shippingCharge)).toFixed(2));
    } else {
      setMainTotalPrice(parseFloat(totalPrice).toFixed(2));
    }
  });

  const price = (item) => {
    if (item) {
      if (item.product.offer_price) {
        if (item.variants && item.variants.length > 0) {
          const prices = item.variants.map((item) =>
            item.variant_item ? parseInt(item.variant_item.price) : 0
          );
          const sumVarient = prices.reduce((p, c) => p + c);
          return (parseInt(item.product.offer_price) + sumVarient) * item.qty;
        } else {
          return parseInt(item.product.offer_price) * item.qty;
        }
      } else {
        if (item.variants && item.variants.length > 0) {
          const prices = item.variants.map((item) =>
            item.variant_item ? parseInt(item.variant_item.price) : 0
          );
          const sumVarient = prices.reduce((p, c) => p + c);
          const sum = parseInt(item.product.price) + parseInt(sumVarient);
          return sum * parseInt(item.qty);
        } else {
          return item.product.price * item.qty;
        }
      }
    }
  };

  const shippingHandler = (addressId, cityId) => {
    setShipping(addressId);
    const getRules =
      shippingRules &&
      shippingRules.filter((f) => parseInt(f.city_id) === cityId);
    const defaultRule = shippingRules.filter(
      (item) => parseInt(item.city_id) === 0
    );
    if (getRules && getRules.length > 0) {
      const isIncluded = shippingRulesByCityId.some((value) =>
        getRules.includes(value)
      );
      if (isIncluded) {
        return setShippingRulesByCityId([...defaultRule, ...getRules]);
      } else {
        if (shippingRulesByCityId.length > 0) {
          setShippingRulesByCityId([...defaultRule, ...getRules]);
        } else {
          setShippingRulesByCityId((prev) => [...prev, ...getRules]);
        }
      }
    } else {
      const defaultRule = shippingRules.filter(
        (item) => parseInt(item.city_id) === 0
      );
      setShippingRulesByCityId(defaultRule);
    }
  };

  useEffect(() => {
    if (
      addresses &&
      addresses.length > 0 &&
      shippingRules &&
      shippingRules.length > 0
    ) {
      shippingHandler(
        parseInt(addresses[0].id),
        parseInt(addresses[0].city_id)
      );
    }
  }, [shippingRules, addresses]);

  const selectedRuleHandler = (e, price) => {
    setSelectedRule(e.target.value);
    setShippingCharge(price);
  };

  //delete address
  const deleteAddress = (id) => {
    if (auth()) {
      apiRequest
        .deleteAddress(id, auth().access_token)
        .then((res) => {
          toast.success(res.data && res.data.notification);
          getAllAddress();
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response && err.response.data.notification);
        });
    }
  };

  const placeOrderHandler = async () => {
    if (auth()) {
      if (selectedBilling && selectedShipping) {
        if (selectedRule) {
          if (selectPayment) {
            if (selectPayment && selectPayment === "cashOnDelivery") {
              await apiRequest
                .cashOnDelivery(
                  {
                    shipping_address_id: selectedShipping,
                    billing_address_id: selectedBilling,
                    shipping_method_id: parseInt(selectedRule),
                    coupon: couponCode && couponCode.code,
                  },
                  auth().access_token
                )
                .then((res) => {
                  if (res.data) {
                    toast.success(res.data.message);
                    router.push(`/order/${res.data.order_id}`);
                    dispatch(fetchCart());
                    localStorage.removeItem("coupon_set_date");
                    localStorage.removeItem("coupon");
                  }
                })
                .catch((err) => {
                  console.log(err);
                  toast.success(err.response && err.response.message);
                });
            } else if (selectPayment && selectPayment === "remita") {
              const url = `${
                process.env.NEXT_PUBLIC_BASE_URL
              }user/checkout/remita-web-view?token=${
                auth().access_token
              }&shipping_method_id=${parseInt(
                selectedRule
              )}&shipping_address_id=${selectedShipping}&coupon=${
                couponCode && couponCode.code
              }&billing_address_id=${selectedBilling}&request_from=react_web&frontend_success_url=${
                typeof window !== "undefined" && window.location.origin
                  ? window.location.origin + "/order/"
                  : ""
              }&frontend_failed_url=${
                typeof window !== "undefined" && window.location.origin
                  ? window.location.origin + "/payment-failed"
                  : ""
              }`;
              router.push(url);
              localStorage.removeItem("coupon_set_date");
              localStorage.removeItem("coupon");
            } else if (selectPayment && selectPayment === "paystack") {
              const url = `${
                process.env.NEXT_PUBLIC_BASE_URL
              }user/checkout/paystack-web-view?token=${
                auth().access_token
              }&shipping_method_id=${parseInt(
                selectedRule
              )}&shipping_address_id=${selectedShipping}&coupon=${
                couponCode && couponCode.code
              }&billing_address_id=${selectedBilling}&request_from=react_web&frontend_success_url=${
                typeof window !== "undefined" && window.location.origin
                  ? window.location.origin + "/order/"
                  : ""
              }&frontend_failed_url=${
                typeof window !== "undefined" && window.location.origin
                  ? window.location.origin + "/payment-failed"
                  : ""
              }`;
              router.push(url);
              localStorage.removeItem("coupon_set_date");
              localStorage.removeItem("coupon");
            } else if (selectPayment && selectPayment === "bankpayment") {
              await apiRequest
                .bankPayment(
                  {
                    shipping_address_id: selectedShipping,
                    billing_address_id: selectedBilling,
                    shipping_method_id: parseInt(selectedRule),
                    tnx_info: transactionInfo,
                    coupon: couponCode && couponCode.code,
                  },
                  auth().access_token
                )
                .then((res) => {
                  if (res.data) {
                    toast.success(res.data.message);
                    router.push(`/order/${res.data.order_id}`);
                    dispatch(fetchCart());
                    localStorage.removeItem("coupon_set_date");
                    localStorage.removeItem("coupon");
                  }
                })
                .catch((err) => {
                  console.log(err);
                  toast.success(err.response && err.response.message);
                });
            } else {
              toast.error(langCntnt && langCntnt.Select_your_payment_system);
            }
          } else {
            toast.error(
              langCntnt && langCntnt.Please_Select_Your_Payment_Method
            );
          }
        } else {
          toast.error(langCntnt && langCntnt.Please_Select_Shipping_Rule);
        }
      }
    }
  };

  if (products.length > 0) {
    return (
      <div className="checkout-page-wrapper w-full bg-white pb-[120px]">
        <div className="w-full mb-5">
          <PageTitle
            title={langCntnt && langCntnt.checkout}
            breadcrumb={[
              { name: langCntnt && langCntnt.home, path: "/" },
              { name: langCntnt && langCntnt.checkout, path: "/checkout" },
            ]}
          />
        </div>
        <div className="w-full checkout-main-content">
          <div className="mx-auto container-x ">
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="w-full lg:w-4/6">
                <h1 className="mt-5 mb-5 text-xl font-medium sm:text-2xl text-qblack">
                  {langCntnt && langCntnt.Addresses}
                </h1>
                {!newAddress && (
                  <div className="w-full addresses-widget">
                    <div className="items-center justify-between w-full mb-5 sm:flex">
                      <div className="p-2 border rounded bg-qpurplelow/10 border-qpurple">
                        <button
                          onClick={() => setActiveAddress("billing")}
                          type="button"
                          className={`px-4 py-3 text-md font-medium rounded-md  ${
                            activeAddress === "billing"
                              ? "text-white bg-qpurple"
                              : "text-qpurple"
                          } `}
                        >
                          {langCntnt && langCntnt.Billing_Address}
                        </button>
                        <button
                          onClick={() => setActiveAddress("shipping")}
                          type="button"
                          className={`px-4 py-3 text-md font-medium rounded-md ml-1 ${
                            activeAddress === "shipping"
                              ? "text-white bg-qpurple"
                              : "text-qpurple"
                          } `}
                        >
                          {langCntnt && langCntnt.Shipping_Address}
                        </button>
                      </div>

                      <button
                        onClick={() => setNewAddress(!newAddress)}
                        type="button"
                        className="w-[100px] h-[40px] mt-2 sm:mt-0 border rounded-full text-white hover:bg-qblack hover:text-qprimary bg-qyellow transition-all duration-300 ease-in-out"
                      >
                        <span className="text-sm font-semibold ">
                          {langCntnt && langCntnt.Add_New}
                        </span>
                      </button>
                    </div>
                    {activeAddress === "billing" ? (
                      <div
                        data-aos="zoom-in"
                        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                      >
                        {addresses &&
                          addresses.length > 0 &&
                          addresses.map((address, i) => (
                            <div
                              onClick={() => setBilling(address.id)}
                              key={i}
                              className={`w-full p-5 border cursor-pointer relative rounded ${
                                address.id === selectedBilling
                                  ? "border-qpurple bg-qpurplelow/10"
                                  : "border-transparent bg-primarygray"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <p className="title text-[22px] font-semibold">
                                  {langCntnt && langCntnt.Address} #{i + 1}
                                </p>
                                <button
                                  onClick={() => deleteAddress(address.id)}
                                  type="button"
                                  className="bg-white shadow group w-[34px] h-[34px] rounded-full flex justify-center items-center"
                                >
                                  <svg
                                    width="17"
                                    height="25"
                                    viewBox="0 0 17 19"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M15.7768 5.95215C15.6991 6.9104 15.6242 7.84603 15.5471 8.78237C15.3691 10.9285 15.1917 13.0747 15.0108 15.2209C14.9493 15.9473 14.9097 16.6773 14.8065 17.3988C14.6963 18.1726 14.0716 18.7161 13.2929 18.7196C10.3842 18.7323 7.47624 18.7337 4.56757 18.7189C3.70473 18.7146 3.08639 18.0794 3.00795 17.155C2.78181 14.493 2.57052 11.8302 2.35145 9.16821C2.2716 8.19442 2.1875 7.22133 2.10623 6.24824C2.09846 6.15638 2.09563 6.06451 2.08998 5.95286C6.65579 5.95215 11.2061 5.95215 15.7768 5.95215ZM5.25375 8.05803C5.25234 8.05803 5.25163 8.05803 5.25022 8.05803C5.27566 8.4573 5.3011 8.85657 5.32583 9.25584C5.46717 11.5228 5.60709 13.7891 5.75125 16.0561C5.77245 16.3897 5.99081 16.6038 6.28196 16.6024C6.58724 16.601 6.80066 16.3636 6.8056 16.0159C6.80702 15.9339 6.80136 15.8512 6.79571 15.7692C6.65367 13.4789 6.51304 11.1886 6.36888 8.89826C6.33849 8.41702 6.31164 7.93507 6.26146 7.45524C6.22966 7.1549 6.0318 6.99732 5.73076 6.99802C5.44526 6.99873 5.24033 7.2185 5.23043 7.52873C5.22619 7.7054 5.24598 7.88207 5.25375 8.05803ZM12.6102 8.05521C12.6088 8.05521 12.6074 8.05521 12.606 8.05521C12.6152 7.89055 12.6321 7.7259 12.6307 7.56195C12.6286 7.24465 12.4399 7.02417 12.1622 6.99873C11.888 6.97329 11.6484 7.16268 11.5961 7.46443C11.5665 7.63756 11.5615 7.81494 11.5502 7.9909C11.4626 9.38799 11.3749 10.7851 11.2887 12.1822C11.2103 13.4499 11.1276 14.7184 11.0576 15.9869C11.0379 16.3431 11.2463 16.5819 11.5495 16.6003C11.8562 16.6194 12.088 16.4017 12.1099 16.0505C12.2788 13.3856 12.4441 10.7208 12.6102 8.05521ZM9.45916 11.814C9.45916 10.4727 9.45986 9.13147 9.45916 7.79091C9.45916 7.25101 9.28603 6.99449 8.92845 6.99661C8.56805 6.99802 8.40198 7.24819 8.40198 7.79586C8.40127 10.4664 8.40127 13.1369 8.40268 15.8074C8.40268 15.948 8.37088 16.1289 8.44296 16.2194C8.56946 16.3763 8.76591 16.5748 8.93198 16.5741C9.09805 16.5734 9.29309 16.3727 9.41746 16.2151C9.48955 16.124 9.45704 15.9431 9.45704 15.8032C9.46057 14.4725 9.45916 13.1432 9.45916 11.814Z"
                                      fill="#EB5757"
                                    />
                                    <path
                                      className={`transform rotate-0 group-hover:-rotate-[10deg] transition duration-300 ease-in-out`}
                                      d="M5.20143 2.75031C5.21486 2.49449 5.21839 2.2945 5.23747 2.09593C5.31733 1.25923 5.93496 0.648664 6.77449 0.637357C8.21115 0.618277 9.64923 0.618277 11.0859 0.637357C11.9254 0.648664 12.5438 1.25852 12.6236 2.09522C12.6427 2.2938 12.6462 2.49379 12.6582 2.73335C12.7854 2.739 12.9084 2.74889 13.0314 2.7496C13.9267 2.75101 14.8221 2.74677 15.7174 2.75172C16.4086 2.75525 16.8757 3.18774 16.875 3.81244C16.8742 4.43643 16.4078 4.87103 15.716 4.87174C11.1926 4.87386 6.66849 4.87386 2.14508 4.87174C1.45324 4.87103 0.986135 4.43713 0.985429 3.81314C0.984722 3.18915 1.45183 2.75525 2.14296 2.75243C3.15421 2.74677 4.16545 2.75031 5.20143 2.75031ZM11.5799 2.73335C11.5799 2.59625 11.5806 2.49096 11.5799 2.38637C11.5749 1.86626 11.4018 1.69313 10.876 1.69242C9.55878 1.69101 8.24225 1.68959 6.92501 1.69313C6.48546 1.69454 6.30031 1.87545 6.28265 2.3051C6.27699 2.4422 6.28194 2.58 6.28194 2.73335C8.05851 2.73335 9.7941 2.73335 11.5799 2.73335Z"
                                      fill="#EB5757"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <div className="mt-5">
                                <table>
                                  <tbody>
                                    <tr className="flex mb-3">
                                      <td className="text-base text-qgray w-[70px] block line-clamp-1">
                                        <div>
                                          {langCntnt && langCntnt.Name}:
                                        </div>
                                      </td>
                                      <td className="text-base font-medium text-qblack line-clamp-1">
                                        {address.name}
                                      </td>
                                    </tr>
                                    <tr className="flex mb-3">
                                      <td className="text-base text-qgray w-[70px] block line-clamp-1">
                                        <div>
                                          {langCntnt && langCntnt.Email}:
                                        </div>
                                      </td>
                                      <td className="text-base font-medium text-qblack line-clamp-1">
                                        {address.email}
                                      </td>
                                    </tr>
                                    <tr className="flex mb-3">
                                      <td className="text-base text-qgray w-[70px] block line-clamp-1">
                                        <div>
                                          {langCntnt && langCntnt.phone}:
                                        </div>
                                      </td>
                                      <td className="text-base font-medium text-qblack line-clamp-1">
                                        {address.phone}
                                      </td>
                                    </tr>
                                    <tr className="flex mb-3">
                                      <td className="text-base text-qgray w-[70px] block line-clamp-1">
                                        <div>
                                          {langCntnt && langCntnt.Country}:
                                        </div>
                                      </td>
                                      <td className="text-base font-medium text-qblack line-clamp-1">
                                        {address.country.name}
                                      </td>
                                    </tr>
                                    <tr className="flex mb-3">
                                      <td className="text-base text-qgray w-[70px] block line-clamp-1">
                                        <div>
                                          {langCntnt && langCntnt.State}:
                                        </div>
                                      </td>
                                      <td className="text-base font-medium text-qblack line-clamp-1">
                                        {address.country_state.name}
                                      </td>
                                    </tr>
                                    <tr className="flex mb-3">
                                      <td className="text-base text-qgray w-[70px] block line-clamp-1">
                                        <div>
                                          {langCntnt && langCntnt.City}:
                                        </div>
                                      </td>
                                      <td className="text-base font-medium text-qblack line-clamp-1">
                                        {address.city.name}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              {address.id === selectedBilling && (
                                <span className="absolute px-2 text-sm font-medium text-white rounded bg-qpurple right-3 -top-2">
                                  {langCntnt && langCntnt.Selected}
                                </span>
                              )}
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div
                        data-aos="zoom-in"
                        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                      >
                        {addresses &&
                          addresses.length > 0 &&
                          addresses.map((address, i) => (
                            <div
                              onClick={() =>
                                shippingHandler(
                                  address.id,
                                  parseInt(address.city_id)
                                )
                              }
                              key={i}
                              className={`w-full p-5 border relative cursor-pointer rounded ${
                                address.id === selectedShipping
                                  ? "border-qpurple bg-qpurplelow/10"
                                  : "border-transparent bg-primarygray"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <p className="title text-[22px] font-semibold">
                                  {langCntnt && langCntnt.Address} #{i + 1}
                                </p>
                                <button
                                  onClick={() => deleteAddress(address.id)}
                                  type="button"
                                  className="bg-white shadow group  w-[34px] h-[34px] rounded-full flex justify-center items-center"
                                >
                                  <svg
                                    width="17"
                                    height="25"
                                    viewBox="0 0 17 19"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M15.7768 5.95215C15.6991 6.9104 15.6242 7.84603 15.5471 8.78237C15.3691 10.9285 15.1917 13.0747 15.0108 15.2209C14.9493 15.9473 14.9097 16.6773 14.8065 17.3988C14.6963 18.1726 14.0716 18.7161 13.2929 18.7196C10.3842 18.7323 7.47624 18.7337 4.56757 18.7189C3.70473 18.7146 3.08639 18.0794 3.00795 17.155C2.78181 14.493 2.57052 11.8302 2.35145 9.16821C2.2716 8.19442 2.1875 7.22133 2.10623 6.24824C2.09846 6.15638 2.09563 6.06451 2.08998 5.95286C6.65579 5.95215 11.2061 5.95215 15.7768 5.95215ZM5.25375 8.05803C5.25234 8.05803 5.25163 8.05803 5.25022 8.05803C5.27566 8.4573 5.3011 8.85657 5.32583 9.25584C5.46717 11.5228 5.60709 13.7891 5.75125 16.0561C5.77245 16.3897 5.99081 16.6038 6.28196 16.6024C6.58724 16.601 6.80066 16.3636 6.8056 16.0159C6.80702 15.9339 6.80136 15.8512 6.79571 15.7692C6.65367 13.4789 6.51304 11.1886 6.36888 8.89826C6.33849 8.41702 6.31164 7.93507 6.26146 7.45524C6.22966 7.1549 6.0318 6.99732 5.73076 6.99802C5.44526 6.99873 5.24033 7.2185 5.23043 7.52873C5.22619 7.7054 5.24598 7.88207 5.25375 8.05803ZM12.6102 8.05521C12.6088 8.05521 12.6074 8.05521 12.606 8.05521C12.6152 7.89055 12.6321 7.7259 12.6307 7.56195C12.6286 7.24465 12.4399 7.02417 12.1622 6.99873C11.888 6.97329 11.6484 7.16268 11.5961 7.46443C11.5665 7.63756 11.5615 7.81494 11.5502 7.9909C11.4626 9.38799 11.3749 10.7851 11.2887 12.1822C11.2103 13.4499 11.1276 14.7184 11.0576 15.9869C11.0379 16.3431 11.2463 16.5819 11.5495 16.6003C11.8562 16.6194 12.088 16.4017 12.1099 16.0505C12.2788 13.3856 12.4441 10.7208 12.6102 8.05521ZM9.45916 11.814C9.45916 10.4727 9.45986 9.13147 9.45916 7.79091C9.45916 7.25101 9.28603 6.99449 8.92845 6.99661C8.56805 6.99802 8.40198 7.24819 8.40198 7.79586C8.40127 10.4664 8.40127 13.1369 8.40268 15.8074C8.40268 15.948 8.37088 16.1289 8.44296 16.2194C8.56946 16.3763 8.76591 16.5748 8.93198 16.5741C9.09805 16.5734 9.29309 16.3727 9.41746 16.2151C9.48955 16.124 9.45704 15.9431 9.45704 15.8032C9.46057 14.4725 9.45916 13.1432 9.45916 11.814Z"
                                      fill="#EB5757"
                                    />
                                    <path
                                      className={`transform rotate-0 group-hover:-rotate-[10deg] transition duration-300 ease-in-out`}
                                      d="M5.20143 2.75031C5.21486 2.49449 5.21839 2.2945 5.23747 2.09593C5.31733 1.25923 5.93496 0.648664 6.77449 0.637357C8.21115 0.618277 9.64923 0.618277 11.0859 0.637357C11.9254 0.648664 12.5438 1.25852 12.6236 2.09522C12.6427 2.2938 12.6462 2.49379 12.6582 2.73335C12.7854 2.739 12.9084 2.74889 13.0314 2.7496C13.9267 2.75101 14.8221 2.74677 15.7174 2.75172C16.4086 2.75525 16.8757 3.18774 16.875 3.81244C16.8742 4.43643 16.4078 4.87103 15.716 4.87174C11.1926 4.87386 6.66849 4.87386 2.14508 4.87174C1.45324 4.87103 0.986135 4.43713 0.985429 3.81314C0.984722 3.18915 1.45183 2.75525 2.14296 2.75243C3.15421 2.74677 4.16545 2.75031 5.20143 2.75031ZM11.5799 2.73335C11.5799 2.59625 11.5806 2.49096 11.5799 2.38637C11.5749 1.86626 11.4018 1.69313 10.876 1.69242C9.55878 1.69101 8.24225 1.68959 6.92501 1.69313C6.48546 1.69454 6.30031 1.87545 6.28265 2.3051C6.27699 2.4422 6.28194 2.58 6.28194 2.73335C8.05851 2.73335 9.7941 2.73335 11.5799 2.73335Z"
                                      fill="#EB5757"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <div className="mt-5">
                                <table>
                                  <tbody>
                                    <tr className="flex mb-3">
                                      <td className="text-base text-qgray w-[70px] block line-clamp-1">
                                        <p>{langCntnt && langCntnt.Name}:</p>
                                      </td>
                                      <td className="text-base font-medium text-qblack line-clamp-1">
                                        {address.name}
                                      </td>
                                    </tr>
                                    <tr className="flex mb-3">
                                      <td className="text-base text-qgray w-[70px] block line-clamp-1">
                                        <p>{langCntnt && langCntnt.Email}:</p>
                                      </td>
                                      <td className="text-base font-medium text-qblack line-clamp-1">
                                        {address.email}
                                      </td>
                                    </tr>
                                    <tr className="flex mb-3">
                                      <td className="text-base text-qgray w-[70px] block line-clamp-1">
                                        <p>{langCntnt && langCntnt.phone}:</p>
                                      </td>
                                      <td className="text-base font-medium text-qblack line-clamp-1">
                                        {address.phone}
                                      </td>
                                    </tr>
                                    <tr className="flex mb-3">
                                      <td className="text-base text-qgray w-[70px] block line-clamp-1">
                                        <p>{langCntnt && langCntnt.Country}:</p>
                                      </td>
                                      <td className="text-base font-medium text-qblack line-clamp-1">
                                        {address.country.name}
                                      </td>
                                    </tr>
                                    <tr className="flex mb-3">
                                      <td className="text-base text-qgray w-[70px] block line-clamp-1">
                                        <p>{langCntnt && langCntnt.State}:</p>
                                      </td>
                                      <td className="text-base font-medium text-qblack line-clamp-1">
                                        {address.country_state.name}
                                      </td>
                                    </tr>
                                    <tr className="flex mb-3">
                                      <td className="text-base text-qgray w-[70px] block line-clamp-1">
                                        <p>{langCntnt && langCntnt.City}:</p>
                                      </td>
                                      <td className="text-base font-medium text-qblack line-clamp-1">
                                        {address.city.name}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              {address.id === selectedShipping && (
                                <span className="absolute px-2 text-sm font-medium text-white rounded bg-qpurple right-3 -top-2">
                                  {langCntnt && langCntnt.Selected}
                                </span>
                              )}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}
                {newAddress && (
                  <div data-aos="zoom-in" className="w-full">
                    <div className="flex items-center justify-between">
                      <h1 className="mb-5 text-xl font-medium sm:text-2xl text-qblack">
                        {langCntnt && langCntnt.Add_New_Address}
                      </h1>
                      <span
                        onClick={() => setNewAddress(!newAddress)}
                        className="cursor-pointer text-qpurple"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="form-area bg-[#F8F8F8] md:p-[40px] p-2.5">
                      <form>
                        <div className="mb-6">
                          <div className="items-center sm:flex sm:space-x-5">
                            <div className="w-full mb-5 sm:w-1/2 sm:mb-0">
                              <InputCom
                                label={langCntnt && langCntnt.First_Name + "*"}
                                placeholder={langCntnt && langCntnt.First_Name}
                                inputClasses="w-full h-[50px]"
                                value={fName}
                                inputHandler={(e) => setFname(e.target.value)}
                                error={
                                  !!(errors && Object.hasOwn(errors, "name"))
                                }
                              />
                            </div>
                            <div className="w-full sm:w-1/2">
                              <InputCom
                                label={langCntnt && langCntnt.Last_Name + "*"}
                                placeholder={langCntnt && langCntnt.Last_name}
                                inputClasses="w-full h-[50px]"
                                value={lName}
                                inputHandler={(e) => setlname(e.target.value)}
                                error={
                                  !!(errors && Object.hasOwn(errors, "name"))
                                }
                              />
                            </div>
                          </div>
                          {errors && Object.hasOwn(errors, "name") ? (
                            <span className="mt-1 text-sm text-qred">
                              {errors.name[0]}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="flex items-center mb-6 space-x-5">
                          <div className="w-full sm:w-1/2">
                            <InputCom
                              label={langCntnt && langCntnt.Email_Address + "*"}
                              placeholder={langCntnt && langCntnt.Email}
                              inputClasses="w-full h-[50px]"
                              value={email}
                              inputHandler={(e) => setEmail(e.target.value)}
                              error={
                                !!(errors && Object.hasOwn(errors, "email"))
                              }
                            />
                            {errors && Object.hasOwn(errors, "email") ? (
                              <span className="mt-1 text-sm text-qred">
                                {errors.email[0]}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="w-full sm:w-1/2">
                            <InputCom
                              label={langCntnt && langCntnt.Phone_Number + "*"}
                              placeholder="012 3  *******"
                              inputClasses="w-full h-[50px]"
                              value={phone}
                              inputHandler={(e) => setPhone(e.target.value)}
                              error={
                                !!(errors && Object.hasOwn(errors, "phone"))
                              }
                            />
                            {errors && Object.hasOwn(errors, "phone") ? (
                              <span className="mt-1 text-sm text-qred">
                                {errors.phone[0]}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="mb-6">
                          <h1 className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                            {langCntnt && langCntnt.Country}*
                          </h1>
                          <div
                            className={`w-full h-[50px] bg-white border px-5 flex justify-between items-center border-qpurplelow/10 rounded mb-2 ${
                              !!(errors && Object.hasOwn(errors, "country"))
                                ? "border-qred"
                                : "border-qpurplelow/10"
                            }`}
                          >
                            <Selectbox
                              action={getState}
                              className="w-full"
                              defaultValue="Select"
                              datas={countryDropdown && countryDropdown}
                            >
                              {({ item }) => (
                                <>
                                  <div className="flex items-center justify-between w-full">
                                    <div>
                                      <span className="text-[13px] text-qblack">
                                        {item}
                                      </span>
                                    </div>
                                    <span>
                                      <svg
                                        width="11"
                                        height="7"
                                        viewBox="0 0 11 7"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z"
                                          fill="#222222"
                                        />
                                      </svg>
                                    </span>
                                  </div>
                                </>
                              )}
                            </Selectbox>
                          </div>
                          {errors && Object.hasOwn(errors, "country") ? (
                            <span className="mt-1 text-sm text-qred">
                              {errors.country[0]}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="flex items-center mb-6 space-x-5">
                          <div className="w-1/2">
                            <h1 className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                              {langCntnt && langCntnt.State}*
                            </h1>
                            <div
                              className={`w-full h-[50px] bg-white border px-5 flex justify-between items-center border-qpurplelow/10 rounded mb-2 ${
                                !!(errors && Object.hasOwn(errors, "state"))
                                  ? "border-qred"
                                  : "border-qpurplelow/10"
                              }`}
                            >
                              <Selectbox
                                action={getcity}
                                className="w-full"
                                defaultValue="Select"
                                datas={stateDropdown && stateDropdown}
                              >
                                {({ item }) => (
                                  <>
                                    <div className="flex items-center justify-between w-full">
                                      <div>
                                        <span className="text-[13px] text-qblack">
                                          {item}
                                        </span>
                                      </div>
                                      <span>
                                        <svg
                                          width="11"
                                          height="7"
                                          viewBox="0 0 11 7"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z"
                                            fill="#222222"
                                          />
                                        </svg>
                                      </span>
                                    </div>
                                  </>
                                )}
                              </Selectbox>
                            </div>
                            {errors && Object.hasOwn(errors, "state") ? (
                              <span className="mt-1 text-sm text-qred">
                                {errors.state[0]}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="w-1/2">
                            <h1 className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                              {langCntnt && langCntnt.City}*
                            </h1>
                            <div
                              className={`w-full h-[50px] bg-white border px-5 flex justify-between items-center border-qpurplelow/10 rounded mb-2 ${
                                !!(errors && Object.hasOwn(errors, "city"))
                                  ? "border-qred"
                                  : "border-qpurplelow/10"
                              }`}
                            >
                              <Selectbox
                                action={selectCity}
                                className="w-full"
                                defaultValue="select"
                                datas={cityDropdown && cityDropdown}
                              >
                                {({ item }) => (
                                  <>
                                    <div className="flex items-center justify-between w-full">
                                      <div>
                                        <span className="text-[13px] text-qblack">
                                          {item}
                                        </span>
                                      </div>
                                      <span>
                                        <svg
                                          width="11"
                                          height="7"
                                          viewBox="0 0 11 7"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z"
                                            fill="#222222"
                                          />
                                        </svg>
                                      </span>
                                    </div>
                                  </>
                                )}
                              </Selectbox>
                            </div>
                            {errors && Object.hasOwn(errors, "city") ? (
                              <span className="mt-1 text-sm text-qred">
                                {errors.city[0]}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="mb-6 ">
                          <div className="w-full">
                            <InputCom
                              value={address}
                              inputHandler={(e) => setAddress(e.target.value)}
                              label={langCntnt && langCntnt.Address + "*"}
                              placeholder={
                                langCntnt && langCntnt.your_address_here
                              }
                              inputClasses="w-full h-[50px]"
                              error={
                                !!(errors && Object.hasOwn(errors, "address"))
                              }
                            />
                            {errors && Object.hasOwn(errors, "address") ? (
                              <span className="mt-1 text-sm text-qred">
                                {errors.address[0]}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-5 ">
                          <div className="flex items-center mb-10 space-x-2">
                            <div>
                              <input
                                checked={home}
                                onChange={() => {
                                  setHome(!home);
                                  setOffice(false);
                                }}
                                type="checkbox"
                                name="home"
                                id="home"
                                className="accent-qpurple"
                              />
                            </div>
                            <label
                              htmlFor="home"
                              className="text-qblack text-[15px] select-none capitalize"
                            >
                              {langCntnt && langCntnt.home}
                            </label>
                          </div>
                          <div className="flex items-center mb-10 space-x-2">
                            <div>
                              <input
                                checked={office}
                                onChange={() => {
                                  setOffice(!office);
                                  setHome(false);
                                }}
                                type="checkbox"
                                name="office"
                                id="office"
                                className="accent-qpurple"
                              />
                            </div>
                            <label
                              htmlFor="office"
                              className="text-qblack text-[15px] select-none"
                            >
                              {langCntnt && langCntnt.Office}
                            </label>
                          </div>
                        </div>
                        <button
                          onClick={saveAddress}
                          type="button"
                          className="w-full h-[50px]"
                        >
                          <div className="rounded-full green-btn">
                            <span className="text-sm text-white">
                              {langCntnt && langCntnt.Save_Address}
                            </span>
                            {loading && (
                              <span
                                className="w-5 "
                                style={{ transform: "scale(0.3)" }}
                              >
                                <LoaderStyleOne />
                              </span>
                            )}
                          </div>
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="mb-10">
                  <h1 className="mt-5 mb-5 text-xl font-medium sm:text-2xl text-qblack">
                    {langCntnt && langCntnt.Apply_Coupon}
                  </h1>
                  <div className="discount-code rounded overflow-hidden  w-full mb-5 sm:mb-0 h-[50px] flex ">
                    <div className="flex-1 h-full">
                      <InputCom
                        value={inputCoupon}
                        inputHandler={(e) => setInputCoupon(e.target.value)}
                        type="text"
                        placeholder={langCntnt && langCntnt.Discount_code}
                      />
                    </div>
                    <button
                      onClick={submitCoupon}
                      type="button"
                      className="w-[90px] h-[50px]"
                    >
                      <div className="green-btn">
                        <span className="text-sm font-semibold text-white">
                          {langCntnt && langCntnt.Apply}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
                <h1 className="mt-5 mb-5 text-xl font-medium sm:text-2xl text-qblack">
                  {langCntnt && langCntnt.Order_Summary}
                </h1>

                <div className="w-full px-10 py-[30px] rounded border border-qpurplelow/10">
                  <div className="mb-6 sub-total">
                    <div className="flex justify-between mb-5 ">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        {langCntnt && langCntnt.Product}
                      </p>
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        {langCntnt && langCntnt.total}
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-qpurplelow/10"></div>
                  </div>
                  <div className="product-list w-full mb-[30px]">
                    <ul className="flex flex-col space-y-5">
                      {products.map((item) => (
                        <li key={item.id}>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4
                                title={item.title}
                                className="text-[15px] text-qblack line-clamp-1 mb-2.5"
                              >
                                {wordCount(`${item.title}`)}
                                <sup className="text-[13px] text-qgray ml-2 mt-2">
                                  x{parseInt(item.quantity)}
                                </sup>
                              </h4>
                              <p className="text-[13px] text-qgray line-clamp-1">
                                {item.variants.length !== 0 &&
                                  item.variants.map((variant, i) => (
                                    <span key={i}>
                                      {variant.variant_item &&
                                        variant.variant_item.name}
                                    </span>
                                  ))}
                              </p>
                            </div>
                            <div>
                              <span
                                suppressHydrationWarning
                                className="text-[15px] text-qblack font-medium"
                              >
                                <CheckProductIsExistsInFlashSale
                                  id={item.id}
                                  price={item.price}
                                />
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full h-[1px] bg-qpurplelow/10"></div>
                  <div className="mt-[20px]">
                    <div className="flex justify-between mb-5 ">
                      <p className="text-[13px] text-qblack uppercase font-bold">
                        {langCntnt && langCntnt.SUBTOTAL}
                      </p>
                      <p
                        suppressHydrationWarning
                        className="text-[15px] font-bold text-qblack uppercase"
                      >
                        {currency_icon
                          ? currency_icon + parseFloat(totalPrice).toFixed(2)
                          : parseFloat(totalPrice).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between mb-5 ">
                      <p className="text-[13px] text-qblack uppercase font-bold">
                        {langCntnt && langCntnt.Discount_coupon} (-)
                      </p>
                      <p
                        suppressHydrationWarning
                        className="text-[15px] font-bold text-qblack uppercase"
                      >
                        {currency_icon
                          ? currency_icon +
                            parseFloat(discountCoupon).toFixed(2)
                          : parseFloat(discountCoupon).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 mb-6 shipping">
                    <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                      {langCntnt && langCntnt.Shipping} (+)
                    </span>
                    <div className="flex flex-col space-y-2.5">
                      {shippingRulesByCityId &&
                        shippingRulesByCityId.length > 0 &&
                        shippingRulesByCityId.map((rule, i) => (
                          <div key={i}>
                            {rule.type === "base_on_price" ? (
                              <>
                                {parseInt(rule.condition_from) <=
                                  parseInt(totalPrice) && (
                                  <>
                                    {parseInt(rule.condition_to) >=
                                    parseInt(totalPrice) ? (
                                      <div className="flex items-center justify-between">
                                        <div className="flex space-x-2.5 items-center">
                                          <div className="input-radio">
                                            <input
                                              onChange={(e) =>
                                                selectedRuleHandler(
                                                  e,
                                                  rule.shipping_fee
                                                )
                                              }
                                              value={rule.id}
                                              type="radio"
                                              name="price"
                                              className="accent-qpurple"
                                            />
                                          </div>
                                          <span className="text-[15px] text-normal text-qgray">
                                            {rule.shipping_rule}
                                          </span>
                                        </div>
                                        <span
                                          suppressHydrationWarning
                                          className="text-[15px] text-normal text-qgray"
                                        >
                                          {currency_icon
                                            ? currency_icon + rule.shipping_fee
                                            : rule.shipping_fee}
                                        </span>
                                      </div>
                                    ) : parseInt(rule.condition_to) === -1 ? (
                                      <div className="flex items-center justify-between">
                                        <div className="flex space-x-2.5 items-center">
                                          <div className="input-radio">
                                            <input
                                              onChange={(e) =>
                                                selectedRuleHandler(
                                                  e,
                                                  rule.shipping_fee
                                                )
                                              }
                                              value={rule.id}
                                              type="radio"
                                              name="price"
                                              className="accent-pink-500"
                                            />
                                          </div>
                                          <span className="text-[15px] text-normal text-qgray">
                                            {rule.shipping_rule}
                                          </span>
                                        </div>
                                        <span
                                          suppressHydrationWarning
                                          className="text-[15px] text-normal text-qgray"
                                        >
                                          {currency_icon
                                            ? currency_icon + rule.shipping_fee
                                            : rule.shipping_fee}
                                        </span>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                )}
                              </>
                            ) : rule.type === "base_on_weight" ? (
                              <>
                                {parseInt(rule.condition_from) <=
                                  parseInt(totalWeight) && (
                                  <>
                                    {parseInt(rule.condition_to) >=
                                    parseInt(totalWeight) ? (
                                      <div className="flex items-center justify-between">
                                        <div className="flex space-x-2.5 items-center">
                                          <div className="input-radio">
                                            <input
                                              onChange={(e) =>
                                                selectedRuleHandler(
                                                  e,
                                                  rule.shipping_fee
                                                )
                                              }
                                              value={rule.id}
                                              type="radio"
                                              name="price"
                                              className="accent-pink-500"
                                            />
                                          </div>
                                          <span className="text-[15px] text-normal text-qgray">
                                            {rule.shipping_rule}
                                          </span>
                                        </div>
                                        <span
                                          suppressHydrationWarning
                                          className="text-[15px] text-normal text-qgray"
                                        >
                                          {currency_icon
                                            ? currency_icon + rule.shipping_fee
                                            : rule.shipping_fee}
                                        </span>
                                      </div>
                                    ) : parseInt(rule.condition_to) === -1 ? (
                                      <div className="flex items-center justify-between">
                                        <div className="flex space-x-2.5 items-center">
                                          <div className="input-radio">
                                            <input
                                              onChange={(e) =>
                                                selectedRuleHandler(
                                                  e,
                                                  rule.shipping_fee
                                                )
                                              }
                                              value={rule.id}
                                              type="radio"
                                              name="price"
                                              className="accent-pink-500"
                                            />
                                          </div>
                                          <span className="text-[15px] text-normal text-qgray">
                                            {rule.shipping_rule}
                                          </span>
                                        </div>
                                        <span
                                          suppressHydrationWarning
                                          className="text-[15px] text-normal text-qgray"
                                        >
                                          {currency_icon
                                            ? currency_icon + rule.shipping_fee
                                            : rule.shipping_fee}
                                        </span>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                )}
                              </>
                            ) : rule.type === "base_on_qty" ? (
                              <>
                                {parseInt(rule.condition_from) <= totalQty && (
                                  <>
                                    {parseInt(rule.condition_to) >= totalQty ? (
                                      <div className="flex items-center justify-between">
                                        <div className="flex space-x-2.5 items-center">
                                          <div className="input-radio">
                                            <input
                                              onChange={(e) =>
                                                selectedRuleHandler(
                                                  e,
                                                  rule.shipping_fee
                                                )
                                              }
                                              value={rule.id}
                                              type="radio"
                                              name="price"
                                              className="accent-pink-500"
                                            />
                                          </div>
                                          <span className="text-[15px] text-normal text-qgray">
                                            {rule.shipping_rule}
                                          </span>
                                        </div>
                                        <span
                                          suppressHydrationWarning
                                          className="text-[15px] text-normal text-qgray"
                                        >
                                          {currency_icon
                                            ? currency_icon + rule.shipping_fee
                                            : rule.shipping_fee}
                                        </span>
                                      </div>
                                    ) : parseInt(rule.condition_to) == -1 ? (
                                      <div className="flex items-center justify-between">
                                        <div className="flex space-x-2.5 items-center">
                                          <div className="input-radio">
                                            <input
                                              onChange={(e) =>
                                                selectedRuleHandler(
                                                  e,
                                                  rule.shipping_fee
                                                )
                                              }
                                              value={rule.id}
                                              type="radio"
                                              name="price"
                                              className="accent-pink-500"
                                            />
                                          </div>
                                          <span className="text-[15px] text-normal text-qgray">
                                            {rule.shipping_rule}
                                          </span>
                                        </div>
                                        <span
                                          suppressHydrationWarning
                                          className="text-[15px] text-normal text-qgray"
                                        >
                                          {currency_icon
                                            ? currency_icon + rule.shipping_fee
                                            : rule.shipping_fee}
                                        </span>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                )}
                              </>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="mt-[30px]">
                    <div className="flex justify-between mb-5 ">
                      <p className="text-2xl font-medium capitalize text-qblack">
                        {langCntnt && langCntnt.total}
                      </p>
                      <p
                        suppressHydrationWarning
                        className="text-2xl font-medium text-qred"
                      >
                        {currency_icon
                          ? currency_icon +
                            (mainTotalPrice - discountCoupon).toFixed(2)
                          : (mainTotalPrice - discountCoupon).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  {/*payment methods*/}
                  <div className="mt-[30px] mb-5 relative">
                    <div className="w-full">
                      <div className="flex flex-col space-y-3">
                        {cashOnDeliveryStatus && (
                          <div
                            onClick={() => setPaymentMethod("cashOnDelivery")}
                            className={`payment-item relative bg-[#F8F8F8] text-center w-full h-[50px] text-sm text-qpurple rounded flex justify-center items-center px-3 uppercase rounded cursor-pointer
                              ${
                                selectPayment === "cashOnDelivery"
                                  ? "border-2 border-qpurple"
                                  : "border border-qpurplelow/10"
                              }
                              `}
                          >
                            <div className="w-full">
                              <span className="text-base font-bold text-qblack">
                                {langCntnt && langCntnt.Cash_On_Delivery}
                              </span>
                            </div>
                            {selectPayment === "cashOnDelivery" && (
                              <span
                                data-aos="zoom-in"
                                className="absolute text-white z-10 w-6 h-6 rounded-full bg-qpurple -right-2.5 -top-2.5"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-6 h-6"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            )}
                          </div>
                        )}

                        {payStackStatus && (
                          <div
                            onClick={() => setPaymentMethod("paystack")}
                            className={`payment-item text-center bg-[#F8F8F8] relative w-full h-[50px] font-bold text-sm text-white text-qpurple  rounded flex justify-center items-center px-3 uppercase rounded cursor-pointer ${
                              selectPayment === "paystack"
                                ? "border-2 border-qpurple"
                                : "border border-qpurplelow/10"
                            }`}
                          >
                            <div className="flex justify-center w-full">
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="50"
                                  width="100"
                                  viewBox="-131.2 222 600.2 106.9"
                                >
                                  <path
                                    d="m-45.8 232.2h-80.4c-2.7 0-5 2.3-5 5.1v9.1c0 2.8 2.3 5.1 5 5.1h80.4c2.8 0 5-2.3 5.1-5.1v-9c0-2.9-2.3-5.2-5.1-5.2zm0 50.5h-80.4c-1.3 0-2.6.5-3.5 1.5-1 1-1.5 2.2-1.5 3.6v9.1c0 2.8 2.3 5.1 5 5.1h80.4c2.8 0 5-2.2 5.1-5.1v-9.1c-.1-2.9-2.3-5.1-5.1-5.1zm-35.1 25.2h-45.3c-1.3 0-2.6.5-3.5 1.5s-1.5 2.2-1.5 3.6v9.1c0 2.8 2.3 5.1 5 5.1h45.2c2.8 0 5-2.3 5-5v-9.1c.1-3-2.1-5.3-4.9-5.2zm40.2-50.5h-85.5c-1.3 0-2.6.5-3.5 1.5s-1.5 2.2-1.5 3.6v9.1c0 2.8 2.3 5.1 5 5.1h85.4c2.8 0 5-2.3 5-5.1v-9.1c.1-2.8-2.2-5-4.9-5.1zm0 0"
                                    fill="#00c3f7"
                                  />
                                  <path
                                    d="m52.8 252.6c-2.5-2.6-5.4-4.6-8.7-6s-6.8-2.1-10.4-2.1c-3.5-.1-6.9.7-10.1 2.2-2.1 1-4 2.4-5.6 4.1v-1.6c0-.8-.3-1.6-.8-2.2s-1.3-1-2.2-1h-11.1c-.8 0-1.6.3-2.1 1-.6.6-.9 1.4-.8 2.2v74.8c0 .8.3 1.6.8 2.2.6.6 1.3.9 2.1.9h11.4c.8 0 1.5-.3 2.1-.9.6-.5 1-1.3.9-2.2v-25.6c1.6 1.8 3.7 3.1 6 3.9 3 1.1 6.1 1.7 9.3 1.7 3.6 0 7.2-.7 10.5-2.1s6.3-3.4 8.8-6c2.6-2.7 4.6-5.9 6-9.4 1.6-3.9 2.3-8.1 2.2-12.3.1-4.2-.7-8.4-2.2-12.4-1.5-3.3-3.5-6.5-6.1-9.2zm-10.2 27.1c-.6 1.6-1.5 3-2.7 4.3-2.3 2.5-5.6 3.9-9 3.9-1.7 0-3.4-.3-5-1.1-1.5-.7-2.9-1.6-4.1-2.8s-2.1-2.7-2.7-4.3c-1.3-3.4-1.3-7.1 0-10.5.6-1.6 1.6-3 2.7-4.2 1.2-1.2 2.6-2.2 4.1-2.9 1.6-.7 3.3-1.1 5-1.1 1.8 0 3.4.3 5.1 1.1 1.5.7 2.9 1.6 4 2.8 1.2 1.2 2 2.6 2.7 4.2 1.2 3.5 1.1 7.2-.1 10.6zm79.6-33.6h-11.3c-.8 0-1.6.3-2.1.9-.6.6-.9 1.4-.9 2.3v1.4c-1.4-1.7-3.2-3-5.1-3.9-3.1-1.5-6.5-2.2-9.9-2.2-7.3 0-14.2 2.9-19.4 8-2.7 2.7-4.8 5.9-6.2 9.4-1.6 3.9-2.4 8.1-2.3 12.4-.1 4.2.7 8.4 2.3 12.4 1.5 3.5 3.5 6.7 6.2 9.4 5.1 5.2 12.1 8.1 19.3 8.1 3.4.1 6.8-.7 9.9-2.2 1.9-1 3.8-2.3 5.2-3.9v1.5c0 .8.3 1.6.9 2.2.6.5 1.3.9 2.1.9h11.3c.8 0 1.6-.3 2.1-.9.6-.6.9-1.4.9-2.2v-50.3c0-.8-.3-1.6-.8-2.2-.6-.7-1.4-1.1-2.2-1.1zm-15.3 33.6c-.6 1.6-1.5 3-2.7 4.3-1.2 1.2-2.5 2.2-4 2.9-3.2 1.5-6.9 1.5-10.1 0-1.5-.7-2.9-1.7-4.1-2.9s-2.1-2.7-2.7-4.3c-1.2-3.4-1.2-7.1 0-10.5.6-1.6 1.5-2.9 2.7-4.2 1.2-1.2 2.5-2.2 4.1-2.9 3.2-1.5 6.9-1.5 10 0 1.5.7 2.9 1.6 4 2.8s2 2.6 2.7 4.2c1.4 3.5 1.4 7.2.1 10.6zm127.9-6.8c-1.6-1.4-3.5-2.6-5.5-3.4-2.1-.9-4.4-1.5-6.6-2l-8.6-1.7c-2.2-.4-3.8-1-4.6-1.7-.7-.5-1.2-1.3-1.2-2.2s.5-1.7 1.6-2.4c1.5-.8 3.1-1.2 4.8-1.1 2.2 0 4.4.5 6.4 1.3 2 .9 3.9 1.8 5.7 3 2.5 1.6 4.7 1.3 6.2-.5l4.1-4.7c.8-.8 1.2-1.8 1.3-2.9-.1-1.2-.7-2.2-1.6-3-1.7-1.5-4.5-3.1-8.2-4.7s-8.4-2.4-13.9-2.4c-3.4-.1-6.7.4-9.9 1.4-2.7.9-5.3 2.2-7.6 3.9-2.1 1.6-3.7 3.6-4.9 6-1.1 2.3-1.7 4.8-1.7 7.3 0 4.7 1.4 8.5 4.2 11.3s6.5 4.7 11.1 5.6l9 2c1.9.3 3.9.9 5.7 1.8 1 .4 1.6 1.4 1.6 2.5 0 1-.5 1.9-1.6 2.7s-2.9 1.3-5.3 1.3-4.9-.5-7.1-1.6c-2.1-1-4-2.3-5.8-3.8-.8-.6-1.6-1.1-2.6-1.5-1-.3-2.3 0-3.6 1.1l-4.9 3.7c-1.4 1-2.1 2.7-1.7 4.3.3 1.7 1.6 3.3 4.1 5.2 6.2 4.2 13.6 6.4 21.1 6.2 3.5 0 7-.4 10.3-1.4 2.9-.9 5.6-2.2 8-4 2.2-1.6 4-3.7 5.2-6.2 1.2-2.4 1.8-5 1.8-7.7.1-2.4-.4-4.8-1.4-7-1-1.6-2.3-3.3-3.9-4.7zm49.4 13.7c-.5-.9-1.4-1.5-2.5-1.7-1 0-2.1.3-2.9.9-1.4.9-3 1.4-4.6 1.5-.5 0-1.1-.1-1.6-.2-.6-.1-1.1-.4-1.5-.8-.5-.5-.9-1.1-1.2-1.7-.4-1-.6-2-.5-3v-20.5h14.6c.9 0 1.7-.4 2.3-1s1-1.3 1-2.2v-8.7c0-.9-.3-1.7-1-2.2-.6-.6-1.4-.9-2.2-.9h-14.7v-14c0-.8-.3-1.7-.9-2.2s-1.3-.8-2.1-.9h-11.4c-.8 0-1.6.3-2.2.9s-1 1.4-1 2.2v14h-6.5c-.8 0-1.6.3-2.2 1-.5.6-.8 1.4-.8 2.2v8.7c0 .8.3 1.6.8 2.2.5.7 1.3 1 2.2 1h6.5v24.4c-.1 2.9.5 5.8 1.7 8.4 1.1 2.2 2.5 4.1 4.4 5.7 1.8 1.5 3.9 2.6 6.2 3.2 2.3.7 4.7 1.1 7.1 1.1 3.1 0 6.3-.5 9.3-1.5 2.8-.9 5.3-2.5 7.3-4.6 1.3-1.3 1.4-3.4.4-4.9zm61.8-40.5h-11.3c-.8 0-1.5.3-2.1.9s-.9 1.4-.9 2.3v1.4c-1.4-1.7-3.1-3-5.1-3.9-3.1-1.5-6.5-2.2-9.9-2.2-7.3 0-14.2 2.9-19.4 8-2.7 2.7-4.8 5.9-6.2 9.4-1.6 3.9-2.4 8.1-2.3 12.3-.1 4.2.7 8.4 2.3 12.4 1.4 3.5 3.6 6.7 6.2 9.4 5.1 5.2 12 8.1 19.3 8.1 3.4.1 6.8-.7 9.9-2.1 2-1 3.8-2.3 5.2-3.9v1.5c0 .8.3 1.6.9 2.1.6.6 1.3.9 2.1.9h11.3c1.7 0 3-1.3 3-3v-50.3c0-.8-.3-1.6-.8-2.2-.5-.7-1.3-1.1-2.2-1.1zm-15.2 33.6c-.6 1.6-1.5 3-2.7 4.3-1.2 1.2-2.5 2.2-4 2.9-1.6.7-3.3 1.1-5.1 1.1s-3.4-.4-5-1.1c-1.5-.7-2.9-1.7-4.1-2.9s-2.1-2.7-2.6-4.3c-1.2-3.4-1.2-7.1 0-10.5.6-1.6 1.5-3 2.6-4.2 1.2-1.2 2.6-2.2 4.1-2.9 1.6-.7 3.3-1.1 5-1.1s3.4.3 5.1 1.1c1.5.7 2.8 1.6 4 2.8s2.1 2.6 2.7 4.2c1.3 3.4 1.3 7.2 0 10.6zm77.2 6.1-6.5-5c-1.2-1-2.4-1.3-3.4-.9-.9.4-1.7 1-2.4 1.7-1.4 1.7-3.1 3.2-4.9 4.5-2 1.1-4.1 1.7-6.3 1.5-2.6 0-5-.7-7.1-2.2s-3.7-3.5-4.5-6c-.6-1.7-.9-3.4-.9-5.1 0-1.8.3-3.5.9-5.3.6-1.6 1.4-3 2.6-4.2s2.5-2.2 4-2.8c1.6-.7 3.3-1.1 5.1-1.1 2.2-.1 4.4.5 6.3 1.6 1.9 1.2 3.5 2.7 4.9 4.5.6.7 1.4 1.3 2.3 1.7 1 .4 2.2.1 3.4-.9l6.5-4.9c.8-.5 1.4-1.3 1.7-2.2.4-1 .3-2.1-.3-3-2.5-3.9-5.9-7.1-10-9.4-4.3-2.4-9.4-3.7-15.1-3.7-4 0-8 .8-11.8 2.3-3.6 1.5-6.8 3.6-9.5 6.3s-4.9 5.9-6.4 9.5c-3.1 7.5-3.1 15.9 0 23.4 1.5 3.5 3.6 6.8 6.4 9.4 5.7 5.6 13.3 8.6 21.3 8.6 5.7 0 10.8-1.3 15.1-3.7 4.1-2.3 7.6-5.5 10.1-9.5.5-.9.6-2 .3-2.9-.4-.8-1-1.6-1.8-2.2zm60.2 11.7-17.9-26.2 15.3-20.2c.7-.9 1-2.2.6-3.3-.3-.8-1-1.6-2.9-1.6h-12.1c-.7 0-1.4.2-2 .5-.8.4-1.4 1-1.8 1.7l-12.2 17.1h-2.9v-40.4c0-.8-.3-1.6-.9-2.2s-1.3-.9-2.1-.9h-11.3c-.8 0-1.6.3-2.2.9s-.9 1.3-.9 2.2v74.5c0 .9.3 1.6.9 2.2s1.4.9 2.2.9h11.3c.8 0 1.6-.3 2.1-.9.6-.6.9-1.4.9-2.2v-19.7h3.2l13.3 20.4c.8 1.5 2.3 2.4 3.9 2.4h12.7c1.9 0 2.7-.9 3.1-1.7.5-1.2.4-2.5-.3-3.5zm-281.8-51.4h-12.7c-1 0-1.9.3-2.6 1-.6.6-1 1.3-1.2 2.1l-9.4 34.8h-2.3l-10-34.8c-.2-.7-.5-1.4-1-2.1-.6-.7-1.4-1.1-2.3-1.1h-12.9c-1.7 0-2.7.5-3.2 1.7-.3 1-.3 2.1 0 3.1l16 49c.3.7.6 1.5 1.2 2 .6.6 1.5.9 2.4.9h6.8l-.6 1.6-1.5 4.5c-.5 1.4-1.3 2.6-2.5 3.5-1.1.8-2.4 1.3-3.8 1.2-1.2 0-2.3-.3-3.4-.7-1.1-.5-2.1-1.1-3-1.8-.8-.6-1.8-.9-2.9-.9h-.1c-1.2.1-2.3.7-2.9 1.8l-4 5.9c-1.6 2.6-.7 4.2.3 5.1 2.2 2 4.7 3.5 7.5 4.4 3.1 1.1 6.3 1.6 9.5 1.6 5.8 0 10.6-1.6 14.3-4.7 3.8-3.4 6.7-7.8 8.1-12.8l18.6-60.6c.4-1.1.5-2.2.1-3.2-.1-.7-.8-1.5-2.5-1.5zm0 0"
                                    fill="#011b33"
                                  />
                                </svg>
                              </span>
                            </div>
                            {selectPayment === "paystack" && (
                              <span
                                data-aos="zoom-in"
                                className="absolute text-white z-10 w-6 h-6 rounded-full bg-qpurple -right-2.5 -top-2.5"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-6 h-6"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            )}
                          </div>
                        )}

                        {remitaStatus && (
                          <div
                            onClick={() => setPaymentMethod("remita")}
                            className={`payment-item text-center bg-[#F8F8F8] relative w-full h-[50px] font-bold text-sm text-white text-qpurple  rounded flex justify-center items-center px-3 uppercase rounded cursor-pointer ${
                              selectPayment === "remita"
                                ? "border-2 border-qpurple"
                                : "border border-qpurplelow/10"
                            }`}
                          >
                            <div className="flex justify-center w-full">
                              <span>
                                <img
                                  src={`/images/remita-logo-svg.svg`}
                                  alt=""
                                  height="50"
                                  width="100"
                                />
                              </span>
                            </div>
                            {selectPayment === "remita" && (
                              <span
                                data-aos="zoom-in"
                                className="absolute text-white z-10 w-6 h-6 rounded-full bg-qpurple -right-2.5 -top-2.5"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-6 h-6"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {selectPayment === "bankpayment" && (
                    <div className="w-full mt-5 bank-inputs">
                      <div className="mb-5 input-item">
                        <div className="w-full p-5 mb-4 overflow-x-scroll rounded bank-info-alert bg-amber-100">
                          <pre className="table w-full table-fixed">
                            {bankInfo.account_info}
                          </pre>
                        </div>
                        <h6 className="input-label  capitalize text-[13px] font-600 leading-[24px] text-qblack block mb-2 ">
                          {langCntnt && langCntnt.Transaction_Information}*
                        </h6>
                        <textarea
                          name=""
                          id=""
                          cols="5"
                          rows="7"
                          value={transactionInfo}
                          onChange={(e) => setTransactionInfo(e.target.value)}
                          className={`w-full focus:ring-0 rounded focus:outline-none py-3 px-4 border  placeholder:text-sm text-sm`}
                          placeholder={"Example:\r\n" + bankInfo.account_info}
                        ></textarea>
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={placeOrderHandler}
                    className="w-full"
                  >
                    <div className="w-full h-[50px] flex justify-center items-center">
                      <div className="flex items-center justify-center w-full h-full text-white border border-transparent rounded transition-common bg-qpurple hover:bg-qpurplelow/10 hover:text-qpurple hover:border-qpurple">
                        <span className="text-sm font-semibold">
                          {langCntnt && langCntnt.Place_Order_Now}
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="checkout-page-wrapper w-full bg-white pb-[120px]">
        <div className="hidden w-full mb-5 md:block">
          <PageTitle
            title={langCntnt && langCntnt.checkout}
            breadcrumb={[
              { name: langCntnt && langCntnt.home, path: "/" },
              { name: langCntnt && langCntnt.checkout, path: "/checkout" },
            ]}
          />
        </div>
        <div className="container-x mx-auto md:mt-[60px]">
          <EmptyCardError />
        </div>
      </div>
    );
  }
}
export default isAuth(CheakoutPage);
