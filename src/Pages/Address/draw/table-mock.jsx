import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { GetWithdrawWalletInfoInterFace } from "@/api";
import TableComp from "@/Components/Table";
import { message } from 'antd';
import { formatUnit } from "@/utils/base.ts";
import dayjs from "dayjs";
import { unionBy } from 'lodash'
const TableConfig = (props, ref) => {
  const columns = [
    {
      title: '钱包协议',
      key: 'agreement',
      dataIndex: 'agreement',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '资产类型',
      key: 'type',
      dataIndex: 'type',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },


    {
      title: '地址',
      key: 'address',
      dataIndex: 'address',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '资产余额',
      key: 'balance',
      dataIndex: 'balance',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '矿工费余额',
      key: 'feeBalance',
      dataIndex: 'feeBalance',
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
      render: (_) => _ ? dayjs(_).format("YYYY/MM/DD HH:mm:ss") : '--'
    },

  ]
  const [dataSource, setDataSource] = useState([])
  function getTableList(conditions) {
    let params = {
      conditions
    }
    GetWithdrawWalletInfoInterFace(params).then(res => {
      if (res.status) {
        setDataSource(res?.data?.map(item => {
          let { agreement, type } = formatUnit(item.currencyId, item.currencyChain)
          item.key = item.walletId
          item.agreement = agreement
          item.type = type
          return item
        }) ?? [])
      } else {
        message.error(res.message)
      }
    })
  }
  useEffect(() => {
    getTableList(undefined)
  }, [])
  useImperativeHandle(ref, () => ({
    getTableList,
  }), [])
  return <TableComp
    themeObj={{
      headerBorderRadius: 0,
    }}
    dataSource={dataSource}
    columns={columns}
    pagination={false}
  />
}
export default forwardRef(TableConfig)