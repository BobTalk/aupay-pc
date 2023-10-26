import { Button, Input } from "antd";
import CommonEl from "../common";
import styleScope from "./index.module.less";
import greenIcon from "../images/green-icon.svg";
import blueIcon from "../images/blue-icon.svg";
import { SwapOutlined } from "@ant-design/icons";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Icon from "@/Components/Icon";
const DrawAddressOzbet = () => {
  let [stop] = useStopPropagation();
  let navigate = useNavigate();
  let { pathname } = useLocation();
  function transferRecordCb(e) {
    stop(e, () => {
      navigate("/aupay/ozbet/draw/transfer-records");
    });
  }
  return (
    <div className="h-full bg-[var(--white)] p-[.24rem]">
      {pathname === "/aupay/ozbet/draw/transfer-records" ? (
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
              <div className={styleScope["config"]}>
                <p className="text-[var(--menu-color)] text-[14px]">
                  提币地址额度设置:
                </p>
                <div className="flex items-center whitespace-nowrap">
                  <Icon name="h-icon-xiaoyudengyu" />
                  <Input className="mx-[.1rem] w-[.9rem]" />
                  <span>则补充</span>
                  <Input className="mr-[.16rem] ml-[.1rem]  w-[.9rem]" />
                  <p className="text-[var(--blue)] text-[14px]">保存</p>
                  {/* <p>编辑</p> */}
                </div>
                <p className="text-[var(--menu-color)] text-[14px]">
                  快捷提款清算额度:
                </p>
                <div className="flex items-center">
                  <Input
                    className="w-[1.64rem]"
                    suffix={<span>USDT/笔</span>}
                  />
                  <p className="text-[var(--blue)] text-[14px] ml-[.16rem]">
                    保存
                  </p>
                </div>
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
                <p>91,793.00ETH</p>
                <p>地址：</p>
                <p>wrijwfnwm0isd992rsdwrijwfnwm0isd992rsd</p>
              </div>
              <div className={styleScope["config"]}>
                <p className="text-[var(--menu-color)] text-[14px]">
                  提币地址额度设置:
                </p>
                <div className="flex items-center whitespace-nowrap">
                  <Icon name="h-icon-xiaoyudengyu" />
                  <Input className="mx-[.1rem] w-[.9rem]" />
                  <span>则补充</span>
                  <Input className="mr-[.16rem] ml-[.1rem]  w-[.9rem]" />
                  <p className="text-[var(--blue)] text-[14px]  cursor-pointer">
                    保存
                  </p>
                  {/* <p>编辑</p> */}
                </div>
                <p className="text-[var(--menu-color)] text-[14px]">
                  快捷提款清算额度:
                </p>
                <div className="flex items-center">
                  <Input
                    className="w-[1.64rem]"
                    suffix={<span>USDT/笔</span>}
                  />
                  <p className="text-[var(--blue)] text-[14px] ml-[.16rem] cursor-pointer">
                    保存
                  </p>
                </div>
              </div>
            </CommonEl>
          </div>
        </>
      )}
    </div>
  );
};
export default DrawAddressOzbet;
