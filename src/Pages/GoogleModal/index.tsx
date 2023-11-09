import ModalScope from "@/Components/Modal";
import { Button, Form, Input } from "antd";
import styleScope from "./index.module.less";
import { useRef, useState } from "react";
const GoogleScopeComp = (props) => {
  let googleRef = useRef<any>();
  let [formInitVal] = useState({
    googleCode: "",
  });
  function googleOkCb(values) {
    props?.onFinish?.(values);
  }
  function cancelCb() {
    new Promise((resolve) => {
      resolve(props?.onCancel?.());
    }).then(() => {
      googleRef.current.resetFields(["googleCode"]);
    });
  }
  return (
    <ModalScope
      onCancel={cancelCb}
      showFooter={false}
      title={
        <span className="flex items-center font-normal">
          <i className={styleScope["icon"]}></i>验证Google
        </span>
      }
      open={props.googleCodeOpen}
    >
      <Form
        ref={googleRef}
        layout="vertical"
        className="_reset-form w-full"
        initialValues={formInitVal}
        onFinish={googleOkCb}
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
          <Button onClick={cancelCb}>
            <span className="text-[#999]">关闭</span>
          </Button>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </ModalScope>
  );
};
export default GoogleScopeComp;
