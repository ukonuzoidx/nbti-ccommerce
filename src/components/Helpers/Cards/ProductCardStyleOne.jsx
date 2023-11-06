import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiRequest from "../../../../utils/apiRequest";
import auth from "../../../../utils/auth";
import languageModel from "../../../../utils/languageModel";
import settings from "../../../../utils/settings";
import { addItemToCart } from "../../../store/Cart";
import { fetchCompareProducts } from "../../../store/compareProduct";
import { fetchWishlist } from "../../../store/wishlistData";
import LoginContext from "../../Contexts/LoginContexts";
import CheckProductIsExistsInFlashSale from "../../Shared/CheckProductIsExistsInFlashSale";
import ProductView from "../../SingleProductPage/ProductView";
import Compair from "../icons/Compair";
import QuickViewIco from "../icons/QuickViewIco";
import Star from "../icons/Star";
import ThinLove from "../icons/ThinLove";

const Redirect = ({ message, linkTxt }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-qgray">{message && message}</span>
      <Link href="/cart">
        <span className="mr-2 text-xs text-blue-600 border-b border-blue-600 cursor-pointer">
          {linkTxt && linkTxt}
        </span>
      </Link>
    </div>
  );
};

export default function ProductCardStyleOne({ datas }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { wishlistData } = useSelector((state) => state.wishlistData);
  const wishlist = wishlistData && wishlistData.wishlists;
  const wishlisted =
    wishlist && wishlist.data.find((id) => id.product.id === datas.id);

  const [arWishlist, setArWishlist] = useState(null);
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [isProductInFlashSale, setData] = useState(null);
  const loginPopupBoard = useContext(LoginContext);
  useEffect(() => {
    if (websiteSetup) {
      const getId = websiteSetup.payload.flashSaleProducts.find(
        (item) => parseInt(item.product_id) === parseInt(datas.id)
      );
      if (getId) {
        setData(true);
      } else {
        setData(false);
      }
    }
  }, [websiteSetup]);
  const [quickViewModal, setQuickView] = useState(false);
  const [quickViewData, setQuickViewData] = useState(null);
  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);
  const quickViewHandler = (slug) => {
    setQuickView(!quickViewModal);
    if (!quickViewData) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}api/product/${slug}`)
        .then((res) => {
          setQuickViewData(res.data ? res.data : null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    if (quickViewModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [quickViewModal]);

  useEffect(() => {
    if (wishlisted) {
      setArWishlist(true);
    } else {
      setArWishlist(false);
    }
  }, [wishlisted]);
  const available =
    (datas.cam_product_sale /
      (datas.cam_product_available + datas.cam_product_sale)) *
    100;

  const addToWishlist = (id) => {
    if (auth()) {
      setArWishlist(true);
      apiRequest.addToWishlist({ id: id, token: auth().access_token });
      dispatch(fetchWishlist());
    } else {
      loginPopupBoard.handlerPopup(true);
    }
  };
  const removeToWishlist = (id) => {
    if (auth()) {
      setArWishlist(false);
      apiRequest.removeToWishlist({ id: id, token: auth().access_token });
      dispatch(fetchWishlist());
    } else {
      router.push("/login");
    }
  };
  console.log(parseInt(datas.qty) !== 0 && parseInt(datas.qty) > 0);
  // cart
  const [newPrice, setNewPrice] = useState(0);
  const price = datas.price ? parseFloat(datas.price) : null;
  const offerPrice = datas.offer_price ? parseFloat(datas.offer_price) : null;
  const handleSetNewPrice = (params) => {
    setNewPrice(params);
  };
  const addToCart = (props) => {
    if (parseInt(props.qty) !== 0 && parseInt(props.qty) > 0) {
      const { price, offer_price, qty, ...others } = props;
      const data = {
        ...others,
        quantity: 1,
        price: newPrice,
        totalPrice: newPrice,
      };

      if (props.id) {
        dispatch(addItemToCart({ ...data }));
        toast.success("Item added to you cart");
      }
    } else {
      toast.error(`${langCntnt && langCntnt.Products_not_Available}`);
    }
  };

  const productCompare = (id) => {
    if (auth()) {
      apiRequest
        .addProductForCompare(id, auth().access_token)
        .then((res) => {
          toast.success(res.data && res.data.notification);
          dispatch(fetchCompareProducts());
        })
        .catch((err) => {
          toast.error(err.response && err.response.data.notification);
          console.log(err);
        });
    } else {
      loginPopupBoard.handlerPopup(true);
    }
  };
  const { currency_icon } = settings();
  const [imgSrc, setImgSrc] = useState(null);
  const loadImg = (value) => {
    setImgSrc(value);
  };
  return (
    <div
      className="product-card-one w-full h-[520px] transition-all duration-300 ease-in-out bg-white relative group border border-transparent hover:border-qpurple overflow-hidden rounded-lg"
      style={{ boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="product-card-img w-full h-[313px]">
            <div className="w-full h-full relative  flex justify-center items-center transition-all duration-700 ease-in-out transform group-hover:-scale-x-[1] scale-x-100">
              <Image
                layout="fill"
                objectFit="scale-down"
                src={`${imgSrc ? imgSrc : "/assets/images/spinner.gif"}`}
                alt=""
                onLoadingComplete={() => loadImg(datas.image)}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
          <div className="product-card-details relative pt-5 pl-[30px]">
            <div className="flex justify-start  mb-1.5">
              <div className="reviews flex space-x-[1px]">
                {Array.from(Array(datas.review), () => (
                  <span key={datas.review + Math.random()}>
                    <Star />
                  </span>
                ))}
                {datas.review < 5 && (
                  <>
                    {Array.from(Array(5 - datas.review), () => (
                      <span
                        key={datas.review + Math.random()}
                        className="text-qgray"
                      >
                        <Star defaultValue={false} />
                      </span>
                    ))}
                  </>
                )}
              </div>
            </div>

            <Link
              href={{
                pathname: "/single-product",
                query: { slug: datas.slug },
              }}
              passHref
            >
              <a rel="noopener noreferrer">
                <h1 className="title mb-1.5 text-[18px] font-600 text-qblack leading-[30px] line-clamp-1 hover:text-qpurple cursor-pointer text-start">
                  {datas.title}
                </h1>
              </a>
            </Link>
            <p className="price text-start">
              <span
                suppressHydrationWarning
                className={`main-price  font-500 text-[16px] ${
                  offerPrice ? "line-through text-qgray" : "text-qpurple"
                }`}
              >
                {offerPrice ? (
                  <span>
                    {currency_icon &&
                      currency_icon + parseFloat(price).toFixed(2)}
                  </span>
                ) : (
                  <>
                    {isProductInFlashSale && (
                      <span
                        className={`line-through text-qgray font-500 text-[16px] mr-2`}
                      >
                        {currency_icon &&
                          currency_icon + parseFloat(price).toFixed(2)}
                      </span>
                    )}
                    <CheckProductIsExistsInFlashSale
                      id={datas.id}
                      price={price}
                      setNewPrice={handleSetNewPrice}
                    />
                  </>
                )}
              </span>
              {offerPrice && (
                <span
                  suppressHydrationWarning
                  className="offer-price text-qpurple font-500 text-[16px] ml-2"
                >
                  <CheckProductIsExistsInFlashSale
                    id={datas.id}
                    price={offerPrice}
                    setNewPrice={handleSetNewPrice}
                  />
                </span>
              )}
              <br />
            </p>
          </div>
        </div>
        <br />
        {/* add to card button */}
        <div className="">
          <div
            style={{ borderRadius: "30px 0px 0" }}
            onClick={() => addToCart(datas)}
            className="w-[135px] h-[48px] pl-6 pt-3 cursor-pointer  bg-qpurplelow/10 group-hover:bg-qpurple transition-all duration-300 absolute -bottom-1 -right-1 ease-in-out"
          >
            <div className="w-full h-full space-x-3 text-qpurple group-hover:text-white">
              <span className="text-base font-semibold">Add To Cart</span>
            </div>
          </div>
        </div>
      </div>
      {/* quick-access-btns */}
      <div className="quick-access-btn">
        <button
          className=" absolute left-[77px] top-[243px] transform scale-0 group-hover:scale-100  transition-all ease-in-out"
          onClick={() => quickViewHandler(datas.slug)}
          type="button"
        >
          <span className="block w-10 h-10 overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-full text-qblack hover:text-white hover:bg-qpurple">
            <span className="flex items-center justify-center w-full h-full bg-qpurplelow/10">
              <QuickViewIco className="fill-current" />
            </span>
          </span>
        </button>
        {!arWishlist ? (
          <button
            className=" absolute left-[134px] top-[243px] transform scale-0 group-hover:scale-100  transition-all duration-300 ease-in-out"
            type="button"
            onClick={() => addToWishlist(datas.id)}
          >
            <span className="block w-10 h-10 overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-full text-qblack hover:text-white">
              <span className="flex items-center justify-center w-full h-full hover:bg-qpurple bg-qpurplelow/10 ">
                <ThinLove className="fill-current" />
              </span>
            </span>
          </button>
        ) : (
          <button
            className=" absolute  left-[134px] top-[243px] transform scale-0 group-hover:scale-100 transition-all duration-300 ease-in-out"
            type="button"
            onClick={() => removeToWishlist(wishlisted && wishlisted.id)}
          >
            <span className="block w-10 h-10 overflow-hidden bg-white rounded-full">
              <span className="flex items-center justify-center w-full h-full bg-qpurplelow/10">
                <ThinLove fill={true} />
              </span>
            </span>
          </button>
        )}

        <button
          className=" absolute left-[195px] top-[243px] transform scale-0 group-hover:scale-100  transition-all duration-500 ease-in-out"
          type="button"
          onClick={() => productCompare(datas.id)}
        >
          <span className="items-center block w-10 h-10 overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-full text-qblack hover:text-white">
            <span className="flex items-center justify-center w-full h-full hover:bg-qpurple bg-qpurplelow/10 ">
              <Compair />
            </span>
          </span>
        </button>
      </div>
      {quickViewModal && quickViewData && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full quicke-view-wrapper ">
          <div
            onClick={() => setQuickView(!quickViewModal)}
            className="fixed left-0 right-0 w-full h-full bg-black bg-opacity-25"
          ></div>
          <div
            data-aos="fade-up"
            className="md:mx-10 xl:mt-[100px] rounded w-full bg-white relative lg:py-[40px] pt-[80px] pb-[40px] sm:px-[38px] px-3 relative md:mt-12 h-full overflow-y-scroll xl:overflow-hidden  xl:mt-0"
            style={{ zIndex: "999" }}
          >
            <div className="w-full h-full overflow-y-scroll overflow-style-none">
              <ProductView
                images={
                  quickViewData.gellery.length > 0 ? quickViewData.gellery : []
                }
                product={quickViewData.product}
              />
            </div>

            <button
              onClick={() => setQuickView(!quickViewModal)}
              type="button"
              className="absolute right-3 top-3"
            >
              <span className="flex items-center justify-center w-12 h-12 text-red-500 border rounded border-qred">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
