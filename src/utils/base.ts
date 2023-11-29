import dayjs from "dayjs";

const AseKey = 'abcopekiYHJFMGTO';
// const { AES, enc, mode, pad, DES } = require('crypto-js')
import { AES, enc, mode, pad, DES } from 'crypto-js'
const SessionStorage = window.sessionStorage
const mergeClassName = (...arg: string[]) => {
  let param = arg.filter(item => !['undefined', 'null'].includes(item)).filter(Boolean)
  return param.join(" ").trim()
}
const dataType = (obj: any) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLocaleLowerCase()
}
/**
 * @summary 加密
 * @param message 
 * @param key 
 * @returns 
 */
const encrypt = (message: string, key: string = AseKey) => {
  return AES.encrypt(message, enc.Utf8.parse(key), {
    mode: mode.ECB,
    padding: pad.Pkcs7
  }).toString()
}
const encryptByDES = (message: string, key: string = AseKey) => {
  return DES.encrypt(message, enc.Utf8.parse(key), {
    mode: mode.ECB,
    padding: pad.Pkcs7
  }).toString()
}
/**
 * @summary 解密
 * @param message 
 * @param key 
 * @returns 
 */
const decrypt = (message: string | null | undefined, key: string = AseKey) => {
  if (!message) return message
  return AES.decrypt(message, enc.Utf8.parse(key), {
    mode: mode.ECB,
    padding: pad.Pkcs7
  }).toString(enc.Utf8);
}

/**
 * @summary 获取session
 * @param {*} name 
 */
function getSession(name: string) {
  let value: any = decrypt(SessionStorage.getItem(name))
  try {
    value = JSON.parse(value)
    if (value['_flag'] === 'boolean') {
      value = Boolean(Number(value.val))
    }
    return value
  } catch (error) {
    return value
  }
}
/**
* @summary 设置session
* @param {*} name 
* @param {*} value 
*/
function setSession(name: string, value: any) {
  if (dataType(value) === 'boolean') value = JSON.stringify({ _flag: 'boolean', val: Number(value) })
  else if (dataType(value) === 'object') value = JSON.stringify({ ...value, _flag: 'object' })
  return SessionStorage.setItem(name, encrypt(value))
}
/**
* @summary 移除某一个session
* @param {*} name 
*/
function removeSession(name: string) {
  return SessionStorage.removeItem(name)
}
/**
 * 
 * @returns 移除全部session
 */
function clearSession() {
  return SessionStorage.clear()
}

/**
 * @summary 千分符参数
 * @param {*} num 数据源
 */
const thousands = (num: number): string => {
  if (!num) return "0";
  if (typeof num === 'string' || typeof num === 'number') {
    return (num.toString().indexOf('.') !== -1) ? Number(num).toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  }

  return num
}

// 日期处理
const timeFormate = (time: string | Date, format: string = 'YYYY-MM-DD'): string => {
  return dayjs(time).format(format)
}
// 单位处理
let formatUnit = (id: number, chain?: number, bool?:boolean) => {
  let agreement = "";
  let num = 0;
  let type = '';
  let aloneFee=""
  if (id === 1) {
    agreement = "BTC";
    type = "BTC";
    aloneFee = 'BTC'
    num = 6;
  } else if (id === 2) {
    agreement = "ETH";
    type = "ETH";
    aloneFee = 'ETH'
    num = 6;
  } else if (id === 3) {
    type = "USDT";
    aloneFee="USDT"
    if (chain === 1) {
      agreement = "USDT-OMNI";
      num = 6;
    }
    if (chain === 2) {
      agreement = "USDT-ERC20";
      if(bool){
        aloneFee = 'ETH'
      }
       num = 6;
    }
    if (chain === 3) {
      agreement = "USDT-TRC20";
      if(bool){
        aloneFee = 'TRX'
      }
      num = 19;
    }
  } else if (id === 4) {
    type = "TRX";
    agreement = "TRX";
    aloneFee = 'TRX'
    num = 19;
  }
  return { agreement, num, type,aloneFee };
};
function formatEnum(enumData) {
  let enumObj = JSON.parse(JSON.stringify(enumData))
  let allKey = Object.keys(enumObj)
  let r = allKey.slice(allKey.length / 2)
  return r.map(item => ({
    value: enumObj[item],
    label: item
  }))
}
function timeJoin(time, isPre = false) {
  if (!time) return null
  return isPre ? time + " 23:59:59" : time + " 00:00:00"
}
export {
  mergeClassName,
  encrypt,
  decrypt,
  thousands,
  dataType,
  setSession,
  getSession,
  removeSession,
  encryptByDES,
  timeFormate,
  clearSession,
  formatUnit,
  formatEnum,
  timeJoin
}