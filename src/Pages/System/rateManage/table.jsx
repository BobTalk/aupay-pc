import React, { useLayoutEffect, useState } from "react";
import TableComp from '@/Components/Table'
import { FindCurrencyExchangeRateInterFace } from "@/api";
import { ConfigProvider } from "antd";
const TableConfig = (props) => {
  let [data, setData] = useState();

  let columns = [
    {
      title: "货币单位",
      key: "name",
      dataIndex: "name",
      responsive: ["xl"],
      ellipsis: true,
      align: "center",
    },
    {
      title: "货币缩写",
      key: "abbreviation",
      dataIndex: "abbreviation",
      responsive: ["xl"],
      ellipsis: true,
      align: "center",
    },
    {
      title: "API链接",
      key: "apiUrl",
      dataIndex: "apiUrl",
      responsive: ["xl"],
      ellipsis: true,
      align: "center",
    },
  ];
  function getTableList() {
    FindCurrencyExchangeRateInterFace().then(res => {
      setData(res?.data?.map((item, index) => (item.key = index, item)) ?? [])
    })
  }
  useLayoutEffect(() => {
    getTableList()
  }, [])
  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelHeight: 25,
            controlHeight: 25
          }
        }
      }} >
      <TableComp
        themeObj={{
          headerBorderRadius: 0,
        }}
        bordered={true}
        dataSource={data}
        columns={columns}
        pagination={false}
      />
    </ConfigProvider >
  );
};

export default TableConfig;
