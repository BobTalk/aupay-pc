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
    aupayOrder: 'payment20210422195000001',
    OzbetOrder: "payment20210422195000001",
    createTime: '2023.7.17 15:22:20',
    app: 'Ozbet',
    username: 'mini',
    walletProtocol: "USDT-ERC20",
    assetsType: 'USDT',
    tradeType: '快捷支付',
    num: 87,
    tradeDesc: 'Ozbet充值',
    payAddr: '0x32983464f440x32983464f44',
    collectionMoneyAddr: '0x32983464f440x32983464f44',
    completeTime: '2023.7.17 15:22:20',
    status: '已完成'
  },

]
export const columns = [
  {
    title: 'aupay订单号',
    key: 'aupayOrder',
    dataIndex: 'aupayOrder',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: 'Ozbet订单号',
    key: 'OzbetOrder',
    dataIndex: 'OzbetOrder',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: '应用',
    key: 'app',
    dataIndex: 'app',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: '用户名',
    key: 'username',
    dataIndex: 'username',
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
    title: '商品说明',
    key: 'tradeDesc',
    dataIndex: 'tradeDesc',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: '付款地址',
    key: 'payAddr',
    dataIndex: 'payAddr',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },
  {
    title: '收款地址',
    key: 'collectionMoneyAddr',
    dataIndex: 'collectionMoneyAddr',
    responsive: ['xl'],
    ellipsis: false,
    align: 'left'
  },


  {
    title: '完成时间',
    key: 'completeTime',
    dataIndex: 'completeTime',
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
  }
]