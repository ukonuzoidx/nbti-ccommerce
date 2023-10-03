import Link from "next/link";
export default function BestSellers({ className, category }) {
  return (
    <div className={`w-full ${className || ""}`}>
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-3 grid-cols-1 xl:gap-[30px] gap-5">
        {/* show only 6 cat */}
        {category.map((cat) => (
          <div
            key={cat.id}
            data-aos="fade-left"
            data-aos-duration="500"
            className="item w-full flex flex-col items-center"
          >
            <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2 relative">
              {/* <Image
                layout="fill"
                objectFit="scale-down"
                src={`'http://127.0.0.1:8000/images/category/${cat.image}'`}
                alt=""
              /> */}
              <img
                src={`http://127.0.0.1:8000/images/category/${cat.image}`}
                alt={cat.title["en"]}
                className="w-full h-[300px] object-cover"
              />
            </div>
            <Link href="/saller-page">
              <p className="text-base font-500 text-center cursor-pointer hover:text-qyellow">
                {cat.title["en"]}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
