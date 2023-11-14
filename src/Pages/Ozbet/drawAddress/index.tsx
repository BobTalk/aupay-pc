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
import {
  GetApplicaitonWithdrawWalletInfoInterFace,
  UpdateApplicationWithdrawWalletConfigInterFace,
} from "@/api";
import { useLayoutEffect, useRef, useState } from "react";
import { formatUnit } from "@/utils/base";
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
      setModuleList(
        res.data?.map((item) => {
          let { agreement, type } = formatUnit(
            item.currencyId,
            item.currencyChain
          );
          item.type = type;
          item.agreement = agreement;
          return item;
        }) ?? []
      );
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
                <CommonComp
                  {...item}
                  key={item.walletId}
                  onUpdateInfo={getModuleList}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
const CommonComp = (props) => {
  console.log("props: ", props);
  let [stop] = useStopPropagation();
  let [limitDisabled, setLimitDisabled] = useState(true);
  let [shortcutLimitDisabled, setShortcutLimitDisabled] = useState(true);
  let supplementAmountRefs = useRef<any>();
  let supplementTriggerAmountRefs = useRef<any>();
  let withdrawSettleTriggerAmountRefs = useRef<any>();
  function updateInfo(prams, fn) {
    UpdateApplicationWithdrawWalletConfigInterFace(prams).then((res) => {
      fn();
      props?.onUpdateInfo?.();
    });
  }
  function saveUpdate(e, crt, fn) {
    stop(e, () => {
      let amount1 = supplementAmountRefs.current.input.value;
      let amount2 = supplementTriggerAmountRefs.current.input.value;
      updateInfo(
        {
          ...crt,
          supplementAmount: +amount1,
          supplementTriggerAmount: +amount2,
        },
        fn
      );
    });
  }
  function updateInfo1(e, crt, fn) {
    stop(e, () => {
      let val = withdrawSettleTriggerAmountRefs.current.input.value;
      updateInfo(
        {
          ...crt,
          withdrawSettleTriggerAmount: +val,
        },
        fn
      );
    });
  }
  return (
    <CommonEl
      src={blueIcon}
      imgClassName="flex item-center pb-[.2rem]"
      className="p-[.24rem] bg-[var(--gray)] rounded-[var(--border-radius)] min-w-[5.05rem]"
      bottom={
        <div className="grid h-full items-center ml-[.16rem] text-[#333]">
          <p className={styleScope["type-money"]}>{props.agreement}</p>
          <p className="text-[22px]">
            {props.balance}
            {props.type}
          </p>
        </div>
      }
    >
      <div className={styleScope["info"]}>
        <p>矿工费：</p>
        <p>
          {props.feeBalance}
          {props.type}
        </p>
        <p>地址：</p>
        <p>{props.address}</p>
      </div>
      <div className={styleScope["config"]}>
        <p className="text-[var(--menu-color)] text-[14px]">
          提币地址额度设置:
        </p>
        <div className="flex items-center whitespace-nowrap">
          <Icon name="h-icon-xiaoyudengyu" />
          <Input
            ref={supplementTriggerAmountRefs}
            key={props.supplementTriggerAmount + "A"}
            defaultValue={props.supplementTriggerAmount}
            disabled={limitDisabled}
            className="mx-[.1rem] w-[.9rem]"
          />
          <span>则补充</span>
          <Input
            ref={supplementAmountRefs}
            key={props.supplementAmount + "B"}
            defaultValue={props.supplementAmount}
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
            <p
              onClick={(e) =>
                saveUpdate(e, props, () => {
                  setLimitDisabled(!limitDisabled);
                })
              }
              className="text-[var(--blue)] text-[14px]  cursor-pointer"
            >
              保存
            </p>
          )}
        </div>
        <p className="text-[var(--menu-color)] text-[14px]">
          快捷提款清算额度:
        </p>
        <div className="flex items-center">
          <Input
            ref={withdrawSettleTriggerAmountRefs}
            key={props.withdrawSettleTriggerAmount + "C"}
            defaultValue={props.withdrawSettleTriggerAmount}
            disabled={shortcutLimitDisabled}
            className="w-[1.64rem]"
            suffix={<span>{props.type}/笔</span>}
          />
          {shortcutLimitDisabled ? (
            <p
              onClick={() => setShortcutLimitDisabled(!shortcutLimitDisabled)}
              className="text-[var(--blue)] text-[14px] ml-[.16rem] cursor-pointer"
            >
              编辑
            </p>
          ) : (
            <p
              onClick={(e) =>
                updateInfo1(e, props, () => {
                  setShortcutLimitDisabled(!shortcutLimitDisabled);
                })
              }
              className="text-[var(--blue)] text-[14px] ml-[.16rem] cursor-pointer"
            >
              保存
            </p>
          )}
        </div>
      </div>
    </CommonEl>
  );
};
export default DrawAddressOzbet;
