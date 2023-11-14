import { Button } from "antd";
import CommonEl from "../common";
import styleScope from "./index.module.less";
import { SwapOutlined } from "@ant-design/icons";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLayoutEffect, useRef, useState } from "react";
import { GetApplicaitonAssetsWalletInfoInterFace } from "@/api";
import store from "@/store";
import { formatUnit } from "@/utils/base";
const AssetsAddressOzbet = () => {
  let [stop] = useStopPropagation();
  let navigate = useNavigate();
  let [moduleList, setModuleList] = useState([]);
  let { pathname } = useLocation();
  let [btnHeight, setBtnHeight] = useState();
  let btnRefs = useRef<any>();
  function transferRecordCb(e) {
    stop(e, () => {
      store.dispatch({
        type: "ADD_BREADCRUMB",
        data: [
          {
            title: "Ozbet",
          },
          {
            title: "Ozbet资产地址",
            href: "/aupay/ozbet/assets",
          },
          {
            title: "转账记录",
          },
        ],
      });
      navigate("/aupay/ozbet/assets/transfer-records");
    });
  }
  function getModuleList() {
    GetApplicaitonAssetsWalletInfoInterFace().then((res) => {
      let formatArr =
        res?.data?.map((item) => {
          let { agreement, type } = formatUnit(
            item.currencyId,
            item.currencyChain
          );
          item.icon = type;
          item.title = agreement;
          return item;
        }) ?? [];
      console.log("formatArr: ", formatArr);
      setModuleList(formatArr);
    });
  }
  useLayoutEffect(() => {
    if (pathname !== "/aupay/ozbet/assets/transfer-records") {
      let { height } = btnRefs.current.getBoundingClientRect();
      setBtnHeight(height);
      getModuleList();
    }
  }, []);
  return (
    <div className="h-full bg-[var(--white)] p-[.24rem]">
      {pathname === "/aupay/ozbet/assets/transfer-records" ? (
        <Outlet />
      ) : (
        <>
          <div className="flex py-[.24rem] justify-end" ref={btnRefs}>
            <Button
              type="primary"
              onClick={transferRecordCb}
              size="large"
              icon={<SwapOutlined />}
            >
              转账记录
            </Button>
          </div>
          <div
            style={{
              height: `calc(100% - ${btnHeight}px)`,
            }}
            className="overflow-auto"
          >
            <div className="flex gap-[.24rem] flex-wrap">
              {moduleList.map((item) => (
                <CommonComp {...item} key={item.walletId} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
const CommonComp = (props) => {
  return (
    <CommonEl
      key={props.address}
      src={`h-icon-${props.icon}`}
      imgClassName="flex item-center pb-[.2rem]"
      className="p-[.24rem] bg-[var(--gray)] rounded-[var(--border-radius)] min-w-[5.05rem]"
      bottom={
        <div className="grid place-items-center ml-[.16rem] text-[#333]">
          <p className={styleScope["type-money"]}>{props.title}</p>
          <p className="text-[22px]">{props.balance}USDT</p>
        </div>
      }
    >
      <div className={styleScope["info"]}>
        <p>矿工费：</p>
        <p>
          {props.feeBalance}
          {props.icon}
        </p>
        <p>地址：</p>
        <p>{props.address}</p>
      </div>
    </CommonEl>
  );
};
export default AssetsAddressOzbet;
