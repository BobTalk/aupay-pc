import TableComp from "@/Components/Table";
import { FindAdminIpLogInterFace } from "@/api";
import dayjs from "dayjs";
import { forwardRef, useImperativeHandle, useLayoutEffect,useState } from 'react';
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
  let [dataSource, setDataSource] = useState([])
  const columns = [
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
      render: (_)=> dayjs(_).format("YYYY/MM/DD HH:ss:mm")
    },
    {
      title: '动作',
      key: 'action',
      dataIndex: 'action',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '员工ID',
      key: 'adminId',
      dataIndex: 'adminId',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
  ]
  function clickCb(pagination) {
    props?.onPaginationCb?.(pagination)
  }
  function getTableList(conditions, paginationParams){
    FindAdminIpLogInterFace({
      pageNo: paginationParams?.current ?? pagination.current,
      pageSize: paginationParams?.pageSize ?? pagination.pageSize,
      conditions
    }).then(res =>{
      if (res.status) {
        setDataSource(res?.data?.map(item => (item.key = item.id, item)) ?? [])
        setPagination(pagination => ({
          ...pagination,
          current: res.pageNo,
          pageSize: res.pageSize,
          total: res.total,
          showTotal: ()=> `${res.page} - ${res.pageTotal}页 共${res.total}条`
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
  useImperativeHandle(ref, () => ({
    getTableList,
    updateParmas
  }), [])
  useLayoutEffect(()=>{
    getTableList()
  },[])
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