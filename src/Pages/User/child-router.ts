const publicUrl = "/aupay/user/detail/";
const childRouter = [
  {
    key: `${publicUrl}user`,
    label: "用户详情",
  },
  {
    key: `${publicUrl}recharge`,
    label: "充币记录",
  },
  {
    key: `${publicUrl}draw`,
    label: "提币记录",
  },
  {
    key: `${publicUrl}trade`,
    label: "交易记录",
  },
  {
    key: `${publicUrl}assetsChanges`,
    label: "资产变动记录",
  },
];
export {
  childRouter
}