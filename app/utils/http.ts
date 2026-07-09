import app from "@/constants/app"
import { IHttpResponse, IObject } from "@/types/interface"
import { getToken, getRefreshToken, getCache, setCache } from "./cache"
import { getValueByKeys } from "./utils"

/**
 * 创建HTTP请求实例
 */
const http = $fetch.create({
  baseURL: app.api,
  timeout: app.requestTimeout,
  headers: {
    "X-Requested-With": "XMLHttpRequest"
  },
  onRequest({ options }) {
    // 设置请求头
    const token = getToken()
    if (token) {
      options.headers.set("Authorization", token)
    }
    const lang = getCache("CacheLang", { isParse: false }, app.defaultLang)
    options.headers.set("Accept-Language", lang)
  },
  onRequestError({ error }) {
    console.error("请求错误:", error)
  },
  async onResponseError({ response }) {
    const status = response.status
    const data = response._data as any

    // 401 未授权
    if (status === 401) {
      // 尝试刷新token
      const refreshToken = getRefreshToken()
      if (refreshToken) {
        try {
          const { data: tokenData } = await $fetch<{ data: any }>(
            "/sys/auth/access-token?refreshToken=" + refreshToken
          )
          const token = {
            refresh_token: tokenData.data.refresh_token,
            access_token: tokenData.data.access_token
          }
          setCache("CacheToken", token, false)
          // 重试原请求
          return $fetch(response.config.url, {
            ...response.config,
            headers: {
              ...response.config.headers,
              Authorization: tokenData.data.access_token
            }
          })
        } catch (e) {
          // 刷新失败，跳转登录页
          navigateTo("/login")
        }
      } else {
        navigateTo("/login")
      }
    }

    // 错误提示
    const errorMsg = data?.msg || "请求失败"
    console.error(errorMsg)
  }
})

/**
 * 导出HTTP请求方法
 */
export default <T = IHttpResponse>(options: {
  url: string
  method?: "GET" | "POST" | "PUT" | "DELETE"
  params?: IObject
  data?: IObject
  headers?: IObject
}): Promise<T> => {
  return http(options.url, {
    method: options.method || "GET",
    params: options.params,
    body: options.data,
    headers: options.headers
  }) as Promise<T>
}
