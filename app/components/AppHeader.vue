<template>
  <header class="app-header">
    <div class="header-container">
      <!-- Logo: 品牌标记 + 双行文字 -->
      <div class="logo">
        <a href="#home" class="logo-link" @click="scrollTo('home', $event)">
          <span class="logo-mark" aria-hidden="true">M</span>
          <span class="logo-text">
            <span class="logo-text-primary">Mito</span>
            <span class="logo-text-secondary">海南迈途数创科技</span>
          </span>
        </a>
      </div>

      <!-- Navigation(单页铺点跳转) -->
      <nav class="nav-menu" aria-label="主导航">
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

      <!-- 右侧: 语言切换 + 主 CTA -->
      <div class="header-actions">
        <div class="lang-switcher">
          <svg class="lang-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6" />
            <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" stroke="currentColor" stroke-width="1.6" />
          </svg>
          <select
            v-model="currentLocale"
            class="lang-select"
            :aria-label="$t('nav.lang')"
            @change="changeLocale"
          >
            <option v-for="loc in availableLocales" :key="loc.code" :value="loc.code">
              {{ loc.name }}
            </option>
          </select>
          <svg class="lang-caret" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>

        <a href="#contact" class="header-cta" @click="scrollTo('contact', $event)">
          {{ $t('nav.cta_demo') }}
        </a>
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
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: saturate(180%) blur(14px);
  -webkit-backdrop-filter: saturate(180%) blur(14px);
  border-bottom: 1px solid var(--border, #e7e9ee);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

/* ---------- Logo ---------- */
.logo-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
}

.logo-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(140deg, var(--brand-primary, #1d4ed8), var(--brand-primary-dark, #1740a6));
  color: #fff;
  font-family: var(--font-sans, 'Inter', system-ui, sans-serif);
  font-size: 22px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  box-shadow: 0 6px 16px -6px rgba(29, 78, 216, 0.5);
  flex-shrink: 0;
}

.logo-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
  line-height: 1;
}

.logo-text-primary {
  font-family: var(--font-sans, 'Inter', system-ui, sans-serif);
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--text-primary, #16233a);
  line-height: 1;
}

.logo-text-secondary {
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--text-muted, #8b93a1);
  line-height: 1;
}

/* ---------- Navigation ---------- */
.nav-menu {
  display: flex;
  gap: 4px;
  margin-left: auto;
}

.nav-link {
  text-decoration: none;
  color: var(--text-secondary, #4b5563);
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s, background 0.2s;
  position: relative;
  padding: 8px 14px;
  border-radius: 8px;
}

.nav-link:hover {
  color: var(--brand-primary, #1d4ed8);
  background: rgba(29, 78, 216, 0.06);
}

.nav-link.active {
  color: var(--brand-primary, #1d4ed8);
}

.nav-link.active::after {
  content: "";
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 2px;
  height: 2px;
  background: var(--brand-primary, #1d4ed8);
  border-radius: 2px;
}

/* ---------- Right actions ---------- */
.header-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.lang-switcher {
  position: relative;
  display: inline-flex;
  align-items: center;
  color: var(--text-secondary, #4b5563);
}

.lang-icon {
  position: absolute;
  left: 10px;
  width: 17px;
  height: 17px;
  pointer-events: none;
  color: var(--text-muted, #8b93a1);
}

.lang-caret {
  position: absolute;
  right: 8px;
  width: 15px;
  height: 15px;
  pointer-events: none;
  color: var(--text-muted, #8b93a1);
}

.lang-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 8px 30px 8px 34px;
  border: 1px solid var(--border, #e7e9ee);
  border-radius: 8px;
  background: var(--bg-card, #fff);
  color: var(--text-secondary, #4b5563);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.lang-select:hover {
  border-color: var(--border-strong, #d3d8e0);
}

.lang-select:focus-visible {
  outline: none;
  border-color: var(--brand-primary, #1d4ed8);
  box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.14);
}

.header-cta {
  display: inline-flex;
  align-items: center;
  padding: 9px 20px;
  border-radius: 8px;
  background: var(--brand-primary, #1d4ed8);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 6px 16px -8px rgba(29, 78, 216, 0.6);
}

.header-cta:hover {
  background: var(--brand-primary-dark, #1740a6);
  transform: translateY(-1px);
  box-shadow: 0 10px 22px -10px rgba(29, 78, 216, 0.7);
}

/* ---------- Responsive ---------- */
@media (max-width: 960px) {
  .nav-menu {
    display: none;
  }
}

@media (max-width: 560px) {
  .logo-text-secondary {
    display: none;
  }
  .header-cta {
    padding: 9px 14px;
  }
}
</style>
