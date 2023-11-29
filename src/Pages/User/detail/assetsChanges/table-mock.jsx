import TableComp from "@/Components/Table";
import { EyeFilled } from "@ant-design/icons";
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { FindUserAssetsChangeRecordInterFace } from "@/api";
import { formatUnit } from "@/utils/base.ts";
import { message } from 'antd';
import { tradeTypeChangeEnum, rechargeEnum } from "@/Enum";
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
      title: '订单号',
      key: 'id',
      dataIndex: 'id',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ || "--"
    },
    {
      title: '商户订单号',
      key: 'applicationOrderId',
      dataIndex: 'applicationOrderId',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ || "--"
    },
    {
      title: '时间',
      key: 'createTime',
      dataIndex: 'createTime',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ ? dayjs(_).format("YYYY/MM/DD") : '--'
    },
    {
      title: 'auPay用户名',
      key: 'username',
      dataIndex: 'username',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ || "--"
    },

    {
      title: '钱包协议',
      key: 'agreement',
      dataIndex: 'agreement',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ || "--"
    },
    {
      title: '资产类型',
      key: 'type',
      dataIndex: 'type',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ || "--"
    },
    {
      title: '账变前资产',
      key: 'beforeBalance',
      dataIndex: 'beforeBalance',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ || 0
    },
    {
      title: '交易类型',
      key: 'tradeType',
      dataIndex: 'tradeType',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => tradeTypeChangeEnum[_] || "--"
    },
    {
      title: '数量',
      key: 'amount',
      dataIndex: 'amount',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ || 0
    },
    {
      title: '提币手续费',
      key: 'fee',
      dataIndex: 'fee',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ || 0
    },
    {
      title: '账变后资产',
      key: 'beforeBalance',
      dataIndex: 'beforeBalance',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ || 0
    },
    {
      title: '转出地址',
      key: 'fromAddress',
      dataIndex: 'fromAddress',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ || "--"
    },
    {
      title: '交易ID',
      key: 'chainTxId',
      dataIndex: 'chainTxId',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ || "--"
    },


    {
      title: '转入地址',
      key: 'toAddress',
      dataIndex: 'toAddress',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ || "--"
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => rechargeEnum[_] || "--"

    },
    {
      title: '操作',
      key: 'operate',
      dataIndex: 'operate',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_, record) => (<div onClick={(e) => jumpDetail(e, record)} className='text-[var(--blue)] cursor-pointer whitespace-nowrap'>
        <EyeFilled />
        <span className='ml-[.1rem]'>区块详情</span>
      </div>),
    }
  ];
  function jumpDetail(e, crt) {
    props?.onJump?.(e, crt)
  }
  function getTableList(conditions, paginationParams) {
    FindUserAssetsChangeRecordInterFace({
      pageNo: paginationParams?.current ?? pagination.current,
      pageSize: paginationParams?.pageSize ?? pagination.pageSize,
      conditions:{
        userId:props.userId,
        ...conditions
      }
    }).then(res => {
      if (res.status) {
        setDataSource(res?.data?.map((item, index) => {
          let { agreement, type } = formatUnit(item.currencyId, item.currencyChain)
          item.key = item.toWalletId + "_" + index
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
  useEffect(() => {
    getTableList({}, pagination)
  }, [])

  useImperativeHandle(ref, () => ({
    getTableList,
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