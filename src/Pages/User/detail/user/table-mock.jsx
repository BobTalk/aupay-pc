import { EditOutlined } from '@ant-design/icons';
export const dataSource = [
  {
    key:1,
    aupayName: 'mini',
    walletProtocol: 'TRX',
    assetsType: "TRX",
    availableAssets: 11,
    addr: '03xiusfosdr9',
    realAssets: 10,
    pikMenBalance: 99999,
    walletCreateTime: '2023.7.20 11:10:09'
  },
  {
    key:1,
    aupayName: 'mini',
    walletProtocol: 'USDT-ERC20',
    assetsType: "USDT-ERC20",
    availableAssets: 11,
    addr: '03xiusfosdr9',
    realAssets: 10,
    pikMenBalance: 99999,
    walletCreateTime: '2023.7.20 11:10:09'
  },
  {
    key:1,
    aupayName: 'mini',
    walletProtocol: 'BTC',
    assetsType: "BTC",
    availableAssets: 11,
    addr: '03xiusfosdr9',
    realAssets: 10,
    pikMenBalance: 99999,
    walletCreateTime: '2023.7.20 11:10:09'
  },
  {
    key:1,
    aupayName: 'mini',
    walletProtocol: 'LTC',
    assetsType: "LTC",
    availableAssets: 11,
    addr: '03xiusfosdr9',
    realAssets: 10,
    pikMenBalance: 99999,
    walletCreateTime: '2023.7.20 11:10:09'
  }
]
export const columns = [
  {
    title: 'aupay用户名',
    key: 'aupayName',
    dataIndex: 'aupayName',
    responsive: ['xl'],
    ellipsis: true,
    align:'center'
  }, {
    title: '钱包协议',
    key: 'walletProtocol',
    dataIndex: 'walletProtocol',
    responsive: ['xl'],
    ellipsis: true,
    align:'center'
  }, {
    title: '资产类型',
    key: 'assetsType',
    dataIndex: 'assetsType',
    responsive: ['xl'],
    ellipsis: true,
    align:'center'
  },
  {
    title: '可用资产',
    key: 'availableAssets',
    dataIndex: 'availableAssets',
    responsive: ['xl'],
    ellipsis: true,
    align:'center'
  },
  {
    title: '地址',
    key: 'addr',
    dataIndex: 'addr',
    responsive: ['xl'],
    ellipsis: true,
    align:'center'
  },
  {
    title: '实际资产',
    key: 'realAssets',
    dataIndex: 'realAssets',
    responsive: ['xl'],
    ellipsis: true,
    align:'center'
  },
  {
    title: '矿工费用余额',
    key: 'pikMenBalance',
    dataIndex: 'pikMenBalance',
    responsive: ['xl'],
    ellipsis: true,
    align:'center'
  },
  {
    title: '钱包创建时间',
    key: 'walletCreateTime',
    dataIndex: 'walletCreateTime',
    responsive: ['xl'],
    ellipsis: true,
    align:'center'
  },
  {
    title: '操作',
    key: 'operation',
    dataIndex: 'operation',
    responsive: ['xl'],
    ellipsis: true,
    render: (_, record) => (<div className='text-[var(--green)] cursor-pointer whitespace-nowrap'>
      <EditOutlined />
      <span className='ml-[.1rem]'>重新生成地址</span>
    </div>),
    align:'center'
  },
]