import { KeyOutlined, SaveOutlined } from "@ant-design/icons";
import styleScope from "./index.module.less";
import { Button, ConfigProvider, Tree,theme } from "antd";
import { mergeClassName } from "@/utils/base";

const SetPermission = () => {
  const treeData = [
    {
      title: "记录中心",
      key: "0-0",
      children: [
        {
          title: "充值中心",
          key: "0-0-0",
        },
        {
          title: "提款记录",
          key: "0-0-1",
        },
        {
          title: "转账记录",
          key: "0-0-2",
        },
      ],
    },
  ];
  return (
    <div className="pt-[.33rem] px-[.24rem] pb-[.24rem] bg-[var(--white)] mt-[.16rem] h-full rounded-[.06rem]">
      <div className="flex items-center justify-between">
        <p className="text-[16px] text-[#333] font-medium">
          员工ID：<span>Alex.yin</span>
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
              borderRadius:0,
              borderRadiusSM:0,
              titleHeight: 54,
              controlItemBgHover: "rgba(28,99,255,0.05)",
            },
          },
        }}
      >
        <Tree
          blockNode
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
