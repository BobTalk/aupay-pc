import Icon from "@/Components/Icon";
import CommonModule from "./common";
import styleScope from "./index.module.less";
import { Button, Form, Input, message } from "antd";
import { useRef, useState } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { getSession, setSession } from "@/utils/base";
import ModalScope from "@/Components/Modal";
import {
  BindGoogleAuthInterFace,
  GetUserInfo,
  UpdateBaseInfoInterFace,
  UpdatePasswordInterFace,
  UpdatePinInterFace,
} from "@/api";
import Image from "@/Components/Image";
const PersonalInfo = () => {
  const updateInfoRefs = useRef<any>();
  let [isEditor, setIsEditor] = useState(false);
  let userData = getSession("userInfo");
  let [userInfo, setUserInfo] = useState(() => {
    let [countryCode, mobile] = userData.mobile.split(" ");
    return {
      ...userData,
      countryCode: countryCode.length > 5 ? 86 : countryCode,
      mobile: mobile ?? countryCode,
    };
  });
  let [stop] = useStopPropagation();
  let [bindGoogleOpen, setBindGoogleOpen] = useState(false);
  let [updateModuleOpen, setUpdateModuleOpen] = useState(false);
  let [googleImageUrl, setGoogleImageUrl] = useState();
  let [isBind, setIsBind] = useState(false);
  let [modalOrigin, setModalOrigin] = useState("");
  let [updateInfoList, setUpdateInfoList] = useState({
    oldInfo: "",
    newInfo: "",
    confirmInfo: "",
  });
  function updateMobileCb(e) {
    setUserInfo((info) => ({
      ...info,
      mobile: e.target.value,
    }));
  }
  function isEditorCb(e) {
    stop(e, () => {
      setIsEditor(!isEditor);
      if (isEditor) {
        UpdateBaseInfoInterFace({
          mobile: userInfo.countryCode + " " + userInfo.mobile,
        }).then((res) => {
          if (res.status) {
            message.success(res.message);
            GetUserInfo().then((res) => {
              setSession("userInfo", res);
            });
          } else {
            message.error(res.message);
          }
        });
      }
    });
  }
  function bindGoogleCb() {
    if (userInfo.googleSecret) return;
    BindGoogleAuthInterFace().then((res) => {
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
  function updatePinCb() {
    setModalOrigin("pin");
    setUpdateModuleOpen(!updateModuleOpen);
  }
  function updatePwdCb() {
    setModalOrigin("pwd");
    setUpdateModuleOpen(!updateModuleOpen);
  }
  function updataModuleCancelCb() {
    setUpdateModuleOpen(!updateModuleOpen);
  }
  function confirmSubmitCb(values) {
    let { oldInfo, newInfo, confirmInfo } = values;
    if (modalOrigin == "pin") {
      UpdatePinInterFace({
        oldPin: oldInfo,
        newPin: confirmInfo,
      }).then((res) => {
        if (res.status) {
          message.success(res.message);
          setUpdateModuleOpen(!updateModuleOpen);
          updateInfoRefs.current.resetFields([
            "oldInfo",
            "newInfo",
            "confirmInfo",
          ]);
        } else {
          message.error(res.message);
        }
      });
      return;
    }
    UpdatePasswordInterFace({
      oldPassword: oldInfo,
      newPassword: confirmInfo,
    }).then((res) => {
      if (res.status) {
        message.success(res.message);
        setUpdateModuleOpen(!updateModuleOpen);
        updateInfoRefs.current.resetFields([
          "oldInfo",
          "newInfo",
          "confirmInfo",
        ]);
      } else {
        message.error(res.message);
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
            <span>{userInfo.adminId}</span>
          </p>
          <p>
            <span>备注：</span>
            <span>{userInfo.note ?? "--"}</span>
          </p>
          <p>
            <span>联系方式：</span>
            {isEditor ? (
              <Input
                type="mobile"
                maxLength={11}
                onChange={updateMobileCb}
                defaultValue={userInfo.mobile ?? "--"}
              />
            ) : (
              <span>{userInfo.mobile ?? "--"}</span>
            )}
          </p>
          <p>
            <span>部门：</span>
            <span>{userInfo.department ?? "--"}</span>
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
                {userInfo.email ?? "--"}
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
              <span
                onClick={updatePwdCb}
                className="text-[#0385F2] cursor-pointer"
              >
                修改
              </span>
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
              <span
                onClick={updatePinCb}
                className="text-[#0385F2] cursor-pointer"
              >
                修改
              </span>
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
              onClick={bindGoogleCb}
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
      <ModalScope
        onCancel={updataModuleCancelCb}
        cancelText="关闭"
        showFooter={false}
        title={
          <span className="flex items-center font-normal">
            <i className={styleScope["icon"]}></i>修改
            {modalOrigin == "pin" ? "PIN码" : "登录密码"}
          </span>
        }
        open={updateModuleOpen}
      >
        <Form
          ref={updateInfoRefs}
          initialValues={updateInfoList}
          layout="vertical"
          onFinish={confirmSubmitCb}
          className="w-full"
        >
          <div className="px-[.3rem]">
            <Form.Item
              name="oldInfo"
              label={
                <span className="text-[var(--menu-color)]">
                  {modalOrigin == "pin" ? "输入旧PIN码" : "输入原密码"}
                </span>
              }
            >
              <Input.Password
                size="large"
                maxLength={modalOrigin == "pin" ? 4 : null}
                placeholder="请输入"
              />
            </Form.Item>
            <Form.Item
              name="newInfo"
              label={
                <span className="text-[var(--menu-color)]">
                  {modalOrigin == "pin" ? "输入新PIN码" : "输入新密码"}
                </span>
              }
            >
              <Input.Password
                size="large"
                maxLength={modalOrigin == "pin" ? 4 : null}
                placeholder="请输入"
              />
            </Form.Item>
            <Form.Item
              name="confirmInfo"
              label={
                <span className="text-[var(--menu-color)]">
                  {modalOrigin == "pin" ? "确认新PIN码" : "确认新密码"}
                </span>
              }
            >
              <Input.Password
                size="large"
                maxLength={modalOrigin == "pin" ? 4 : null}
                placeholder="请输入"
              />
            </Form.Item>
          </div>
          <Form.Item className="flex border-t border-t-[var(--border-color)] pt-[.2rem] mb-[.2rem] justify-end">
            <Button onClick={updataModuleCancelCb} className="mr-[.1rem]">
              关闭
            </Button>
            <Button className="mr-[.3rem]" type="primary" htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </Form>
      </ModalScope>
    </>
  );
};

export default PersonalInfo;
