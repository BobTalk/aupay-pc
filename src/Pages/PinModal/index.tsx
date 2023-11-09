import ModalScope from "@/Components/Modal";
import styleScope from "./index.module.less";
import { Button, Form, Input } from "antd";
import { useRef } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
const PinScopeComp = (props) => {
  let [stop] = useStopPropagation();
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const formRefEl = useRef<any>();
  let PINInitVal = useRef<any>({
    one: "",
    two: "",
    three: "",
    foure: "",
  });
  function pinCancelCb() {
    new Promise((resolve) => {
      resolve(props?.onCancel?.());
    }).then(() => {
      PINInitVal.current = {};
      formRefEl.current.resetFields(["one", "two", "three", "foure"]);
    });
  }
  function pinOkCb() {
    let { one, two, three, foure } = PINInitVal.current;
    new Promise((resolve) => {
      resolve(props.onFinish(`${one}${two}${three}${foure}`));
    }).then(() => {
      PINInitVal.current = {};
      formRefEl.current.resetFields(["one", "two", "three", "foure"]);
    });
  }
  function inputKeyUpCb(e, prvNode, key) {
    let keyCode = e.keyCode;
    if (keyCode === 8) {
      formRefEl.current.setFieldValue(key, "");
      prvNode?.current?.focus();
    }
  }
  function inputChange(e, reactNode, key) {
    stop(e, () => {
      let val = e.target.value;
      PINInitVal.current[key] = val;
      formRefEl.current.setFieldValue(key, "*");
      if (val && reactNode) {
        reactNode.current.focus();
      }
    });
  }
  return (
    <ModalScope
      style={{
        header: {
          marginBottom: ".24rem",
        },
        body: {
          gridTemplateColumns: "1fr",
          gap: ".15rem",
          paddingInline: "0",
        },
      }}
      onCancel={pinCancelCb}
      showFooter={false}
      open={props.modalOpen}
      title={
        <span className="flex items-center font-normal">
          <i className={styleScope["icon"]}></i>验证PIN
        </span>
      }
    >
      <div>
        <Form onFinish={pinOkCb} ref={formRefEl} initialValues={PINInitVal}>
          <div className="flex gap-[.2rem] px-[.5rem]">
            <Form.Item name="one">
              <Input
                ref={inputRef1}
                maxLength={1}
                onKeyUp={(e) => inputKeyUpCb(e, undefined, "one")}
                onChange={(e) => inputChange(e, inputRef2, "one")}
                className={styleScope["input-border"]}
                bordered={false}
              />
            </Form.Item>
            <Form.Item name="two">
              <Input
                ref={inputRef2}
                onKeyUp={(e) => inputKeyUpCb(e, inputRef1, "two")}
                onChange={(e) => inputChange(e, inputRef3, "two")}
                maxLength={1}
                className={styleScope["input-border"]}
                bordered={false}
              />
            </Form.Item>
            <Form.Item name="three">
              <Input
                onKeyUp={(e) => inputKeyUpCb(e, inputRef2, "three")}
                onChange={(e) => inputChange(e, inputRef4, "three")}
                ref={inputRef3}
                maxLength={1}
                className={styleScope["input-border"]}
                bordered={false}
              />
            </Form.Item>
            <Form.Item name="foure">
              <Input
                onKeyUp={(e) => inputKeyUpCb(e, inputRef3, "foure")}
                onChange={(e) => inputChange(e, undefined, "foure")}
                ref={inputRef4}
                maxLength={1}
                className={styleScope["input-border"]}
                bordered={false}
              />
            </Form.Item>
          </div>
          <Form.Item className="border-t border-t-[var(--border-color)] flex justify-end pt-[.2rem] pr-[.2rem]">
            <Button onClick={pinCancelCb} className="mr-[.1rem]">
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ModalScope>
  );
};

export default PinScopeComp;
