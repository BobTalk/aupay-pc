import { EyeFilled } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
export const pagination = {
  current: 1,
  pageSize: 5,
  total: 10,
  showTotal: function (total, range) {
    return `${Math.ceil(total / range[1]) > 1 ? 1 + ' - ' + Math.ceil(total / range[1]) : 1} 页 共${total}条`
  },
  showSizeChanger: false,
  showQuickJumper: true,
}
export const data = [
  {
    key: '1',
    aupayName: 'mini',
    email: '163@qq.com',
    userName: '小屋nidi',
    state: 1,
    availableAssets: '189',
    accountTime: '2023.7.17 15:22:20',
    OzbetUserName: 'mini',
    gameAssets: 88,
    createTime: '2023.7.17 15:22:20',
  },
  {
    key: '2',
    aupayName: 'mini',
    email: '163@qq.com',
    userName: '小屋nidi',
    state: 0,
    availableAssets: '189',
    accountTime: '2023.7.17 15:22:20',
    OzbetUserName: 'mini',
    gameAssets: 88,
    createTime: '2023.7.17 15:22:20',
  },
  {
    key: '3',
    aupayName: 'mini',
    email: '163@qq.com',
    userName: '小屋nidi',
    state: 1,
    availableAssets: '189',
    accountTime: '2023.7.17 15:22:20',
    OzbetUserName: 'mini',
    gameAssets: 88,
    createTime: '2023.7.17 15:22:20',
  },
  {
    key: '4',
    aupayName: 'mini',
    email: '163@qq.com',
    userName: '小屋nidi',
    state: 0,
    availableAssets: '189',
    accountTime: '2023.7.17 15:22:20',
    OzbetUserName: 'mini',
    gameAssets: 88,
    createTime: '2023.7.17 15:22:20',
  },
  {
    key: '5',
    aupayName: 'mini',
    email: '163@qq.com',
    userName: '小屋nidi',
    state: 1,
    availableAssets: '189',
    accountTime: '2023.7.17 15:22:20',
    OzbetUserName: 'mini',
    gameAssets: 88,
    createTime: '2023.7.17 15:22:20',
  },
  {
    key: '6',
    aupayName: 'mini',
    email: '163@qq.com',
    userName: '小屋nidi',
    state: 0,
    availableAssets: '189',
    accountTime: '2023.7.17 15:22:20',
    OzbetUserName: 'mini',
    gameAssets: 88,
    createTime: '2023.7.17 15:22:20',
  },
  {
    key: '7',
    aupayName: 'mini',
    email: '163@qq.com',
    userName: '小屋nidi',
    state: 1,
    availableAssets: '189',
    accountTime: '2023.7.17 15:22:20',
    OzbetUserName: 'mini',
    gameAssets: 88,
    createTime: '2023.7.17 15:22:20',
  },
  {
    key: '8',
    aupayName: 'mini',
    email: '163@qq.com',
    userName: '小屋nidi',
    state: 0,
    availableAssets: '189',
    accountTime: '2023.7.17 15:22:20',
    OzbetUserName: 'mini',
    gameAssets: 88,
    createTime: '2023.7.17 15:22:20',
  },
  {
    key: '9',
    aupayName: 'mini',
    email: '163@qq.com',
    userName: '小屋nidi',
    state: 1,
    availableAssets: '189',
    accountTime: '2023.7.17 15:22:20',
    OzbetUserName: 'mini',
    gameAssets: 88,
    createTime: '2023.7.17 15:22:20',
  },
  {
    key: '10',
    aupayName: 'mini',
    email: '163@qq.com',
    userName: '小屋nidi',
    state: 0,
    availableAssets: '189',
    accountTime: '2023.7.17 15:22:20',
    OzbetUserName: 'mini',
    gameAssets: 88,
    createTime: '2023.7.17 15:22:20',
  },
]
export const columns = [
  {
    title: 'aupay用户名',
    key: 'aupayName',
    dataIndex: 'aupayName',
    responsive: ['xxl']
  },
  {
    title: '邮箱',
    key: 'email',
    dataIndex: 'email',
    responsive: ['xxl']
  },
  {
    title: '用户昵称',
    key: 'userName',
    dataIndex: 'userName',
    responsive: ['xxl']
  },
  {
    title: '账户状态',
    key: 'state',
    dataIndex: 'state',
    render: (text, record, rowIndex) => {
      if (text === 1) {
        return '使用中'
      }
      return <span className='text-[var(--pink)]'>已冻结</span>
    },
    responsive: ['xxl']
  },
  {
    title: '可用资产USDT',
    key: 'availableAssets',
    dataIndex: 'availableAssets',
    responsive: ['xxl']
  },
  {
    title: '开户时间',
    key: 'accountTime',
    dataIndex: 'accountTime',
    responsive: ['xxl']
  },
  {
    title: 'Ozbet用户名',
    key: 'OzbetUserName',
    dataIndex: 'OzbetUserName',
    responsive: ['xxl']
  },
  {
    title: '游戏资产OZC',
    key: 'gameAssets',
    dataIndex: 'gameAssets',
    responsive: ['xxl']
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    responsive: ['xxl']
  },
  {
    title: '操作',
    key: 'operation',
    dataIndex: 'operation',
    responsive: ['xxl'],
    render: (_, record) => (<div className='text-[var(--blue)] cursor-pointer'>
      <EyeFilled />
      <NavLink className='ml-[.1rem] hover:text-[var(--blue)] text-[var(--blue)] ' to="/aupay/user/detail/user">查看</NavLink>
    </div>)
  },
]