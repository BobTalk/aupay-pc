import { Button } from "antd";
import CommonEl from "../common";
import styleScope from "./index.module.less";
import greenIcon from "../images/green-icon.svg";
import blueIcon from "../images/blue-icon.svg";
import { SwapOutlined } from "@ant-design/icons";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const AssetsAddressOzbet = () => {
  let [stop] = useStopPropagation();
  let navigate = useNavigate();
  let { pathname } = useLocation();
  function transferRecordCb(e) {
    stop(e, () => {
      navigate("/aupay/ozbet/assets/transfer-records");
    });
  }
  return (
    <div className="h-full bg-[var(--white)] p-[.24rem]">
      {pathname === "/aupay/ozbet/assets/transfer-records" ? (
        <Outlet />
      ) : (
        <>
          <div className="flex py-[.24rem] justify-end">
            <Button
              type="primary"
              onClick={transferRecordCb}
              size="large"
              icon={<SwapOutlined />}
            >
              转账记录
            </Button>
          </div>
          <div className="flex gap-[.24rem]">
            <CommonEl
              src={greenIcon}
              imgClassName="flex item-center pb-[.2rem]"
              className="p-[.24rem] bg-[var(--gray)] rounded-[var(--border-radius)] min-w-[5.05rem]"
              bottom={
                <div className="grid h-full items-center ml-[.16rem] text-[#333]">
                  <p className={styleScope["type-money"]}>USDT-ERC20</p>
                  <p className="text-[22px]">152,221.00USDT</p>
                </div>
              }
            >
              <div className={styleScope["info"]}>
                <p>矿工费：</p>
                <p>91,793.00ETH</p>
                <p>地址：</p>
                <p>wrijwfnwm0isd992rsdwrijwfnwm0isd992rsd</p>
              </div>
            </CommonEl>
            <CommonEl
              src={blueIcon}
              imgClassName="flex item-center pb-[.2rem]"
              className="p-[.24rem] bg-[var(--gray)] rounded-[var(--border-radius)] min-w-[5.05rem]"
              bottom={
                <div className="grid h-full items-center ml-[.16rem] text-[#333]">
                  <p className={styleScope["type-money"]}>USDT-ERC20</p>
                  <p className="text-[22px]">152,221.00USDT</p>
                </div>
              }
            >
              <div className={styleScope["info"]}>
                <p>矿工费：</p>
                <p>91,793.00TRX</p>
                <p>地址：</p>
                <p>wrijwfnwm0isd992rsdwrijwfnwm0isd992rsd</p>
              </div>
            </CommonEl>
          </div>
        </>
      )}
    </div>
  );
};
export default AssetsAddressOzbet;
