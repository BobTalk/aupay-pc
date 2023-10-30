/**
 * @summary 地址
 */
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import styleScope from "./index.module.less";
import RangePicker from "@/Components/RangePicker";
import TableScope from "./table-mock.jsx";
import { mergeClassName } from "@/utils/base";
import ModalScope from "@/Components/Modal";
import { useRef, useState } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import Icon from "@/Components/Icon";
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
const IpSystemManage = () => {
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  let [stop] = useStopPropagation();
  let [modalOpen, setModalOpen] = useState<Boolean>(false);
  let [deleteOpen, setDeleteOpen] = useState<Boolean>(false);
  let [deleteTitle, setDeleteTile] = useState<string>("");
  let [addIpAddrOpen, setAddIpAddrOpen] = useState<Boolean>(false);
  let [googleCodeOpen, setGoogleCodeOpen] = useState(false);
  let [tipMessage, setTipMessage] = useState(false);
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
  function addIpAddr() {
    setModalOpen(!modalOpen);
  }
  function enableCb(e, crt, title) {
    stop(e, () => {
      setDeleteTile(title);
      setDeleteOpen(!deleteOpen);
    });
  }
  function disableCb(e, crt, title) {
    stop(e, () => {
      setDeleteTile(title);
      setDeleteOpen(!deleteOpen);
    });
  }
  function deleteCb(e, crt, title) {
    stop(e, () => {
      setDeleteTile(title);
      setDeleteOpen(!deleteOpen);
    });
  }
  function inputChange(e, reactNode) {
    stop(e, () => {
      let val = e.target.value;
      if (val && reactNode) {
        reactNode.current.focus();
      }
    });
  }

  return (
    <>
      <div className={styleScope["filter-box"]}>
        <Input placeholder="备注" size="large" className="w-[3.2rem]" />
        <RangePicker size="large" />
        <Button type="primary" size="large" icon={<SearchOutlined />}>
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
          onDelete={deleteCb}
          onDisableCb={disableCb}
          onEnableCb={enableCb}
        />
      </div>
      {/* PIN */}
      <ModalScope
        style={modalStyles}
        showFooter={true}
        onOk={() => {
          setModalOpen(!modalOpen);
          setGoogleCodeOpen(!googleCodeOpen);
        }}
        onCancel={() => setModalOpen(!modalOpen)}
        open={modalOpen}
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
                console.log("---google---");
                setGoogleCodeOpen(!googleCodeOpen);
                setAddIpAddrOpen(!addIpAddrOpen);
              }}
            >
              确定
            </Button>
          </Form.Item>
        </Form>
      </ModalScope>
      {/* 新增IP地址 */}
      <ModalScope
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
            label={<span className="text-[#546078]">IP地址</span>}
          >
            <Input placeholder="请输入IP地址" />
          </Form.Item>
          <Form.Item
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
            <Button
              onClick={() => {
                setTipMessage(true);
                setAddIpAddrOpen(false);
              }}
              type="primary"
            >
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
          {true ? (
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
        onOk={() => setDeleteOpen(false)}
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
          initialValues={formInitVal}
        >
          <Form.Item
            className="hidden_start px-[.3rem]"
            label={<span className="text-[#546078]">IP地址</span>}
          >
            <Input disabled placeholder="请输入IP地址" />
          </Form.Item>
          <Form.Item
            className="hidden_start px-[.3rem] text-area"
            label={<span className="text-[#546078]">备注</span>}
          >
            <Input.TextArea
              disabled
              autoSize={{ minRows: 2, maxRows: 6 }}
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
