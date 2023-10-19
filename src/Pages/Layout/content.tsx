import Message from "@/Components/Message";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import messageIcon from "@/assets/images/message.svg";
import styleScope from "./content.module.less";
import closeIcon from "@/assets/images/close.svg";
import { useState } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { mergeClassName } from "@/utils/base";
let { Content } = Layout;
const LayoutContent = () => {
  let [usename] = useState("Bob");
  let [showMessage, setShowMessage] = useState("");
  let [stop] = useStopPropagation();
  function close(e) {
    stop(e, () => {
      console.log("close");
      setShowMessage("hidden");
    });
  }
  return (
    <Content
    className="overflow-y-auto"
      style={{
        padding: ".16rem .24rem",
        background: "var(--gray)",
      }}
    >
      <Message
        message={
          <p className={styleScope["message"]}>
            您好！欢迎您登录<span>aupay</span>后台管理：{usename}~
          </p>
        }
        className={mergeClassName("text-[#333] mb-[.24rem]", `${showMessage}`)}
        action={<img src={closeIcon} alt="" className="cursor-pointer" onClick={close} />}
        prvIcon={<img src={messageIcon} alt="" />}
      />
      <Outlet />
    </Content>
  );
};
export default LayoutContent;
