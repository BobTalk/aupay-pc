import { EyeFilled } from '@ant-design/icons';
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
    key:"table1",
    assetsType: 'USDT',
    walletProtocol: 'USDT-ERC20',
    createTime: "2023.7.17 15:22:20",
    tradeType: '充币',
    num: 189,
    payAddr: '0x32983464f44',
    tradeId: '0x32983464f440x32983464f44',
    tradeConfirmNum: 87,
    collectionMoneyAddr: 0x32983464f44,
    completeTime:'2023.7.17 15:22:20',
    status:'已完成'
  },
  
]
export const columns = [
  {
    title: '资产类型',
    key: 'assetsType',
    dataIndex: 'assetsType',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  },
   {
    title: '钱包协议',
    key: 'walletProtocol',
    dataIndex: 'walletProtocol',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  }, 
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  },
  {
    title: '交易类型',
    key: 'tradeType',
    dataIndex: 'tradeType',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  },
  {
    title: '数量',
    key: 'num',
    dataIndex: 'num',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  },
  {
    title: '付款地址',
    key: 'payAddr',
    dataIndex: 'payAddr',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  },
  {
    title: '交易ID',
    key: 'tradeId',
    dataIndex: 'tradeId',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  },
  {
    title: '交易确认数',
    key: 'tradeConfirmNum',
    dataIndex: 'tradeConfirmNum',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  },
  {
    title: '收款地址',
    key: 'collectionMoneyAddr',
    dataIndex: 'collectionMoneyAddr',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  },
  {
    title: '完成时间',
    key: 'completeTime',
    dataIndex: 'completeTime',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  },
  
  {
    title: '操作',
    key: 'operation',
    dataIndex: 'operation',
    responsive: ['xl'],
    ellipsis: true,
    render: (_, record) => (<div className='text-[var(--blue)] cursor-pointer whitespace-nowrap'>
      <EyeFilled />
      <span className='ml-[.1rem]'>区块详情</span>
    </div>),
    align:'left'
  },
]