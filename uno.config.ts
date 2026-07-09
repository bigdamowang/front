// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from "unocss"
// import presetRemToPx from "@unocss/preset-rem-to-px" // 临时关闭,后续拆分页面时再评估

export default defineConfig({
  presets: [
    presetUno(),
    // presetRemToPx({
    //   baseFontSize: 4
    // }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true
    })
  ],
  theme: {
    colors: {
      primary: "#409eff",
      success: "#67c23a",
      warning: "#e6a23c",
      danger: "#f56c6c",
      info: "#909399"
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: {
    "flex-center": "flex items-center justify-center",
    "flex-between": "flex items-center justify-between",
    "color-primary": "color-#409eff"
  },
  safelist: ["flex-center", "flex-between"]
})
