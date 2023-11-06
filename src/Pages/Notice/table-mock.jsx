import { EyeOutlined, EyeInvisibleOutlined, DeleteOutlined } from '@ant-design/icons';
import Icon from '@/Components/Icon';
import { Checkbox, Popconfirm, Typography } from 'antd'
import TableComp from "@/Components/Table";
import { FindAnnouncementListInterFace } from "@/api";
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
      title: '主页滚动',
      key: 'isRoll',
      dataIndex: 'isRoll',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_, record) => (<Checkbox checked={_} />)
    },
    {
      title: '公告标题',
      key: 'title',
      dataIndex: 'title',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '公告内容',
      key: 'content',
      dataIndex: 'content',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '时间',
      key: 'createTime',
      dataIndex: 'createTime',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_, record) => {
        return dayjs(_).format('YYYY.MM.DD')
      }
    },
    {
      title: '员工ID',
      key: 'id',
      dataIndex: 'id',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '显示状态',
      key: 'isShow',
      dataIndex: 'isShow',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_, record, index) => {
        return _ ? <span onClick={(e) => showCb(e, record, index)} className="text-[var(--blue)] cursor-pointer">
          <EyeOutlined />
          <span className="ml-[.1rem]">已显示</span>
        </span> : <span onClick={(e) => hiddenCb(e, record, index)} className="text-[var(--menu-color)] cursor-pointer">
          <EyeInvisibleOutlined />
          <span className="ml-[.1rem]">已隐藏</span></span>
      }
    },
    {
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_, record) => <><Typography.Link
        className="mr-[.2rem]"
        onClick={(e) => edit(e, record)}
      >
        <Icon className="text-[var(--green)]  mr-[.1rem]" name="h-icon-bianji" />
        <span className="text-[var(--green)]">编辑</span>

      </Typography.Link>
        <Typography.Link

        >
          <Popconfirm title="确认删除此公告?" onConfirm={(e) => deleteCb(e, record)}>
            <DeleteOutlined className='text-[var(--menu-color)] mr-[.1rem]' />
            <span className='text-[var(--menu-color)]'>删除</span>
          </Popconfirm>
        </Typography.Link></>
    },
  ]
  function edit(e, crt) {
    props?.onEditor?.(e, crt)
  }
  function deleteCb(e, crt) {
    props?.onDelete?.(e, crt)
  }
  function showCb(e, crt, index) {
    props?.onShowOrHidden?.(e, crt, index)
  }
  function hiddenCb(e, crt, index) {
    props?.onShowOrHidden?.(e, crt, index)
  }
  // 获取列表数据
  function getTableInfo() {
    FindAnnouncementListInterFace({
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      conditions: null
    }).then(res => {
      let formatData = res.data.map(item => (
        item.key = item.id,
        item
      ))
      setDataSource(formatData)
      setPagination({
        current: res.pageNo,
        pageSize: res.pageSize,
        total: res.data.length,
        showTotal: function (total, range) {
          return `${Math.ceil(total / range[1]) > 1 ? 1 + ' - ' + Math.ceil(total / range[1]) : 1} 页 共${total}条`
        },
        showSizeChanger: false,
        showQuickJumper: true,
      })
    })
  }
  useImperativeHandle(ref, () => ({
    getTableInfo
  }), [])
  useEffect(() => {
    getTableInfo()
  }, [])
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