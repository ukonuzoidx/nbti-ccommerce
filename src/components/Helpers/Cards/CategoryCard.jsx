import Link from "next/link";
export default function CategoryCard({ background, title, brands = [] }) {
  return (
    <Link href="#">
      <div
        className="category-card-wrappwer w-full h-full p-[30px]"
        style={{
          background: `url(${background || `/images/banner-02.jpg`}) no-repeat`,
          backgroundSize: "contain",
        }}
      >
        <div>
          <h1 className="text-base font-600 tracking-wide mb-2">{title}</h1>
          <div className="brands-list mb-[7px]">
            <ul>
              {brands.map((brand) => (
                <li key={brand + Math.random()}>
                  <Link href="/all-products">
                    <span className="text-sm text-qgray hober:text-qBlack border-b border-transparent hover:border-qblack hover:text-qblack capitalize">
                      {brand}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="flex space-x-2 items-center">
            <span className="text-qblack font-600 text-sm">Shop Now</span>
            <span>
              <svg
                width="7"
                height="11"
                viewBox="0 0 7 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2.08984"
                  y="0.636719"
                  width="6.94219"
                  height="1.54271"
                  transform="rotate(45 2.08984 0.636719)"
                  fill="#1D1D1D"
                />
                <rect
                  x="7"
                  y="5.54492"
                  width="6.94219"
                  height="1.54271"
                  transform="rotate(135 7 5.54492)"
                  fill="#1D1D1D"
                />
              </svg>
            </span>
          </div> */}
        </div>
      </div>
    </Link>
  );
}
