import { Button, Input, Select } from "antd";
import { SearchOutlined, CaretDownOutlined } from "@ant-design/icons";
import styleScope from "./index.module.less";
import { useRef, useState } from "react";
import TableScope from "./table-mock.jsx";
import { Outlet, useLocation } from "react-router-dom";
import { formatEnum } from "@/utils/base";
import { userAcountStateEnum } from "@/Enum";
import { useStopPropagation } from "@/Hooks/StopPropagation";
const User = () => {
  let [stop] = useStopPropagation();
  let tableRefs = useRef<any>();
  let filterInputRefs = useRef<any>();
  let [state, setState] = useState(undefined);
  let { pathname } = useLocation();
  function paginationCb({ current, pageSize, total }) {
    tableRefs.current.updateParmas(
      {
        search: filterInputRefs.current.input.value,
        state: +state,
      },
      {
        current,
        pageSize,
        total,
      }
    );
  }
  function filterCb(e) {
    stop(e, () => {
      tableRefs.current.getTableList({
        search: filterInputRefs.current.input.value,
        state: +state,
      });
    });
  }
  return pathname == "/aupay/user" ? (
    <>
      <div className={styleScope["filter-box"]}>
        <div className={styleScope["filter-user"]}>
          <Input
            ref={filterInputRefs}
            className="w-[3.2rem]"
            size="large"
            allowClear
            placeholder="搜索用户名/Ozbet用户名/昵称/邮箱"
          />
          <Button
            onClick={(e) => filterCb(e)}
            size="large"
            type="primary"
            icon={<SearchOutlined />}
          >
            搜索
          </Button>
        </div>
        <div className={styleScope["filter-state"]}>
          <Select
            size="large"
            placeholder="账户状态"
            defaultValue={state}
            onChange={(val) => setState(val)}
            allowClear
            suffixIcon={<CaretDownOutlined />}
            style={{ width: 120 }}
            options={formatEnum(userAcountStateEnum)}
          />
          <Button
            size="large"
            onClick={(e) => filterCb(e)}
            type="primary"
            icon={<SearchOutlined />}
          >
            搜索
          </Button>
        </div>
      </div>
      <TableScope ref={tableRefs} onPaginationCb={paginationCb} />
    </>
  ) : (
    <Outlet />
  );
};
export default User;
