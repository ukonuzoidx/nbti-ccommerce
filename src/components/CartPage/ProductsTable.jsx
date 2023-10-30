import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import settings from "../../../utils/settings";
import { removeFromCart } from "../../store/Cart";
import InputQuantityCom from "../Helpers/InputQuantityCom";
import CheckProductIsExistsInFlashSale from "../Shared/CheckProductIsExistsInFlashSale";

export default function ProductsTable({ className, cartItems }) {
  const [storeCarts, setItems] = useState(null);
  const [langCntnt, setLangCntnt] = useState(null);

  const { currency_icon } = settings();
  const dispatch = useDispatch();

  const deleteItem = (id) => {
    if (id) {
      dispatch(removeFromCart(id));
    }
  };

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="relative w-full overflow-hidden overflow-x-auto border rounded border-qpurplelow/10">
        <table className="w-full text-sm text-left text-qgray dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-[13px] font-medium text-qblack bg-[#F6F6F6] whitespace-nowrap px-2 border-b border-qpurplelow/10 uppercase">
              <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
                {langCntnt && langCntnt.Product}
              </td>
              <td className="py-4 whitespace-nowrap text-center min-w-[300px]">
                {langCntnt && langCntnt.Price}
              </td>
              <td className="py-4 text-center whitespace-nowrap ">
                {langCntnt && langCntnt.quantity}
              </td>
              <td className="py-4 whitespace-nowrap  text-center min-w-[300px]">
                {langCntnt && langCntnt.total}
              </td>
              <td className="py-4 whitespace-nowrap text-right w-[114px]"></td>
            </tr>
            {/* table heading end */}
            {cartItems.length > 0 &&
              cartItems.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b border-qpurplelow/10 hover:bg-gray-50"
                >
                  <td className="pl-10  py-4  w-[380px]">
                    <div className="flex items-center space-x-6">
                      <div className="w-[80px] h-[80px] rounded overflow-hidden flex justify-center items-center border border-qpurplelow/10 relative">
                        <Image
                          layout="fill"
                          src={item.image}
                          alt="product"
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <Link
                          href={{
                            pathname: "/single-product",
                            query: { slug: item.slug },
                          }}
                        >
                          <a rel="noopener noreferrer">
                            <h1 className="font-medium text-[15px] text-qblack hover:text-qpurple">
                              {item.title}
                            </h1>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-[15px] text-qblack font-medium">
                        {
                          <CheckProductIsExistsInFlashSale
                            id={item.id}
                            price={item.price}
                          />
                        }
                      </span>
                    </div>
                  </td>
                  <td className="py-4 ">
                    <div className="flex items-center justify-center">
                      <InputQuantityCom
                        productId={item.id}
                        qyt={item.quantity}
                      />
                    </div>
                  </td>
                  <td className="text-right py-4 w-[200px]">
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-[15px] text-qblack font-medium">
                        {/* <CheckProductIsExistsInFlashSale
                          id={item.product_id}
                          price={item.totalPrice}
                        /> */}
                        {currency_icon}
                        {item.totalPrice}
                        {/*{totalPriceCalc(item)}*/}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-center space-x-1 re">
                      <span
                        onClick={() => deleteItem(item.id)}
                        className="cursor-pointer text-qgray w-2.5 h-2.5 transform scale-100 hover:scale-110 hover:text-qred transition duration-300 ease-in-out "
                      >
                        <svg
                          viewBox="0 0 10 10"
                          fill="none"
                          className="fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z" />
                        </svg>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
