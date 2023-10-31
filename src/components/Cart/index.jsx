import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import languageModel from "../../../utils/languageModel";
import settings from "../../../utils/settings";
import { removeFromCart } from "../../store/Cart";

export default function Cart({ className }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const [langCntnt, setLangCntnt] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    const totalPrice = products.reduce(
      (accumulator, item) => accumulator + item.totalPrice,
      0
    );
    setTotalPrice(totalPrice);
  }, [products]);

  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);

  const deleteItem = (id) => {
    if (id) {
      dispatch(removeFromCart(id));
    }
  };

  const price = (item) => {
    if (item) {
      if (item.product.offer_price) {
        if (item.variants && item.variants.length > 0) {
          const prices = item.variants.map((item) =>
            item.variant_item ? parseFloat(item.variant_item.price) : 0
          );
          const sumVarient = prices.reduce((p, c) => p + c);
          return parseFloat(item.product.offer_price) + sumVarient;
        } else {
          return parseFloat(item.product.offer_price);
        }
      } else {
        if (item.variants && item.variants.length > 0) {
          const prices = item.variants.map((item) =>
            item.variant_item ? parseFloat(item.variant_item.price) : 0
          );
          const sumVarient = prices.reduce((p, c) => p + c);
          return parseFloat(item.product.price) + sumVarient;
        } else {
          return parseFloat(item.product.price);
        }
      }
    }
  };
  const { currency_icon } = settings();
  return (
    <>
      <div
        style={{ boxShadow: " 0px 15px 50px 0px rgba(0, 0, 0, 0.14)" }}
        className={`cart-wrappwer w-[300px] bg-white border-t-[3px] ${
          className || ""
        }`}
      >
        {products && products.length > 0 ? (
          <div className="w-full h-full">
            <div className="product-items h-[310px] overflow-y-scroll">
              <ul>
                {products.map(
                  ({
                    image,
                    id,
                    title,
                    price,
                    offer_price,
                    quantity,
                    totalPrice,
                  }) => (
                    <li key={id} className="flex justify-between w-full h-full">
                      <div className="flex space-x-[6px] justify-center items-center px-4 my-[20px]">
                        <div className="w-[65px] h-full relative">
                          <Image
                            layout="fill"
                            src={image}
                            alt={title}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div className="flex flex-col justify-center flex-1 h-full ">
                          <h3 className="title mb-2 text-[13px] font-600 text-qblack leading-4 line-clamp-2 hover:text-qpurple">
                            {title}
                          </h3>

                          <p className="price">
                            <span
                              suppressHydrationWarning
                              className="offer-price text-qred font-600 text-[15px] ml-2"
                            >
                              {totalPrice.toFixed(2)}
                            </span>
                          </p>
                          <p>quantity: {quantity}</p>
                        </div>
                      </div>
                      <span
                        onClick={() => deleteItem(id)}
                        className="mt-[20px] mr-[15px] inline-flex cursor-pointer"
                      >
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 8 8"
                          fill="none"
                          className="inline fill-current text-[#AAAAAA] hover:text-qred"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7.76 0.24C7.44 -0.08 6.96 -0.08 6.64 0.24L4 2.88L1.36 0.24C1.04 -0.08 0.56 -0.08 0.24 0.24C-0.08 0.56 -0.08 1.04 0.24 1.36L2.88 4L0.24 6.64C-0.08 6.96 -0.08 7.44 0.24 7.76C0.56 8.08 1.04 8.08 1.36 7.76L4 5.12L6.64 7.76C6.96 8.08 7.44 8.08 7.76 7.76C8.08 7.44 8.08 6.96 7.76 6.64L5.12 4L7.76 1.36C8.08 1.04 8.08 0.56 7.76 0.24Z" />
                        </svg>
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="w-full px-4 mt-[20px] mb-[12px]">
              <div className="h-[1px] bg-[#F0F1F3]"></div>
            </div>
            <div className="product-actions px-4 mb-[30px]">
              <div className="total-equation flex justify-between items-center mb-[28px]">
                <span className="text-[15px] font-500 text-qblack capitalize">
                  {langCntnt && langCntnt.SUBTOTAL}
                </span>
                <span
                  suppressHydrationWarning
                  className="text-[15px] font-500 text-qred "
                >
                  {currency_icon + (totalPrice ? totalPrice.toFixed(2) : 0)}
                </span>
              </div>
              <div className="product-action-btn">
                <Link href="/cart">
                  <div className="gray-btn w-full h-[50px] mb-[10px] cursor-pointer rounded">
                    <span>{langCntnt && langCntnt.View_Cart}</span>
                  </div>
                </Link>
                <Link href="/checkout">
                  <div className="w-full h-[50px] cursor-pointer">
                    <div className="flex items-center justify-center w-full h-full text-white rounded transition-common bg-qpurple hover:bg-qpurplelow/10 hover:text-qpurple">
                      <span className="text-sm">
                        {langCntnt && langCntnt.Checkout_Now}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="w-full px-4 mt-[20px]">
              <div className="h-[1px] bg-[#F0F1F3]"></div>
            </div>
            <div className="flex justify-center py-[15px]">
              <p className="text-[13px] font-500 text-qgray">
                {langCntnt && langCntnt.Get_Return_within}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="my-10 product-items">
              <p className="mb-5 text-sm text-center text-gray-400">
                {langCntnt && langCntnt.No_items_found}
              </p>
              <p className="text-sm text-center text-gray-400">
                <Link
                  href={{
                    pathname: "/products",
                  }}
                  passHref
                >
                  <a rel="noopener noreferrer">
                    <span className="text-sm font-semibold underline text-qpurple">
                      {langCntnt && langCntnt.Shop_Now}
                    </span>
                  </a>
                </Link>
              </p>
            </div>
            <div className="w-full px-4 mt-[20px]">
              <div className="h-[1px] bg-[#F0F1F3]"></div>
            </div>
            <div className="flex justify-center py-[15px]">
              <p className="text-[13px] font-500 text-qgray">
                {langCntnt && langCntnt.Get_Return_within}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
