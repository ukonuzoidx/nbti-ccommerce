import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import LoginContext from "../src/components/Contexts/LoginContexts";
import Toaster from "../src/components/Helpers/Toaster";
import DefaultLayout from "../src/components/Partials/DefaultLayout";
import MaintenanceWrapper from "../src/components/Partials/Headers/MaintenanceWrapper";
import { persistor, store } from "../src/store/store";
import "../styles/globals.css";
import "../styles/loader.css";
import "../styles/selectbox.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
//font awesome
library.add(fas, fab, far);
function MyApp({ Component, pageProps }) {
  const [loginPopup, setLoginPopup] = useState(false);
  const handlerPopup = (value) => {
    setLoginPopup(value);
  };
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LoginContext.Provider
            value={{ loginPopup: loginPopup, handlerPopup: handlerPopup }}
          >
            <DefaultLayout>
              <MaintenanceWrapper>
                <Component {...pageProps} />
              </MaintenanceWrapper>
            </DefaultLayout>
          </LoginContext.Provider>
        </PersistGate>
      </Provider>
      <Toaster />
    </>
  );
}

export default MyApp;
