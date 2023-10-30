import { LockOutlined, UnlockOutlined, DeleteOutlined } from '@ant-design/icons';
import TableComp from "@/Components/Table";
const TableScope = (props) => {
  
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
      title: 'IP地址',
      key: 'walletProtocol',
      dataIndex: 'walletProtocol',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '备注',
      key: 'createTime',
      dataIndex: 'createTime',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '添加时间',
      key: 'tradeType',
      dataIndex: 'tradeType',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '动作',
      key: 'tradeType',
      dataIndex: 'tradeType',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '员工ID',
      key: 'num',
      dataIndex: 'num',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
  ]
  return <TableComp
    themeObj={{
      headerBorderRadius: 0,
    }}
    dataSource={dataSource}
    columns={columns}
    pagination={pagination}
  />
}
export default TableScope