import Message from "@/Components/Message";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import messageIcon from "@/assets/images/message.svg";
import siteIcon from "@/assets/images/site.svg";
import styleScope from "./content.module.less";
import closeIcon from "@/assets/images/close.svg";
import { useEffect, useRef, useState } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { getSession, mergeClassName } from "@/utils/base";
import store from "@/store";
console.log('store: ', store);
let { Content } = Layout;
const LayoutContent = () => {
  let messageRefs = useRef<any>({});
  let [contentH, setContentH] = useState(0);
  let userInfo = getSession("userInfo");
  let [usename] = useState(() => userInfo["adminId"]);
  let [showMessage, setShowMessage] = useState("");
  let [stop] = useStopPropagation();
  function close(e) {
    stop(e, () => {
      setShowMessage("hidden");
    });
  }
  useEffect(() => {
    let { height } = messageRefs.current.getBoundingClientRect();
    setContentH(height);
  }, []);
  function crtSite(){
    store.dispatch({type:'ADD_BREADCRUMB', data:['资产统计']})
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
        ref={messageRefs}
        message={
          <p className={styleScope["message"]}>
            您好！欢迎您登录<span>aupay</span>后台管理：{usename}~
          </p>
        }
        className={mergeClassName("text-[#333] mb-[.24rem]", `${showMessage}`)}
        action={
          <img
            src={closeIcon}
            alt=""
            className="cursor-pointer"
            onClick={close}
          />
        }
        prvIcon={<img src={messageIcon} alt="" />}
        showIcon={true}
      />
      <Message
        ref={messageRefs}
        message={
          <div className={styleScope["message"]}>
            <span className="!text-[#AAA]" onClick={crtSite}>当前位置：</span>
            
          </div>
        }
        className="text-[#333] mb-[.24rem] bg-[#FFF]"
        prvIcon={<img src={siteIcon} alt="" />}
        showIcon={true}
      />
      <div
        style={{
          height: `calc(100% - ${contentH}px - 0.32rem)`,
        }}
      >
        <Outlet />
      </div>
    </Content>
  );
};
export default LayoutContent;
