/**
 * @summary 地址
 */
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import styleScope from "./index.module.less";
import RangePicker from "@/Components/RangePicker";
import TableScope from "./table-mock.jsx";
import { getSession, mergeClassName } from "@/utils/base";
import ModalScope from "@/Components/Modal";
import { useRef, useState } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import Icon from "@/Components/Icon";
import {
  AddAdminIpInterFace,
  DeleteAdminIpInterFace,
  SwitchDisableAdminIpInterFace,
  VerifyGoogleAuthInterFace,
  VerifyPinInterFace,
} from "@/api";
import { operationIdEnum } from "@/Enum";
const modalStyles = {
  header: {
    marginBottom: ".24rem",
  },
  body: {
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: ".15rem",
    paddingInline: ".5rem",
  },
};
const IpSystemManage = () => {
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const formRefEl = useRef<any>();
  const tableRefEl = useRef<any>();
  let [stop] = useStopPropagation();
  let [modalOpen, setModalOpen] = useState<Boolean>(false);
  let [deleteOpen, setDeleteOpen] = useState<Boolean>(false);
  let [deleteTitle, setDeleteTile] = useState<string>("");
  let [addIpAddrOpen, setAddIpAddrOpen] = useState<Boolean>(false);
  let [googleCodeOpen, setGoogleCodeOpen] = useState(false);
  let [tipMessage, setTipMessage] = useState(false);
  let [tipMessageFlag, setTipMessageFlag] = useState(false);
  let [moduleOrigin, setModuleOrigin] = useState("");
  let filterNote = useRef<any>();
  let filterTime = useRef<any>();
  let googleRef = useRef<any>();
  let addStaffRef = useRef<any>();
  let userInfo = getSession("userInfo");
  let [formInitVal, setFormInitVal] = useState({
    googleCode: "",
  });

  let [formAddAddrInitVal, setFormAddAddrInitVal] = useState({
    IpAddr: "",
    note: "",
  });
  let [currentData, setCurrentData] = useState<{ ip: ""; note: "" } | any>({
    ip: "",
    note: "",
  });
  let PINInitVal = useRef<any>({
    one: "",
    two: "",
    three: "",
    foure: "",
  });
  let token = useRef("");
  let googleToken = useRef("");
  function inputKeyUpCb(e, prvNode, key) {
    let keyCode = e.keyCode;
    if (keyCode === 8) {
      formRefEl.current.setFieldValue(key, "");
      prvNode.current.focus();
    }
  }
  function addIpAddr() {
    setModalOpen(!modalOpen);
    setModuleOrigin("add");
    setCurrentData({});
  }
  // 开启回调
  function enableCb(e, crt, title) {
    stop(e, () => {
      setModalOpen(!modalOpen);
      setModuleOrigin("enable");
      setDeleteTile(title);
      setCurrentData(crt);
    });
  }
  // 禁用回调
  function disableCb(e, crt, title) {
    stop(e, () => {
      setDeleteTile(title);
      setModalOpen(!modalOpen);
      setModuleOrigin("disable");
      setCurrentData(crt);
    });
  }
  // 删除
  function deleteCb(e, crt, title) {
    stop(e, () => {
      setDeleteTile(title);
      setModalOpen(!modalOpen);
      setModuleOrigin("delete");
      setCurrentData(crt);
    });
  }
  function pinOkCb() {
    let { one, two, three, foure } = PINInitVal.current;
    if (["enable", "delete", "disable", "add"].includes(moduleOrigin)) {
      VerifyPinInterFace({
        pin: `${one}${two}${three}${foure}`,
        operationId: ["enable", "disable"].includes(moduleOrigin)
          ? operationIdEnum["enableOrEnable"]
          : moduleOrigin == "delete"
          ? operationIdEnum["delete"]
          : operationIdEnum["add"],
      }).then((res) => {
        if (res.status) {
          token.current = res.data;

          if (moduleOrigin == "add") {
            setGoogleCodeOpen(!googleCodeOpen);
          } else {
            setDeleteOpen(true);
          }
          setModalOpen(!modalOpen);
          PINInitVal.current = {};
          formRefEl.current.resetFields(["one", "two", "three", "foure"]);
        } else {
          message.error(res.message);
        }
      });
    }
  }
  function pinCancelCb() {
    setModalOpen(!modalOpen);
  }
  function callGetTableFn() {
    let note = filterNote.current.input?.value;
    let time = filterTime.current?.timeStr ?? [];
    tableRefEl.current.getTableList({
      search: note || null,
      beginTime: time[0] || null,
      endTime: time[1] || null,
    });
  }
  function deleteAndDisableAndEnable(crt) {
    if (moduleOrigin == "delete") {
      DeleteAdminIpInterFace(crt.id, {
        "Pin-Token": token.current,
      }).then((res) => {
        if (res.status) {
          setDeleteOpen(false);
          callGetTableFn();
        } else {
          message.error(res.message);
        }
      });
      return;
    }
    SwitchDisableAdminIpInterFace(crt.id, {
      "Pin-Token": token.current,
    }).then((res) => {
      if (res.status) {
        setDeleteOpen(false);
        callGetTableFn();
      } else {
        message.error(res.message);
      }
    });
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
  function googleOkCb(values) {
    let { googleCode } = values;
    VerifyGoogleAuthInterFace({
      googleCode,
      operationId: operationIdEnum["add"],
    }).then((res) => {
      if (res.status) {
        googleToken.current = res.data;
        setAddIpAddrOpen(!addIpAddrOpen);
        setGoogleCodeOpen(!googleCodeOpen);
        googleRef.current.setFieldValue("googleCode", "");
      } else {
        message.error(res.message);
      }
    });
  }
  function addIpAddrCb(values) {
    let { IpAddr, note } = values;
    AddAdminIpInterFace(
      { ip: IpAddr, note },
      {
        "Pin-token": token.current,
        "Google-Auth-Token": googleToken.current,
      }
    ).then((res) => {
      setAddIpAddrOpen(false);
      setTipMessage(!tipMessage);
      setTipMessageFlag(res.status);
      if (res.status) {
        addStaffRef.current.resetFields(['IpAddr', 'note'])
        callGetTableFn();
      }
    });
  }
  function paginationCb({ current, pageSize, total }) {
    let note = filterNote.current.input?.value;
    let time = filterTime.current?.timeStr ?? [];
    tableRefEl.current.updateParmas(
      {
        search: note || null,
        beginTime: time[0] || null,
        endTime: time[1] || null,
      },
      {
        current,
        pageSize,
        total,
      }
    );
  }
  return (
    <>
      <div className={styleScope["filter-box"]}>
        <Input
          allowClear
          ref={filterNote}
          placeholder="备注"
          size="large"
          className="w-[3.2rem]"
        />
        <RangePicker ref={filterTime} size="large" />
        <Button
          type="primary"
          size="large"
          onClick={callGetTableFn}
          icon={<SearchOutlined />}
        >
          查询
        </Button>
        <div className="flex flex-1 justify-end">
          <Button
            onClick={addIpAddr}
            type="primary"
            size="large"
            icon={<PlusOutlined />}
          >
            新增IP地址
          </Button>
        </div>
      </div>
      <div
        className={mergeClassName("bg-[var(--white)]", styleScope["table-box"])}
      >
        <TableScope
          ref={tableRefEl}
          onDelete={deleteCb}
          onDisableCb={disableCb}
          onEnableCb={enableCb}
          onPaginationCb={paginationCb}
        />
      </div>
      {/* PIN */}
      <ModalScope
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
        onCancel={pinCancelCb}
        showFooter={false}
        open={modalOpen}
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
              <Button onClick={pinCancelCb} className="mr-[.1rem]">
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Form.Item>
          </Form>
        </div>
      </ModalScope>
      {/* google验证 */}
      <ModalScope
        onCancel={() => setGoogleCodeOpen(!googleCodeOpen)}
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
      </ModalScope>
      {/* 新增IP地址 */}
      <ModalScope
        onCancel={() => setAddIpAddrOpen(false)}
        showFooter={false}
        title={
          <span className="flex items-center font-normal">
            <i className={styleScope["icon"]}></i>新增IP地址
          </span>
        }
        open={addIpAddrOpen}
      >
        <Form
          layout="vertical"
          ref={addStaffRef}
          onFinish={addIpAddrCb}
          className="_reset-form w-full"
          initialValues={formAddAddrInitVal}
        >
          <Form.Item
            className="hidden_start px-[.3rem]"
            label={<span className="text-[#546078]">员工ID</span>}
          >
            <Input value={userInfo.adminId} disabled />
          </Form.Item>
          <Form.Item
            name="IpAddr"
            className="hidden_start px-[.3rem]"
            label={<span className="text-[#546078]">IP地址</span>}
          >
            <Input placeholder="请输入IP地址" />
          </Form.Item>
          <Form.Item
            name="note"
            className="hidden_start px-[.3rem] text-area"
            label={<span className="text-[#546078]">备注</span>}
          >
            <Input.TextArea
              className=""
              autoSize={{ minRows: 4, maxRows: 6 }}
              rows={6}
              placeholder="请输入备注内容"
            />
          </Form.Item>
          <Form.Item className={styleScope["btn-list"]}>
            <Button
              onClick={() => {
                setAddIpAddrOpen(false);
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
      {/* 提示信息 */}
      <ModalScope
        showFooter={true}
        onOk={() => setTipMessage(false)}
        onCancel={() => setTipMessage(false)}
        title={
          <span className="flex items-center font-normal">
            <i className={styleScope["icon"]}></i>提示信息
          </span>
        }
        open={tipMessage}
      >
        <div className="grid place-items-center">
          {tipMessageFlag ? (
            <>
              <Icon
                className="text-[var(--green)] !text-[66px]"
                name="h-icon-duigouxiao"
              />
              <p className="text-[16px] text-[#222] mt-[.25rem] mb-[.34rem]">
                新增成功
              </p>
            </>
          ) : (
            <>
              <Icon
                name="h-icon-duigouxiao"
                className="text-[var(--red)] !text-[66px]"
              />
              <p className="text-[16px] text-[#222] mt-[.25rem] mb-[.34rem]">
                操作失败
              </p>
            </>
          )}
        </div>
      </ModalScope>
      {/* 删除/禁用/启用 */}
      <ModalScope
        showFooter={true}
        onOk={() => deleteAndDisableAndEnable(currentData)}
        onCancel={() => setDeleteOpen(false)}
        title={
          <span className="flex items-center font-normal">
            <i className={styleScope["icon"]}></i>
            {deleteTitle}
          </span>
        }
        open={deleteOpen}
      >
        <Form
          layout="vertical"
          className="_reset-form w-full"
          initialValues={currentData}
        >
          <Form.Item
            className="hidden_start px-[.3rem]"
            label={<span className="text-[#546078]">IP地址</span>}
          >
            <Input disabled placeholder="请输入IP地址" value={currentData.ip} />
          </Form.Item>
          <Form.Item
            className="hidden_start px-[.3rem] text-area"
            label={<span className="text-[#546078]">备注</span>}
          >
            <Input.TextArea
              disabled
              autoSize={{ minRows: 2, maxRows: 6 }}
              value={currentData.note}
              placeholder="请输入备注内容"
            />
          </Form.Item>
          {/* <Form.Item className={styleScope["btn-list"]}>
            <Button
              onClick={() => {
                setAddIpAddrOpen(false);
              }}
            >
              <span className="text-[#999]">关闭</span>
            </Button>
            <Button
              onClick={() => {
                setTipMessage(true);
                setAddIpAddrOpen(false);
              }}
              type="primary"
            >
              确定
            </Button>
          </Form.Item> */}
        </Form>
      </ModalScope>
    </>
  );
};
export default IpSystemManage;
