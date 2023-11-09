import styleScope from "./index.module.less";
import { EditOutlined, RightOutlined } from "@ant-design/icons";
import Icon from "@/Components/Icon";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import ValidatorComp from "./validator";
import Context from "./Context.jsx";
import CommonModule from "./common";
import { departmentEnum, operationIdEnum } from "@/Enum";
import { useRef, useState } from "react";
import { getSession, setSession } from "@/utils/base";
import dayjs from "dayjs";
import { Select, message } from "antd";
import {
  CloseAdminInterFace,
  ResetAdminGoogleAuthInterFace,
  ResetAdminPasswordInterFace,
  ResetAdminPinInterFace,
  SetAdminDepartmentInterFace,
  SwitchFreezeAdminInterFace,
  VerifyGoogleAuthInterFace,
  VerifyPinInterFace,
} from "@/api";

const BaseInfo = () => {
  let userData = getSession("userInfo");
  let { current: userInfo } = useRef<any>(userData);
  let moduleOrigin = useRef<any>();
  let pinToken = useRef();
  let googleToken = useRef();
  let [updateDep, setUpDateDep] = useState(false);
  let dep = JSON.parse(JSON.stringify(departmentEnum));
  console.log("userInfo: ", dep);
  // 提示信息
  const tipMessage = {
    pwd: "确认要重置登录密码，密码将重置为123456，请及时修改密码",
    freeze: `确认冻结员工：${userInfo.adminId}，冻结后将无法登录`,
    enable: `确认启用员工：${userInfo.adminId}，解冻后将恢复使用`,
    PIN: "确认重置PIN码，重置为0000",
    google: "确认重置Google验证器，重置后可重新",
    closeAccount: "确认要关闭此员工账户，停用后将无法恢复",
  };
  let [PIN, setPIN] = useState(false);
  let [googleCodeOpen, setGoogleCodeOpen] = useState(false);
  let [summary, setSummary] = useState("");
  let [tipOpen, setTipOpen] = useState(false);
  let [stop] = useStopPropagation();
  function isFreeze(e) {
    stop(e, () => {
      let flag = userInfo.state == 1 ? "freeze" : "enable";
      moduleOrigin.current = flag;
      setSummary(tipMessage[flag]);
      setPIN(!PIN);
    });
  }
  function resetPinCb(e) {
    stop(e, () => {
      moduleOrigin.current = "PIN";
      setSummary(tipMessage["PIN"]);
      setPIN(!PIN);
    });
  }
  function closeAccountCb(e) {
    stop(e, () => {
      moduleOrigin.current = "closeAccount";
      setSummary(tipMessage["closeAccount"]);
      setPIN(!PIN);
    });
  }
  function resetGoogleCb(e) {
    stop(e, () => {
      moduleOrigin.current = "google";
      setSummary(tipMessage["google"]);
      setPIN(!PIN);
    });
  }
  function resetPwdCb(e) {
    stop(e, () => {
      moduleOrigin.current = "pwd";
      setSummary(tipMessage["pwd"]);
      setPIN(!PIN);
    });
  }
  // PIN取消
  function onPINCancel() {
    setPIN(!PIN);
  }
  // PIN确定
  function onPINOk(val) {
    let operationId =
      moduleOrigin.current == "pwd"
        ? operationIdEnum["resetPwd"]
        : ["freeze", "enable"].includes(moduleOrigin.current)
        ? operationIdEnum["freezeOrEndisableAcount"]
        : moduleOrigin.current == "PIN"
        ? operationIdEnum["resetPin"]
        : moduleOrigin.current == "google"
        ? operationIdEnum["resetGoogle"]
        : operationIdEnum["colseAcount"];
    VerifyPinInterFace({
      pin: val,
      operationId,
    }).then((res) => {
      if (res.status) {
        setPIN(!PIN);
        pinToken.current = res.data;
        setGoogleCodeOpen(!googleCodeOpen);
      } else {
        message.error(res.message);
      }
    });
  }
  // Google取消
  function onGoogleCancel() {
    setGoogleCodeOpen(!googleCodeOpen);
  }
  // Google确定
  function onGoogleOk({ googleCode }) {
    let operationId =
      moduleOrigin.current == "pwd"
        ? operationIdEnum["resetPwd"]
        : ["freeze", "enable"].includes(moduleOrigin.current)
        ? operationIdEnum["freezeOrEndisableAcount"]
        : moduleOrigin.current == "PIN"
        ? operationIdEnum["resetPin"]
        : moduleOrigin.current == "google"
        ? operationIdEnum["resetGoogle"]
        : operationIdEnum["colseAcount"];
    VerifyGoogleAuthInterFace({
      googleCode,
      operationId,
    }).then((res) => {
      if (res.status) {
        googleToken.current = res.data;
        setGoogleCodeOpen(!googleCodeOpen);
        setTipOpen(!tipOpen);
      } else {
        message.error(res.message);
      }
    });
  }
  // 修改部门
  function editorDepCb() {
    setUpDateDep(!updateDep);
  }
  // 修改部门
  function selectChangeDepCb(value) {
    userInfo["department"] = value;
  }
  // 保存部门
  function saveDep() {
    SetAdminDepartmentInterFace({
      id: userInfo.adminId,
      department: userInfo.department,
    }).then((res) => {
      if (res.status) {
        editorDepCb();
        setSession("userInfo", userInfo);
      } else {
        message.error(res.message);
      }
    });
  }
  // 提示信息取消
  function onTipCancel() {
    setTipOpen(!tipOpen);
  }
  // 提示信息确定
  function onTipOk() {
    let headers = {
      "Pin-Token": pinToken.current,
      "Google-Auth-Token": googleToken.current,
    };
    if (["freeze", "enable"].includes(moduleOrigin.current)) {
      SwitchFreezeAdminInterFace(userInfo.adminId, headers).then((res) => {
        if (res.status) {
          userInfo.state = userInfo.state == 1 ? 2 : 1;
          setSession("userInfo", userInfo);
          setTipOpen(!tipOpen);
        } else {
          message.error(res.message);
        }
      });
      return;
    }
    if (moduleOrigin.current == "pwd") {
      ResetAdminPasswordInterFace(userInfo.adminId, headers).then((res) => {
        if (res.status) {
          message.success(res.message);
          setTipOpen(!tipOpen);
        } else {
          message.error(res.message);
        }
      });
      return;
    }
    if (moduleOrigin.current == "closeAccount") {
      CloseAdminInterFace(userInfo.adminId, headers).then((res) => {
        if (res.status) {
          userInfo.state = 3;
          setSession("userInfo", userInfo);
          message.success(res.message);
          setTipOpen(!tipOpen);
        } else {
          message.error(res.message);
        }
      });
      return;
    }
    if (moduleOrigin.current == "PIN") {
      ResetAdminPinInterFace(userInfo.adminId, headers).then((res) => {
        if (res.status) {
          message.success(res.message);
          setTipOpen(!tipOpen);
        } else {
          message.error(res.message);
        }
      });
      return;
    }
    if (moduleOrigin.current == "google") {
      ResetAdminGoogleAuthInterFace(userInfo.adminId, headers).then((res) => {
        if (res.status) {
          userInfo.googleSecret = null;
          setSession("userInfo", userInfo);
          message.success(res.message);
          setTipOpen(!tipOpen);
        } else {
          message.error(res.message);
        }
      });
      return;
    }
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
            <span>{userInfo.adminId}</span>
          </p>
          <p>
            <span>创建时间：</span>
            <span>{dayjs(userInfo.createTime).format("YYYY-MM-DD")}</span>
          </p>
          <p>
            <span>邮箱：</span>
            <span>{userInfo.email}</span>
          </p>
          <div className={styleScope["dep"]}>
            <span>部门：</span>
            <span className="flex items-center">
              {updateDep ? (
                <>
                  <Select
                    size="small"
                    onChange={selectChangeDepCb}
                    placeholder="请选择部门"
                    options={[
                      { value: "1", label: "研发部" },
                      { value: "2", label: "产品部" },
                    ]}
                  />
                  <span
                    onClick={saveDep}
                    className="text-[var(--green)] cursor-pointer ml-[.1rem]"
                  >
                    保存
                  </span>
                </>
              ) : (
                <>
                  {dep[userInfo.department] ?? "--"}
                  <RightOutlined className="text-[12px] ml-[.06rem]" />
                  <span className="cursor-pointer">
                    <EditOutlined className="ml-[.24rem] mr-[.1rem] text-[var(--green)]" />
                    <span onClick={editorDepCb} className="text-[var(--green)]">
                      编辑
                    </span>
                  </span>
                </>
              )}
            </span>
          </div>
          <p>
            <span>备注：</span>
            <span>{userInfo.note ?? "--"}</span>
          </p>
          <p>
            <span>创建人：</span>
            <span>{userInfo.creator ?? "--"}</span>
          </p>
          <p>
            <span>联系方式：</span>
            <span>{userInfo.mobile ?? "--"}</span>
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
              <span className="text-[#333] mr-[.2rem]">
                {/* 1 启动 2 冻结 3 关闭 */}
                {userInfo.state == 1
                  ? "已启用"
                  : userInfo.state == 2
                  ? "已冻结"
                  : "已关闭"}
              </span>
              <span
                className="text-[var(--green)] cursor-pointer"
                onClick={isFreeze}
              >
                {userInfo.state == 1
                  ? "冻结"
                  : userInfo.state == 2
                  ? "启用"
                  : ""}
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
            <span
              onClick={resetPwdCb}
              className="text-[#0385F2] cursor-pointer"
            >
              重置
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
            <span
              onClick={resetPinCb}
              className="text-[#0385F2] cursor-pointer"
            >
              重置
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
              onClick={resetGoogleCb}
              className="text-[#0385F2] cursor-pointer"
            >
              重置
            </span>
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
            {userInfo.state !== 3 ? (
              <span
                onClick={closeAccountCb}
                className="text-[#0385F2] cursor-pointer"
              >
                关闭帐户
              </span>
            ) : null}
          </p>
        </div>
      </CommonModule>
      <ValidatorComp />
    </Context.Provider>
  );
};

export default BaseInfo;
