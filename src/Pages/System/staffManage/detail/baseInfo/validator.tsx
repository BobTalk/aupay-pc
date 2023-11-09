import ModalScope from "@/Components/Modal";
import styleScope from "./index.module.less";
import Context from "./Context.jsx";
// import { useStopPropagation } from "@/Hooks/StopPropagation";
import { Button, Form, Input } from "antd";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createStyles } from "antd-style";
import PinScopeComp from "@/Pages/PinModal";
import GoogleScopeComp from "@/Pages/GoogleModal";
const useStyle = createStyles(({ token }) => ({
  "my-modal-body": {
    display: "grid",
    gridTemplateColumns: `repeat(4, 1fr) !important`,
    gap: ".15rem",
    paddingInline: ".5rem !important",
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

const ValidatorComp = (props: any, ref: any) => {
  let publicData: any = useContext(Context);
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
  let {
    PINOpen,
    onPINOk,
    onPINCancel,
    googleCodeOpen,
    onGoogleOk,
    onGoogleCancel,
    summary,
    tipOpen,
    onTipOk,
    onTipCancel,
  } = publicData;

  return (
    <>
      {/* PIN */}
      <PinScopeComp onFinish={onPINOk} onCancel={onPINCancel} open={PINOpen} />
      {/* google验证 */}
      <GoogleScopeComp open={googleCodeOpen} onFinish={onGoogleOk} onCancel={onGoogleCancel}/>

      <ModalScope
        cancelText="取消"
        showFooter={true}
        onOk={onTipOk}
        onCancel={onTipCancel}
        open={tipOpen}
        title={
          <span className="flex items-center font-normal">
            <i className={styleScope["icon"]}></i>提示信息
          </span>
        }
      >
        {summary}
      </ModalScope>
    </>
  );
};

export default forwardRef(ValidatorComp);
