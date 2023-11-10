import { KeyOutlined, SaveOutlined } from "@ant-design/icons";
import styleScope from "./index.module.less";
import RouteList from "@/Routers/config";
import { Button, ConfigProvider, Tree, theme } from "antd";
import { getSession, mergeClassName } from "@/utils/base";
import { FindPermissionListInterFace } from "@/api";
import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
const SetPermission = () => {
  let userData = getSession("userInfo");
  let [userInfo, setUserInfo] = useState(userData);
  let [activeTreeNode, setActiveTreeNode] = useState(['/aupay/address/user']);
  console.log(RouteList);
  function filterRouter(routerList = [], parentPath = null) {
    return routerList.map((item, index) => {
      let p = parentPath ? parentPath + "/" + item.path : item.path;
      if (item?.children?.length) {
        filterRouter(item?.children, p);
      }
      if (item.title && item.isAuth) {
        item.key = p;
        return item;
      } else {
        Reflect.deleteProperty(routerList, index);
      }
    });
  }
  const treeData = filterRouter(cloneDeep(RouteList)).filter(Boolean);
  console.log("treeData: ", treeData);
  function treeCheckCb() {}
  function getPermissionList() {
    FindPermissionListInterFace().then((res) => {
      console.log("res: ", res);
    });
  }
  useEffect(() => {
    getPermissionList();
  }, []);
  return (
    <div className="pt-[.33rem] px-[.24rem] pb-[.24rem] bg-[var(--white)] mt-[.16rem] h-full rounded-[.06rem]">
      <div className="flex items-center justify-between">
        <p className="text-[16px] text-[#333] font-medium">
          员工ID：<span>{userInfo.adminId}</span>
        </p>
        <Button size="large" type="primary" icon={<KeyOutlined />}>
          权限调整
        </Button>
        {/* <Button size="large" className="bg-[var(--green)]" type="primary" icon={<SaveOutlined />}>
          保存
        </Button> */}
      </div>
      <ConfigProvider
        theme={{
          components: {
            Tree: {
              borderRadius: 0,
              borderRadiusSM: 0,
              controlItemBgHover: "rgba(28,99,255,0.05)",
            },
          },
        }}
      >
        <Tree
          blockNode
          onCheck={treeCheckCb}
          defaultCheckedKeys={activeTreeNode}
          className={mergeClassName(
            `${styleScope["reset-tree"]}`,
            "mt-[.36rem]"
          )}
          checkable
          treeData={treeData}
        />
      </ConfigProvider>
    </div>
  );
};
export default SetPermission;
