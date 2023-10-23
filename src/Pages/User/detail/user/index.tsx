/**
 * @summary 用户
 */
import { mergeClassName } from "@/utils/base";
import styleScope from "./index.module.less";
import TableComp from "@/Components/Table";
import { dataSource, columns } from "./table-mock.jsx";
import { DrawWhiteList, DetailAddr } from "./draw-white.jsx";
import { EmpowerList } from "./empower-app.jsx";
const UserDetail = () => {
  return (
    <>
      <div className={mergeClassName(styleScope["card"])}>
        <TitleInfo title="用户详情" status="已冻结" isShowStatus={true} />
        <div className="flex items-start justify-between  gap-[.45rem]">
          <div className="flex-1">
            <SubTitle subTitle="基本资料" />
            <div className={styleScope["content"]}>
              <p>
                <span>用户名:</span>
                <span>活跃状态:</span>
                <span>在线状态:</span>
              </p>
              <p>
                <span>小吴飞翔</span>
                <span>活跃</span>
                <span>离线 / 在线</span>
              </p>
              <p>
                <span>最近登录时间:</span>
                <span>最近登陆IP地址:</span>
              </p>
              <p>
                <span>2023.7.20 11:10:09</span>
                <span>134.232.344.24</span>
              </p>
            </div>
          </div>
          <div className="flex-1">
            <SubTitle subTitle="账户资料" />
            <div className={styleScope["content"]}>
              <p>
                <span>用户名:</span>
                <span>联系方式:</span>
              </p>
              <p>
                <span>小吴飞翔</span>
                <span>13423234424</span>
              </p>
              <p>
                <span>邮箱:</span>
                <span>注册IP地址:</span>
              </p>
              <p>
                <span>13423234424@163.com</span>
                <span>134.232.344.24</span>
              </p>
            </div>
          </div>
          <div className="flex-1">
            <SubTitle subTitle="安全资料" />
            <div className={styleScope["content"]}>
              <p>
                <span>支付密码:</span>
                <span>谷歌验证器:</span>
              </p>
              <p>
                <span>已设置</span>
                <span>已绑定</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={mergeClassName(styleScope["card"])}>
        <TitleInfo title="资产详情" isShowStatus={false} />
        <TableComp
          className="mt-[.24rem]"
          border
          dataSource={dataSource}
          columns={columns}
        />
      </div>
      <div
        className={mergeClassName(styleScope["card"], styleScope["white-list"])}
      >
        <TitleInfo title="提币白名单" isShowStatus={false} />
        {DrawWhiteList?.map((item, index) => (
          <>
            <p key={item} className={styleScope["white-list--title"]}>
              {item}
            </p>
            {DetailAddr[item].map((it, idx) => (
              <>
                <p
                  className={styleScope["white-list--addr"]}
                  key={'white'+it.address + "-" + idx+'-'+index}
                >
                  <span>【{it.title}】</span>
                  <span>{it.address}</span>
                </p>
              </>
            ))}
          </>
        ))}
      </div>
      <div className={mergeClassName(styleScope["card"])}>
        <TitleInfo title="快捷支付授权应用" isShowStatus={false} />
        <div className={styleScope["app-list"]}>
          {EmpowerList.map((item) => (
            <div key={'app'+item.id} className="flex items-center">
              <img src={item.icon} alt="" />
              <div className={styleScope['info']} >
                <p>{item.name}</p>
                <p>用户名：{item.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
const SubTitle = (props) => (
  <p className={styleScope["base-info"]}>
    <span className={styleScope["info-title"]}>{props.subTitle}</span>
  </p>
);
const TitleInfo = (props) => (
  <div className="inline-size h-[.22rem] flex items-center justify-between">
    <p className={styleScope["title"]}>{props.title}</p>
    {props.isShowStatus ? (
      <p className={styleScope["state"]}>
        <span>账户状态：</span>
        <span>{props.status}</span>
      </p>
    ) : null}
  </div>
);
export default UserDetail;
