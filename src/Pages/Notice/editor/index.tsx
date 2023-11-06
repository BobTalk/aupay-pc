import { Button, DatePicker, Form, Input, message } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import { useState } from "react";
import EditorPanel from "./tinymce";
import { useLocation, useNavigate } from "react-router-dom";
import { AddAnnouncementInterFace, UpdateAnnouncementInterFace } from "@/api";
const EditorNotice = () => {
  let { state: urlParams } = useLocation();
  console.log("urlParams: ", urlParams);
  let navigate = useNavigate();
  let [formInitalVal, setFormInitalVal] = useState({
    employeeId: urlParams.id,
    title: urlParams?.crt?.title,
    publishTime: [],
    content: urlParams?.crt?.content,
  });
  function cancleCb() {
    navigate("/aupay/notice", { replace: true });
  }
  function publishAndAddNoticeCb(values) {
    let { title, content } = values;
    if (urlParams.module === "add") {
      AddAnnouncementInterFace({
        title,
        content,
        isShow: false,
        isRoll: false,
      }).then((res) => {
        if (res.status) {
          message.success(res.message);
          cancleCb();
        } else {
          message.error(res.message);
        }
      });
    } else {
      UpdateAnnouncementInterFace({
        title,
        content,
        isShow: urlParams.crt.isShow,
        isRoll: urlParams.crt.isRoll,
      }).then((res) => {
        if (res.status) {
          message.success(res.message);
          cancleCb();
        } else {
          message.error(res.message);
        }
      });
    }
  }
  return (
    <div className="bg-[var(--white)] h-full px-[.5rem] py-[.4rem] rounded-[.06rem] overflow-auto">
      <Form
        autoComplete="off"
        colon={false}
        labelAlign="left"
        onFinish={publishAndAddNoticeCb}
        labelCol={{ span: 3 }}
        style={{ maxWidth: 910 }}
        initialValues={formInitalVal}
      >
        <Form.Item label="员工ID">
          <Input
            size="large"
            defaultValue={formInitalVal.employeeId}
            disabled={true}
          />
        </Form.Item>
        <Form.Item
          label="标题"
          name="title"
          rules={[
            {
              required: true,
              message: "请输入标题",
            },
          ]}
        >
          <Input
            size="large"
            defaultValue={formInitalVal.title}
            placeholder="请输入公告标题"
          />
        </Form.Item>
        {urlParams.module !== "add" ? null : (
          <Form.Item label="发布时间" name="publishTime">
            <div className="flex justify-between items-center">
              <DatePicker
                showToday={false}
                onChange={(val) => {
                  setFormInitalVal((v) => ({
                    ...v,
                    publishTime: [val, v.publishTime[1]],
                  }));
                }}
                className="flex-1"
                size="large"
                locale={locale}
              />
              <span className="px-[.08rem] text-[#999] text-[14px]">至</span>
              <DatePicker
                showToday={false}
                onChange={(val) => {
                  setFormInitalVal((v) => ({
                    ...v,
                    publishTime: [v.publishTime[0], val],
                  }));
                }}
                className="flex-1"
                size="large"
                locale={locale}
              />
            </div>
          </Form.Item>
        )}
        <Form.Item label="内容详情" name="content">
          <EditorPanel
            onChange={(val) => {
              setFormInitalVal((v) => ({
                ...v,
                content: val,
              }));
            }}
            value={formInitalVal.content}
          />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button
            onClick={cancleCb}
            size="large"
            className="min-w-[1.13rem] bg-[var(--border-color)] mr-[.24rem]"
          >
            取消
          </Button>
          <Button
            size="large"
            className="min-w-[1.13rem]"
            type="primary"
            htmlType="submit"
          >
            {urlParams.module == "add" ? "新增并发布" : "确定更新"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default EditorNotice;
