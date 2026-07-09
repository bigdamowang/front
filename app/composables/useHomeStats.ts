import { ref, computed } from "vue"

/**
 * 首页统计数据
 * 来源: node/server.js GET /api/stats
 * 返回结构 (server.js):
 *   { code, data: { display, productCount, total, airlines } }
 */
export interface HomeStats {
  // 渲染给用户看的数字(用于 KPI 区)
  totalAirlines: number          // 总服务航司数
  totalRecords: number           // 飞书表总记录数
  productCount: Record<string, number>  // 各产品的航司数量
  // 透传服务端原始字段(便于调试)
  raw: any
}

/**
 * 安全 fallback: 当 /api/stats 不可用(SSG prerender / CORS / 网络错误)时
 * 显示合理的占位数字(不会因为 fetch 失败让整页崩溃)
 */
const FALLBACK: Omit<HomeStats, "raw"> = {
  totalAirlines: 10,
  totalRecords: 28,
  productCount: {
    "收益管理系统": 6,
    "运价管理系统": 4,
    "航线网络管理": 3,
    "其他": 15
  }
}

/**
 * 首页 KPI 数字组合式函数
 * - SSG 预渲染时(本地无 server 跑 node)用 fallback
 * - CSR / SSR 时(开发环境 + 部署环境有 node)用真实数据
 */
export const useHomeStats = () => {
  const stats = ref<Omit<HomeStats, "raw">>(FALLBACK)
  const loaded = ref(false)
  const loading = ref(false)
  const error = ref<string>("")

  const totalAirlines = computed(() => stats.value.totalAirlines)
  const totalRecords = computed(() => stats.value.totalRecords)

  /**
   * 加载统计数据
   * @param baseUrl  API baseURL (默认读 runtimeConfig.public.apiBase)
   * @param timeout  超时毫秒 (默认 5000)
   */
  const load = async (baseUrl?: string, timeout = 5000) => {
    if (loading.value) return
    loading.value = true
    error.value = ""
    try {
      // SSG 阶段: 没有 window,直接返回 fallback(避免 prerender 阻塞)
      if (typeof window === "undefined") {
        loaded.value = false
        return
      }
      const base = baseUrl || (useRuntimeConfig().public.apiBase as string)
      const ctrl = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), timeout)
      const res = await fetch(`${base}/api/stats`, {
        method: "GET",
        headers: { "Accept": "application/json" },
        signal: ctrl.signal
      })
      clearTimeout(timer)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      if (json?.code !== 0) throw new Error(json?.message || "stats 接口返回异常")
      const data = json.data || {}
      stats.value = {
        totalAirlines: Number(data.airlines) || FALLBACK.totalAirlines,
        totalRecords: Number(data.total) || FALLBACK.totalRecords,
        productCount: data.productCount || FALLBACK.productCount
      }
      loaded.value = true
    } catch (err: any) {
      // 静默失败: 保留 fallback,不抛出
      console.warn("[useHomeStats] load failed, using fallback:", err?.message || err)
      error.value = err?.message || "load failed"
      loaded.value = false
    } finally {
      loading.value = false
    }
  }

  return {
    stats,
    loaded,
    loading,
    error,
    totalAirlines,
    totalRecords,
    load
  }
}
