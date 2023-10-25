import React, { useState } from "react";
import TableComp from '@/Components/Table'
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
      triggerQuantity: 87,
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
      triggerQuantity: 87,
      supplementaryMinerFees: 89,
    },
  ]);
  // 保存编辑信息
  async function submitCb(e, crt, index) {
    const row = await form.validateFields()
    let newData = data.toSpliced(index, 1, {
      ...crt,
      supplementaryMinerFees: row.supplementaryMinerFees ?? crt.supplementaryMinerFees,
      triggerQuantity: row.triggerQuantity ?? crt.triggerQuantity
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
      align: "left",
    },
    {
      title: "资产类型",
      key: "createTime",
      dataIndex: "createTime",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
    },

    {
      title: "地址",
      key: "tradeConfirmNum",
      dataIndex: "tradeConfirmNum",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
    },

    {
      title: "矿工费余额",
      key: "tradeConfirmNum",
      dataIndex: "tradeConfirmNum",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
    },
    {
      title: "触发数量",
      key: "triggerQuantity",
      dataIndex: "triggerQuantity",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? editorEl(_, record, 'triggerQuantity') : defaultEl(_, record, 'triggerQuantity')
      }
    },
    {
      title: "补充矿工费",
      key: "supplementaryMinerFees",
      dataIndex: "supplementaryMinerFees",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? editorEl(_, record, 'supplementaryMinerFees') : defaultEl(_, record, 'supplementaryMinerFees')
      }
    },

    {
      title: "操作",
      key: "operation",
      dataIndex: "operation",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
      render: (_, record, index) => {
        const editable = isEditing(record);
        return editable ? (
          <>
            <Typography.Link
              className="mr-[.2rem]"
              onClick={(e) => submitCb(e, record, index)}
            >
              <Icon className="text-[var(--green)] mr-[.1rem]" name="h-icon-dingdan" />
              <span className="text-[var(--green)]">确定</span>
            </Typography.Link>
            <Typography.Link onClick={(e) => into(e, record)}>
              <Icon className='text-[var(--blue)] mr-[.1rem]' name="h-icon-zhuanru" />
              <span className='text-[var(--blue)]'>转入</span>
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
            <Typography.Link
              onClick={(e) => into(e, record)}
            >
              <Icon className='text-[var(--blue)] mr-[.1rem]' name="h-icon-zhuanru" />
              <span className='text-[var(--blue)]'>转入</span>

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

  let editorEl = (_, record, key) => {
    return <Form.Item name={key} className="flex items-center mb-0">
      <div>
        {key == 'triggerQuantity' ?
          <Icon name='h-icon-xiaoyudengyu' /> : null
        }
        <InputNumber size="small" className="mx-[.1rem]" defaultValue={_} />
        <span>LTC</span></div>
    </Form.Item>
  }
  let defaultEl = (_, record, key) => {
    return <div className="flex items-center">
      {key == 'triggerQuantity' ?
        <Icon name='h-icon-xiaoyudengyu' /> : null
      }
      {_}
      <span>LTC</span>
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
          bordered={false}
          dataSource={data}
          columns={columns}
          pagination={true}
        />
      </Form>
    </ConfigProvider >
  );
};

export default TableConfig;
