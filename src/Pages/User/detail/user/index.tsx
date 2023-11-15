/**
 * @summary 用户
 */
import { mergeClassName } from "@/utils/base";
import styleScope from "./index.module.less";
import "@/assets/style/form.less";
import TableComp from "@/Components/Table";
import { dataSource, columns } from "./table-mock.jsx";
import { DrawWhiteList, DetailAddr } from "./draw-white.jsx";
import { EmpowerList } from "./empower-app.jsx";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import { memo, useLayoutEffect, useRef, useState } from "react";
import { createStyles, useTheme } from "antd-style";
import { useLocation } from "react-router-dom";
import { GetUserDetailInterFace } from "@/api";
import { userAcountStateEnum } from "@/Enum";
const useStyle = createStyles(({ token }) => ({
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
  console.log("crtInfo: ", crtInfo);
  let [pinValidate, setPinValidate] = useState(true);
  let [userDetailInfo, useUserDetailInfo] = useState<any>({});
  let [googleCodeOpen, setGoogleCodeOpen] = useState(false);
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
  let [modalOpen, setModalOpen] = useState<Boolean>(false);
  let [messageTip, setMessageTip] = useState<Boolean>(false);
  let [formInitVal, setFormInitVal] = useState({
    googleCode: "",
  });
  function changeStatus() {
    setModalOpen(!modalOpen);
  }
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  function inputChangeCb(e, reactNode) {
    stop(e, () => {
      let val = e.target.value;
      if (val && reactNode) {
        reactNode.current.focus();
      }
    });
  }
  function inputKeyUpCb(e, prvNode) {
    let keyCode = e.keyCode;
    if (prvNode && keyCode === 8) {
      e.target.value = "";
      prvNode.current.focus();
    }
  }
  function getPageInfo(userId) {
    GetUserDetailInterFace(userId).then((res) => {
      useUserDetailInfo(res);
    });
  }
  useLayoutEffect(() => {
    getPageInfo(crtInfo.userId);
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
        <TableComp
          className="mt-[.24rem]"
          border
          dataSource={dataSource}
          columns={columns}
        />
      </div>
      <div
        className={mergeClassName(styleScope["card"], styleScope["white-list"])}
      >
        <TitleInfo title="提币白名单" isShowStatus={false} />
        {DrawWhiteList?.map((item, index) => (
          <>
            <p
              key={item + "_" + index + "A"}
              className={styleScope["white-list--title"]}
            >
              {item}
            </p>
            {DetailAddr[item].map((it, idx) => (
              <>
                <p
                  className={styleScope["white-list--addr"]}
                  key={"white" + it.address + "-" + idx + "-" + index}
                >
                  <span>【{it.title}】</span>
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
          {EmpowerList.map((item, index) => (
            <div
              key={"app" + item.id + "-" + index}
              className="flex items-center"
            >
              <img src={item.icon} alt="" />
              <div className={styleScope["info"]}>
                <p>{item.name}</p>
                <p>用户名：{item.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* PIN */}
      <ModalScope
        showFooter={true}
        onOk={() => {
          setModalOpen(!modalOpen);
          setGoogleCodeOpen(!googleCodeOpen);
        }}
        onCancel={() => setModalOpen(!modalOpen)}
        classNames={classNames}
        open={modalOpen}
        title={
          <span className="flex items-center font-normal">
            <i className={styleScope["icon"]}></i>验证PIN
          </span>
        }
      >
        <Input
          ref={inputRef1}
          maxLength={1}
          onKeyUp={(e) => inputKeyUpCb(e, undefined)}
          onChange={(e) => inputChangeCb(e, inputRef2)}
          className={styleScope["input-border"]}
          bordered={false}
        />
        <Input
          ref={inputRef2}
          onKeyUp={(e) => inputKeyUpCb(e, inputRef1)}
          onChange={(e) => inputChangeCb(e, inputRef3)}
          maxLength={1}
          className={styleScope["input-border"]}
          bordered={false}
        />
        <Input
          onKeyUp={(e) => inputKeyUpCb(e, inputRef2)}
          onChange={(e) => inputChangeCb(e, inputRef4)}
          ref={inputRef3}
          maxLength={1}
          className={styleScope["input-border"]}
          bordered={false}
        />
        <Input
          onKeyUp={(e) => inputKeyUpCb(e, inputRef3)}
          onChange={(e) => inputChangeCb(e, undefined)}
          ref={inputRef4}
          maxLength={1}
          className={styleScope["input-border"]}
          bordered={false}
        />
      </ModalScope>
      {/* google验证 */}
      <ModalScope
        classNames={classNames}
        showFooter={false}
        onOk={() => setGoogleCodeOpen(!googleCodeOpen)}
        onCancel={() => setGoogleCodeOpen(!googleCodeOpen)}
        style={modalStyles}
        title={
          <span className="flex items-center font-normal">
            <i className={styleScope["icon"]}></i>验证Google
          </span>
        }
        open={googleCodeOpen}
      >
        <Form
          layout="vertical"
          className="_reset-form w-full"
          initialValues={formInitVal}
        >
          <Form.Item
            className="hidden_start px-[.3rem]"
            label={<span className="text-[#546078]">Google验证码</span>}
            name="googleCode"
            rules={[
              {
                required: true,
                message: "请输入Google验证码",
              },
            ]}
          >
            <Input placeholder="请输入Google验证码" />
          </Form.Item>
          <Form.Item className={styleScope["btn-list"]}>
            <Button>
              <span className="text-[#999]">关闭</span>
            </Button>
            <Button type="primary">确定</Button>
          </Form.Item>
        </Form>
      </ModalScope>
      {/* 提示信息 */}
      <ModalScope
        style={modalStyles}
        showFooter={true}
        cancelText="取消"
        okText="确定"
        onOk={() => {
          setMessageTip(!messageTip);
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
          {/* 恢复账号使用状态 */}
          {/* 解冻后恢复登陆 */}
          <p className="text-center">冻结账号：海棠多度</p>
          <p className="mt-[.15rem] text-center">冻结后将无法登陆</p>
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
