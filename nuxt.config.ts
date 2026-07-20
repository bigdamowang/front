// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 启用开发者工具
  devtools: { enabled: true },

  // 启用 Nuxt 4 兼容模式(自动把 app/ 当作 srcDir),
  // 避免显式设 srcDir 后 css/i18n 等入口路径需要重写
  future: {
    compatibilityVersion: 4
  },

  // 应用配置
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "迈途数创 Mito — 航司商业运营数字化系统",
      htmlAttrs: {
        lang: "zh-CN"
      },
      meta: [
        { name: "description", content: "国际航司业务服务商 - 数字化转型解决方案" },
        { name: "keywords", content: "航空,数字化,解决方案,IT服务" }
      ],
      link: [
        // Inter 无衬线字体（对齐 Amadeus / PROS 的国际化排版气质）
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        }
      ]
    }
  },

  // 模块
  modules: [
    "@nuxtjs/i18n",
    "@unocss/nuxt",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/eslint"
  ],

  // i18n 配置
  i18n: {
    // v9 默认 restructureDir=true 会以 <rootDir>/i18n 为基准查找翻译文件,
    // 这里保留原有 app/locales 目录结构
    restructureDir: false,
    locales: [
      { code: "zh-CN", name: "简体中文", file: "zh-CN.json" },
      { code: "zh-TW", name: "繁體中文", file: "zh-TW.json" },
      { code: "en-US", name: "English", file: "en-US.json" }
    ],
    defaultLocale: "zh-CN",
    langDir: "locales/",
    strategy: "no_prefix",
    detectBrowserLanguage: false,
    // v9 vue-i18n 把所有 message 当作 ICU MessageFormat 编译。
    // v6 json 里 "如:lihang@hnair.com" 这种字面字符串含 ASCII : 会被识别成 ICU 类型占位符导致编译失败。
    // 这里通过外部 vueI18n config 提供自定义 messageCompiler,强制走 'raw' 而非 'messageformat'。
    vueI18n: "./i18n.config.ts",
    bundle: {
      // 该选项在 v10 将被移除,提前关闭
      optimizeTranslationDirective: false
    }
  },

  // UnoCSS 配置
  unocss: {
    configFile: "./uno.config.ts"
  },

  // CSS
  css: ["~/assets/css/main.css"],

  // 启用 SSG:构建期预渲染所有页面为静态 HTML
  // 配合 `yarn generate` 使用,产物落到 .output/public/
  nitro: {
    preset: "static",
    prerender: {
      crawlLinks: false,
      routes: ["/"],
      failOnError: false
    },
    // 显式不启用 nitro cache driver (避免 Vite 7 + nitro-server 3.21 的 cache-driver.js 警告)
    storage: {
      data: { driver: "memory" },
      cache: { driver: "memory" }
    }
  },

  // 兼容性日期
  compatibilityDate: "2024-07-09",

  // 环境配置: API baseURL + 3 环境
  // 优先级: NUXT_PUBLIC_API_BASE > 环境默认
  // dev:   http://localhost:3000     (node/server.js)
  // prod:  https://api.mitoaitech.com (假设)
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
        || (process.env.NODE_ENV === "production" ? "https://api.mitoaitech.com" : "http://localhost:3000")
    }
  }
})
