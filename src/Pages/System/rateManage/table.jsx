import React, { useState } from "react";
import TableComp from '@/Components/Table'
import { Form, ConfigProvider } from "antd";
const TableConfig = (props) => {
  const [form] = Form.useForm();
  function into(e, crt) {
    props.into?.(e, crt)
  }
  let [data, setData] = useState([
    {
      key: "table1",
      assetsType: "USDT",
      walletProtocol: "USDT-ERC20",
      createTime: "2023.7.17 15:22:20",
      tradeType: "充币",
      num: 189,
      payAddr: "0x32983464f44",
      tradeId: "0x32983464f440x32983464f44",
      tradeConfirmNum: 87,
      supplementaryMinerFees: 89,
    },
    {
      key: "table12",
      assetsType: "USDT",
      walletProtocol: "USDT-ERC20",
      createTime: "2023.7.17 15:22:20",
      tradeType: "充币",
      num: 189,
      payAddr: "0x32983464f44",
      tradeId: "0x32983464f440x32983464f44",
      tradeConfirmNum: 87,
      supplementaryMinerFees: 89,
    },
  ]);

  let columns = [
    {
      title: "货币单位",
      key: "walletProtocol",
      dataIndex: "walletProtocol",
      responsive: ["xl"],
      ellipsis: true,
      align: "center",
    },


    {
      title: "货币缩写",
      key: "tradeConfirmNum",
      dataIndex: "tradeConfirmNum",
      responsive: ["xl"],
      ellipsis: true,
      align: "center",
    },



    {
      title: "API链接",
      key: "drawalFee",
      dataIndex: "drawalFee",
      responsive: ["xl"],
      ellipsis: true,
      align: "center",

    },

  ];
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
      <Form form={form} component={false}>
        <TableComp
          themeObj={{
            headerBorderRadius: 0,
          }}
          bordered={true}
          dataSource={data}
          columns={columns}
          pagination={true}
        />
      </Form>
    </ConfigProvider >
  );
};

export default TableConfig;
