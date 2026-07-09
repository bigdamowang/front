# MitoAI Technology 官网 v8

基于 Vue 3 + Nuxt 3 + UnoCSS + Pinia + i18n 构建的企业官网。

## 技术栈

- **框架**: Nuxt 3 (Vue 3)
- **样式**: UnoCSS
- **状态管理**: Pinia
- **国际化**: @nuxtjs/i18n
- **工具库**: @vueuse/core

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 生成静态站点
pnpm generate

# 预览构建结果
pnpm preview
```

## 项目结构

```
v8/
├── app/
│   ├── assets/          # 静态资源
│   ├── components/      # 组件
│   ├── composables/     # 组合式函数
│   ├── layouts/         # 布局
│   ├── locales/         # 国际化文件
│   ├── pages/           # 页面
│   ├── plugins/         # 插件
│   ├── stores/          # Pinia stores
│   └── app.vue          # 应用入口
├── public/              # 公共静态资源
├── nuxt.config.ts       # Nuxt 配置
├── uno.config.ts        # UnoCSS 配置
└── package.json
```

## 页面

- 首页 (/)
- 关于我们 (/about)
- 产品服务 (/products)
- 联系我们 (/contact)

## 国际化

支持三种语言：
- 简体中文 (zh-CN)
- 繁體中文 (zh-TW)
- English (en-US)
