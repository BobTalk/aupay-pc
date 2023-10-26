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
  },
  
]
export const columns = [
  {
    title: '订单号',
    key: 'assetsType',
    dataIndex: 'assetsType',
    responsive: ['xl'],
    ellipsis: false,
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
    title: '资产类型',
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
    title: '目标用户名',
    key: 'payAddr',
    dataIndex: 'payAddr',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  },
  {
    title: '转出地址',
    key: 'tradeId',
    dataIndex: 'tradeId',
    responsive: ['xl'],
    ellipsis: false,
    align:'left'
  },
  {
    title: '交易ID',
    key: 'tradeConfirmNum',
    dataIndex: 'tradeConfirmNum',
    responsive: ['xl'],
    ellipsis: false,
    align:'left'
  },
  {
    title: '转入地址',
    key: 'tradeConfirmNum',
    dataIndex: 'tradeConfirmNum',
    responsive: ['xl'],
    ellipsis: false,
    align:'left'
  },
  {
    title: '地址说明',
    key: 'tradeConfirmNum',
    dataIndex: 'tradeConfirmNum',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  },
  {
    title: '完成时间',
    key: 'tradeConfirmNum',
    dataIndex: 'tradeConfirmNum',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  },
  {
    title: '状态',
    key: 'tradeConfirmNum',
    dataIndex: 'tradeConfirmNum',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  },
]