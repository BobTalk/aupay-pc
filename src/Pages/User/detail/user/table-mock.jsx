import { EditOutlined } from '@ant-design/icons';
import TableComp from "@/Components/Table";
const TabelScopeComp = (props) => {
  const columns = [
    {
      title: 'aupay用户名',
      key: 'username',
      dataIndex: 'username',
      responsive: ['xl'],
      ellipsis: true,
      align: 'center'
    }, {
      title: '钱包协议',
      key: 'agreement',
      dataIndex: 'agreement',
      responsive: ['xl'],
      ellipsis: true,
      align: 'center'
    }, {
      title: '资产类型',
      key: 'type',
      dataIndex: 'type',
      responsive: ['xl'],
      ellipsis: true,
      align: 'center'
    },
    {
      title: '可用资产',
      key: 'availableBalance',
      dataIndex: 'availableBalance',
      responsive: ['xl'],
      ellipsis: true,
      align: 'center'
    },
    {
      title: '地址',
      key: 'address',
      dataIndex: 'address',
      responsive: ['xl'],
      ellipsis: true,
      align: 'center'
    },
    {
      title: '实际资产',
      key: 'realBalance',
      dataIndex: 'realBalance',
      responsive: ['xl'],
      ellipsis: true,
      align: 'center'
    },
    {
      title: '矿工费用余额',
      key: 'feeBalance',
      dataIndex: 'feeBalance',
      responsive: ['xl'],
      ellipsis: true,
      align: 'center',
      render: (_) => _ || 0
    },
    {
      title: '钱包创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      responsive: ['xl'],
      ellipsis: true,
      align: 'center'
    },
    {
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      responsive: ['xl'],
      ellipsis: true,
      render: (_, record) => (<div onClick={(e) => resetAddrCb(e, record)} className='text-[var(--green)] cursor-pointer whitespace-nowrap'>
        <EditOutlined />
        <span className='ml-[.1rem]'>重新生成地址</span>
      </div>),
      align: 'center'
    },
  ]
  function resetAddrCb(e, crt) {
    props?.onResetAddr?.(e, crt)
  }
  return <TableComp
    className="mt-[.24rem]"
    border
    dataSource={props.dataSource}
    columns={columns}
  />
}
export default TabelScopeComp