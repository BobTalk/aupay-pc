import { Button, Layout, theme } from "antd";
const { Header } = Layout;
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const LayoutHeader = ({ collapsed, setCollapsed, colorBgContainer }: any) => {
  return (
    <Header style={{ padding: 0, background: colorBgContainer}} className="border-b-[1px_solid_var(--border-color)]">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
    </Header>
  );
};

export default LayoutHeader;
