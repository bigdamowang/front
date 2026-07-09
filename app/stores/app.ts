import { defineStore } from "pinia"
import { IObject } from "@/types/interface"

export const useAppStore = defineStore("app", {
  state: () => ({
    // 应用状态
    loading: false,
    title: "MitoAI Technology",
    lang: "zh-CN",
    theme: "light"
  }),

  getters: {
    // 计算属性
    fullTitle: (state) => `${state.title} - 国际航司业务服务商`
  },

  actions: {
    // 操作方法
    setLoading(value: boolean) {
      this.loading = value
    },
    setLang(lang: string) {
      this.lang = lang
    },
    setTheme(theme: string) {
      this.theme = theme
    },
    updateState(data: IObject) {
      Object.keys(data).forEach((key: string) => {
        ;(this as any)[key] = data[key]
      })
    }
  }
})
