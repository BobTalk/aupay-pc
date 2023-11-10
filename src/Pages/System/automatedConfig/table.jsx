import React, { useLayoutEffect, useState } from "react";
import TableComp from '@/Components/Table'
import { mergeClassName } from "@/utils/base";
import styleScope from "./index.module.less";
import { formatUnit } from "@/utils/base.ts";
import { UpdateWithdrawConfigInterFace, FindWithdrawConfigInterFace } from "@/api";
import { InputNumber, Typography, Form, ConfigProvider, message } from "antd";
import Icon from '@/Components/Icon';
const TableConfig = (props) => {
  const [form] = Form.useForm();

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
    const { triggerAmount, supplementAmount } = await form.validateFields()
    crt.triggerAmount = triggerAmount ?? crt.triggerAmount
    crt.supplementAmount = supplementAmount ?? crt.supplementAmount

    UpdateWithdrawConfigInterFace(crt).then(res => {
      if (res.status) {
        setData(data)
        setEditingKey("");
        message.success(res.message)
      } else {
        message.error(res.message)
      }
    })

  }
  let columns = [
    {
      title: "钱包协议",
      key: "currencyChain",
      dataIndex: "currencyChain",
      responsive: ["xl"],
      ellipsis: true,
      align: "center",
      render: (_, { currencyId, currencyChain }) => formatUnit(currencyId, currencyChain).agreement
    },


    {
      title: "地址",
      key: "address",
      dataIndex: "address",
      responsive: ["xl"],
      ellipsis: true,
      align: "center",
      render: (_) => _ ?? "--"
    },



    {
      title: "提币手续费",
      key: "triggerAmount",
      dataIndex: "triggerAmount",
      responsive: ["xl"],
      ellipsis: true,
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? editorEl(_, record, 'center') : defaultEl(_, record, 'center')
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

  let editorEl = (_, record, site) => {
    return <div className={mergeClassName(`${styleScope[site]}`, "flex items-center")} >
      <span className="text-[14px] text-[#333]">≤</span>
      <Form.Item name='triggerAmount' className={mergeClassName("flex items-center mb-0")} >
        <InputNumber size="small" min={0} className="mx-[.1rem]" defaultValue={record["triggerAmount"]} />
      </Form.Item>
      <span className="text-[14px] text-[#333]">则补充</span>
      <Form.Item name='supplementAmount' className={mergeClassName("flex items-center mb-0", styleScope[site])} >
        <InputNumber size="small" min={0} className="mx-[.1rem]" defaultValue={record["supplementAmount"]} />
      </Form.Item>
    </div>
  }
  let defaultEl = (_, record, key) => {
    return <div className="flex items-center">
      <div className="w-full">
        <span className="text-[14px] text-[#333]">≤</span>
        <InputNumber disabled size="small" className="mx-[.1rem]" defaultValue={record["triggerAmount"]} />
        <span className="text-[14px] text-[#333]">则补充</span>
        <InputNumber disabled size="small" className="mx-[.1rem]" defaultValue={record["supplementAmount"]} />
      </div>
    </div>
  }
  function getTableList() {
    FindWithdrawConfigInterFace().then(res => {
      console.log('res: ', res);
      setData(res?.data?.map((item, idx) => (item.key = idx, item)) ?? [])
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
