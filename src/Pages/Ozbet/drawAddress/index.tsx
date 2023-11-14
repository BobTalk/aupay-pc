import { Button, Input } from "antd";
import CommonEl from "../common";
import styleScope from "./index.module.less";
import greenIcon from "../images/green-icon.svg";
import blueIcon from "../images/blue-icon.svg";
import { SwapOutlined } from "@ant-design/icons";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import store from "@/store";
import Icon from "@/Components/Icon";
import { GetApplicaitonWithdrawWalletInfoInterFace } from "@/api";
import { useLayoutEffect, useRef, useState } from "react";
const DrawAddressOzbet = () => {
  let [stop] = useStopPropagation();
  let navigate = useNavigate();
  let { pathname } = useLocation();
  let [moduleList, setModuleList] = useState([]);
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
            title: "Ozbet提款地址",
            href: "/aupay/ozbet/draw",
          },
          {
            title: "转账记录",
          },
        ],
      });
      navigate("/aupay/ozbet/draw/transfer-records");
    });
  }
  function getModuleList() {
    GetApplicaitonWithdrawWalletInfoInterFace().then((res) => {
      setModuleList(res.data ?? []);
    });
  }
  useLayoutEffect(() => {
    if (pathname !== "/aupay/ozbet/draw/transfer-records") {
      let { height } = btnRefs.current.getBoundingClientRect();
      setBtnHeight(height);
      getModuleList();
    }
  }, []);
  return (
    <div className="h-full bg-[var(--white)] p-[.24rem]">
      {pathname === "/aupay/ozbet/draw/transfer-records" ? (
        <Outlet />
      ) : (
        <>
          <div ref={btnRefs} className="flex py-[.24rem] justify-end">
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
const CommonComp = () => {
  let [limitDisabled, setLimitDisabled] = useState(true);
  let [shortcutLimitDisabled, setShortcutLimitDisabled] = useState(true);
  return (
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
          <Input disabled={limitDisabled} className="mx-[.1rem] w-[.9rem]" />
          <span>则补充</span>
          <Input
            disabled={limitDisabled}
            className="mr-[.16rem] ml-[.1rem]  w-[.9rem]"
          />
          {limitDisabled ? (
            <p
              onClick={() => setLimitDisabled(!limitDisabled)}
              className="text-[var(--blue)] text-[14px]  cursor-pointer"
            >
              编辑
            </p>
          ) : (
            <p className="text-[var(--blue)] text-[14px]  cursor-pointer">
              保存
            </p>
          )}
        </div>
        <p className="text-[var(--menu-color)] text-[14px]">
          快捷提款清算额度:
        </p>
        <div className="flex items-center">
          <Input
            disabled={shortcutLimitDisabled}
            className="w-[1.64rem]"
            suffix={<span>USDT/笔</span>}
          />
          {shortcutLimitDisabled ? (
            <p className="text-[var(--blue)] text-[14px] ml-[.16rem] cursor-pointer">
              编辑
            </p>
          ) : (
            <p className="text-[var(--blue)] text-[14px] ml-[.16rem] cursor-pointer">
              保存
            </p>
          )}
        </div>
      </div>
    </CommonEl>
  );
};
export default DrawAddressOzbet;
