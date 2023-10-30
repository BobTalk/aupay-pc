import React, { useState } from "react";
import TableComp from '@/Components/Table'
import { mergeClassName } from "@/utils/base";
import styleScope from "./index.module.less";
import { InputNumber, Typography, Form, ConfigProvider } from "antd";
import Icon from '@/Components/Icon';
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
  // 保存编辑信息
  async function submitCb(e, crt, index) {
    const row = await form.validateFields()
    let newData = data.toSpliced(index, 1, {
      ...crt,
      supplementaryMinerFees: row.supplementaryMinerFees ?? crt.supplementaryMinerFees,
    })
    setData(newData)
    setEditingKey("");
  }
  let columns = [
    {
      title: "钱包协议",
      key: "walletProtocol",
      dataIndex: "walletProtocol",
      responsive: ["xl"],
      ellipsis: true,
      align: "center",
    },


    {
      title: "地址",
      key: "tradeConfirmNum",
      dataIndex: "tradeConfirmNum",
      responsive: ["xl"],
      ellipsis: true,
      align: "center",
    },



    {
      title: "提币手续费",
      key: "supplementaryMinerFees",
      dataIndex: "supplementaryMinerFees",
      responsive: ["xl"],
      ellipsis: true,
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? editorEl(_, record, 'supplementaryMinerFees', 'center') : defaultEl(_, record, 'supplementaryMinerFees', 'center')
      }
    },

    {
      title: "操作",
      key: "operation",
      dataIndex: "operation",
      responsive: ["xl"],
      ellipsis: true,
      align: "center",
      render: (_, record, index) => {
        const editable = isEditing(record);
        return editable ? (
          <>
            <Typography.Link
              className="mr-[.2rem]"
              onClick={(e) => submitCb(e, record, index)}
            >
              <Icon className="text-[var(--blue)] mr-[.1rem]" name="h-icon-dingdan" />
              <span className="text-[var(--blue)]">确定</span>
            </Typography.Link>

          </>
        ) : (
          <>
            <Typography.Link
              className="mr-[.2rem]"
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              <Icon className="text-[var(--green)]  mr-[.1rem]" name="h-icon-bianji" />
              <span className="text-[var(--green)]">编辑</span>

            </Typography.Link>

          </>
        );
      },
    },
  ];
  let [editingKey, setEditingKey] = useState("");
  let isEditing = (record) => record.key === editingKey;
  // 编辑
  let edit = (record) => {
    setEditingKey(record.key);
  };

  let editorEl = (_, record, key, site) => {
    return <Form.Item name={key} className={mergeClassName("flex items-center mb-0", styleScope[site])} >
      <div className="w-full">
        <span className="text-[14px] text-[#333]">≤</span>
        <InputNumber size="small" className="mx-[.1rem]" defaultValue={_} />
        <span className="text-[14px] text-[#333]">则补充</span>
        <InputNumber size="small" className="mx-[.1rem]" defaultValue={_} />
      </div>
    </Form.Item>
  }
  let defaultEl = (_, record, key) => {
    return <div className="flex items-center">
      <div className="w-full">
        <span className="text-[14px] text-[#333]">≤</span>
        <InputNumber disabled size="small" className="mx-[.1rem]" defaultValue={_} />
        <span className="text-[14px] text-[#333]">则补充</span>
        <InputNumber disabled size="small" className="mx-[.1rem]" defaultValue={_} />
      </div>
    </div>
  }

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
