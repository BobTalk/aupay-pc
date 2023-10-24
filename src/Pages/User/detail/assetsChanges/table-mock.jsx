import { EyeFilled } from "@ant-design/icons";
export const pagination = {
  current: 1,
  pageSize: 10,
  total: 10,
  showTotal: function (total, range) {
    return `${Math.ceil(total / range[1]) > 1 ? 1 + ' - ' + Math.ceil(total / range[1]) : 1} 页 共${total}条`
  },
  showSizeChanger: false,
  showQuickJumper: true,
}
export const dataSource = [
  {
    key: "table1",
    order: 'payment20210422195000001',
    merchantOrder: "payment20210422195000001",
    time: '2023.7.17 15:22:20',
    auPayUsername: 'Ozbet',
    walletProtocol: 'USDT-ERC20',
    assetsType: 'USDT',
    assetsBefore: 2300,
    tradeType: '提币',
    num: 87,
    commission: 1,
    assetsAfterAccount: 1,
    transferOutAddress: "0x32983464f440x32983464f44",
    transactionID: '0x32983464f440x32983464f44',
    transferToAddress: '2023717152220',
    status: '已完成'
  },

]
export const columns = [
  {
    title: '订单号',
    key: 'order',
    dataIndex: 'order',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: '商户订单号',
    key: 'merchantOrder',
    dataIndex: 'merchantOrder',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: '时间',
    key: 'time',
    dataIndex: 'time',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: 'auPay用户名',
    key: 'auPayUsername',
    dataIndex: 'auPayUsername',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },

  {
    title: '钱包协议',
    key: 'walletProtocol',
    dataIndex: 'walletProtocol',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: '资产类型',
    key: 'assetsType',
    dataIndex: 'assetsType',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: '账变前资产',
    key: 'assetsBefore',
    dataIndex: 'assetsBefore',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: '交易类型',
    key: 'tradeType',
    dataIndex: 'tradeType',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: '数量',
    key: 'num',
    dataIndex: 'num',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: '提币手续费',
    key: 'commission',
    dataIndex: 'commission',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: '账变后资产',
    key: 'assetsAfterAccount',
    dataIndex: 'assetsAfterAccount',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: '转出地址',
    key: 'transferOutAddress',
    dataIndex: 'transferOutAddress',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: '交易ID',
    key: 'transactionID',
    dataIndex: 'transactionID',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },


  {
    title: '转入地址',
    key: 'transferToAddress',
    dataIndex: 'transferToAddress',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: '操作',
    key: 'operate',
    dataIndex: 'operate',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left',
    render: (_, record) => (<div className='text-[var(--blue)] cursor-pointer whitespace-nowrap'>
      <EyeFilled />
      <span className='ml-[.1rem]'>区块详情</span>
    </div>),
  }
]