/**
 * @summary 地址
 */
import styleScope from "./index.module.less";
import { formatUnit } from "@/utils/base";
import { useEffect, useRef, useState } from "react";
import { GetTransferWalletWalletInfoInterFace } from "@/api";
import Icon from "@/Components/Icon";
import TransferRecord from "@/Pages/Ozbet/transferRecords";
const TransferAddr = () => {
  let [dataList, setDataList] = useState([]);
  function getList() {
    GetTransferWalletWalletInfoInterFace().then((res) => {
      setDataList(
        res?.data?.map((item) => {
          let { agreement, type,aloneFee } = formatUnit(
            item.currencyId,
            item.currencyChain,
            true
          );
          item.agreement = agreement;
          item.type = type;
          item.aloneFee=aloneFee
          return item;
        }) || []
      );
    });
  }
  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      <div className={styleScope["total-info"]}>
        {dataList.map((item) => (
          <div key={item.walletId} className="bg-[var(--white)] p-[.27rem_0.24rem] rounded-[.06rem]">
            <div className="flex items-center">
              <Icon
                purity={false}
                name={`h-icon-${item.type}`}
                style={{ fontSize: ".48rem" }}
              />
              <div className="ml-[.13rem] mr-[.53rem]">
                <p className={styleScope["type"]}>{item.agreement}</p>
                <p className={styleScope["addr"]}>
                  {item.address}
                </p>
              </div>
            </div>
            <hr className="w-full h-full bg-[var(--border-color)]" />
            <div className="ml-[.53rem] h-full flex flex-col justify-between">
              <p className="flex justify-between">
                <span className={styleScope["aseets-name"]}>实际资产</span>
                <span className={styleScope["assets-num"]}>{item.balance}{item.type}</span>
              </p>
              <p className="flex justify-between">
                <span className={styleScope["aseets-name"]}>矿工费</span>
                <span className={styleScope["assets-num"]}>{item.feeBalance}{item.aloneFee}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
     <TransferRecord/>
    </>
  );
};
export default TransferAddr;
