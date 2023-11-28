import { LockOutlined, UnlockOutlined, DeleteOutlined } from '@ant-design/icons';
import TableComp from "@/Components/Table";
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { FindAdminIpInterFace } from "@/api";
import { message } from 'antd';
import dayjs from 'dayjs';
const TableScope = (props, ref) => {
  function clickCb(pagination) {
    props?.onPaginationCb?.(pagination)
  }
  function deleteCb(e, crt) {
    props?.onDelete(e, crt, '删除IP地址')
  }
  function disableCb(e, crt) {
    props?.onDisableCb(e, crt, '启用IP地址')
  }
  function enableCb(e, crt) {
    props?.onEnableCb(e, crt, '禁用IP地址')
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
  let [dataSource, setDataSource] = useState([])
  const columns = [
    {
      title: '编号',
      key: 'id',
      dataIndex: 'id',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left'
    },
    {
      title: 'IP地址',
      key: 'ip',
      dataIndex: 'ip',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '备注',
      key: 'note',
      dataIndex: 'note',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '添加时间',
      key: 'createTime',
      dataIndex: 'createTime',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_) => _ ? dayjs(_).format("YYYY.MM.DD") : "--"
    },
    {
      title: '员工ID',
      key: 'creator',
      dataIndex: 'creator',
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
          {!record.state ?
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
  function getTableList(conditions, paginationParams) {
    FindAdminIpInterFace({
      pageNo: paginationParams?.current ?? pagination.current,
      pageSize: paginationParams?.pageSize ?? pagination.pageSize,
      conditions
    }).then(res => {
      if (res.status) {
        setDataSource(res?.data?.map(item => (item.key = item.id, item)) ?? [])
        setPagination(pagination => ({
          ...pagination,
          current: res.pageNo,
          pageSize: res.pageSize,
          total: res.total,
          showTotal: () => `${res.page} - ${res.pageTotal}页 共${res.total}条`
        }))
      } else {
        message.error(res.message)
      }
    })
  }
  function updateParmas(filterParams, paginationParams) {
    setPagination(pagination => ({
      ...pagination,
      ...paginationParams
    }))
    getTableList(filterParams, paginationParams)
  }
  useEffect(() => {
    getTableList()
  }, [])

  useImperativeHandle(ref, () => ({
    getTableList,
    updateParmas
  }), [])
  return <TableComp
    themeObj={{
      headerBorderRadius: 0,
    }}
    onChange={clickCb}
    dataSource={dataSource}
    columns={columns}
    pagination={pagination}
  />
}
export default forwardRef(TableScope)