/**
 * @summary 用户
 */
import { formatUnit, mergeClassName } from "@/utils/base";
import styleScope from "./index.module.less";
import "@/assets/style/form.less";

import TabelScopeComp from "./table-mock.jsx";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { Modal, message } from "antd";
import { memo, useLayoutEffect, useRef, useState } from "react";
import { createStyles } from "antd-style";
import { useLocation } from "react-router-dom";
import {
  FindUserWithdrawAddressInterFace,
  GetUserDetailInterFace,
  RegenUserAssetsWalletInterFace,
  SwitchFreezeUserInterFace,
  VerifyGoogleAuthInterFace,
  VerifyPinInterFace,
} from "@/api";
import { operationIdEnum, userAcountStateEnum } from "@/Enum";
import PinScopeComp from "@/Pages/PinModal";
import GoogleScopeComp from "@/Pages/GoogleModal";
const useStyle = createStyles(() => ({
  "my-modal-body": {
    display: "grid",
    gridTemplateColumns: `repeat(4, 1fr)`,
    gap: ".15rem",
    paddingInline: ".5rem",
    placeItems: "center",
    minHeight: ".99rem",
  },
  "my-modal-mask": {
    boxShadow: `inset 0 0 15px #fff`,
  },
  "my-modal-header": {
    borderBottom: `1px solid var(--border-color)`,
    padding: ".2rem 0.3rem",
  },
  "my-modal-footer": {
    padding: ".2rem .3rem .24rem",
    borderTop: `1px solid var(--border-color)`,
  },
  "my-modal-content": {
    padding: `0 !important`,
  },
}));
const UserDetail = () => {
  let [stop] = useStopPropagation();
  let {
    state: { crtInfo },
  } = useLocation();
  let [userDetailInfo, useUserDetailInfo] = useState<any>({});
  let [PINOpen, setPINOpen] = useState(false);
  let [googleCodeOpen, setGoogleCodeOpen] = useState(false);
  let pinToken = useRef("");
  let resetAddrInfo = useRef<any>({});
  let EmpowerList = useRef([]);
  let moduleFlag = useRef("");
  let googleToken = useRef("");
  const { styles } = useStyle();
  const classNames = {
    body: styles["my-modal-body"],
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    footer: styles["my-modal-footer"],
    content: styles["my-modal-content"],
  };
  const modalStyles = {
    header: {
      marginBottom: ".24rem",
    },
    body: {
      gridTemplateColumns: "1fr",
      padding: 0,
    },
  };
  let [messageTip, setMessageTip] = useState<Boolean>(false);
  let [drawWhiteList, setDrawWhiteList] = useState<unknown>({});
  function changeStatus() {
    pinCancelCb();
    moduleFlag.current = "acountState";
  }
  function getPageInfo(userId) {
    GetUserDetailInterFace(userId).then((res) => {
      EmpowerList.current = res?.userApplyApplications ?? []
      useUserDetailInfo(res);
    });
  }
  function pinCancelCb() {
    setPINOpen(!PINOpen);
  }
  function pinOkCb(code) {
    VerifyPinInterFace({
      pin: code,
      operationId: operationIdEnum["resetAddr"],
    }).then((res) => {
      if (res.status) {
        pinToken.current = res.data;
        setGoogleCodeOpen(!googleCodeOpen);
        setPINOpen(!PINOpen);
      } else {
        message.error(res.message);
      }
    });
  }
  function googleOkCb({ googleCode }) {
    VerifyGoogleAuthInterFace({
      googleCode,
      operationId: operationIdEnum["resetAddr"],
    })
      .then(async (res) => {
        if (moduleFlag.current == "resetAddr") {
          let { userId, currencyId, currencyChain } = resetAddrInfo.current;
          let resetRes = await RegenUserAssetsWalletInterFace(
            {
              userId,
              currencyId,
              currencyChain,
            },
            {
              "Pin-token": pinToken.current,
              "Google-Auth-Token": res.data,
            }
          );
          message[resetRes.status ? "success" : "error"](res.message);
          if (resetRes.status) {
            getPageInfo(crtInfo.userId);
            googleCancelCb();
          }
        } else {
          // 账户状态
          googleToken.current = res.data;
          setMessageTip(!messageTip);
          setGoogleCodeOpen(!googleCodeOpen);
        }
      })
      .finally(() => {
        moduleFlag.current = "";
      });
  }
  function googleCancelCb() {
    setGoogleCodeOpen(!googleCodeOpen);
  }
  // 重置地址
  function resetAddrCb(e, crt) {
    stop(e, () => {
      resetAddrInfo.current = crt;
      moduleFlag.current = "resetAddr";
      setPINOpen(!PINOpen);
    });
  }
  function tableListFormat(list = []) {
    return list.map((item) => {
      let { agreement, type } = formatUnit(item.currencyId, item.currencyChain);
      item.agreement = agreement;
      item.type = type;
      item.key = item.id;
      return item;
    });
  }
  function isFrezzOrEndisable(e) {
    stop(e, async () => {
      let frezzAcount = await SwitchFreezeUserInterFace(
        { userId: userDetailInfo.userId },
        {
          "Pin-token": pinToken.current,
          "Google-Auth-Token": googleToken.current,
        }
      );
      message[frezzAcount.status ? "success" : "error"](frezzAcount.message);
      if (frezzAcount.status) {
        useUserDetailInfo((initVal) => ({
          ...initVal,
          state: initVal.state == 1 ? 2 : 1,
        }));
        setMessageTip(!messageTip);
      }
    });
  }
  function getWhiteList(userId) {
    FindUserWithdrawAddressInterFace({ userId }).then((res) => {
      let formatList: any[] =
        res?.data?.map((item) => {
          let { agreement } = formatUnit(item.currencyId, item.currencyChain);
          item.agreement = agreement;
          return item;
        }) ?? [];
      let splitRes = formatList.reduce((prv, next) => {
        if (!prv[next.agreement]) prv[next.agreement] = [];
        prv[next.agreement].push(next);
        return prv;
      }, {});
      setDrawWhiteList(splitRes);
    });
  }
  useLayoutEffect(() => {
    getPageInfo(crtInfo.userId);
    getWhiteList(crtInfo.userId);
  }, []);
  return (
    <>
      <div className={mergeClassName(styleScope["card"])}>
        <TitleInfo
          title="用户详情"
          status={userAcountStateEnum[userDetailInfo["state"]]}
          onClick={changeStatus}
          isShowStatus={true}
        />
        <div className="flex items-start justify-between  gap-[.45rem]">
          <div className="flex-1">
            <SubTitle subTitle="基本资料" />
            <div className={styleScope["content"]}>
              <p>
                <span>用户名:</span>
                <span>活跃状态:</span>
                <span>在线状态:</span>
              </p>
              <p>
                <span>{userDetailInfo.username}</span>
                <span>{userDetailInfo.activeState ? "活跃" : "不活跃"}</span>
                <span>
                  {userDetailInfo.onlineState ? "在线" : "离线"} / 在线
                </span>
              </p>
              <p>
                <span>最近登录时间:</span>
                <span>最近登陆IP地址:</span>
              </p>
              <p>
                <span>{userDetailInfo.loginTime}</span>
                <span>{userDetailInfo.loginIp}</span>
              </p>
            </div>
          </div>
          <div className="flex-1">
            <SubTitle subTitle="账户资料" />
            <div className={styleScope["content"]}>
              <p>
                <span>用户名:</span>
                <span>联系方式:</span>
              </p>
              <p>
                <span>{userDetailInfo.username}</span>
                <span>{userDetailInfo.mobile ?? "--"}</span>
              </p>
              <p>
                <span>邮箱:</span>
                <span>注册IP地址:</span>
              </p>
              <p>
                <span>{userDetailInfo.email}</span>
                <span>{userDetailInfo.regIp}</span>
              </p>
            </div>
          </div>
          <div className="flex-1">
            <SubTitle subTitle="安全资料" />
            <div className={styleScope["content"]}>
              <p>
                <span>支付密码:</span>
                <span>谷歌验证器:</span>
              </p>
              <p>
                <span>
                  {userDetailInfo.setAssetsPassword ? "已设置" : "未设置"}
                </span>
                <span>
                  {userDetailInfo.bindGoogleAuth ? "已绑定" : "未绑定"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={mergeClassName(styleScope["card"])}>
        <TitleInfo title="资产详情" isShowStatus={false} />
        <TabelScopeComp
          onResetAddr={resetAddrCb}
          dataSource={tableListFormat(userDetailInfo.userAssets)}
        />
      </div>
      <div
        className={mergeClassName(styleScope["card"], styleScope["white-list"])}
      >
        <TitleInfo title="提币白名单" isShowStatus={false} />
        {Object.keys(drawWhiteList)?.map((item, index) => (
          <>
            <p key={item} className={styleScope["white-list--title"]}>
              {item}
            </p>
            {drawWhiteList[item].map((it, idx) => (
              <>
                <p className={styleScope["white-list--addr"]} key={it.id}>
                  <span>【{it.note}】</span>
                  <span>{it.address}</span>
                </p>
              </>
            ))}
          </>
        ))}
      </div>
      <div className={mergeClassName(styleScope["card"])}>
        <TitleInfo title="快捷支付授权应用" isShowStatus={false} />
        <div className={styleScope["app-list"]}>
          {EmpowerList?.current?.map((item, index) => (
            <div
              key={"app" + item.applicaitonId + "-" + index}
              className="flex items-center"
            >
              <img className="w-[.55rem] h-[.55rem]" src={item.applicaitonIcon} alt="" />
              <div className={styleScope["info"]}>
                <p>{item.applicaitonId}</p>
                <p>用户名：{item.applicationUsername}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* PIN */}
      <PinScopeComp onFinish={pinOkCb} onCancel={pinCancelCb} open={PINOpen} />
      {/* google验证 */}
      <GoogleScopeComp
        open={googleCodeOpen}
        onFinish={googleOkCb}
        onCancel={googleCancelCb}
      />
      {/* 提示信息 */}
      <ModalScope
        style={modalStyles}
        showFooter={true}
        cancelText="取消"
        okText="确定"
        onOk={(e) => {
          isFrezzOrEndisable(e);
        }}
        onCancel={() => {
          setMessageTip(!messageTip);
        }}
        classNames={classNames}
        open={messageTip}
        title={
          <span className="flex items-center font-normal">
            <i className={styleScope["icon"]}></i>提示信息
          </span>
        }
      >
        <div className={styleScope["tip-box"]}>
          <p className="text-center">
            {userDetailInfo["state"] == 1 ? "冻结账号" : "恢复账号使用状态"}：
            {userDetailInfo.username}
          </p>
          <p className="mt-[.15rem] text-center">
            {userDetailInfo["state"] == 1
              ? "冻结后将无法登陆"
              : "解冻后恢复登陆"}
          </p>
        </div>
      </ModalScope>
    </>
  );
};
const ModalScope = memo(
  (props: any) => {
    let [stop] = useStopPropagation();
    function okCb(e) {
      stop(e, () => {
        props?.onOk();
      });
    }
    function cancelCb(e) {
      stop(e, () => {
        props?.onCancel();
      });
    }
    return (
      <Modal
        maskClosable={false}
        open={props.open}
        onOk={okCb}
        footer={props.showFooter ? undefined : null}
        cancelText={props.cancelText}
        okText="确定"
        onCancel={cancelCb}
        title={props.title}
        classNames={props.classNames}
        styles={props.style}
      >
        {props.children}
      </Modal>
    );
  },
  (prv, next) => prv.open === next.open
);
const SubTitle = (props) => (
  <p className={styleScope["base-info"]}>
    <span className={styleScope["info-title"]}>{props.subTitle}</span>
  </p>
);
const TitleInfo = (props) => {
  let [stop] = useStopPropagation();
  function changeStatus(e) {
    stop(e, () => {
      props?.onClick();
    });
  }
  return (
    <div className="inline-size h-[.22rem] flex items-center justify-between">
      <p className={styleScope["title"]}>{props.title}</p>
      {props.isShowStatus ? (
        <p className={styleScope["state"]}>
          <span>账户状态：</span>
          <span className="cursor-pointer" onClick={changeStatus}>
            {props.status}
          </span>
        </p>
      ) : null}
    </div>
  );
};
export default UserDetail;
