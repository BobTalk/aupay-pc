import Card from "@/Components/Card";
import Message from "@/Components/Message";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
let { Content } = Layout;
const LayoutContent = () => {
  return (
    <Content
      style={{
        margin: ".2rem .3rem",
        background: "var(--gray)",
      }}
    >
      <Message message="test" className="text-[#333]" prvIcon={<>∆˙˚¬µ</>} />
      <Outlet/>
    </Content>
  );
};
export default LayoutContent;
