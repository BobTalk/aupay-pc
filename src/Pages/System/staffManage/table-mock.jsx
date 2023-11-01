import { EyeFilled } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import TableComp from "@/Components/Table";
const TableScope = (props) => {
  function isEffectiveCb(e,crt){
    props?.onState(e, crt)
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
      title: '员工ID',
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
      title: '邮箱',
      key: 'tradeType',
      dataIndex: 'tradeType',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '联系方式',
      key: 'tradeType',
      dataIndex: 'tradeType',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '部门',
      key: 'tradeType',
      dataIndex: 'tradeType',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '创建时间',
      key: 'tradeType',
      dataIndex: 'tradeType',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '账户状态',
      key: 'tradeType',
      dataIndex: 'tradeType',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render:(_,record)=>{
        return <span onClick={(e)=>isEffectiveCb(e, record)}>{_}</span>
      }
    },
    {
      title: '创建人',
      key: 'tradeType',
      dataIndex: 'tradeType',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      responsive: ['xl'],
      render: (_, record) => (<div className='text-[var(--blue)] cursor-pointer'>
        <EyeFilled />
        <NavLink className='ml-[.1rem] hover:text-[var(--blue)] text-[var(--blue)] ' to="/aupay/system/staff-manage/detail">查看</NavLink>
      </div>)
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