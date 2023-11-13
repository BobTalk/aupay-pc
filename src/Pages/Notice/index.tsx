/**
 * @summary 公告
 */
import { PlusOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import styleScope from "./index.module.less";
import TableScope from "./table-mock.jsx";
import { getSession, mergeClassName } from "@/utils/base";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import ModalScope from "@/Components/Modal";
import { useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  DeleteAnnouncementInterFace,
  UpdateAnnouncementInterFace,
} from "@/api";
const NoticeList = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const tableRefEl = useRef<any>({ current: undefined });
  let [stop] = useStopPropagation();
  let navigate = useNavigate();
  let { pathname } = useLocation();
  let [visiable, setVisiable] = useState(false);
  let [notice, setNotice] = useState<any>({});
  function noticeToggleOkCb(...arg) {
    updateList(notice)
  }
  function updateList(notice){
    UpdateAnnouncementInterFace({
      title: notice?.title,
      content: notice?.content,
      isShow: !notice?.isShow,
      isRoll: notice?.isRoll,
      id:notice.id
    }).then((res) => {
      if (res.status) {
        message.success(res.message);
        setVisiable(!visiable);
        tableRefEl.current?.getTableInfo();
      } else {
        message.error(res.message);
      }
    });
  }
  function toggleVisiable(e, crt, index) {
    stop(e, () => {
      setNotice(crt);
      setVisiable(!visiable);
    });
  }
  function addNotice(e) {
    stop(e, () => {
      navigate("/aupay/notice/add", {
        state: { module: "add", id: getSession("userInfo").adminId },
      });
    });
  }
  function editorCb(e, crt) {
    stop(e, () => {
      navigate("/aupay/notice/editor", {
        state: {
          module: "editor",
          id: getSession("userInfo").adminId,
          crt,
        },
      });
    });
  }
  function deleteCb(e, crt) {
    stop(e, () => {
      DeleteAnnouncementInterFace(crt.id).then((res) => {
        if (res.status) {
          message.success(res.message);
          tableRefEl.current.getTableInfo();
        } else {
          message.error(res.message);
        }
      });
    });
  }
  function CheckboxCb(e, crt) {
    stop(e, () => {
      UpdateAnnouncementInterFace({
        isRoll: !crt.isRoll,
      }).then((res) => {
        if (res.status) {
          message.success(res.message);
          tableRefEl.current.getTableInfo();
        } else {
          message.error(res.message);
        }
      });
    });
  }
  return ["/aupay/notice/add", "/aupay/notice/editor"].includes(pathname) ? (
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
        <TableScope
          ref={tableRefEl}
          onEditor={editorCb}
          onDelete={deleteCb}
          onCheckbox={CheckboxCb}
          onShowOrHidden={toggleVisiable}
        />
      </div>
      <ModalScope
        showFooter={true}
        cancelText="关闭"
        okText="确定"
        onOk={noticeToggleOkCb}
        onCancel={() => setVisiable(!visiable)}
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
            {notice.isShow ? "隐藏" : "显示"}公告
          </span>
        }
      >
        <div className={styleScope["modal-box"]}>
          <p>公告标题</p>
          <span>{notice.title}</span>
          <p className="mt-[.16rem]">公告内容</p>
          <span>{notice.content}</span>
        </div>
      </ModalScope>
    </>
  );
};
export default NoticeList;
