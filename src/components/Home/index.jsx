import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../backend/reducers/prdouctSlice";
import { sellingProducts } from "../../../backend/reducers/sProductReducer";
import SectionStyleOne from "../Helpers/SectionStyleOne";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import LayoutHomeThree from "../Partials/LayoutHomeThree";
import Banner from "./Banner";
import BestSellers from "./BestSellers";
import CampaignCountDown from "./CampaignCountDown";

export default function Home() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);
  const sProducts = useSelector((state) => state.sProduct.sProducts);

  console.log(sProducts);

  // select any 6 category
  const categoryLength = 6;
  const categories = useSelector((state) => state.category.category);
  const category = categories.slice(0, categoryLength);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(sellingProducts());
  }, []);

  const brands = [];

  const [ads, setAds] = useState(false);
  const adsHandle = () => {
    setAds(false);
  };
  useEffect(() => {
    setAds(false);
  }, []);
  return (
    <>
      <LayoutHomeThree type={3} childrenClasses="pt-0">
        <Banner className="banner-wrapper mb-[60px]" />
        {/* {ads && <Ads handler={adsHandle} />} */}
        <SectionStyleOne
          products={products}
          brands={brands}
          // categoryTitle=""
          sectionTitle="Top Selling Products"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />
        {/* <BrandSection
          sectionTitle="Shop by Category"
          className="brand-section-wrapper mb-[60px]"
          category={category}
        /> */}
        <CampaignCountDown
          className="mb-[60px]"
          lastDate="2024-03-04 4:00:00"
        />
        {/* <ViewMoreTitle
          className="top-selling-product mb-[60px]"
          seeMoreUrl="/all-products"
          categoryTitle="Top Selling Products"
        >
          <SectionStyleTwo products={sProducts.slice(3, sProducts.length)} />
        </ViewMoreTitle> */}
        <ViewMoreTitle
          className="best-sallers-section mb-[60px]"
          seeMoreUrl="/sallers"
          categoryTitle="Shop by Category"
        >
          <BestSellers category={category} />
        </ViewMoreTitle>
        {/* <ProductsAds
          ads={[`/images/ads-1.png`, `/images/ads-2.png`]}
          sectionHeight="sm:h-[295px] h-full"
          className="products-ads-section mb-[60px]"
        /> */}
        <SectionStyleOne
          categoryBackground={`/images/section-category-2.jpg`}
          products={products.slice(4, products.length)}
          brands={brands}
          categoryTitle="Electronics"
          sectionTitle="Popular Sales"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />
        {/* <ProductsAds
          ads={[`/images/ads-3.png`]}
          className="products-ads-section mb-[60px]"
          sectionHeight="sm:h-[295px] h-full"
        /> */}
        <SectionStyleThree
          products={sProducts}
          sectionTitle="New Arrivals"
          seeMoreUrl="/all-products"
          className="new-products mb-[60px]"
        />
        {/* <ProductsAds
          sectionHeight="sm:h-[195px] h-full"
          ads={[`/images/ads-4.png`]}
          className="products-ads-section mb-[60px]"
        /> */}
      </LayoutHomeThree>
    </>
  );
}
