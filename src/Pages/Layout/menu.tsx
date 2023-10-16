import { Menu } from "antd";
import React from "react";
import styleScope from "./menu.module.less";
import { mergeClassName } from "@/utils/base";
const LayoutMenu = () => {
  return (
    <Menu
      theme="light"
      mode="vertical"
      className= {mergeClassName(styleScope['menu-box'], "pt-[.1rem] px-[.05rem]")}
      defaultSelectedKeys={["1"]}
      items={[
        {
          key: "1",
          icon: <></>,
          label: "资产统计",
        },
        {
          key: "2",
          icon: <></>,
          label: "数据统计",
        },
        {
          key: "3",
          icon: <></>,
          label: "用户管理",
        },
        {
          key: "4",
          icon: <></>,
          label: "地址管理",
          children:[{
            key: "4-1",
            icon: <></>,
            label: "地址管理21",
          }]
        },
        {
          key: "5",
          icon: <></>,
          label: "Ozbet",
          children:[]
        },
        {
          key: "6",
          icon: <></>,
          label: "公告列表",
        },
        {
          key: "7",
          icon: <></>,
          label: "系统管理",
          children:[]
        },
        {
          key: "8",
          icon: <></>,
          label: "个人资料",
        },
      ]}
    />
  );
};
export default LayoutMenu;

