import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import settings from "../../../utils/settings";

function CheckProductIsExistsInFlashSale({
  id,
  price,
  sign = true,
  className,
  setNewPrice,
}) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [flashSale, setData] = useState(null);
  const [calPrice, setPrice] = useState(null);
  useEffect(() => {
    if (websiteSetup) {
      setData({
        flashSale: websiteSetup.payload.flashSale,
        flashSaleActive: websiteSetup.payload.flashSaleActive,
        flashSaleProducts: websiteSetup.payload.flashSaleProducts,
      });
    }
  }, [websiteSetup]);

  const calcProductPrice = (id, price) => {
    // console.log(id, price);
    // console.log(flashSale);
    if (flashSale && flashSale.flashSaleActive) {
      const getId = flashSale.flashSaleProducts.find(
        (item) => parseInt(item.product_id) === parseInt(id)
      );
      if (getId) {
        const offer = parseInt(flashSale.flashSale.offer);
        const discountPrice = (offer / 100) * parseFloat(price);
        const mainPrice = parseFloat(price) - discountPrice;
        setPrice(mainPrice);
        setNewPrice(mainPrice);
      } else {
        setPrice(price);
        setNewPrice(price);
      }
    } else {
      setPrice(price);
      setNewPrice(price);
    }
  };
  useEffect(() => {
    if (id && price && setNewPrice) {
      calcProductPrice(id, price);
    }
  }, [id, price, setNewPrice]);
  const { currency_icon } = settings();
  if (sign) {
    return currency_icon
      ? currency_icon + parseFloat(calPrice).toFixed(2)
      : "$" + parseFloat(calPrice).toFixed(2);
  } else {
    return parseFloat(calPrice).toFixed(2);
  }
}

export default CheckProductIsExistsInFlashSale;

//(27 * 20 /100)-27

//offer =(20/100*price)
//total=price-offer
