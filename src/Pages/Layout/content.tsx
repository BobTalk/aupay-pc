import Card from "@/Components/Card";
import Message from "@/Components/Message";
import { Layout } from "antd";
let { Content } = Layout;
const LayoutContent = () => {
  return (
    <Content
      style={{
        margin: ".2rem .3rem",
        background: "var(--gray)",
      }}
    >
      <Message message="test" className="text-[#333]" icon={<>∆˙˚¬µ</>} />
      <Card>
        <p>SDSDSDS</p>
      </Card>
    </Content>
  );
};
export default LayoutContent;
