import { EyeFilled } from '@ant-design/icons';


import TableComp from "@/Components/Table";
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { FindUserRechargeRecordListInterFace } from "@/api";
import { formatUnit } from "@/utils/base.ts";
import { rechargeEnum } from '@/Enum'
import { message } from 'antd';
import dayjs from 'dayjs';
const TableScope = (props, ref) => {
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
      title: '资产类型',
      key: 'type',
      dataIndex: 'type',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '钱包协议',
      key: 'agreement',
      dataIndex: 'agreement',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_) => dayjs(_).format("YYYY/MM/DD HH:mm:ss")
    },
    // {
    //   title: '交易类型',
    //   key: 'recordType',
    //   dataIndex: 'recordType',
    //   responsive: ['xl'],
    //   ellipsis: true,
    //   align: 'left'
    // },
    {
      title: '数量',
      key: 'amount',
      dataIndex: 'amount',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '付款地址',
      key: 'fromAddress',
      dataIndex: 'fromAddress',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '交易ID',
      key: 'chainTxId',
      dataIndex: 'chainTxId',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '交易确认数',
      key: 'blockNum',
      dataIndex: 'blockNum',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_) => _ || 0
    },
    {
      title: '收款地址',
      key: 'toAddress',
      dataIndex: 'toAddress',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '完成时间',
      key: 'finishTime',
      dataIndex: 'finishTime',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_) => dayjs(_).format("YYYY/MM/DD")
    },
    {
      title: '状态', // 1, 0
      key: 'state',
      dataIndex: 'state',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_) => rechargeEnum[_]
    },

    {
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      responsive: ['xl'],
      ellipsis: true,
      render: (_, record) => (<div onClick={(e)=>jumpDetail(e,record)} className='text-[var(--blue)] cursor-pointer whitespace-nowrap'>
        <EyeFilled />
        <span className='ml-[.1rem]'>区块详情</span>
      </div>),
      align: 'left'
    },
  ]
  function jumpDetail(e, crt){
    props?.onJump?.(e, crt)
  }
  function getTableList(conditions, paginationParams) {
    FindUserRechargeRecordListInterFace({
      pageNo: paginationParams?.current ?? pagination.current,
      pageSize: paginationParams?.pageSize ?? pagination.pageSize,
      conditions
    }).then(res => {
      if (res.status) {
        setDataSource(res?.data?.map((item,index) => {
          let { agreement, type } = formatUnit(item.currencyId, item.currencyChain)
          item.key = item.toWalletId+"_"+index
          item.agreement = agreement
          item.type = type
          return item
        }) ?? [])
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