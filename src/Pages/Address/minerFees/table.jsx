import React, { useLayoutEffect, useState } from "react";
import TableComp from '@/Components/Table'
import { InputNumber, Typography, Form, ConfigProvider, message } from "antd";
import Icon from '@/Components/Icon';
import { GetFeeWalletInfoInterFace, UpdateFeeWalletConfigInterFace } from "@/api";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { formatUnit } from "@/utils/base.ts";
const TableConfig = (props) => {
  let [stop] = useStopPropagation();
  const [form] = Form.useForm();
  function into(e, crt) {
    props.into?.(e, crt)
  }
  let [data, setData] = useState([]);
  // 保存编辑信息
  function submitCb(e, crt, index) {
    stop(e, async () => {
      const row = await form.validateFields()
      let crtObj = {
        ...crt,
        supplementAmount: +(row.supplementAmount ?? crt.supplementAmount),
        triggerAmount: +(row.triggerAmount ?? crt.triggerAmount)
      }
      UpdateFeeWalletConfigInterFace(crtObj).then(res => {
        if (res.status) {
          let newData = data.toSpliced(index, 1, crtObj)
          setData(newData)
          setEditingKey("");
          form.resetFields(['supplementAmount', 'triggerAmount'])
        } else {
          message.error(res.message)
        }
      })
    })
  }
  let columns = [
    {
      title: "钱包协议",
      key: "agreement",
      dataIndex: "agreement",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
    },
    {
      title: "资产类型",
      key: "type",
      dataIndex: "type",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
    },

    {
      title: "地址",
      key: "address",
      dataIndex: "address",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
    },

    {
      title: "矿工费余额",
      key: "balance",
      dataIndex: "balance",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
    },
    {
      title: "触发数量",
      key: "triggerAmount",
      dataIndex: "triggerAmount",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? editorEl(_, record, 'triggerAmount') : defaultEl(_, record, 'triggerAmount')
      }
    },
    {
      title: "补充矿工费",
      key: "supplementAmount",
      dataIndex: "supplementAmount",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? editorEl(_, record, 'supplementAmount') : defaultEl(_, record, 'supplementAmount')
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
        <span>{record.type}</span></div>
    </Form.Item>
  }
  let defaultEl = (_, record, key) => {
    return <div className="flex items-center">
      {key == 'triggerQuantity' ?
        <Icon name='h-icon-xiaoyudengyu' /> : null
      }
      {_}
      <span>{record.type}</span>
    </div>
  }
  function getTableList() {
    GetFeeWalletInfoInterFace().then(res => {
      setData(res?.data?.map(item => {
        let { agreement, type } = formatUnit(item.currencyId, item.currencyChain)
        item.agreement = agreement
        item.type = type
        item.key = item.walletId
        return item
      }) ?? [])
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
          bordered={false}
          dataSource={data}
          columns={columns}
          pagination={false}
        />
      </Form>
    </ConfigProvider >
  );
};

export default TableConfig;
