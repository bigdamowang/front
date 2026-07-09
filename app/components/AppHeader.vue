<template>
  <header class="app-header">
    <div class="header-container">
      <!-- Logo(v1 双行: Mito 主标 + 海南迈途数创科技全称) -->
      <div class="logo">
        <a href="#home" @click="scrollTo('home', $event)">
          <span class="logo-text-primary">Mito</span>
          <span class="logo-text-secondary">海南迈途数创科技有限公司</span>
        </a>
      </div>

      <!-- Navigation(单页铺点跳转) -->
      <nav class="nav-menu">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="nav-link"
          :class="{ active: activeSection === item.id }"
          @click="scrollTo(item.id, $event)"
        >
          {{ $t(item.key) }}
        </a>
      </nav>

      <!-- Language Switcher -->
      <div class="lang-switcher">
        <select v-model="currentLocale" @change="changeLocale">
          <option v-for="loc in availableLocales" :key="loc.code" :value="loc.code">
            {{ loc.name }}
          </option>
        </select>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return locales.value.map((loc: any) => ({
    code: loc.code,
    name: loc.name
  }))
})

const currentLocale = ref(locale.value)

const changeLocale = () => {
  setLocale(currentLocale.value)
}

// 与页面 sections 对应的铺点
const navItems = [
  { id: "home", key: "nav.home" },
  { id: "solutions", key: "nav.products" },
  { id: "technology", key: "nav.tech" },
  { id: "customers", key: "nav.customers" },
  { id: "about", key: "nav.about" },
  { id: "contact", key: "nav.contact" }
]

// 平滑滚动到铺点,同步 hash
function scrollTo(id: string, e: Event) {
  e.preventDefault()
  const target = document.getElementById(id)
  if (!target) return
  const headerOffset = 72 // sticky header 高度
  const y = target.getBoundingClientRect().top + window.scrollY - headerOffset
  window.scrollTo({ top: y, behavior: "smooth" })
  // 更新 hash 而不触发跳变
  history.pushState(null, "", `#${id}`)
  activeSection.value = id
}

// 滚动监听高亮当前 section
const activeSection = ref("home")
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
  )
  navItems.forEach(item => {
    const el = document.getElementById(item.id)
    if (el && observer) observer.observe(el)
  })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.app-header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo a {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  gap: 4px;
}

.logo-text-primary {
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: 1.75rem;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: var(--text-primary, #0f172a);
  line-height: 1;
}

.logo-text-secondary {
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  color: var(--brand-primary, #4fa3d9);
  line-height: 1;
}

.nav-menu {
  display: flex;
  gap: 32px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-size: 15px;
  transition: color 0.2s;
  position: relative;
  padding: 4px 0;
}

.nav-link:hover,
.nav-link.active {
  color: #409eff;
}

.nav-link.active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 2px;
  background: var(--brand-primary, #4fa3d9);
  border-radius: 2px;
}

.lang-switcher select {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
}
</style>
