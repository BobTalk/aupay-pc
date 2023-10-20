import React, { useState } from "react";
import { ConfigProvider, Layout, theme } from "antd";
import LayoutMenu from "./menu";
import LayoutContent from "./content";
import LayoutHeader from "./header";
import LayoutLogo from "./logo";

const { Sider } = Layout;

const LayoutPage: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination:{
            colorText:"#666",
            colorTextDisabled:'#B8BFCD',
          },
          Table: {
            borderColor:"var(--border-color)",
            colorText:"#333",
            fontWeightStrong: 400,
            headerColor: 'var(--menu-color)',
            headerBg:"var(--table-head_gray)",
            headerSplitColor:"transparent",
            rowHoverBg: "var(--table-hover)",
          },
          Button: {
            colorPrimary: "var(--blue)",
          },
          Menu: {
            itemHoverBg: "var(--blue)",
            itemHoverColor: "var(--white)",
            itemSelectedBg: "var(--blue)",
            subMenuItemBg: "var(--blue)",
            itemSelectedColor: "var(--white)",
            itemColor: "var(--menu-color)",
            itemActiveBg: "var(--blue)",
          },
        },
      }}
    >
      <Layout className="h-[100vh]">
        <Sider
          style={{
            backgroundColor: "#fff",
            borderRight: "1px solid var(--border-color)",
          }}
          width={300}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <LayoutLogo collapsed={collapsed} />
          <LayoutMenu />
        </Sider>
        <Layout>
          <LayoutHeader
            colorBgContainer={colorBgContainer}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
          <LayoutContent />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default LayoutPage;
