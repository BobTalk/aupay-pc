import { EyeFilled } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import TableComp from "@/Components/Table";
import { message } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { FindAdminListInterFace } from "@/api";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import store from '@/store'
import dayjs from 'dayjs';
const TableScope = (props, ref) => {
  let navigate = useNavigate()
  let [stop] = useStopPropagation();
  function isEffectiveCb(e, crt) {
    props?.onState(e, crt)
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
      title: '员工ID',
      key: 'adminId',
      dataIndex: 'adminId',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '备注',
      key: 'notes',
      dataIndex: 'notes',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_, record) => <>{_ ?? "--"}</>
    },
    {
      title: '邮箱',
      key: 'email',
      dataIndex: 'email',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '联系方式',
      key: 'mobile',
      dataIndex: 'mobile',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '部门',
      key: 'department',
      dataIndex: 'department',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_, record) => <>{_ ?? "--"}</>
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_, record) => _ ? dayjs(_).format("YYYY.MM.DD") : "--"
    },
    {
      title: '账户状态',
      key: 'state',
      dataIndex: 'state',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_, record) => {
        return <span className={_ == 1 ? "" : "text-[var(--pink)]"} onClick={(e) => isEffectiveCb(e, record)}>
          {_ == 1 ? "有效" : "无效"}
        </span>
      }
    },
    {
      title: '创建人',
      key: 'creator',
      dataIndex: 'creator',
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
        <span onClick={(e) => jumpDetail(e, record)} className='ml-[.1rem] hover:text-[var(--blue)] text-[var(--blue)]'>查看</span>
      </div>)
    },
  ]
  function jumpDetail(e, crt) {
    stop(e, () => {
      navigate('/aupay/system/staff-manage/detail', { state: { ...crt } })
      store.dispatch({
        type: "ADD_BREADCRUMB",
        data: [
          {
            title: '系统管理',
            href: "/aupay/system"
          },
          {
            title: '员工管理',
            href: "/aupay/system/staff-manage"
          },
          { title: "详情" }
        ]
      })
    })
  }
  function getTableList(conditions, paginationParams) {
    FindAdminListInterFace({
      pageNo: paginationParams?.current ?? pagination.current,
      pageSize: paginationParams?.pageSize ?? pagination.pageSize,
      conditions
    }).then(res => {
      if (res.status) {
        let r = res.data?.map((item, idx) => (item.key = idx, item))
        setDataSource(r)
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
    dataSource={dataSource}
    columns={columns}
    pagination={pagination}
  />
}
export default forwardRef(TableScope)