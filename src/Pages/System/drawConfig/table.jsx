import React, { useLayoutEffect, useState } from "react";
import TableComp from '@/Components/Table'
import { mergeClassName } from "@/utils/base";
import styleScope from "./index.module.less";
import { UpdateWithdrawConfigInterFace, FindWithdrawConfigInterFace } from "@/api";
import { InputNumber, Typography, Form, ConfigProvider, message } from "antd";
import { formatUnit } from "@/utils/base.ts";
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
    const row = await form.validateFields()
    let newData = {
      ...crt,
      maxWithdrawAmount: +row.maxWithdrawAmount ?? +crt.maxWithdrawAmount,
      minWithdrawAmount: +row.minWithdrawAmount ?? +crt.minWithdrawAmount,
      transferFee: +row.transferFee ?? +crt.transferFee,
    }
    UpdateWithdrawConfigInterFace(newData).then(res => {
      if (res.status) {
        data[index] = newData
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
      title: "资产类型",
      key: "currencyId",
      dataIndex: "currencyId",
      responsive: ["xl"],
      ellipsis: true,
      align: "center",
      render: (_, { currencyId, currencyChain }) => formatUnit(currencyId, currencyChain).type
    },


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
      title: "提币手续费",
      key: "withdrawFee",
      dataIndex: "withdrawFee",
      responsive: ["xl"],
      ellipsis: true,
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? editorEl(_, record, 'withdrawFee', 'center') : defaultEl(_, record, 'withdrawFee', 'center')
      }
    },
    {
      title: "最小提币数量USDT",
      key: "minWithdrawAmount",
      dataIndex: "minWithdrawAmount",
      responsive: ["xl"],
      ellipsis: true,
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? editorEl(_, record, 'minWithdrawAmount', 'center') : defaultEl(_, record, 'minWithdrawAmount', 'center')
      }
    },
    {
      title: "最大提币数量USDT",
      key: "maxWithdrawAmount",
      dataIndex: "maxWithdrawAmount",
      responsive: ["xl"],
      ellipsis: true,
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? editorEl(_, record, 'maxWithdrawAmount', 'center') : defaultEl(_, record, 'maxWithdrawAmount', 'center')
      }
    },
    {
      title: "转账矿工费用(推荐费用)",
      key: "transferFee",
      dataIndex: "transferFee",
      responsive: ["xl"],
      ellipsis: true,
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? editorEl(_, record, 'transferFee', 'center') : defaultEl(_, record, 'transferFee', 'center')
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
        <InputNumber min={0} size="small" className="mx-[.1rem]" defaultValue={_} />
      </div>
    </Form.Item>
  }
  let defaultEl = (_, record, key, site) => {
    return <div className="flex items-center">
      <div className="w-full">
        <span>{record[key] == 0 ? 0 : (record[key] ?? "--")}</span>
      </div>
    </div>
  }
  function getTableList() {
    FindWithdrawConfigInterFace().then(res => {
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
          pagination={false}
        />
      </Form>
    </ConfigProvider >
  );
};

export default TableConfig;
