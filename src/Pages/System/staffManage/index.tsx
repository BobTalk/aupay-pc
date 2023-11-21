/**
 * @summary 地址
 */
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, message } from "antd";
import styleScope from "./index.module.less";
import TableScope from "./table-mock.jsx";
import { getSession, mergeClassName } from "@/utils/base";
import ModalScope from "@/Components/Modal";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  AddStaffInfo,
  VerifyGoogleAuthInterFace,
  VerifyPinInterFace,
} from "@/api";
import PinScopeComp from "@/Pages/PinModal";
import GoogleScopeComp from "@/Pages/GoogleModal";
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
  const tableRefEl = useRef<any>();
  const filterNote = useRef<any>();
  const formRefEl = useRef<any>();
  const token = useRef<any>();
  const googleToken = useRef<any>();
  const googleRef = useRef<any>();
  const addStaffRef = useRef<any>();
  const countryCode = useRef(86);
  let PINInitVal = useRef<any>({
    one: "",
    two: "",
    three: "",
    foure: "",
  });
  const { pathname } = useLocation();
  let [stop] = useStopPropagation();
  let [PINOpen, setPinOpen] = useState<Boolean>(false);
  let [googleCodeOpen, setGoogleCodeOpen] = useState(false);
  let [addStaffOpen, setAddStaffOpen] = useState(false);
  let [addStaffInitVal, setAddStaffInitVal] = useState({
    adminId: "",
    email: "",
    phone: "",
    dep: "",
    note: "",
  });
  let [formInitVal, setFormInitVal] = useState({
    googleCode: "",
  });
  function inputKeyUpCb(e, prvNode, key) {
    let keyCode = e.keyCode;
    if (keyCode === 8) {
      formRefEl.current.setFieldValue(key, "");
      prvNode.current.focus();
    }
  }
  function inputChange(e, reactNode, key) {
    stop(e, () => {
      let val = e.target.value;
      PINInitVal.current[key] = val;
      formRefEl.current.setFieldValue(key, "*");
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
  // 校验PIN
  function pinOkCb(value) {
    // let { one, two, three, foure } = PINInitVal.current;
    VerifyPinInterFace({
      pin: value,
      operationId: 230,
    }).then((res) => {
      if (res.status) {
        token.current = res.data;
        setPinOpen(!PINOpen);
        setGoogleCodeOpen(!googleCodeOpen);
        PINInitVal.current = {};
      } else {
        message.error(res.message);
      }
    });
  }
  // 员工账户状态
  function isEffectiveCb(e, crt) {}
  function callGetTableFn() {
    let note = filterNote.current.input?.value;
    tableRefEl.current.getTableList({
      search: note || null,
    });
  }
  function paginationCb({ current, pageSize, total }) {
    let note = filterNote.current.input?.value;
    tableRefEl.current.updateParmas(
      {
        search: note || null,
      },
      {
        current,
        pageSize,
        total,
      }
    );
  }
  function googleOkCb(values) {
    let { googleCode } = values;
    VerifyGoogleAuthInterFace({
      googleCode,
      operationId: 230,
    }).then((res) => {
      if (res.status) {
        googleToken.current = res.data;
        setAddStaffOpen(!addStaffOpen);
        setGoogleCodeOpen(!googleCodeOpen);
      } else {
        message.error(res.message);
      }
    });
  }
  function addStaffSubmitCb(values) {
    console.log("values: ", values);
    let { adminId, email, phone, dep, note } = values;
    console.log(countryCode.current);
    AddStaffInfo(
      {
        adminId,
        note,
        email,
        mobile: `${countryCode.current} ${phone}`,
        department: dep,
      },
      {
        "Pin-token": token.current,
        "Google-Auth-Token": googleToken.current,
      }
    )
      .then((res) => {
        if (res.status) {
          addStaffRef.current.resetFields([
            "adminId",
            "email",
            "phone",
            "dep",
            "note",
          ]);

          callGetTableFn();
        } else {
          message.error(res.message);
        }
      })
      .finally(() => {
        setAddStaffOpen(!addStaffOpen);
      });
  }
  function countryCodeCb(val) {
    countryCode.current = val;
  }
  return pathname === "/aupay/system/staff-manage/detail" ? (
    <Outlet />
  ) : (
    <>
      <div className={styleScope["filter-box"]}>
        <Input
          allowClear
          ref={filterNote}
          placeholder="员工ID"
          size="large"
          className="w-[3.2rem]"
        />
        <Button
          onClick={callGetTableFn}
          type="primary"
          size="large"
          icon={<SearchOutlined />}
        >
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
        <TableScope
          ref={tableRefEl}
          onPaginationCb={paginationCb}
          onState={isEffectiveCb}
        />
      </div>
      {/* PIN */}
      <PinScopeComp
        open={PINOpen}
        onCancel={() => setPinOpen(!PINOpen)}
        onFinish={pinOkCb}
      />
      {/* <ModalScope
        style={{
          header: {
            marginBottom: ".24rem",
          },
          body: {
            gridTemplateColumns: "1fr",
            gap: ".15rem",
            paddingInline: "0",
          },
        }}
        showFooter={false}
        onCancel={() => setPinOpen(!PINOpen)}
        open={PINOpen}
        title={
          <span className="flex items-center font-normal">
            <i className={styleScope["icon"]}></i>验证PIN
          </span>
        }
      >
        <div>
          <Form onFinish={pinOkCb} ref={formRefEl} initialValues={PINInitVal}>
            <div className="flex gap-[.2rem] px-[.5rem]">
              <Form.Item name="one">
                <Input
                  ref={inputRef1}
                  maxLength={1}
                  onKeyUp={(e) => inputKeyUpCb(e, undefined, "one")}
                  onChange={(e) => inputChange(e, inputRef2, "one")}
                  className={styleScope["input-border"]}
                  bordered={false}
                />
              </Form.Item>
              <Form.Item name="two">
                <Input
                  ref={inputRef2}
                  onKeyUp={(e) => inputKeyUpCb(e, inputRef1, "two")}
                  onChange={(e) => inputChange(e, inputRef3, "two")}
                  maxLength={1}
                  className={styleScope["input-border"]}
                  bordered={false}
                />
              </Form.Item>
              <Form.Item name="three">
                <Input
                  onKeyUp={(e) => inputKeyUpCb(e, inputRef2, "three")}
                  onChange={(e) => inputChange(e, inputRef4, "three")}
                  ref={inputRef3}
                  maxLength={1}
                  className={styleScope["input-border"]}
                  bordered={false}
                />
              </Form.Item>
              <Form.Item name="foure">
                <Input
                  onKeyUp={(e) => inputKeyUpCb(e, inputRef3, "foure")}
                  onChange={(e) => inputChange(e, undefined, "foure")}
                  ref={inputRef4}
                  maxLength={1}
                  className={styleScope["input-border"]}
                  bordered={false}
                />
              </Form.Item>
            </div>
            <Form.Item className="border-t border-t-[var(--border-color)] flex justify-end pt-[.2rem] pr-[.2rem]">
              <Button
                onClick={() => setPinOpen(!PINOpen)}
                className="mr-[.1rem]"
              >
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Form.Item>
          </Form>
        </div>
      </ModalScope> */}
      {/* google验证 */}
      <GoogleScopeComp
        onFinish={googleOkCb}
        onCancel={() => setGoogleCodeOpen(!googleCodeOpen)}
        open={googleCodeOpen}
      />
      {/* <ModalScope
        showFooter={false}
        title={
          <span className="flex items-center font-normal">
            <i className={styleScope["icon"]}></i>验证Google
          </span>
        }
        open={googleCodeOpen}
      >
        <Form
          ref={googleRef}
          layout="vertical"
          className="_reset-form w-full"
          initialValues={formInitVal}
          onFinish={googleOkCb}
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
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </ModalScope> */}
      {/* 新增员工 */}
      <ModalScope
        showFooter={false}
        onCancel={() => setAddStaffOpen(false)}
        title={
          <span className="flex items-center font-normal">
            <i className={styleScope["icon"]}></i>新增员工
          </span>
        }
        open={addStaffOpen}
      >
        <Form
          layout="vertical"
          ref={addStaffRef}
          className="_reset-form w-full"
          initialValues={addStaffInitVal}
          onFinish={addStaffSubmitCb}
        >
          <Form.Item
            name="adminId"
            className="hidden_start px-[.3rem]"
            label={<span className="text-[#546078]">员工ID</span>}
          >
            <Input placeholder="请输入员工ID" />
          </Form.Item>
          <Form.Item
            name="email"
            className="hidden_start px-[.3rem]"
            label={<span className="text-[#546078]">邮箱</span>}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            name="phone"
            className="hidden_start px-[.3rem]"
            label={<span className="text-[#546078]">联系方式</span>}
          >
            <Input
              size="large"
              addonBefore={<AddonBeforePhone onCountryCodeCb={countryCodeCb} />}
              placeholder="请输入联系方式"
            />
          </Form.Item>
          <Form.Item
            name="dep"
            className="hidden_start px-[.3rem]"
            label={<span className="text-[#546078]">部门</span>}
          >
            <Select
              size="large"
              placeholder="请选择部门"
              options={[
                { value: "1", label: "研发部" },
                { value: "2", label: "产品部" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="note"
            className="hidden_start px-[.3rem] text-area"
            label={<span className="text-[#546078]">备注</span>}
          >
            <Input.TextArea
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
            <Button htmlType="submit" type="primary">
              确定
            </Button>
          </Form.Item>
        </Form>
      </ModalScope>
    </>
  );
};
const AddonBeforePhone = (props) => {
  function selectChangeCb(val) {
    props?.onCountryCodeCb?.(val);
  }
  return (
    <div className="flex items-center">
      <PlusOutlined className="text-[14px] text-[#333]" />
      <Select
        className="text-[14px] text-[#333]"
        size="large"
        defaultValue="86"
        onChange={selectChangeCb}
        options={[{ value: "86", label: "86" }]}
      />
    </div>
  );
};

export default StaffSystemManage;
