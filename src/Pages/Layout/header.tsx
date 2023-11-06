import { Avatar, Badge, Dropdown, Layout, Space } from "antd";
import type { MenuProps } from "antd";
import styleScope from "./header.module.less";
const { Header } = Layout;
import { UserOutlined, CaretDownOutlined } from "@ant-design/icons";
import { getSession, timeFormate } from "@/utils/base";
import Icon from "@/Components/Icon";
import { useState } from "react";
const LayoutHeader = ({ colorBgContainer }: any) => {
 let [userInfo] =  useState(getSession('userInfo'))
  return (
    <Header
      style={{ padding: 0, background: colorBgContainer }}
      className="border-b-[1px_solid_var(--border-color)] h-[65px]"
    >
      <div className="flex items-center justify-end pr-[.3rem]">
        <p className={styleScope["time"]}>
          {timeFormate(userInfo.loginTime, "YYYY-MM-DD HH:mm")}
        </p>
        <Badge count={0} showZero={false} className="mx-[.24rem]">
          <Icon
            name="h-icon-xiaoxi"
            purity={false}
            style={{ fontSize: ".2rem" }}
          ></Icon>
        </Badge>
        <Avatar size={32} className="mr-[.14rem]" icon={<UserOutlined />} />
        <DropDownScope userInfo={userInfo}/>
      </div>
    </Header>
  );
};
const DropDownScope = (props) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span>个人中心</span>,
    },
  ];
  return (
    <Dropdown menu={{ items }} arrow>
      <a onClick={(e) => e.preventDefault()} className="hover:text-[#333]">
        <span>{props.adminId}</span>
        <CaretDownOutlined />
      </a>
    </Dropdown>
  );
};
export default LayoutHeader;
