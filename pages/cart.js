import React from "react";
import PageHead from "../src/components/Helpers/PageHead";
import Layout from "../src/components/Partials/Layout";
import CardPage from "./../src/components/CartPage/index";

function cart() {
  return (
    <>
      <PageHead title="Cart" />
      <Layout childrenClasses="pt-0 pb-0">
        <CardPage />
      </Layout>
    </>
  );
}
export default cart;
