/**
 * @summary 地址
 */
import { SwapOutlined } from "@ant-design/icons";
import { Button, Modal, QRCode } from "antd";
import styleScope from "./index.module.less";

import TableConfig from "./table-mock.jsx";
import { mergeClassName } from "@/utils/base";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { memo, useState } from "react";
import { createStyles } from "antd-style";
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
const MinerFeesAddress = () => {
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
  let [stop] = useStopPropagation();
  let [qrCode, setQrCode] = useState(false);
  function intoCb(e, crt) {
    stop(e, () => {
      setQrCode(!qrCode);
    });
  }
  return (
    <>
      <div className={styleScope["filter-box"]}>
        <Button type="primary" size="large" icon={<SwapOutlined />}>
          转账记录
        </Button>
      </div>
      <div
        className={mergeClassName("bg-[var(--white)]", styleScope["table-box"])}
      >
        <TableConfig into={intoCb} />
      </div>
      <ModalScope
        style={modalStyles}
        showFooter={true}
        cancelText="关闭"
        okText="确定"
        onOk={() => {
          setQrCode(!qrCode);
        }}
        onCancel={() => {
          setQrCode(!qrCode);
        }}
        classNames={classNames}
        open={qrCode}
        title={
          <span className="flex items-center font-normal">
            <i className={styleScope["icon"]}></i>转入矿工费
          </span>
        }
      >
        <QRCode bordered={false} value="test" />
        <p className="text-[#222]">ETH:</p>
        <p className="text-[#222]">03xiusfosdr903xiusfosdr903xiusfos</p>
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
export default MinerFeesAddress;
