import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategorySection({ sectionTitle, categories, adsOne, adsTwo }) {
  return (
    <div className="category-section-wrapper w-full">
      <div className="container-x mx-auto md:py-[60px] py-[30px]">
        <div>
          <div className="section-title flex justify-between items-center mb-5">
            <div>
              <h1 className="sm:text-3xl text-xl font-600 text-qblack">
                {sectionTitle}
              </h1>
            </div>
          </div>
          <div className="w-full grid xl:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-[30px]">
            {categories.length > 0 &&
              categories
                .slice(0, categories.length > 6 ? 6 : categories.length)
                .map((item, i) => (
                  <div
                    data-aos="fade-left"
                    data-aos-delay={i + "00"}
                    key={i}
                    className="item w-full cursor-pointer group"
                  >
                    <Link
                      href={{
                        pathname: "/products",
                        query: { category: item.slug },
                      }}
                      passhref
                    >
                      <a rel="noopener noreferrer">
                        <div className="w-full h-[180px] relative rounded-[6px] bg-qpurplelow/10 border border-transparent  group-hover:border-qpurple transition duration-300 ease-in-out  flex flex-col justify-center items-center">
                          <div className="w-[80px] h-[80px] mb-5 relative transform scale-100 group-hover:scale-110 transition duration-300 ease-in-out">
                            <Image
                              layout="fill"
                              objectFit="scale-down"
                              src={
                                process.env.NEXT_PUBLIC_BASE_URL + item.image
                              }
                              alt=""
                            />
                          </div>
                          <p className="text-base text-qblack font-500 text-center group-hover:text-qpurple transition duration-300 ease-in-out">
                            {item.name}
                          </p>
                        </div>
                      </a>
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategorySection;
