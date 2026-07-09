/**
 * 通用对象类型
 */
export interface IObject<T = any> {
  [key: string]: T
}

/**
 * 通用函数类型
 * 使用 interface 而非 type,避免 esbuild 5+ 在某些 import 形式下将
 * `export type` 编译成不可枚举的绑死形式,导致浏览器报
 * "does not provide an export named" 错误。
 */
export interface IFunction<T = any> {
  (...args: any[]): T
}

/**
 * HTTP响应类型
 */
export interface IHttpResponse {
  code: number
  msg: string
  data: any
}

/**
 * 缓存选项
 */
export interface ICacheOptions {
  isParse?: boolean
  isSessionStorage?: boolean
  isDelete?: boolean
}
