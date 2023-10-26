/**
 * @summary 地址
 */
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styleScope from "./index.module.less";
import TableScope from "./table-mock.jsx";
import { mergeClassName } from "@/utils/base";
import { useStopPropagation } from "@/Hooks/StopPropagation";
const NoticeList = () => {
  let [stop] = useStopPropagation();
  function toggleVisiable(e, crt, index) {
    stop(e, () => {
      console.log("crt: ", crt);
    });
  }
  return (
    <>
      <div className={styleScope["btn-box"]}>
        <Button
          type="primary"
          size="large"
          className=""
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
    </>
  );
};
export default NoticeList;
