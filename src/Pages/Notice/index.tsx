/**
 * @summary 地址
 */
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styleScope from "./index.module.less";
import TableScope from "./table-mock.jsx";
import { mergeClassName } from "@/utils/base";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import ModalScope from "@/Components/Modal";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const NoticeList = () => {
  let [stop] = useStopPropagation();
  let navigate = useNavigate();
  let { pathname } = useLocation();
  let [visiable, setVisiable] = useState(false);
  function toggleVisiable(e, crt, index) {
    stop(e, () => {
      console.log("crt: ", crt);
      setVisiable(!visiable);
    });
  }
  function addNotice(e) {
    stop(e, () => {
      navigate("/aupay/notice/add");
    });
  }
  return pathname == "/aupay/notice/add" ? (
    <Outlet />
  ) : (
    <>
      <div className={styleScope["btn-box"]}>
        <Button
          type="primary"
          size="large"
          onClick={addNotice}
          icon={<PlusOutlined />}
        >
          新增公告
        </Button>
      </div>
      <div
        className={mergeClassName("bg-[var(--white)]", styleScope["table-box"])}
      >
        <TableScope onShowOrHidden={toggleVisiable} />
      </div>
      <ModalScope
        showFooter={true}
        cancelText="关闭"
        okText="确定"
        onOk={toggleVisiable}
        onCancel={toggleVisiable}
        open={visiable}
        style={{
          header: {
            marginBottom: ".24rem",
          },
          body: {
            gridTemplateColumns: "1fr",
            placeItems: "baseline",
            paddingInline: ".3rem",
          },
          footer: {
            marginTop: ".24rem",
          },
        }}
        title={
          <span className="flex items-center font-normal">
            <i className={styleScope["icon"]}></i>
            {true ? "隐藏" : "显示"}公告
          </span>
        }
      >
        <div className={styleScope["modal-box"]}>
          <p>公告标题</p>
          <span>我们这里是公告标题内容文字</span>
          <p className="mt-[.16rem]">公告内容</p>
          <span>
            我们这里是公告内容介绍文案我们这里是公告内容介绍文案我们这里是公告
          </span>
        </div>
      </ModalScope>
    </>
  );
};
export default NoticeList;
