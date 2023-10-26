import { EyeOutlined, EyeInvisibleOutlined, DeleteOutlined } from '@ant-design/icons';
import Icon from '@/Components/Icon';
import { Checkbox, Typography } from 'antd'
import TableComp from "@/Components/Table";

const TableScope = (props) => {
  const pagination = {
    current: 1,
    pageSize: 10,
    total: 10,
    showTotal: function (total, range) {
      return `${Math.ceil(total / range[1]) > 1 ? 1 + ' - ' + Math.ceil(total / range[1]) : 1} 页 共${total}条`
    },
    showSizeChanger: false,
    showQuickJumper: true,
  }
  const dataSource = [
    {
      key: "table1",
      assetsType: 'USDT',
      walletProtocol: 'USDT-ERC20',
      createTime: "2023.7.17 15:22:20",
      tradeType: '充币',
      num: 189,
      payAddr: '0x32983464f44',
      tradeId: '0x32983464f440x32983464f44',
      tradeConfirmNum: 87,
    },

  ]
  const columns = [
    {
      title: '主页滚动',
      key: 'assetsType',
      dataIndex: 'assetsType',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_, record) => (<Checkbox checked={true} />)
    },
    {
      title: '公告标题',
      key: 'walletProtocol',
      dataIndex: 'walletProtocol',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '公告内容',
      key: 'createTime',
      dataIndex: 'createTime',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '时间',
      key: 'tradeType',
      dataIndex: 'tradeType',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '员工ID',
      key: 'num',
      dataIndex: 'num',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left'
    },
    {
      title: '显示状态',
      key: 'payAddr',
      dataIndex: 'payAddr',
      responsive: ['xl'],
      ellipsis: true,
      align: 'left',
      render: (_, record, index) => {
        return true ? <span onClick={(e) => showCb(e, record, index)} className="text-[var(--blue)] cursor-pointer">
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
          onClick={(e) => deleteCb(e, record)}
        >
          <DeleteOutlined className='text-[var(--menu-color)] mr-[.1rem]' />
          <span className='text-[var(--menu-color)]'>删除</span>
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

  return <TableComp
    themeObj={{
      headerBorderRadius: 0,
    }}
    dataSource={dataSource}
    columns={columns}
    pagination={pagination}
  />
}

export default TableScope