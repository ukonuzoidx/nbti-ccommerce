import Link from "next/link";
import { useRef } from "react";
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
              <div data-aos="fade-right" className="xl:w-[740px] w-full h-full">
                {/* <
                </>
              */}
                {/* if slider length is grater than zero show the first image here*/}
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
      </div>
    </>
  );
}
