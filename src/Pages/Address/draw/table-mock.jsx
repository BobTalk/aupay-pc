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
    title: '地址',
    key: 'tradeConfirmNum',
    dataIndex: 'tradeConfirmNum',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  },
  {
    title: '资产余额',
    key: 'tradeConfirmNum',
    dataIndex: 'tradeConfirmNum',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  },
  {
    title: '矿工费余额',
    key: 'tradeConfirmNum',
    dataIndex: 'tradeConfirmNum',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  },
  {
    title: '创建时间',
    key: 'tradeConfirmNum',
    dataIndex: 'tradeConfirmNum',
    responsive: ['xl'],
    ellipsis: true,
    align:'left'
  },
  
]