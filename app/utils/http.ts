import app from "@/constants/app"
import type { IHttpResponse, IObject } from "@/types/interface"
import { getToken, getRefreshToken, getCache, setCache } from "./cache"
import { getValueByKeys } from "./utils"

/**
 * 获取 API baseURL
 * 优先级: runtimeConfig.public.apiBase (环境变量) > constants/app.ts 的 getter (兼容旧逻辑) > ""
 */
const getApiBase = (): string => {
  if (typeof window === "undefined") {
    // SSR / prerender 阶段
    try {
      return (useRuntimeConfig().public.apiBase as string) || import.meta.env.VITE_APP_API || ""
    } catch {
      return import.meta.env.VITE_APP_API || ""
    }
  }
  // 浏览器阶段
  try {
    const cfg = (window as any).SITE_CONFIG
    return (cfg && cfg.apiURL)
      || (useRuntimeConfig().public.apiBase as string)
      || import.meta.env.VITE_APP_API
      || ""
  } catch {
    return import.meta.env.VITE_APP_API || ""
  }
}

/**
 * 创建HTTP请求实例
 */
const http = $fetch.create({
  baseURL: getApiBase(),
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

    // 401 未授权 - 尝试刷新 token (v8 当前不消费,但保留 v6 行为以备未来接入)
    if (status === 401) {
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
          return $fetch(response.config.url, {
            ...response.config,
            headers: {
              ...response.config.headers,
              Authorization: tokenData.data.access_token
            }
          })
        } catch (e) {
          navigateTo("/login")
        }
      } else {
        navigateTo("/login")
      }
    }

    // 错误日志
    const errorMsg = data?.msg || `HTTP ${status}`
    console.error(`[http] ${response.config?.method?.toUpperCase() || ""} ${response.config?.url || ""} → ${status}: ${errorMsg}`)
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
