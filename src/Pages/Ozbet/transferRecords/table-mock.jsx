import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { FindWalletTransferRecordInterFace } from "@/api";
import TableComp from "@/Components/Table";
import { message } from 'antd';
import { formatUnit } from "@/utils/base.ts";
import dayjs from "dayjs";
const TableConfig = (props, ref) => {
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
      title: '钱包协议',
      key: 'agreement',
      dataIndex: 'agreement',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_) => _ || "--"

    },
    {
      title: '资产类型',
      key: 'type',
      dataIndex: 'type',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_) => _ || "--"
    },
    {
      title: '交易类型',
      key: 'tradeType',
      dataIndex: 'tradeType',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_) => _ == 6 ? "转入" : '转出'
    },
    {
      title: '数量',
      key: 'amount',
      dataIndex: 'amount',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_) => _ || 0
    },
    // {
    //   title: '目标用户名',
    //   key: 'payAddr',
    //   dataIndex: 'payAddr',
    //   responsive: ['xl'],
    //   ellipsis: true,
    //   align: 'left'
    // },
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
      title: '地址说明',
      key: 'toAddressInstructions',
      dataIndex: 'toAddressInstructions',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_) => _ || "--"
    },
    {
      title: '完成时间',
      key: 'finishTime',
      dataIndex: 'finishTime',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_) => _ ? dayjs(_).format("YYYY/MM/DD HH:mm:ss") : "--"
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_) => _ == 1 ? "已完成" : <span className="text-[var(--green)]">进行中</span>
    },
  ]
  const [dataSource, setDataSource] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
    showTotal: function (total, range) {
      return `${Math.ceil(total / range[1]) > 1 ? 1 + ' - ' + Math.ceil(total / range[1]) : 1} 页 共${total}条`
    },
    showSizeChanger: false,
    showQuickJumper: true,
  })
  function clickCb(pagination) {
    props?.onPaginationCb?.(pagination)
  }
  function getTableList(conditions, paginationParams) {
    let params = {
      pageNo: paginationParams?.current ?? pagination.current,
      pageSize: paginationParams?.pageSize ?? pagination.pageSize,
      conditions: {
        walletUse: props?.id ?? null,
        ...conditions
      }
    }
    FindWalletTransferRecordInterFace(params).then(res => {
      if (res.status) {
        setDataSource(res?.data?.map(item => {
          let { agreement, type } = formatUnit(item.currencyId, item.currencyChain)
          item.key = item.id
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
    getTableList(undefined, pagination)
  }, [])

  useImperativeHandle(ref, () => ({
    getTableList,
    updateParmas,
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
export default forwardRef(TableConfig)