import { ConfigProvider, Table } from "antd";
import { ReactNode } from "react";
import zh_CN from "antd/es/locale/zh_CN";
import styleScope from "./table.module.less";
type TableCompPropsType = {
  dataSource: Array<any>;
  columns: Array<any>;
  pagination?: false | {};
  onChange?:()=>{},
  children?: ReactNode;
  border?: boolean;
  themeObj?: Object;
  paginationThemeObj?: Object;
  components?: Object;
  virtual?: boolean;
  [key: string]: any;
};
const TableComp = (props: TableCompPropsType) => {
  let {
    dataSource,
    columns,
    pagination,
    onChange,
    border,
    components: comp,
    virtual,
  } = props;
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: props?.themeObj ?? {},
          Pagination: props?.paginationThemeObj ?? {},
        },
      }}
      locale={zh_CN}
    >
     <div className={styleScope['table-reset']}>
     <Table
        onChange={onChange}
        components={comp}
        virtual={virtual}
        bordered={border}
        scroll={{ y: 0 }}
        pagination={pagination}
        dataSource={dataSource}
        columns={columns}
        {...props}
      >
        {props.children}
      </Table>
     </div>
    </ConfigProvider>
  );
};
TableComp.defaultProps = {
  dataSource: [],
  columns: [],
  sticky: true,
  pagination: false,
  onChange:()=>{},
  border: false,
  themeObj: {},
  paginationThemeObj: {},
  components: {},
  virtual: true,
};
export default TableComp;
