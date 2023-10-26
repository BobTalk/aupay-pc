import { Button, DatePicker, Form, Input } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import { useState } from "react";
import EditorPanel from "./tinymce";
const EditorNotice = () => {
  let [formInitalVal, setFormInitalVal] = useState({
    employeeId: "",
    title: "",
    publishTime: [],
    content: "",
  });
  return (
    <div className="bg-[var(--white)] h-full px-[.5rem] py-[.4rem] rounded-[.06rem] overflow-auto">
      <Form
        autoComplete="off"
        colon={false}
        labelAlign="left"
        labelCol={{ span: 3 }}
        // wrapperCol={{ span: 10 }}
        style={{ maxWidth: 910 }}
        initialValues={formInitalVal}
      >
        <Form.Item label="员工ID">
          <Input size="large" defaultValue="win.yin" disabled={true} />
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
          <Input size="large" placeholder="请输入公告标题" />
        </Form.Item>
        <Form.Item label="发布时间">
          <div className="flex justify-between items-center">
            <DatePicker className="flex-1" size="large" locale={locale} />
            <span className="px-[.08rem] text-[#999] text-[14px]">至</span>
            <DatePicker className="flex-1" size="large" locale={locale} />
          </div>
        </Form.Item>
        <Form.Item label="内容详情">
          <EditorPanel />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button
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
            新增并发布
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default EditorNotice;
