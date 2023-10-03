import { useState } from "react";
import DiscountBanner from "../DiscountBanner";
import Drawer from "../Mobile/Drawer";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children, childrenClasses }) {
  const [drawer, setDrawer] = useState(false);
  return (
    <>
      <Drawer open={drawer} action={() => setDrawer(!drawer)} />
      <div className="w-full overflow-x-hidden">
        <Header drawerAction={() => setDrawer(!drawer)} />
        {/* <div className={`w-full  ${childrenClasses || "pt-[30px] pb-[60px]"}`}> */}
        <div className={`w-full  ${childrenClasses || "pt-[30px] pb-[60px]"}`}>
          {children && children}
        </div>
        <DiscountBanner />
        <Footer />
      </div>
    </>
  );
}
