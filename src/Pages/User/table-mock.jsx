import { EyeFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import TableComp from "@/Components/Table";
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { FindUserListInterFace } from "@/api";
import { message } from 'antd';
import { userAcountStateEnum } from "@/Enum";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import dayjs from 'dayjs';
import { getSession } from "@/utils/base.ts";
import { childRouter } from "./child-router";
const TableScope = (props, ref) => {
  let allRouterPath = getSession("activePath");
  let [stop] = useStopPropagation();
  let navigate = useNavigate()
  function clickCb(pagination) {
    props?.onPaginationCb?.(pagination)
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
      title: 'aupay用户名',
      key: 'username',
      dataIndex: 'username',
      responsive: ['xl'],
      ellipsis: true
    },
    {
      title: '邮箱',
      key: 'email',
      dataIndex: 'email',
      responsive: ['xl'],
      ellipsis: true
    },
    {
      title: '用户昵称',
      key: 'nickname',
      dataIndex: 'nickname',
      responsive: ['xl'],
      ellipsis: true,
      render: (_) => _ ?? "--"
    },
    {
      title: '账户状态',
      key: 'state',
      dataIndex: 'state',
      render: (text, record, rowIndex) => {
        if (text === 1) {
          return userAcountStateEnum[1]
        }
        return <span className='text-[var(--pink)]'>{userAcountStateEnum[2]}</span>
      },
      responsive: ['xl'],
      ellipsis: true
    },
    {
      title: '可用资产USDT',
      key: 'availableBalance',
      dataIndex: 'availableBalance',
      responsive: ['xl'],
      ellipsis: true,
      render: (_) => _ ?? 0
    },
    {
      title: '开户时间',
      key: 'createTime',
      dataIndex: 'createTime',
      responsive: ['xl'],
      ellipsis: true,
      render: (_) => _ ? dayjs(_).format("YYYY/MM/DD") : '--'
    },
    {
      title: 'Ozbet用户名',
      key: 'ozbetUsername',
      dataIndex: 'ozbetUsername',
      responsive: ['xl'],
      ellipsis: true,
      render: (_) => _ ?? "--"
    },
    {
      title: '游戏资产OZC',
      key: 'ozbetAssetsBalance',
      dataIndex: 'ozbetAssetsBalance',
      responsive: ['xl'],
      ellipsis: true,
      render: (_) => _ ?? "--"
    },
    {
      title: '创建时间',
      key: 'ozbetBindTime',
      dataIndex: 'ozbetBindTime',
      responsive: ['xl'],
      ellipsis: true,
      render: (_) => _ ? dayjs(_).format("YYYY/MM/DD") : "--"
    },
    {
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      responsive: ['xl'],
      render: (_, record) => (<div className='text-[var(--blue)] cursor-pointer'>
        <EyeFilled />
        <span className='ml-[.1rem] hover:text-[var(--blue)] text-[var(--blue)]' onClick={(e) => jumpDetail(e, record)} >查看</span>
      </div>)
    },
  ]
  function getTableList(conditions, paginationParams) {
    FindUserListInterFace({
      pageNo: paginationParams?.current ?? pagination.current,
      pageSize: paginationParams?.pageSize ?? pagination.pageSize,
      conditions
    }).then(res => {
      if (res.status) {
        setDataSource(res?.data?.map(item => (item.key = item.userId, item)) ?? [])
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
  function filterRouter(routerList) {
    return routerList.filter((item) => allRouterPath.includes(item.key));
  }
  function jumpDetail(e, crt) {
    stop(e, () => {
      let filterRouterList = filterRouter(childRouter)
      navigate(filterRouterList[0].key, {
        state: {
          chilterRouterArr: filterRouterList,
          crtInfo: crt
        }
      })
    })
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