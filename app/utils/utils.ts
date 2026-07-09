import { IFunction, IObject } from "@/types/interface"

/**
 * 获取对象下的字段值
 * @param record {}
 * @param key 'a.b.c'
 * @param defaultValue
 * @returns
 */
export const getValueByKeys = (record: IObject = {}, key: string, defaultValue?: unknown): any => {
  const keys = key.split(".")
  for (let i = 0; i < keys.length; i++) {
    record = record[keys[i]] || (i === keys.length - 1 ? defaultValue : {})
  }
  return record || defaultValue
}

/**
 * 数组转对象
 * @param {*} rs 集合
 * @param {*} key 需要转换目标key名称
 */
export const arrayToObject = (
  rs: any[] = [],
  key: string | IFunction,
  render?: IFunction
): IObject => {
  const o: IObject = {}
  rs.forEach((x) => {
    o[typeof key === "function" ? key(x) : x[key]] = render ? render(x) : x
  })
  return o
}

/**
 * 是否只null和undefined值
 * @param vl
 * @returns
 */
export const isNullOrUndefined = (vl: unknown): boolean => {
  return vl === null || typeof vl === "undefined"
}

/**
 * 是否外链
 * @param path
 * @returns
 */
export const isExternalLink = (path: string): boolean => {
  return /^(https?:|\/\/|mailto:|tel:|^{{\s?ApiUrl\s?}})/.test(path)
}

/**
 * 复制
 * @param value
 */
export const copyToClipboard = (value: string): void => {
  const transfer = document.createElement("textarea")
  document.body.appendChild(transfer)
  transfer.value = value
  transfer.focus()
  transfer.select()
  if (document.execCommand("copy")) {
    document.execCommand("copy")
  }
  transfer.blur()
  document.body.removeChild(transfer)
}

/**
 * 获取uuid
 */
export const getUuid = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 邮箱
 * @param {*} s
 */
export const isEmail = (s: string): boolean => {
  return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export const isMobile = (s: string): boolean => {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export const isPhone = (s: string): boolean => {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export const isURL = (s: string): boolean => {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 正整数
 * @param {*} s
 */
export const isNumber = (s: string): boolean => {
  return /^\+?[1-9][0-9]*$/.test(s)
}

/**
 * 节流函数
 * @param fn
 * @param wait
 * @returns
 */
export const useDebounce = (fn: (e?: any) => any, wait?: number): ((...args: any[]) => void) => {
  let timer: any = null
  return function (this: any, ...args: any[]) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait ?? 1000)
  }
}
