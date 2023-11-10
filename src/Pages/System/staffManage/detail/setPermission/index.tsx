import { KeyOutlined } from "@ant-design/icons";
import styleScope from "./index.module.less";
import RouteList from "@/Routers/config";
import { Button, ConfigProvider, Tree, message } from "antd";
import { getSession, mergeClassName, setSession } from "@/utils/base";
import { useRef, useState } from "react";
import { cloneDeep } from "lodash";
import {
  UpdatePermisonListInterFace,
  VerifyGoogleAuthInterFace,
  VerifyPinInterFace,
} from "@/api";
import { operationIdEnum, routerMapId } from "@/Enum";
import PinScopeComp from "@/Pages/PinModal";
import GoogleScopeComp from "@/Pages/GoogleModal";
const SetPermission = () => {
  let routerMapIdCp = JSON.parse(JSON.stringify(routerMapId));
  let userData = getSession("userInfo");
  let activePath = getSession("activePath");
  let [userInfo, setUserInfo] = useState(userData);
  let [PinOpen, setPinOpen] = useState(false);
  let [googleOpen, setGoogleOpen] = useState(false);
  let [activeTreeNode, setActiveTreeNode] = useState(activePath);
  let pinToken = useRef();
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
  function treeCheckCb(keyList, info) {
    setActiveTreeNode(keyList);
  }
  function savePermisionChangeCb({ googleCode }) {
    VerifyGoogleAuthInterFace({
      googleCode,
      operationId: operationIdEnum["setPermission"],
    }).then((res) => {
      if (res.status) {
        updatePermission(res.data);
      } else {
        message.error(res.message);
      }
    });
  }
  function updatePermission(googleToken) {
    let idList = [];
    for (const key of activeTreeNode) {
      if (!idList.includes(routerMapIdCp[key])) {
        idList.push(routerMapIdCp[key]);
      }
    }
    UpdatePermisonListInterFace(
      {
        adminId: userInfo.adminId,
        permissions: idList.filter(Boolean),
      },
      {
        "Pin-token": pinToken.current,
        "Google-Auth-Token": googleToken,
      }
    ).then((res) => {
      if (res.status) {
        setGoogleOpen(!googleOpen);
        setSession("activePath", activeTreeNode);
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  }
  function validatorPinCb() {
    setPinOpen(!PinOpen);
  }
  function validatorGoogleCb() {
    setGoogleOpen(!googleOpen);
  }
  function pinSubmitCb(code) {
    VerifyPinInterFace({
      pin: code,
      operationId: operationIdEnum["setPermission"],
    }).then((res) => {
      if (res.status) {
        pinToken.current = res.data;
        setGoogleOpen(!googleOpen);
        validatorPinCb();
      } else {
        message.error(res.message);
      }
    });
  }
  return (
    <div className="pt-[.33rem] px-[.24rem] pb-[.24rem] bg-[var(--white)] mt-[.16rem] h-full rounded-[.06rem]">
      <div className="flex items-center justify-between">
        <p className="text-[16px] text-[#333] font-medium">
          员工ID：<span>{userInfo.adminId}</span>
        </p>
        <Button
          onClick={validatorPinCb}
          size="large"
          type="primary"
          icon={<KeyOutlined />}
        >
          权限调整
        </Button>
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
      <PinScopeComp
        open={PinOpen}
        onFinish={pinSubmitCb}
        onCancel={validatorPinCb}
      />
      <GoogleScopeComp
        open={googleOpen}
        onFinish={savePermisionChangeCb}
        onCancel={validatorGoogleCb}
      />
    </div>
  );
};
export default SetPermission;
