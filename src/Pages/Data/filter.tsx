import { DatePicker } from "antd";
const { RangePicker: Picker } = DatePicker;
import locale from "antd/es/date-picker/locale/zh_CN";
import "dayjs/locale/zh-cn";
import Title from "./title";
import { Button, Form, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { useRef, useState } from "react";
import dayjs from "dayjs";
type FilterPropsType = {
  title: string;
  showFilter?: Boolean;
  showShortcutKey?: Boolean;
  onQuery?: Function;
};
const Filter = (props: FilterPropsType) => {
  let [form] = Form.useForm();
  let [formInitVal] = useState({
    rangeTime: [],
  });
  async function filterCb() {
    let { rangeTime } = await form.validateFields();
    props?.onQuery?.(
      rangeTime?.map((item) => dayjs(item).format("YYYY-MM-DD")) ?? []
    );
  }
  function shortCutTimeCb(val) {
    if (!val) {
      form.setFieldValue("rangeTime", []);
      return;
    }
    let prvTime = dayjs().subtract(val, "day");
    form.setFieldValue("rangeTime", [prvTime, dayjs()]);
  }
  return (
    <>
      <Title title={props.title} />
      {props.showFilter ? (
        <div className="flex items-center">
          {props.showShortcutKey ? (
            <Select
              placeholder="请选择"
              onChange={shortCutTimeCb}
              className="w-[1.1rem] mr-[.15rem]"
              allowClear
              options={[
                {
                  value: 7,
                  label: "最近7天",
                },
                {
                  value: 15,
                  label: "最近15天",
                },
                {
                  value: 30,
                  label: "最近30天",
                },
              ]}
            />
          ) : null}
          <Form
            form={form}
            className="flex"
            onFinish={filterCb}
            initialValues={formInitVal}
          >
            <Form.Item name="rangeTime" className="mb-0">
              <Picker locale={locale} />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                className="ml-[.1rem]"
                icon={<SearchOutlined />}
              >
                查询
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : null}
    </>
  );
};
Filter.defaultProps = {
  title: "",
  showFilter: true,
  showShortcutKey: false,
};
export default Filter;
