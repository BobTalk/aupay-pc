import { Input, InputNumber } from "antd";
import { useState } from "react";
export const TableDataConfig = () => {
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const EditableCell = ({ editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {
          editing ? <>{inputNode} </> : <span>sssss</span>
        }
      </td>
    )
  }
  const pagination = {
    current: 1,
    pageSize: 10,
    total: 10,
    showTotal: function (total, range) {
      return `${Math.ceil(total / range[1]) > 1 ? 1 + ' - ' + Math.ceil(total / range[1]) : 1} 页 共${total}条`
    },
    showSizeChanger: false,
    showQuickJumper: true,
  }
  const dataSource = [
    {
      key: "table1",
      assetsType: 'USDT',
      walletProtocol: 'USDT-ERC20',
      createTime: "2023.7.17 15:22:20",
      tradeType: '充币',
      num: 189,
      payAddr: '0x32983464f44',
      tradeId: '0x32983464f440x32983464f44',
      tradeConfirmNum: 87,
    },

  ]
  const columns = [
    {
      title: '钱包协议',
      key: 'walletProtocol',
      dataIndex: 'walletProtocol',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '资产类型',
      key: 'createTime',
      dataIndex: 'createTime',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },


    {
      title: '地址',
      key: 'tradeConfirmNum',
      dataIndex: 'tradeConfirmNum',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },

    {
      title: '矿工费余额',
      key: 'tradeConfirmNum',
      dataIndex: 'tradeConfirmNum',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '触发数量',
      key: 'tradeConfirmNum1',
      dataIndex: 'tradeConfirmNum1',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      editable: true,
    },
    {
      title: '补充矿工费',
      key: 'tradeConfirmNum2',
      dataIndex: 'tradeConfirmNum2',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      editable: true
    },

    {
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? <>保存</> : <><p>编辑</p></>
      }
    },
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: ['tradeConfirmNum1', 'tradeConfirmNum2'].includes(col.dataIndex) ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })
  const componentsConfig = {
    body: {
      cell: EditableCell
    }
  }
  return {
    componentsConfig,
    mergedColumns,
    dataSource,
    pagination
  }
}
