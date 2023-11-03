import styleScope from "./index.module.less";
import { EditOutlined, RightOutlined } from "@ant-design/icons";
import Icon from "@/Components/Icon";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import ValidatorComp from "./validator";
import Context from "./Context.jsx";
import CommonModule from "./common";
import { useState } from "react";
import { getSession } from "@/utils/base";

const BaseInfo = () => {
  let userInfo = getSession('userInfo')
  console.log('userInfo: ', userInfo);
  // 提示信息
  const tipMessage = {
    pwd:"确认要重置登录密码，密码将重置为123456，请及时修改密码",
    freeze:"确认冻结员工：Bob，冻结后将无法登录",
    enable:'确认启用员工：Bob，解冻后将恢复使用',
    PIN:'确认重置PIN码，重置为0000',
    google:'确认重置Google验证器，重置后可重新',
    closeAccount:'确认要关闭此员工账户，停用后将无法恢复'
  }
  let [PIN, setPIN] = useState(false);
  let [googleCodeOpen, setGoogleCodeOpen] = useState(false);
  let [summary, setSummary] = useState("");
  let [tipOpen, setTipOpen] = useState(false);
  let [stop] = useStopPropagation();
  function isFreeze(e) {
    stop(e, () => {
      setPIN(!PIN);
    });
  }
  // PIN取消
  function onPINCancel() {
    setPIN(!PIN);
  }
  // PIN确定
  function onPINOk() {
    setPIN(!PIN);
    setGoogleCodeOpen(!googleCodeOpen);
  }
  // Google取消
  function onGoogleCancel() {
    setGoogleCodeOpen(!googleCodeOpen);
  }
  // Google确定
  function onGoogleOk() {
    console.log("00000");
    setGoogleCodeOpen(!googleCodeOpen);
    setTipOpen(!tipOpen);
  }
  // 提示信息取消
  function onTipCancel() {
    setTipOpen(!tipOpen);
  }
  // 提示信息确定
  function onTipOk() {
    setTipOpen(!tipOpen);
  }
  return (
    <Context.Provider
      value={{
        onPINOk,
        onPINCancel,
        PINOpen: PIN,
        onGoogleOk,
        onGoogleCancel,
        googleCodeOpen,
        onTipOk,
        onTipCancel,
        tipOpen,
        summary,
      }}
    >
      <CommonModule title="员工信息" className="mt-[.16rem] h-[1.56rem]">
        <div className={styleScope["staff-info"]}>
          <p>
            <span>员工ID：</span>
            <span>小吴飞翔</span>
          </p>
          <p>
            <span>创建时间：</span>
            <span>2023.07.19</span>
          </p>
          <p>
            <span>邮箱：</span>
            <span>13423234424@163.com</span>
          </p>
          <p>
            <span>部门：</span>
            <span className="flex items-center">
              事业部 <RightOutlined className="text-[12px] ml-[.06rem]" />
              <span className="cursor-pointer">
                <EditOutlined className="ml-[.24rem] mr-[.1rem] text-[var(--green)]" />
                <span className="text-[var(--green)]">编辑</span>
              </span>
            </span>
          </p>
          <p>
            <span>备注：</span>
            <span>哇哈哈饮料</span>
          </p>
          <p>
            <span>创建人：</span>
            <span>small.diao</span>
          </p>
          <p>
            <span>联系方式：</span>
            <span>13423234424</span>
          </p>
        </div>
      </CommonModule>
      <CommonModule
        title="账户管理"
        className="mt-[.16rem]"
        style={{
          height: `calc(100% - 1.72rem)`,
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
            <span className="text-[14px] text-[#666]">账户状态</span>
            <p className="text-[14px]">
              <span className="text-[#333] mr-[.2rem]">已冻结</span>
              <span
                className="text-[var(--green)] cursor-pointer"
                onClick={isFreeze}
              >
                启用
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
            <span className="text-[#0385F2] cursor-pointer">重置</span>
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
            <span className="text-[#0385F2] cursor-pointer">重置</span>
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
            <span className="text-[#0385F2] cursor-pointer">未绑定</span>
          </p>
        </div>
        <div className="flex items-start  not-first:mt-[.25rem]">
          <Icon
            name="h-icon-close"
            purity={false}
            style={{
              fontSize: ".3rem",
              marginRight: ".1rem",
            }}
          />
          <p className="flex justify-between items-center text-[14px] flex-1 leading-[.3rem] pb-[.2rem]">
            <span>
              <span className="text-[#666]">关闭账户</span>
              <span className="text-[var(--pink)] ml-[.16rem]">
                账户关闭后将彻底无法使用
              </span>
            </span>
            <span className="text-[#0385F2] cursor-pointer">关闭帐户</span>
          </p>
        </div>
      </CommonModule>
      <ValidatorComp />
    </Context.Provider>
  );
};

export default BaseInfo;
