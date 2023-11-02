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
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  let [formInitVal, setFormInitVal] = useState({
    googleCode: "",
  });
  function inputChangeCb(e, reactNode) {
    let val = e.target.value;
    if (val && reactNode) {
      reactNode.current.focus();
    }
  }
  function inputKeyUpCb(e, prvNode) {
    let keyCode = e.keyCode;
    if (prvNode && keyCode === 8) {
      e.target.value = "";
      prvNode.current.focus();
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      formInitVal,
    }),
    [formInitVal]
  );
  return (
    <>
      {/* PIN */}
      <ModalScope
        cancelText="关闭"
        classNames={classNames}
        showFooter={true}
        onOk={onPINOk}
        onCancel={onPINCancel}
        open={PINOpen}
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
        showFooter={false}
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
            <Button onClick={onGoogleCancel}>
              <span className="text-[#999]">关闭</span>
            </Button>
            <Button onClick={onGoogleOk} type="primary">
              确定
            </Button>
          </Form.Item>
        </Form>
      </ModalScope>
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
