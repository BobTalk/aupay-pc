import Icon from "@/Components/Icon";
import CommonModule from "./common";
import styleScope from "./index.module.less";
import { Input } from "antd";
import { useState } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { getSession, setSession } from "@/utils/base";
import ModalScope from "@/Components/Modal";
import { BindGoogleAuthInterFace, GetUserInfo } from "@/api";
import Image from "@/Components/Image";
const PersonalInfo = () => {
  let [isEditor, setIsEditor] = useState(false);
  let userInfo = getSession("userInfo");
  console.log("userInfo: ", userInfo);
  let [stop] = useStopPropagation();
  let [bindGoogleOpen, setBindGoogleOpen] = useState(false);
  let [googleImageUrl, setGoogleImageUrl] = useState();
  let [isBind, setIsBind] = useState(false);
  function isEditorCb(e) {
    stop(e, () => {
      setIsEditor(!isEditor);
    });
  }
  function bindGoogle() {
    if (userInfo.googleSecret) return;
    console.log(9);
    BindGoogleAuthInterFace().then((res) => {
      console.log("res: ", res);
      if (res.status) {
        setBindGoogleOpen(!bindGoogleOpen);
        setGoogleImageUrl(res.data);
        setIsBind(true);
        GetUserInfo().then((res) => {
          setSession("userInfo", res);
        });
      }
    });
  }
  return (
    <>
      <CommonModule
        title="个人资料"
        left={
          <span
            onClick={isEditorCb}
            className="flex flex-1 justify-end cursor-pointer text-[var(--blue)] text-[14px] font-medium"
          >
            {isEditor ? "保存" : "编辑个人资料"}
          </span>
        }
      >
        <div className={styleScope["info-box"]}>
          <p>
            <span>员工ID：</span>
            <span>小吴飞翔</span>
          </p>
          <p>
            <span>备注：</span>
            {isEditor ? (
              <Input defaultValue="哇哈哈哈出萨湖大，哈哈扩大好看的话" />
            ) : (
              <span>哇哈哈哈出萨湖大，哈哈扩大好看的话</span>
            )}
          </p>
          <p>
            <span>联系方式：</span>
            {isEditor ? (
              <Input defaultValue="13423234424" />
            ) : (
              <span>13423234424</span>
            )}
          </p>
          <p>
            <span>部门：</span>
            <span>事业部</span>
          </p>
        </div>
      </CommonModule>
      <CommonModule
        title="账户管理"
        className="mt-[.16rem]"
        style={{
          height: `calc(100% - 1.2rem)`,
        }}
      >
        <div className="flex items-start not-first:mt-[.25rem]">
          <Icon
            name="h-icon-status"
            purity={false}
            style={{
              fontSize: ".3rem",
              marginRight: ".1rem",
            }}
          />
          <div className="flex flex-1 leading-[.3rem] items-center justify-between  pb-[.2rem] border-b border-[#C5CAD0] border-dashed">
            <span className="text-[14px] text-[#666]">邮箱</span>
            <p className="text-[14px]">
              <span className="text-[#333] mr-[.2rem]">
                13423234424@163.com
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-start  not-first:mt-[.25rem]">
          <Icon
            name="h-icon-sign"
            purity={false}
            style={{
              fontSize: ".3rem",
              marginRight: ".1rem",
            }}
          />
          <p className="flex justify-between items-center text-[14px] flex-1 leading-[.3rem] pb-[.2rem] border-b border-[#C5CAD0] border-dashed">
            <span className="text-[#666]">登录密码</span>
            <span>
              <span className="mr-[.24rem] text-[#333]">******</span>
              <span className="text-[#0385F2] cursor-pointer">修改</span>
            </span>
          </p>
        </div>
        <div className="flex items-start  not-first:mt-[.25rem]">
          <Icon
            name="h-icon-pin"
            purity={false}
            style={{
              fontSize: ".3rem",
              marginRight: ".1rem",
            }}
          />
          <p className="flex justify-between items-center text-[14px] flex-1 leading-[.3rem] pb-[.2rem] border-b border-[#C5CAD0] border-dashed">
            <span className="text-[#666]">PIN码</span>
            <span>
              <span className="mr-[.24rem] text-[#333]">******</span>
              <span className="text-[#0385F2] cursor-pointer">修改</span>
            </span>
          </p>
        </div>
        <div className="flex items-start  not-first:mt-[.25rem]">
          <Icon
            name="h-icon-google"
            purity={false}
            style={{
              fontSize: ".3rem",
              marginRight: ".1rem",
            }}
          />
          <p className="flex justify-between items-center text-[14px] flex-1 leading-[.3rem] pb-[.2rem] border-b border-[#C5CAD0] border-dashed">
            <span className="text-[#666]">Google验证器</span>
            <span
              onClick={bindGoogle}
              className="text-[#0385F2] cursor-pointer"
            >
              {userInfo.googleSecret || isBind ? "已绑定" : "未绑定"}{" "}
            </span>
          </p>
        </div>
      </CommonModule>
      <ModalScope
        onOk={() => setBindGoogleOpen(!bindGoogleOpen)}
        onCancel={() => setBindGoogleOpen(!bindGoogleOpen)}
        cancelText="关闭"
        showFooter={true}
        title={
          <span className="flex items-center font-normal">
            <i className={styleScope["icon"]}></i>绑定Google验证码
          </span>
        }
        open={bindGoogleOpen}
      >
        <Image
          imgClassName="w-[1.2rem] h-[1.2rem]"
          src={googleImageUrl}
          className="grid place-items-center"
        >
          <p className="text-[.16rem] text-[#222]">
            请使用手机扫描谷歌验证码进行绑定，
          </p>
          <p className="mt-[.2rem] pb-[.1rem] text-center text-[.16rem] text-[#222]">
            妥善保存此二维码
          </p>
        </Image>
      </ModalScope>
    </>
  );
};

export default PersonalInfo;
