import React from "react";
import { Avatar, Badge, Dropdown, Layout, Space } from "antd";
import type { MenuProps } from "antd";
const { Header } = Layout;
import { UserOutlined, CaretDownOutlined } from "@ant-design/icons";
import { timeFormate } from "@/utils/base";
import Icon from "@/Components/Icon";
import bell from "@/assets/images/bell.svg";
const LayoutHeader = ({ collapsed, setCollapsed, colorBgContainer }: any) => {
  return (
    <Header
      style={{ padding: 0, background: colorBgContainer }}
      className="border-b-[1px_solid_var(--border-color)]"
    >
      {/* <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      /> */}
      <div className="flex items-center justify-end pr-[.3rem]">
        <p className="time">
          {timeFormate(new Date(), 'YYYY-MM-DD HH:mm')}
        </p>
        <Badge count={1} showZero className="mx-[.3rem]">
          <Icon name="h-icon-lingdang" style={{fontSize:".3rem"}}/>
        </Badge>
        <Avatar size={36} className="mr-[.2rem]" icon={<UserOutlined />} />
        <DropDownScope />
      </div>
    </Header>
  );
};
const DropDownScope = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span>个人中心</span>,
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()} className="hover:text-[#333]">
        <span>amy gao</span>
        <CaretDownOutlined />
      </a>
    </Dropdown>
  );
};
export default LayoutHeader;
