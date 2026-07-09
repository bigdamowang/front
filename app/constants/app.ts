import appPack from "../../package.json"

/**
 * app系统配置
 */
export default {
  /**
   * 系统版本号，自动读取package.json中的version字段
   */
  version: appPack.version,

  /**
   * 系统默认语言
   */
  defaultLang: "zh-CN",

  /**
   * api请求地址
   */
  get api() {
    if (typeof window === "undefined") {
      // SSR / prerender 阶段,直接读 import.meta.env
      return import.meta.env.VITE_APP_API || ""
    }
    const cfg = (window as any).SITE_CONFIG
    return (cfg && cfg.apiURL) || import.meta.env.VITE_APP_API || ""
  },

  /**
   * 网络请求超时时间，单位毫秒
   */
  requestTimeout: 30000
}
