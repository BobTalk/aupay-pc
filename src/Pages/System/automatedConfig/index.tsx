import { Input, Select } from "antd";
import styleScope from "./index.module.less";
import greenIcon from "./images/green-icon.svg";
import blueIcon from "./images/blue-icon.svg";
const AutomatedSystemConfig = () => {
  function timeList() {
    let timeList = [];
    for (let index = 1; index <= 24; index++) {
      timeList.push({ value: index + "", label: index + "点" });
    }
    return timeList;
  }
  return (
    <>
      <CommonBox title="用户地址归集">
        <div className="flex items-center gap-[.24rem] not-first:mt-[.16rem]">
          <label className="text-[14px] text-[var(--menu-color)]">
            用户地址固定归集：
          </label>
          <div className="flex items-center gap-[.16rem] text-[14px] text-[#333]">
            <span>＞</span>
            <Input
              defaultValue="1000"
              placeholder="请输入"
              className="max-w-[1.64rem]"
              suffix={<>USDT</>}
            />
            <a className="text-[var(--blue)]">保存</a>
          </div>
        </div>
        <div className="flex items-center gap-[.24rem] not-first:mt-[.16rem]">
          <label className="text-[14px] text-[var(--menu-color)]">
            用户地址周期归集：
          </label>
          <div className="flex items-center  gap-[.16rem] text-[14px] text-[#333]">
            <span>每</span>
            <Select
              defaultValue="1"
              style={{ width: "1.64rem" }}
              options={[
                { value: "1", label: "周一" },
                { value: "2", label: "周二" },
                { value: "3", label: "周三" },
                { value: "4", label: "周四" },
                { value: "5", label: "周五" },
                { value: "6", label: "周六" },
                { value: "7", label: "周日" },
              ]}
            />
            <Select
              defaultValue="1"
              style={{ width: "1.64rem" }}
              options={timeList()}
            />
            <span>＞</span>
            <Input
              defaultValue="1000"
              placeholder="请输入"
              className="max-w-[1.64rem] mr-[.16rem] ml-[.1rem]"
              suffix={<>USDT</>}
            />
            <a className="text-[var(--blue)]">保存</a>
          </div>
        </div>
        <div className="flex items-center gap-[.24rem] not-first:mt-[.16rem]">
          <label className="text-[14px] text-[var(--menu-color)]">
            用户地址手动归集：
          </label>
          <div className="flex items-center gap-[.16rem] text-[14px] text-[#333]">
            <span>＞</span>
            <Input
              defaultValue="1000"
              placeholder="请输入"
              className="max-w-[1.64rem]"
              suffix={<>USDT</>}
            />
            <a className="text-[var(--blue)]">编辑</a>
            <a className="text-[var(--blue)]">保存</a>
          </div>
        </div>
      </CommonBox>
      <CommonBox title="中转地址">
        <div className="flex gap-[.24rem]">
          <TransferAddr imgSrc={greenIcon} title="USDT-ERC20" />
          <TransferAddr imgSrc={blueIcon} title="USDT-TRC20" />
        </div>
      </CommonBox>
      <CommonBox title="提币地址">
        <p>提币地址</p>
      </CommonBox>
    </>
  );
};
const TransferAddr = (props) => {
  return (
    <div className="p-[.24rem] bg-[var(--gray)] rounded-[var(--border-radius)]">
      <div className="flex items-center gap-[.16rem] mb-[.24rem]">
        <img
          className="w-[.46rem] h-[.46rem] rounded-[50%] overflow-hidden]"
          src={props.imgSrc}
          alt=""
        />
        <label className="text-[22px] text-[#333]">{props.title}</label>
      </div>
      <div className="border-t border-solid border-[var(--border-color)]">
        <div className="flex items-center mt-[.16rem] gap-[.24rem]">
          <span className="w-[1.3rem] whitespace-nowrap text-[.14px] text-[var(--menu-color)]">
            地址：
          </span>
          <span className="text-[.14px] text-[var(--menu-color)]">
            wrijwfnwm0isd992rsdwrijwfnwm0isd992rsd
          </span>
        </div>
        <div className="flex items-center mt-[.16rem]  gap-[.24rem]">
          <span className="w-[1.3rem]  whitespace-nowrap text-[.14px] text-[var(--menu-color)]">
            自动储备设置：
          </span>
          <p className="flex items-center gap-[.16rem]">
            <span>≥</span>
            <Input
              defaultValue="1000"
              placeholder="请输入"
              className="max-w-[1.64rem]"
              suffix={<>USDT</>}
            />
            <a className="text-[var(--blue)]">编辑</a>
          </p>
        </div>
        <div className="flex items-center mt-[.16rem] gap-[.24rem]">
          <span className="w-[1.3rem]  whitespace-nowrap text-[.14px] text-[var(--menu-color)]">
            向储备地址转账：
          </span>
          <p className="flex items-center gap-[.16rem]">
            <Input
              defaultValue="1000"
              placeholder="请输入"
              className="max-w-[1.64rem]"
              suffix={<>USDT/笔</>}
            />
            <a className="text-[var(--blue)]">编辑</a>
          </p>
        </div>
        <div className="flex items-center mt-[.16rem] gap-[.24rem]">
          <span className="w-[1.3rem]  whitespace-nowrap text-[.14px] text-[var(--menu-color)]">
            快捷支付清算额度：
          </span>
          <p className="flex items-center gap-[.16rem]">
            <Input
              defaultValue="1000"
              placeholder="请输入"
              className="max-w-[1.64rem]"
              suffix={<>USDT</>}
            />
            <a className="text-[var(--blue)]">编辑</a>
            <a className="text-[var(--blue)]">手动清算</a>
          </p>
        </div>
      </div>
    </div>
  );
};
const CommonBox = (props) => {
  return (
    <div className="bg-[var(--white)] rounded-[.06rem] p-[.24rem] first:mt-[-0.08rem] not-first:mt-[.16rem]">
      <p className={styleScope["before_title"]}>{props.title}</p>
      {props.children}
    </div>
  );
};
export default AutomatedSystemConfig;
