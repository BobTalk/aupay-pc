export enum operationIdEnum {
  add = 151,
  delete = 152,
  enableOrEnable = 153,
  colseAcount = 27,
  freezeOrEndisableAcount = 28,
  updateDep = 29,
  resetPin = 30,
  resetGoogle = 31,
  resetPwd = 301,
  setPermission = 251,
  resetAddr = 67,
  userFreezeOrEndisable = 421,
}
export enum departmentEnum {
  研发部 = 1,
  产品部 = 2,
}
export enum routerMapId {
  "/aupay/assets" = 1,
  "/aupay/data" = 2,
  "/aupay/ozbet" = 5,
  "/aupay/ozbet/assets" = 51,
  "/aupay/ozbet/draw" = 52,
  "/aupay/notice" = 6,
  "/aupay/personal" = 8,
  "/aupay/address" = 4,
  "/aupay/address/user" = 41,
  "/aupay/address/transfer" = 42,
  "/aupay/address/reserve" = 43,
  "/aupay/address/draw" = 44,
  "/aupay/address/minerFees" = 45,
  "/aupay/system" = 7,
  "/aupay/system/ip-manage" = 71,
  "/aupay/system/ip-record" = 72,
  "/aupay/system/automated" = 73,
  "/aupay/system/draw" = 74,
  "/aupay/system/rate-manage" = 75,
  "/aupay/system/logs-manage" = 76,
  "/aupay/system/staff-manage" = 77,
  "/aupay/user" = 3,
  "/aupay/user/detail/user" = 31,
  "/aupay/user/detail/recharge" = 32,
  "/aupay/user/detail/draw" = 33,
  "/aupay/user/detail/trade" = 34,
  "/aupay/user/detail/assetsChanges" = 35,
}
export enum assetsTypeEnum {
  BTC = 1,
  ETH = 2,
  USDT = 3,
  TRX = 4,
}

export enum tradeTypeEnum {
  转入 = 6,
  转出 = 7,
}
export enum userAcountStateEnum {
  正常 = 1,
  冻结 = 2,
}
export enum rechargeEnum {
  进行中 = 0,
  已完成 = 1,
}
export enum tradeTypeByUserEnum {
  充值 = 1,
  提款 = 2,
}
export enum tradeTypeChangeEnum {
  充币 = 1,
  提币 = 2,
  快捷支付 = 3,
  快捷提款 = 4,
}
export enum assetsTypeJumpEnum {
  ETH = `https://etherscan.io/tx/`,
  TRX = `https://tronscan.org/#/transaction/`,
  BTC = `https://explorer.btc.com/zh-CN/btc/transaction/`,
  "USDT-ERC20" = `https://etherscan.io/tx/`,
  "USDT-TRC20" = `https://tronscan.org/#/transaction/`,
}
