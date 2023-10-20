import { Menu } from "antd";
import styleScope from "./menu.module.less";
import { mergeClassName } from "@/utils/base";
import Icon from "@/Components/Icon";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import urlMap from "./urlMapTitle";
const LayoutMenu = () => {
  let [stop] = useStopPropagation();
  let navigate = useNavigate();
  let { pathname } = useLocation();
  function menuSelectCb({ key, domEvent }) {
    stop(domEvent, () => {
      navigate(key, { state: { _title: urlMap[key] } });
    });
  }
  return (
    <Menu
      theme="light"
      onSelect={menuSelectCb}
      mode="vertical"
      className={mergeClassName(
        styleScope["menu-box"],
        "pt-[.1rem] px-[.1rem]"
      )}
      defaultSelectedKeys={[pathname]}
      items={[
        {
          key: "/aupay/assets",
          icon: (
            <Icon name="h-icon-zichantongji" className={styleScope["icon"]} />
          ),
          label: "资产统计",
        },
        {
          key: "/aupay/data",
          icon: (
            <Icon name="h-icon-shujutongji" className={styleScope["icon"]} />
          ),
          label: "数据统计",
        },
        {
          key: "/aupay/user",
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
          icon: <Icon name="h-icon-Ozbet" className={styleScope["icon"]} />,
          label: "Ozbet",
          children: [],
        },
        {
          key: "6",
          icon: (
            <Icon name="h-icon-gonggaoliebiao" className={styleScope["icon"]} />
          ),
          label: "公告列表",
        },
        {
          key: "7",
          icon: (
            <Icon name="h-icon-xitongguanli" className={styleScope["icon"]} />
          ),
          label: "系统管理",
          children: [],
        },
        {
          key: "8",
          icon: (
            <Icon name="h-icon-gerenziliao" className={styleScope["icon"]} />
          ),
          label: "个人资料",
        },
      ]}
    />
  );
};
export default LayoutMenu;
