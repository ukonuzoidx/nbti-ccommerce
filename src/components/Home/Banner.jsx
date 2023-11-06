import Link from "next/link";
import { useRef } from "react";
import ShopNowHome from "../Helpers/Buttons/ShopNowHome";

export default function Banner({ className, sliders = [] }) {
  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    autoplay: true,
    fade: true,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          dots: true,
        },
      },
    ],
  };
  return (
    <>
      <div className={`w-full ${className || ""}`}>
        <div className="container-x mx-auto">
          <div className="main-wrapper w-full">
            <div className="banner-card xl:flex xl:space-x-[30px] xl:h-[600px]  mb-[30px]">
              <div
                data-aos="fade-right"
                className="xl:w-[740px] w-full h-full"
                style={{
                  backgroundImage: `url(${
                    process.env.NEXT_PUBLIC_BASE_URL + sliders[0].image
                  })`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                {sliders.length > 0 && (
                  <div className="container-x mx-auto flex items-center  h-full">
                    <div className="w-full h-full xl:flex items-center pt-20 px-10 xl:pt-0">
                      <div className="md:w-[526px] w-full">
                        <p className="md:text-[14px] text-[15px] font-medium text-qpurple mb-[7px]">
                          {sliders[0].title_one}
                        </p>
                        <h1 className="md:text-[46px] text-[25px]  font-bold text-qblack md:leading-[80px] leading-[40px] mb-[44px]">
                          {sliders[0].title_two}
                        </h1>

                        <Link href={`${sliders[0].product_slug}`} passhref>
                          <a rel="noopener noreferrer">
                            <ShopNowHome
                              className="md:w-[160px] w-[145px] h-[52px] "
                              textColor="text-black text-underline"
                            />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                data-aos="fade-left"
                className="flex-1 flex xl:flex-col flex-row mobile-visible   xl:space-y-[30px] h-full"
              >
                <div className="w-full xl:h-1/2">
                  <div
                    // className="w-full h-full"
                    className="w-full h-full relative md:bg-center"
                    style={{
                      backgroundImage: `url(${
                        process.env.NEXT_PUBLIC_BASE_URL + sliders[1].image
                      })`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    {sliders.length > 0 && (
                      <div className="container-x mx-auto flex items-center ">
                        <div className="w-full h-full xl:flex items-center pt-20 px-10 xl:pt-12">
                          <div className="md:w-[350px] w-full">
                            <p className="md:text-[10px] text-[12px] font-medium text-qpurple mb-[7px]">
                              {sliders[1].title_one}
                            </p>
                            <h1 className="md:text-[36px] text-[15px]  font-bold text-qblack md:leading-[40px] leading-[30px] mb-[20px]">
                              {sliders[1].title_two}
                            </h1>

                            <Link href={`${sliders[1].product_slug}`} passhref>
                              <a rel="noopener noreferrer">
                                <ShopNowHome
                                  className="md:w-[160px] w-[145px] h-[52px] "
                                  textColor="text-black text-underline"
                                />
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full xl:h-1/2">
                  <div
                    // className="w-full h-full"
                    className="w-full h-full relative md:bg-center"
                    style={{
                      backgroundImage: `url(${
                        process.env.NEXT_PUBLIC_BASE_URL + sliders[2].image
                      })`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    {sliders.length > 0 && (
                      <div className="container-x mx-auto flex items-center ">
                        <div className="w-full h-full xl:flex items-center pt-20 px-10 xl:pt-12">
                          <div className="md:w-[350px] w-full">
                            <p className="md:text-[10px] text-[12px] font-medium text-qpurple mb-[7px]">
                              {sliders[2].title_one}
                            </p>
                            <h1 className="md:text-[36px] text-[15px]  font-bold text-qblack md:leading-[40px] leading-[30px] mb-[20px]">
                              {sliders[2].title_two}
                            </h1>

                            <Link href={`${sliders[2].product_slug}`} passhref>
                              <a rel="noopener noreferrer">
                                <ShopNowHome
                                  className="md:w-[160px] w-[145px] h-[52px] "
                                  textColor="text-black text-underline"
                                />
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={`w-full ${className || ""}`}>
        <div className="container-x mx-auto">
          <div className="main-wrapper w-full">
            <div className="banner-card xl:flex xl:space-x-[30px] xl:h-[600px]  mb-[30px]">
              <div data-aos="fade-right" className="xl:w-[740px] w-full h-full">
                {/* <
                </>
              
                {sliders.length > 0 && (
                  <Link
                    href={{
                      pathname: "/single-product",
                      query: { slug: sliders[0].product_slug },
                    }}
                    passhref
                  >
                    <picture>
                      <source
                        media="(min-width:1025px)"
                        srcSet={`${
                          process.env.NEXT_PUBLIC_BASE_URL + sliders[0].image
                        }`}
                      />
                      <img
                        src={`${
                          process.env.NEXT_PUBLIC_BASE_URL + sliders[0].image
                        }`}
                        alt=""
                        className="w-full max-w-full h-auto object-cover"
                      />
                    </picture>
                  </Link>
                )}
              </div>
              <div
                data-aos="fade-left"
                className="flex-1 flex xl:flex-col flex-row  xl:space-y-[30px] h-full"
              >
                <div className="w-full xl:h-1/2">
                  {sliders.length > 0 && (
                    <Link
                      href={{
                        pathname: "/single-product",
                        query: { slug: sliders[1].product_slug },
                      }}
                      passhref
                    >
                      <img
                        src={`${
                          process.env.NEXT_PUBLIC_BASE_URL + sliders[1].image
                        }`}
                        alt=""
                        className="w-full h-full"
                      />
                    </Link>
                  )}
                </div>
                <div className="w-full xl:h-1/2">
                  {sliders.length > 0 && (
                    <Link
                      href={{
                        pathname: "/single-product",
                        query: { slug: sliders[2].product_slug },
                      }}
                      passhref
                    >
                      <img
                        src={`${
                          process.env.NEXT_PUBLIC_BASE_URL + sliders[2].image
                        }`}
                        alt=""
                        className="w-full h-full"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
