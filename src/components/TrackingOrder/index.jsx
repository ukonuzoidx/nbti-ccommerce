import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiRequest from "../../../utils/apiRequest";
import languageModel from "../../../utils/languageModel";
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Thumbnail from "./Thumbnail";

function TrackingOrder() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState("");
  const [date, setDate] = useState("");
  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);
  const trackOrder = () => {
    if (orderNumber) {
      apiRequest
        .orderTrack(orderNumber)
        .then((res) => {
          toast.error(res.data && res.data.message);
          console.log(res);
          if (res.data) {
            router.push(`order/${res.data.order.order_id}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Someting Wrong");
    }
  };
  return (
    <div className="tracking-page-wrapper w-full">
      <div className="page-title mb-[40px]">
        <PageTitle
          title={langCntnt && langCntnt.Track_Your_Order}
          breadcrumb={[
            { name: langCntnt && langCntnt.home, path: "/" },
            {
              name: langCntnt && langCntnt.Track_Your_Order,
              path: "/tracking-order",
            },
          ]}
        />
      </div>
      <div className="content-wrapper w-full pb-[120px]">
        <div className="container-x mx-auto">
          <h1 className="text-[22px] text-qblack font-semibold leading-9">
            {langCntnt && langCntnt.Track_Your_Order}
          </h1>
          <p className="text-[15px] text-qgray leading-8 mb-5">
            {langCntnt &&
              langCntnt.Enter_your_order_tracking_number_and_your_secret_id}
            .
          </p>
          <div
            style={{ boxShadow: "0px 15px 64px rgba(0, 0, 0, 0.05)" }}
            className="w-full bg-white rounded lg:px-[30px] px-5 py-[23px] lg:flex items-center"
          >
            <div className="lg:w-[642px] w-full">
              <div className="mb-3">
                <InputCom
                  value={orderNumber}
                  inputHandler={(e) => setOrderNumber(e.target.value)}
                  placeholder={langCntnt && langCntnt.order_number}
                  label={langCntnt && langCntnt.order_tracking_nubmer + "*"}
                  inputClasses="w-full h-[50px]"
                />
              </div>
              <div className="mb-[30px]">
                <InputCom
                  value={date}
                  inputHandler={(e) => setDate(e.target.value)}
                  placeholder="23/09/2022"
                  label={langCntnt && langCntnt.Delivery_Date}
                  inputClasses="w-full h-[50px]"
                />
              </div>

              <button onClick={trackOrder} type="button">
                <div className="w-[142px] h-[50px] transition-common bg-qpurple hover:bg-qpurplelow/10 hover:text-qpurple border border-transparent hover:border-qpurple text-white flex text-white justify-center items-center rounded">
                  <span>{langCntnt && langCntnt.Track_Now}</span>
                </div>
              </button>
            </div>
            <div className="flex-1 flex justify-center mt-5 lg:mt-0">
              <Thumbnail />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TrackingOrder;
