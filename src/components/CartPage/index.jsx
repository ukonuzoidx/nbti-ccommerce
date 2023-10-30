import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import languageModel from "../../../utils/languageModel";
import { emptyCart } from "../../store/Cart";
import BreadcrumbCom from "../BreadcrumbCom";
import EmptyCardError from "../EmptyCardError";
import PageTitle from "../Helpers/PageTitle";
import ProductsTable from "./ProductsTable";

function CardPage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const [langCntnt, setLangCntnt] = useState(null);

  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);

  const clearCart = async () => {
    dispatch(emptyCart());
  };

  return (
    <>
      {products.length === 0 ? (
        <div className="cart-page-wrapper w-full pt-[60px] pb-[114px]">
          <div className="mx-auto container-x">
            <BreadcrumbCom
              paths={[
                { name: langCntnt && langCntnt.home, path: "/" },
                { name: langCntnt && langCntnt.cart, path: "/cart" },
              ]}
            />
            <EmptyCardError />
          </div>
        </div>
      ) : (
        <div className="cart-page-wrapper w-full bg-white  pb-[114px]">
          <div className="w-full">
            <PageTitle
              title={langCntnt && langCntnt.Your_cart}
              breadcrumb={[
                { name: langCntnt && langCntnt.home, path: "/" },
                { name: langCntnt && langCntnt.cart, path: "/cart" },
              ]}
            />
          </div>
          <div className="w-full pt-[60px]">
            <div className="mx-auto container-x">
              <ProductsTable cartItems={products} className="mb-[30px]" />
              <div className="justify-between w-full sm:flex">
                <div className="flex items-center space-x-4">
                  <button onClick={clearCart} type="button">
                    <div className="w-full mb-5 text-sm font-semibold text-qred sm:mb-0">
                      {langCntnt && langCntnt.Clear_Cart}
                    </div>
                  </button>
                  <Link href="/cart">
                    <div className="w-[140px] md:flex hidden rounded-full h-[50px] bg-[#F6F6F6] flex justify-center items-center cursor-pointer">
                      <span className="text-sm font-semibold">
                        {langCntnt && langCntnt.Update_Cart}
                      </span>
                    </div>
                  </Link>
                  <Link href="/checkout">
                    <div className="md:w-[300px]  w-1/2  h-[50px]  flex justify-center items-center cursor-pointer">
                      <div className="flex items-center justify-center w-full h-full text-white border border-transparent rounded-full transition-common bg-qpurple hover:bg-qpurplelow/10 hover:border-qpurple hover:text-qpurple">
                        <span className="text-sm font-semibold">
                          {langCntnt && langCntnt.Proceed_to_Checkout}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default CardPage;
