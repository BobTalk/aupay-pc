import { LockOutlined, UnlockOutlined, DeleteOutlined } from '@ant-design/icons';
import TableComp from "@/Components/Table";
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { FindUserWalletListInterFace } from "@/api";
import { formatUnit } from "@/utils/base.ts";
import { message } from 'antd';
import dayjs from 'dayjs';
import { unionBy } from 'lodash';
const TableScope = (props, ref) => {
  let [assetsList, setAssetsList] = useState([])
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
      title: 'auPay用户名',
      key: 'username',
      dataIndex: 'username',
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
      title: '资产类型',
      key: 'type',
      dataIndex: 'type',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '当前使用周期(天)',
      key: 'bindTime',
      dataIndex: 'bindTime',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_) => Math.abs(dayjs(_).diff(new Date(), 'day'))
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
      key: 'feeBalance',
      dataIndex: 'feeBalance',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '矿工费余额',
      key: 'balance',
      dataIndex: 'balance',
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
  ]
  function getTableList(conditions, paginationParams) {
    FindUserWalletListInterFace({
      pageNo: paginationParams?.current ?? pagination.current,
      pageSize: paginationParams?.pageSize ?? pagination.pageSize,
      conditions
    }).then(res => {
      if (res.status) {
        let assetsType = []
        setDataSource(res?.data?.map(item => {
          let { agreement, type } = formatUnit(item.currencyId, item.currencyChain);
          item.key = item.walletId
          item.agreement = agreement
          item.type = type
          assetsType.push({
            value: item.currencyId,
            label: type
          })
          setAssetsList(unionBy(assetsType, "value"))
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
    if (!!assetsList.length) {
      props?.onGetAssetsList?.(assetsList)
    }
  }, [assetsList])
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