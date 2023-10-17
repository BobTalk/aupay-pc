import { Menu } from "antd";
import React from "react";
import styleScope from "./menu.module.less";
import { mergeClassName } from "@/utils/base";
import Icon from "@/Components/Icon";
const LayoutMenu = () => {
  return (
    <Menu
      theme="light"
      mode="vertical"
      className={mergeClassName(
        styleScope["menu-box"],
        "pt-[.1rem] px-[.05rem]"
      )}
      defaultSelectedKeys={["1"]}
      items={[
        {
          key: "1",
          icon: (
            <Icon name="h-icon-zichanguanli" className={styleScope["icon"]} />
          ),
          label: "资产统计",
        },
        {
          key: "2",
          icon: (
            <Icon name="h-icon-shujutongji" className={styleScope["icon"]} />
          ),
          label: "数据统计",
        },
        {
          key: "3",
          icon: (
            <Icon name="h-icon-yonghuguanli" className={styleScope["icon"]} />
          ),
          label: "用户管理",
        },
        {
          key: "4",
          icon: (
            <Icon name="h-icon-dizhiguanli" className={styleScope["icon"]} />
          ),
          label: "地址管理",
          children: [
            {
              key: "4-1",
              icon: (
                <Icon
                  name="h-icon-dizhiguanli"
                  className={styleScope["icon"]}
                />
              ),
              label: "地址管理21",
            },
          ],
        },
        {
          key: "5",
          icon: <Icon name="h-icon-Opera" className={styleScope["icon"]}/>,
          label: "Ozbet",
          children: [],
        },
        {
          key: "6",
          icon: <Icon name="h-icon-gonggaoliebiao" className={styleScope["icon"]}/>,
          label: "公告列表",
        },
        {
          key: "7",
          icon: <Icon name="h-icon-xitongguanli" className={styleScope["icon"]}/>,
          label: "系统管理",
          children: [],
        },
        {
          key: "8",
          icon: <Icon name="h-icon-gerenziliao" className={styleScope["icon"]}/>,
          label: "个人资料",
        },
      ]}
    />
  );
};
export default LayoutMenu;
