import { Avatar, Badge, Dropdown, Layout, Space } from "antd";
import type { MenuProps } from "antd";
import styleScope from "./header.module.less";
const { Header } = Layout;
import { UserOutlined, CaretDownOutlined } from "@ant-design/icons";
import { timeFormate } from "@/utils/base";
import Icon from "@/Components/Icon";
import bell from "@/assets/images/bell.svg";
const LayoutHeader = ({ collapsed, setCollapsed, colorBgContainer }: any) => {
  return (
    <Header
      style={{ padding: 0, background: colorBgContainer }}
      className="border-b-[1px_solid_var(--border-color)] h-[65px]"
    >
      <div className="flex items-center justify-end pr-[.3rem]">
        <p className={styleScope['time']}>
          {timeFormate(new Date(), 'YYYY-MM-DD HH:mm')}
        </p>
        <Badge count={0} showZero={false} className="mx-[.3rem]">
          <Icon name="h-icon-xiaoxi" style={{fontSize:".3rem"}}/>
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
