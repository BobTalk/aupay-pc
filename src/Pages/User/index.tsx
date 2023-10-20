import { Button, Input, Select } from "antd";
import { SearchOutlined, CaretDownOutlined } from "@ant-design/icons";
import styleScope from "./index.module.less";
import Table from "@/Components/Table";
import { useState } from "react";
import { data, columns, pagination } from "./table-mock.jsx";
import { Outlet, useLocation } from "react-router-dom";
const User = () => {
  let [state, setState] = useState(undefined);
  let { pathname } = useLocation();
  let [name, setName] = useState(undefined);
  function tableChangeCb(
    pge,
    filters,
    sorter,
    extra: { currentDataSource; action }
  ) {
    console.log("pagination: ", pge);
  }
  return pathname == "/aupay/user" ? (
    <>
      <div className={styleScope["filter-box"]}>
        <div className={styleScope["filter-user"]}>
          <Input
            className="w-[3.2rem]"
            defaultValue={name}
            size="large"
            allowClear
            placeholder="搜索用户名/Ozbet用户名/昵称/邮箱"
          />
          <Button size="large" type="primary" icon={<SearchOutlined />}>
            搜索
          </Button>
        </div>
        <div className={styleScope["filter-state"]}>
          <Select
            size="large"
            placeholder="账户状态"
            defaultValue={state}
            allowClear
            suffixIcon={<CaretDownOutlined />}
            style={{ width: 120 }}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
          <Button size="large" type="primary" icon={<SearchOutlined />}>
            搜索
          </Button>
        </div>
      </div>
      <Table
        onChange={tableChangeCb}
        dataSource={data}
        pagination={pagination}
        columns={columns}
        rowClassName={styleScope["row"]}
      />
    </>
  ) : (
    <Outlet />
  );
};
export default User;