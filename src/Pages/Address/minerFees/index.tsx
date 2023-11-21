/**
 * @summary 地址
 */
import { SwapOutlined } from "@ant-design/icons";
import { Button, QRCode } from "antd";
import styleScope from "./index.module.less";

import TableConfig from "./table.jsx";
import { mergeClassName } from "@/utils/base";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { useRef, useState } from "react";
import TransferRecord from "@/Pages/Ozbet/transferRecords";
import ModalScope from "@/Components/Modal";
const MinerFeesAddress = (props) => {
  let [stop] = useStopPropagation();
  let crtInfo = useRef<any>({})
  let [qrCode, setQrCode] = useState(false);
  function intoCb(e, crt) {
    stop(e, () => {
      setQrCode(!qrCode);
      crtInfo.current = crt
    });
  }
  function recordCb(e){
    stop(e, () => {
      props?.recordCb?.()
    });
  }
  return (
    <>
      <div className={styleScope["filter-box"]}>
        <Button type="primary" onClick={recordCb} size="large" icon={<SwapOutlined />}>
          转账记录
        </Button>
      </div>
      <div
        className={mergeClassName("bg-[var(--white)]", styleScope["table-box"])}
      >
        <TableConfig into={intoCb} />
      </div>
      <ModalScope
        showFooter={true}
        cancelText="关闭"
        okText="确定"
        onOk={() => {
          setQrCode(!qrCode);
        }}
        onCancel={() => {
          setQrCode(!qrCode);
        }}
        open={qrCode}
        title={
          <span className="flex items-center font-normal">
            <i className={styleScope["icon"]}></i>转入矿工费
          </span>
        }
      >
        <QRCode bordered={false} value={crtInfo.current.address} />
        <p className="text-[#222]">{crtInfo.current.type}:</p>
        <p className="text-[#222]">{crtInfo.current.address}</p>
      </ModalScope>
    </>
  );
};
const RecordList = () => {
  return <TransferRecord/>;
};
const ChangeComp = () => {
  let [isRecord, setIsRecord] = useState(false);
  function recordCb(){
    setIsRecord(true)
  }
  return isRecord ? <RecordList /> : <MinerFeesAddress recordCb={recordCb}/>;
};
export default ChangeComp;
