import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../../../../../utils/apiRequest";
import languageModel from "../../../../../utils/languageModel";
import DefaultUser from "../../../../contexts/DefaultUser";
import { fetchWishlist } from "../../../../store/wishlistData";
import Cart from "../../../Cart";
import SearchBox from "../../../Helpers/SearchBox";
import Compair from "../../../Helpers/icons/Compair";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import ThinPeople from "../../../Helpers/icons/ThinPeople";

export default function Middlebar({ className, type, settings }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const router = useRouter();
  const dispatch = useDispatch();
  const { wishlistData } = useSelector((state) => state.wishlistData);
  const wishlists = wishlistData && wishlistData.wishlists;
  const [profile, setProfile] = useState(false);
  const [auth, setAuth] = useState(null);
  const { compareProducts } = useSelector((state) => state.compareProducts);
  const [searchToogle, setToggle] = useState(false);
  const [user, setUser] = useState(null);
  const value = useContext(DefaultUser);
  const [defaultImage, setDefaultImage] = useState(null);
  useEffect(() => {
    setUser(value.user);
  }, [value]);
  useEffect(() => {
    if (websiteSetup) {
      if (!defaultImage) {
        setDefaultImage(websiteSetup.payload?.defaultProfile.image);
      }
    }
  }, [websiteSetup, defaultImage]);

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
  }, []);

  const profilehandler = () => {
    setProfile(!profile);
  };
  const logout = () => {
    if (auth) {
      apiRequest.logout(auth.access_token);
      localStorage.removeItem("auth");
      localStorage.removeItem("active-user");
      dispatch(fetchWishlist());
      router.push("/login");
    }
  };
  //cart
  const { products } = useSelector((state) => state.cart);

  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);

  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div className="cursor-pointer">
              {type === 3 ? (
                <Link href="/" passHref>
                  <a rel="noopener noreferrer">
                    {settings && (
                      <Image
                        width="152"
                        height="36"
                        objectFit="scale-down"
                        src={`${
                          process.env.NEXT_PUBLIC_BASE_URL + settings.logo
                        }`}
                        alt="logo"
                      />
                    )}
                  </a>
                </Link>
              ) : type === 4 ? (
                <Link href="/" passHref>
                  <a rel="noopener noreferrer">
                    {settings && (
                      <Image
                        width="152"
                        height="36"
                        objectFit="scale-down"
                        src={`${
                          process.env.NEXT_PUBLIC_BASE_URL + settings.logo
                        }`}
                        alt="logo"
                      />
                    )}
                  </a>
                </Link>
              ) : (
                <Link href="/" passHref>
                  <a rel="noopener noreferrer">
                    {settings && (
                      <Image
                        width="152"
                        height="36"
                        objectFit="scale-down"
                        src={`${
                          process.env.NEXT_PUBLIC_BASE_URL + settings.logo
                        }`}
                        alt="logo"
                      />
                    )}
                  </a>
                </Link>
              )}
            </div>
            <div className="w-[517px] h-[44px]">
              <SearchBox type={type} className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
              <div className="compaire relative">
                {auth ? (
                  <Link href="/products-compaire" passHref>
                    <a rel="noopener noreferrer">
                      <span>
                        <Compair />
                      </span>
                    </a>
                  </Link>
                ) : (
                  <Link href="/login" passHref>
                    <a rel="noopener noreferrer">
                      <span>
                        <Compair />
                      </span>
                    </a>
                  </Link>
                )}
                <span
                  className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                    type === 3 ? "bg-qh3-blue text-white" : "bg-qprimary"
                  }`}
                >
                  {compareProducts ? compareProducts.products.length : 0}
                </span>
              </div>
              <div className="favorite relative">
                <Link href="/wishlist" passHref>
                  <a rel="noopener noreferrer">
                    <span>
                      <ThinLove />
                    </span>
                  </a>
                </Link>
                <span
                  className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                    type === 3 ? "bg-qh3-blue text-white" : "bg-qprimary"
                  }`}
                >
                  {wishlists ? wishlists.data.length : 0}
                </span>
              </div>
              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <Link href="/cart" passHref>
                    <a rel="noopener noreferrer">
                      <span>
                        <ThinBag />
                      </span>
                    </a>
                  </Link>
                  <span
                    className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                      type === 3 ? "bg-qh3-blue text-white" : "bg-qprimary"
                    }`}
                  >
                    {products.length}
                  </span>
                </div>
                <Cart
                  type={type}
                  className="absolute -right-[45px] top-11 z-50 hidden group-hover:block"
                />
              </div>
              {/* <div>
                <Link href="/profile#dashboard" passHref>
                  <a rel="noopener noreferrer">
                    <span>
                      <ThinPeople />
                    </span>
                  </a>
                </Link>
              </div> */}
              {auth ? (
                <>
                  {user && (
                    <button onClick={profilehandler} type="button">
                      <div className="flex space-x-4 items-center">
                        <div className="w-[52px] h-[52px] rounded-full bg-qyellow relative overflow-hidden">
                          {user && user.image ? (
                            <Image
                              layout="fill"
                              objectFit="cover"
                              src={
                                process.env.NEXT_PUBLIC_BASE_URL + user.image
                              }
                              alt="user"
                            />
                          ) : (
                            <Image
                              layout="fill"
                              objectFit="cover"
                              src={
                                process.env.NEXT_PUBLIC_BASE_URL + defaultImage
                              }
                              alt="user"
                            />
                          )}
                        </div>
                        <div className="flex flex-col space-y-3">
                          <h3 className="text-md text-qblack font-semibold text-start leading-none">
                            {user.name}
                          </h3>
                          <p className="text-sm text-start text-qgray leading-none">
                            {user.phone}
                          </p>
                        </div>
                      </div>
                    </button>
                  )}
                </>
              ) : (
                <Link href="/login" passHref>
                  <a rel="noopener noreferrer">
                    <span className="cursor-pointer text-[#6E6D79]">
                      <ThinPeople className="fill-current" />
                    </span>
                  </a>
                </Link>
              )}
            </div>

            {profile && (
              <>
                <div
                  onClick={() => setProfile(false)}
                  className="w-full h-full fixed top-0 left-0 z-30"
                  style={{ zIndex: "35", margin: "0" }}
                ></div>
                <div
                  className="w-[208px] h-[267px] bg-white absolute right-0 top-14 z-40 border-t-[3px] border-qpurple flex flex-col justify-between rounded"
                  style={{
                    boxShadow: " 0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                  }}
                >
                  <div className="menu-item-area w-full  p-5">
                    <ul className="w-full  flex flex-col space-y-7">
                      <li className="text-base text-qgray">
                        <span className="line-clamp-1">
                          {langCntnt && langCntnt.Hi}, {auth && auth.user.name}{" "}
                        </span>
                      </li>
                      <li className="text-base text-qgray cursor-pointer hover:text-qblack hover:font-semibold">
                        <Link href="/profile#dashboard" passHref>
                          <a rel="noopener noreferrer">
                            <span className="capitalize">
                              {langCntnt && langCntnt.profile}
                            </span>
                          </a>
                        </Link>
                      </li>
                      {/* <li className="text-base text-qgray cursor-pointer hover:text-qblack hover:font-semibold">
                          <Link href="/contact" passHref>
                            <a rel="noopener noreferrer">
                              <span className="capitalize">
                                {langCntnt && langCntnt.Support}
                              </span>
                            </a>
                          </Link>
                        </li> */}
                      <li className="text-base text-qgray cursor-pointer hover:text-qblack hover:font-semibold">
                        <Link href="/faq" passHref>
                          <a rel="noopener noreferrer">
                            <span className="capitalize">
                              {langCntnt && langCntnt.FAQ}
                            </span>
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full h-10 flex justify-center items-center border-t border-qborder">
                    <button
                      onClick={logout}
                      type="button"
                      className="text-qblack text-base font-semibold"
                    >
                      {langCntnt && langCntnt.Sign_Out}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
