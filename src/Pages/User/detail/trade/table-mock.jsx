import TableComp from "@/Components/Table";
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { FindUserTradeRecordListInterFace } from "@/api";
import { formatUnit } from "@/utils/base.ts";
import { message } from 'antd';
import { tradeTypeByUserEnum, rechargeEnum } from "@/Enum";
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
      title: 'aupay订单号',
      key: 'id',
      dataIndex: 'id',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ ?? "--"
    },
    {
      title: 'Ozbet订单号',
      key: 'applicationOrderId',
      dataIndex: 'applicationOrderId',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left'
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ ? dayjs(_).format("YYYY/MM/DD HH:mm:ss") : '--'
    },
    {
      title: '应用',
      key: 'applicationId',
      dataIndex: 'applicationId',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ ?? "--"
    },
    {
      title: '用户名',
      key: 'username',
      dataIndex: 'username',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ ?? "--"
    },
    {
      title: '钱包协议',
      key: 'agreement',
      dataIndex: 'agreement',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ ?? "--"
    },
    {
      title: '资产类型',
      key: 'type',
      dataIndex: 'type',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ ?? "--"
    },
    {
      title: '交易类型',
      key: 'tradeType',
      dataIndex: 'tradeType',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => tradeTypeByUserEnum[_] ?? "--"
    },
    {
      title: '数量',
      key: 'amount',
      dataIndex: 'amount',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ ?? 0
    },
    {
      title: '商品说明',
      key: 'instruction',
      dataIndex: 'instruction',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ || "--"
    },
    {
      title: '付款地址',
      key: 'fromAddress',
      dataIndex: 'fromAddress',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ || "--"
    },
    {
      title: '收款地址',
      key: 'collectionMoneyAddr',
      dataIndex: 'collectionMoneyAddr',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ || "--"
    },


    {
      title: '完成时间',
      key: 'finishTime',
      dataIndex: 'finishTime',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => _ ? dayjs(_).format("YYYY/MM/DD") : "--"
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      responsive: ['xl'],
      ellipsis: false,
      align: 'left',
      render: (_) => rechargeEnum[_] || "--"
    }
  ]
  function getTableList(conditions, paginationParams) {
    FindUserTradeRecordListInterFace({
      pageNo: paginationParams?.current ?? pagination.current,
      pageSize: paginationParams?.pageSize ?? pagination.pageSize,
      conditions:{
        userId:props.userId,
        ...conditions
      }
    }).then(res => {
      console.log('res: ', res);
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