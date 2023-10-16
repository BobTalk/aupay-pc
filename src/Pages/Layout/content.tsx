import { Button, theme, Layout } from "antd";
import React from "react";
let { Content } = Layout;
const LayoutContent = ({ colorBgContainer }) => {
  return (
    <Content
      style={{
        margin: ".2rem .3rem",
        background: "var(--gray)",
      }}
    >
      <Button type="primary">Primary Button</Button>
    </Content>
  );
};
export default LayoutContent;
