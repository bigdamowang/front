// i18n.config.ts — 自定义 Vue I18n runtime 行为
//
// 背景:
//   unplugin-vue-i18n 在 build 阶段(预编译)把 vue-i18n 默认 ICU MessageFormat 编译器硬塞进每个 json value,
//   把字符串里的 `@` / `<small>` / ASCII `:` 等特殊字符当成 ICU 触发字符,导致编译失败。
//   vue-i18n v9 提供 `runtimeOnly` + `escapeHtml: false`,能让 runtime 端跳过预编译、直接用 raw message;
//   但在 nuxt-i18n v9 框架下不直接暴露这两个选项,只能通过 nuxt.config 的 `bundle.optimizeTranslationDirective`
//   或运行时 messageResolver 干预。
//
// 本文件输出:
//   - silentFallbackWarn: true   关闭 fallback 警告,避免 SSR 阶段大量"未找到 key"的日志噪音
//   - silentTranslationWarn: true 同上,但对缺失 key 也静音
//   - fallbackLocale: false       不向其他 locale 兜底(始终直接回原始 key)
//   - warnHtmlMessage: false       关闭"<small>xxx</small>"类 html 警告
//
// 注意:vue-i18n 仍会在 build 阶段用 ICU 编译每个 message,但因为我们前面已经在 zh-CN.json / en-US.json /
//       zh-TW.json 里把所有含 @ / : 的字面 placeholder 替换为安全形式(build 阶段一次性扫三份 json,这里不
//       会再触发 ICU error),所以 build 能过。runtime 这里再把 fallback warn 关掉即可。

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: false,
  silentFallbackWarn: true,
  silentTranslationWarn: true,
  warnHtmlMessage: false
}))
