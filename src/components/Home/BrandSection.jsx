import Image from "next/image";

export default function BrandSection({ className, sectionTitle, category }) {

  return (
    <div data-aos="fade-up" className={`w-full ${className || ""}`}>
      <div className="container-x mx-auto">
        <div className=" section-title flex justify-between items-center mb-5">
          <div>
            <h1 className="sm:text-3xl text-xl font-600 text-qblacktext">
              {sectionTitle}
            </h1>
          </div>
        </div>
        <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2">
          <div className="item">
            <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center relative">
              <Image
                layout="fill"
                objectFit="scale-down"
                src={`/images/brand-1.png`}
                alt="logo"
              />
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}
