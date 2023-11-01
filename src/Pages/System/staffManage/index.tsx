/**
 * @summary 地址
 */
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import styleScope from "./index.module.less";
import RangePicker from "@/Components/RangePicker";
import TableScope from "./table-mock.jsx";
import { mergeClassName } from "@/utils/base";
import ModalScope from "@/Components/Modal";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
const modalStyles = {
  header: {
    marginBottom: ".24rem",
  },
  body: {
    gridTemplateColumns: `repeat(4, 1fr)`,
    gap: ".15rem",
    paddingInline: ".5rem",
  },
};
const StaffSystemManage = () => {
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const { pathname } = useLocation();
  let [stop] = useStopPropagation();
  let [PINOpen, setPinOpen] = useState<Boolean>(false);
  let [googleCodeOpen, setGoogleCodeOpen] = useState(false);
  let [addStaffOpen, setAddStaffOpen] = useState(false);
  let [formInitVal, setFormInitVal] = useState({
    googleCode: "",
  });
  function inputKeyUpCb(e, prvNode) {
    let keyCode = e.keyCode;
    if (prvNode && keyCode === 8) {
      e.target.value = "";
      prvNode.current.focus();
    }
  }
  function inputChange(e, reactNode) {
    stop(e, () => {
      let val = e.target.value;
      if (val && reactNode) {
        reactNode.current.focus();
      }
    });
  }
  // 新增员工
  function addStaffCb(e) {
    stop(e, () => {
      setPinOpen(!PINOpen);
    });
  }
  // 员工账户状态
  function isEffectiveCb(e, crt) {}
  return pathname === "/aupay/system/staff-manage/detail" ? (
    <Outlet />
  ) : (
    <>
      <div className={styleScope["filter-box"]}>
        <Input placeholder="备注搜索" size="large" className="w-[3.2rem]" />
        <RangePicker size="large" />
        <Button type="primary" size="large" icon={<SearchOutlined />}>
          查询
        </Button>
        <div className="flex flex-1 justify-end">
          <Button
            onClick={addStaffCb}
            type="primary"
            size="large"
            icon={<PlusOutlined />}
          >
            新增员工
          </Button>
        </div>
      </div>
      <div
        className={mergeClassName("bg-[var(--white)]", styleScope["table-box"])}
      >
        <TableScope onState={isEffectiveCb} />
      </div>
      {/* PIN */}
      <ModalScope
        style={modalStyles}
        showFooter={true}
        onOk={() => {
          setPinOpen(!PINOpen);
          setGoogleCodeOpen(!googleCodeOpen);
        }}
        onCancel={() => setPinOpen(!PINOpen)}
        open={PINOpen}
        title={
          <span className="flex items-center font-normal">
            <i className={styleScope["icon"]}></i>验证PIN
          </span>
        }
      >
        <Input
          ref={inputRef1}
          maxLength={1}
          onKeyUp={(e) => inputKeyUpCb(e, undefined)}
          onChange={(e) => inputChange(e, inputRef2)}
          className={styleScope["input-border"]}
          bordered={false}
        />
        <Input
          ref={inputRef2}
          onKeyUp={(e) => inputKeyUpCb(e, inputRef1)}
          onChange={(e) => inputChange(e, inputRef3)}
          maxLength={1}
          className={styleScope["input-border"]}
          bordered={false}
        />
        <Input
          onKeyUp={(e) => inputKeyUpCb(e, inputRef2)}
          onChange={(e) => inputChange(e, inputRef4)}
          ref={inputRef3}
          maxLength={1}
          className={styleScope["input-border"]}
          bordered={false}
        />
        <Input
          onKeyUp={(e) => inputKeyUpCb(e, inputRef3)}
          onChange={(e) => inputChange(e, undefined)}
          ref={inputRef4}
          maxLength={1}
          className={styleScope["input-border"]}
          bordered={false}
        />
      </ModalScope>
      {/* google验证 */}
      <ModalScope
        showFooter={false}
        title={
          <span className="flex items-center font-normal">
            <i className={styleScope["icon"]}></i>验证Google
          </span>
        }
        open={googleCodeOpen}
      >
        <Form
          layout="vertical"
          className="_reset-form w-full"
          initialValues={formInitVal}
        >
          <Form.Item
            className="hidden_start px-[.3rem]"
            label={<span className="text-[#546078]">Google验证码</span>}
            name="googleCode"
            rules={[
              {
                required: true,
                message: "请输入Google验证码",
              },
            ]}
          >
            <Input placeholder="请输入Google验证码" />
          </Form.Item>
          <Form.Item className={styleScope["btn-list"]}>
            <Button onClick={() => setGoogleCodeOpen(!googleCodeOpen)}>
              <span className="text-[#999]">关闭</span>
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setGoogleCodeOpen(!googleCodeOpen);
                setAddStaffOpen(!addStaffOpen);
              }}
            >
              确定
            </Button>
          </Form.Item>
        </Form>
      </ModalScope>
      {/* 新增员工 */}
      <ModalScope
        showFooter={false}
        title={
          <span className="flex items-center font-normal">
            <i className={styleScope["icon"]}></i>新增员工
          </span>
        }
        open={addStaffOpen}
      >
        <Form
          layout="vertical"
          className="_reset-form w-full"
          initialValues={formInitVal}
        >
          <Form.Item
            className="hidden_start px-[.3rem]"
            label={<span className="text-[#546078]">员工ID</span>}
          >
            <Input value={"win.win"} disabled />
          </Form.Item>
          <Form.Item
            className="hidden_start px-[.3rem]"
            label={<span className="text-[#546078]">邮箱</span>}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            className="hidden_start px-[.3rem]"
            label={<span className="text-[#546078]">联系方式</span>}
          >
            <Input
              size="large"
              addonBefore={<AddonBeforePhone />}
              placeholder="请输入联系方式"
            />
          </Form.Item>
          <Form.Item
            className="hidden_start px-[.3rem]"
            label={<span className="text-[#546078]">部门</span>}
          >
            <Select
              size="large"
              placeholder="请选择"
              defaultValue="001"
              options={[{ value: "001", label: "总裁办" }]}
            />
          </Form.Item>
          <Form.Item
            className="hidden_start px-[.3rem] text-area"
            label={<span className="text-[#546078]">备注</span>}
          >
            <Input.TextArea
              className=""
              autoSize={{ minRows: 4, maxRows: 6 }}
              rows={6}
              placeholder="请输入备注"
            />
          </Form.Item>
          <Form.Item className={styleScope["btn-list"]}>
            <Button
              onClick={() => {
                setAddStaffOpen(!addStaffOpen);
              }}
            >
              <span className="text-[#999]">关闭</span>
            </Button>
            <Button
              onClick={() => {
                setAddStaffOpen(!addStaffOpen);
              }}
              type="primary"
            >
              确定
            </Button>
          </Form.Item>
        </Form>
      </ModalScope>
    </>
  );
};
const AddonBeforePhone = () => {
  return (
    <div className="flex items-center">
      <PlusOutlined className="text-[14px] text-[#333]" />
      <Select
        className="text-[14px] text-[#333]"
        size="large"
        defaultValue="86"
        options={[{ value: "86", label: "86" }]}
      />
    </div>
  );
};

export default StaffSystemManage;
