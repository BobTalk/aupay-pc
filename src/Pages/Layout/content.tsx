import Card from "@/Components/Card";
import Message from "@/Components/Message";
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
      <Message message="test" className="bg-[red] text-[#fff]" icon={<>∆˙˚¬µ</>}/>
      <Card/>
    </Content>
  );
};
export default LayoutContent;
