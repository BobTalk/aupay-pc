import { LockOutlined, UnlockOutlined, DeleteOutlined } from '@ant-design/icons';
import TableComp from "@/Components/Table";
import { useEffect, useState } from 'react';
import { FindAdminIpInterFace } from "@/api";
const TableScope = (props) => {
  function deleteCb(e, crt) {
    props?.onDelete(e, crt, '删除IP地址')
  }
  function disableCb(e, crt) {
    props?.onDisableCb(e, crt, '禁用IP地址')
  }
  function enableCb(e, crt) {
    props?.onEnableCb(e, crt, '启用IP地址')
  }
  let [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
    showTotal: function (total, range) {
      return `${Math.ceil(total / range[1]) > 1 ? 1 + ' - ' + Math.ceil(total / range[1]) : 1} 页 共${total}条`
    },
    showSizeChanger: false,
    showQuickJumper: true,
  })
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
      title: '编号',
      key: 'assetsType',
      dataIndex: 'assetsType',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left'
    },
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
      title: '员工ID',
      key: 'num',
      dataIndex: 'num',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },

    {
      title: '操作',
      key: 'tradeConfirmNum',
      dataIndex: 'tradeConfirmNum',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_, record) => {
        return <div className='flex items-center gap-[.2rem]'>
          {true ?
            <div className='text-[var(--pink)] cursor-pointer' onClick={(e) => { disableCb(e, record) }}>
              <LockOutlined className='mr-[.1rem]' />已禁用
            </div>
            : <div className='text-[var(--green)] cursor-pointer' onClick={(e) => { enableCb(e, record) }}>
              <UnlockOutlined className='mr-[.1rem]' /> 已开启
            </div>
          }
          <div className='text-[var(--menu-color)] cursor-pointer' onClick={(e) => { deleteCb(e, record) }}>
            <DeleteOutlined className='mr-[.1rem]' />删除
          </div>
        </div>
      }
    },
  ]
  function getTableList() {
    FindAdminIpInterFace({
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      conditions: {}
    }).then(res => {
      console.log('res: ', res);
    })
  }
  useEffect(() => {
    getTableList()
   }, [])
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