import { LockOutlined, UnlockOutlined, DeleteOutlined } from '@ant-design/icons';
import TableComp from "@/Components/Table";
import { FindAdminOperationLoglistInterFace } from '@/api'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import dayjs from 'dayjs';
const TableScope = (props, ref) => {
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
  let [dataSource, setDataSource] = useState()

  const columns = [
    {
      title: '员工ID',
      key: 'adminId',
      dataIndex: 'adminId',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left'
    },
    {
      title: '操作内容',
      key: 'operationContent',
      dataIndex: 'operationContent',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: 'ip地址',
      key: 'ip',
      dataIndex: 'ip',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '操作时间',
      key: 'createTime',
      dataIndex: 'createTime',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_) => _ ? dayjs(_).format("YYYY-MM-DD HH:mm:ss") : "--"
    },
  ]
  function getTableList(conditions, paginationParams) {
    FindAdminOperationLoglistInterFace({
      pageNo: paginationParams?.current ?? pagination.current,
      pageSize: paginationParams?.pageSize ?? pagination.pageSize,
      conditions: {
        adminId: props.adminId,
        ...conditions
      }
    }).then(
      res => {
        setDataSource(res?.data?.map(item => (item.key = item.id, item)) ?? [])
        setPagination((pgt) => ({
          ...pgt,
          current: res.pageNo,
          pageSize: res.pageSize,
          total: res.total
        }))
      }
    )
  }
  function clickCb(pagination) {
    props?.onPaginationCb?.(pagination)
  }
  function updateParmas(filterParams, paginationParams) {
    setPagination(pagination => ({
      ...pagination,
      ...paginationParams
    }))
    getTableList(filterParams, paginationParams)
  }
  useImperativeHandle(ref, () => ({
    getTableList,
    updateParmas
  }), [])
  useEffect(() => {
    getTableList()
  }, [])
  return <TableComp
    themeObj={{
      headerBorderRadius: 0,
    }}
    dataSource={dataSource}
    columns={columns}
    onChange={clickCb}
    pagination={pagination}
  />
}
export default forwardRef(TableScope)