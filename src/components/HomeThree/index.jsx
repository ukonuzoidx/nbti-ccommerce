import SectionStyleFour from "../Helpers/SectionStyleFour";
import SectionStyleOneHmThree from "../Helpers/SectionStyleOneHmThree";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import SectionStyleTwo from "../Helpers/SectionStyleTwo";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import LayoutHomeThree from "../Partials/LayoutHomeThree";
import Banner from "./Banner";
import BrandSection from "./BrandSection";
import CampaignCountDown from "./CampaignCountDown";
import ProductsAds from "./ProductsAds";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../backend/reducers/prdouctSlice";
import { sellingProducts } from "../../../backend/reducers/sProductReducer";

export default function HomeThree() {
  // const { products } = datas;
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
  // products.forEach((product) => {
  //   brands.push(product.brand);
  // });
  return (
    <>
      <LayoutHomeThree type={3} childrenClasses="pt-0">
        <Banner className="banner-wrapper mb-[60px]" />
        <BrandSection
          type={3}
          sectionTitle="Shop by Brand"
          className="brand-section-wrapper mb-[60px]"
        />
        <SectionStyleThree
          type={3}
          products={products}
          sectionTitle="New Arrivals"
          seeMoreUrl="/all-products"
          className="new-products mb-[60px]"
        />
        <ProductsAds
          ads={[`/assets/images/ads-3.png`]}
          className="products-ads-section mb-[60px]"
        />

        <SectionStyleOneHmThree
          type={3}
          products={products}
          brands={brands}
          categoryTitle="Mobile & Tablet"
          sectionTitle="Gamer World"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />

        <ViewMoreTitle
          className="top-selling-product mb-[60px]"
          seeMoreUrl="/all-products"
          categoryTitle="Top Selling Products"
        >
          <SectionStyleTwo
            type={3}
            products={products.slice(3, products.length)}
          />
        </ViewMoreTitle>

        <ProductsAds
          ads={[`/assets/images/ads-1.png`, `/assets/images/ads-2.png`]}
          sectionHeight="sm:h-[295px] h-full"
          className="products-ads-section mb-[60px]"
        />
        <SectionStyleOneHmThree
          type={3}
          categoryBackground={`/assets/images/section-category-2.jpg`}
          products={products.slice(4, products.length)}
          brands={brands}
          categoryTitle="Electronics"
          sectionTitle="Popular Sales"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />
        <CampaignCountDown
          className="mb-[60px]"
          lastDate="2023-10-04 4:00:00"
        />
        <SectionStyleFour
          products={products}
          sectionTitle="Popular Sales"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />
      </LayoutHomeThree>
    </>
  );
}
