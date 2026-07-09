<template>
  <!-- ============================== HERO（浅色专业底 · 两栏） ============================== -->
  <header id="home" class="hero">
    <div class="hero__grid-bg"></div>
    <div class="container hero__inner">
      <!-- 左栏：价值主张 -->
      <div class="hero__col">
        <span class="hero__badge">{{ $t("hero.badge") }}</span>
        <h1>
          <span class="l1">{{ $t("hero.title_l1") }}</span>
        </h1>
        <p class="hero__desc">
          {{ $t("hero.desc") }}
        </p>
        <div class="hero__cta">
          <a class="btn btn-primary" href="#contact" @click="scrollTo('contact', $event)">
            {{ $t("hero.cta_primary") }}
          </a>
          <a class="btn btn-ghost" href="#solutions" @click="scrollTo('solutions', $event)">
            {{ $t("hero.cta_secondary") }}
          </a>
        </div>

        <!-- 实时数据条（SSR 初始值 + 客户端计数动画） -->
        <div class="hero__ticker" role="status" aria-live="polite">
          <div class="ticker-cell">
            <span class="ticker-label">{{ $t("home.ticker.airlines.label") }}</span>
            <span class="ticker-num" ref="airlinesEl">{{ airlinesFmt }}</span>
          </div>
          <div class="ticker-cell">
            <span class="ticker-label">{{ $t("home.ticker.prices.label") }}</span>
            <span class="ticker-num" ref="pricesEl">{{ pricesFmt }}</span>
          </div>
          <div class="ticker-cell">
            <span class="ticker-label">{{ $t("home.ticker.flights.label") }}</span>
            <span class="ticker-num" ref="flightsEl">{{ flightsFmt }}</span>
          </div>
          <div class="ticker-cell">
            <span class="ticker-label">{{ $t("home.ticker.latency.label") }}</span>
            <span class="ticker-num">{{ latencyFmt }}<small>ms</small></span>
          </div>
        </div>
      </div>

      <!-- 右栏：干净的产品面板（收益决策台，示意） -->
      <div class="hero__col" aria-hidden="true">
        <div class="hero-panel">
          <div class="hero-panel__bar">
            <span class="hero-panel__title">Revenue Console</span>
            <span class="hero-panel__tab">RASK · 30D</span>
          </div>
          <div class="hero-panel__chart">
            <i v-for="(h, i) in chartBars" :key="i" :style="{ height: h + '%' }"></i>
          </div>
          <div class="hero-panel__rows">
            <div class="hero-fare">
              <span class="hero-fare__route">SHA–CAN</span>
              <span class="hero-fare__cabin">M</span>
              <span class="hero-fare__action hero-fare__action--hold">HOLD</span>
            </div>
            <div class="hero-fare">
              <span class="hero-fare__route">PEK–HKG</span>
              <span class="hero-fare__cabin">Y</span>
              <span class="hero-fare__action hero-fare__action--open">OPEN</span>
            </div>
            <div class="hero-fare">
              <span class="hero-fare__route">SHA–CTU</span>
              <span class="hero-fare__cabin">K</span>
              <span class="hero-fare__action hero-fare__action--close">CLOSE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <main role="main" id="main">
    <!-- =========================== 信任带：客户 LOGO + 认证 =========================== -->
    <section class="section--tight">
      <div class="container">
        <div class="logo-wall">
          <div v-for="logo in logos" :key="logo.file" class="logo-card">
            <div class="logo-card__inner">
              <span class="logo-card__bar"></span>
              <div class="logo-card__name">{{ logo.name }}</div>
              <div class="logo-card__en">{{ logo.en }}</div>
            </div>
          </div>
        </div>

        <!-- 认证 / 合规条 -->
        <div class="trust-band">
          <span class="trust-band__label">{{ $t("home.trust.label", "标准与合规") }}</span>
          <span v-for="cert in certifications" :key="cert.label" class="trust-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v7c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5l-8-3z"/><path d="m9 12 2 2 4-4"/></svg>
            {{ cert.label }}
          </span>
        </div>
      </div>
    </section>

    <!-- ============================== KPI 数据 ============================== -->
    <section class="section--soft section">
      <div class="container">
        <div class="section-head section-head--center reveal">
          <span class="eyebrow">{{ $t("kpi.eyebrow", "By the numbers") }}</span>
          <h2>{{ $t("kpi.title") }}</h2>
          <p>{{ $t("kpi.desc") }}</p>
        </div>
        <div class="kpi reveal">
          <div class="kpi__item">
            <div class="kpi__num">
              <span ref="kpiAirlinesEl">{{ fmtKPI(kpiAirlines, 0) }}</span>
              <span>{{ $t("kpi.items.airlines_unit", "+") }}</span>
            </div>
            <div class="kpi__label">{{ $t("kpi.items.airlines") }}</div>
          </div>
          <div class="kpi__item">
            <div class="kpi__num"><span ref="kpiModulesEl">{{ fmtKPI(kpiModules, 0) }}</span></div>
            <div class="kpi__label">{{ $t("kpi.items.modules") }}</div>
          </div>
          <div class="kpi__item">
            <div class="kpi__num">
              <span ref="kpiExpertsEl">{{ fmtKPI(kpiExperts, 0) }}</span>
              <span>{{ $t("kpi.items.experts_unit", "%") }}</span>
            </div>
            <div class="kpi__label">{{ $t("kpi.items.experts") }}</div>
          </div>
          <div class="kpi__item">
            <div class="kpi__num">
              <span ref="kpiPassengersEl">{{ fmtKPI(kpiPassengers, 1) }}</span>
              <span>{{ $t("kpi.items.passengers_unit", "亿+") }}</span>
            </div>
            <div class="kpi__label">{{ $t("kpi.items.passengers") }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================== 核心解决方案（6 卡） =========================== -->
    <section id="solutions" class="section">
      <div class="container">
        <div class="section-head section-head--center reveal">
          <span class="eyebrow">{{ $t("solutions.eyebrow") }}</span>
          <h2>{{ $t("solutions.title") }}</h2>
          <p>{{ $t("solutions.desc") }}</p>
        </div>
        <div class="solutions-grid">
          <div v-for="(s, i) in solutions" :key="i" class="card reveal">
            <span class="tag">{{ $t(`${s.tagKey}`) }}</span>
            <h3>{{ $t(`${s.titleKey}`) }}</h3>
            <p>{{ $t(`${s.descKey}`) }}</p>
            <NuxtLink class="btn-link" :to="`/products/${s.slug}`">
              {{ $t("solutions.cta_more") }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================== 技术底座（暗色） =========================== -->
    <section id="technology" class="section section--dark">
      <div class="container">
        <div class="section-head section-head--center reveal">
          <span class="eyebrow">{{ $t("tech.eyebrow") }}</span>
          <h2>{{ $t("tech.title") }}</h2>
          <p>{{ $t("tech.desc") }}</p>
        </div>
        <div class="tech-grid">
          <div v-for="(t, i) in tech" :key="i" class="tech-card reveal">
            <div class="tech-card__icon" v-html="t.svg"></div>
            <h3 class="tech-card__title">{{ $t(t.titleKey) }}</h3>
            <p class="tech-card__desc">{{ $t(t.descKey) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================== 客户与案例 =========================== -->
    <section id="customers" class="section">
      <div class="container">
        <div class="section-head section-head--center reveal">
          <span class="eyebrow">{{ $t("customers.eyebrow") }}</span>
          <h2>{{ $t("customers.title") }}</h2>
          <p>{{ $t("customers.desc") }}</p>
        </div>

        <div class="kpi reveal" style="margin-bottom: 80px;">
          <div class="kpi__item">
            <div class="kpi__num"><span ref="cuAirlinesEl">{{ fmtKPI(cuAirlines, 0) }}</span>+</div>
            <div class="kpi__label">{{ $t("customers.stats.stat1.label") }}</div>
          </div>
          <div class="kpi__item">
            <div class="kpi__num"><span ref="cuYearsEl">{{ fmtKPI(cuYears, 0) }}</span>+</div>
            <div class="kpi__label">{{ $t("customers.stats.stat2.label") }}</div>
          </div>
          <div class="kpi__item">
            <div class="kpi__num"><span ref="cuExpertsEl">{{ fmtKPI(cuExperts, 0) }}</span>+</div>
            <div class="kpi__label">{{ $t("customers.stats.stat3.label") }}</div>
          </div>
          <div class="kpi__item">
            <div class="kpi__num"><span ref="cuCapsEl">{{ fmtKPI(cuCaps, 0) }}</span></div>
            <div class="kpi__label">{{ $t("customers.stats.stat4.label") }}</div>
          </div>
        </div>

        <div class="testimonials reveal">
          <div v-for="(c, i) in testimonials" :key="i" class="tm-card">
            <p class="quote">{{ $t(c.quoteKey) }}</p>
            <div class="name">{{ $t(c.nameKey) }}</div>
            <div class="role">{{ $t(c.companyKey) }}</div>
          </div>
        </div>

        <!-- 脱敏案例 + 指标 -->
        <div class="cases-grid reveal" style="margin-top: 60px;">
          <div v-for="(cs, i) in caseStudies" :key="i" class="case-card">
            <div class="case-card__header">
              <span class="tag">{{ $t(cs.scopeKey) }}</span>
              <h3>{{ $t(cs.headlineKey) }}</h3>
            </div>
            <div class="case-card__metrics">
              <div v-for="(m, j) in cs.metrics" :key="j" class="metric">
                <div class="metric__value">{{ m.value }}</div>
                <div class="metric__label">{{ $t(m.labelKey) }}</div>
              </div>
            </div>
            <p class="case-card__summary">{{ $t(cs.summaryKey) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================== CTA banner =========================== -->
    <section class="section--tight">
      <div class="container">
        <div class="cta-banner reveal">
          <h2>{{ $t("cta.title") }}</h2>
          <p>{{ $t("cta.desc") }}</p>
          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <a class="btn btn-primary" href="#contact" @click="scrollTo('contact', $event)">
              {{ $t("cta.cta_primary") }}
            </a>
            <a class="btn btn-on-dark-ghost" href="#solutions" @click="scrollTo('solutions', $event)">
              {{ $t("cta.cta_secondary") }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================== 联系 =========================== -->
    <section id="contact" class="section">
      <div class="container">
        <div class="section-head section-head--center reveal">
          <span class="eyebrow">{{ $t("contact.eyebrow") }}</span>
          <h2>{{ $t("contact.title") }}</h2>
          <p>{{ $t("contact.subtitle") }}</p>
        </div>

        <div class="contact-grid reveal">
          <!-- 左侧: 公司信息 + 商务引导 -->
          <div class="contact-info">
            <div class="contact-info__intro">
              <h3 class="contact-info__heading">{{ $t("contact.info.heading", "直接联系商务团队") }}</h3>
              <p class="contact-info__desc">{{ $t("contact.info.intro", "我们的方案顾问会基于您的航线网络、客舱结构和现有系统栈，1 个工作日内回复专属方案与报价。") }}</p>
            </div>

            <ul class="contact-list">
              <li class="contact-list__item">
                <div class="contact-list__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
                </div>
                <div class="contact-list__body">
                  <span class="contact-list__label">{{ $t("contact.info.email") }}</span>
                  <a class="contact-list__value" href="mailto:contact@mitoaitech.com">contact@mitoaitech.com</a>
                </div>
              </li>
              <li class="contact-list__item">
                <div class="contact-list__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div class="contact-list__body">
                  <span class="contact-list__label">{{ $t("contact.info.address") }}</span>
                  <span class="contact-list__value">{{ $t("contact.info.addressDetail") }}</span>
                </div>
              </li>
            </ul>

            <!-- 信任徽章 / SLA 承诺 -->
            <div class="contact-info__badges">
              <div class="contact-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <span>{{ $t("contact.info.badge1", "1 个工作日内回复") }}</span>
              </div>
              <div class="contact-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v7c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5l-8-3z"/></svg>
                <span>{{ $t("contact.info.badge2", "信息严格保密") }}</span>
              </div>
              <div class="contact-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                <span>{{ $t("contact.info.badge3", "免费方案咨询") }}</span>
              </div>
            </div>
          </div>

          <!-- 右侧: 提交表单 -->
          <form class="contact-form" @submit.prevent="onContactSubmit">
            <div class="contact-form__head">
              <h3>{{ $t("contact.form.title") }}</h3>
              <span class="contact-form__sub">{{ $t("contact.form.sub", "所有信息仅用于方案沟通") }}</span>
            </div>

            <div class="form-grid">
              <label class="form-field">
                <span class="form-field__label">{{ $t("contact.form.name") }} <em>*</em></span>
                <div class="form-field__wrap">
                  <svg class="form-field__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input v-model="form.name" type="text" name="name" required :placeholder="$t('contact.form.namePh', '请输入您的姓名')" autocomplete="name" />
                </div>
              </label>

              <label class="form-field">
                <span class="form-field__label">{{ $t("contact.form.email") }} <em>*</em></span>
                <div class="form-field__wrap">
                  <svg class="form-field__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
                  <input v-model="form.email" type="email" name="email" required :placeholder="$t('contact.form.emailPh', 'name@company.com')" autocomplete="email" />
                </div>
              </label>

              <label class="form-field">
                <span class="form-field__label">{{ $t("contact.form.company", "公司") }}</span>
                <div class="form-field__wrap">
                  <svg class="form-field__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>
                  <input v-model="form.company" type="text" name="company" :placeholder="$t('contact.form.companyPh', '海南航空 / Air China')" autocomplete="organization" />
                </div>
              </label>

              <label class="form-field">
                <span class="form-field__label">{{ $t("contact.form.role", "您的角色") }}</span>
                <div class="form-field__wrap">
                  <svg class="form-field__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6"/><path d="M23 11h-6"/></svg>
                  <input v-model="form.role" type="text" name="role" :placeholder="$t('contact.form.rolePh', '收益总监 / 信息化负责人')" />
                </div>
              </label>
            </div>

            <label class="form-field form-field--full">
              <span class="form-field__label">{{ $t("contact.form.message") }} <em>*</em></span>
              <div class="form-field__wrap form-field__wrap--textarea">
                <svg class="form-field__icon form-field__icon--top" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <textarea v-model="form.message" name="message" rows="4" required :placeholder="$t('contact.form.messagePh', '请简述您的业务场景、痛点、期望的方案类型 (收益管理 / 航线网络 / 数据中台…)')"></textarea>
              </div>
            </label>

            <div class="form__actions form__actions--between">
              <span class="form__privacy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                {{ $t("contact.form.privacy", "提交即同意我们将信息仅用于本次沟通") }}
              </span>
              <div class="form__submit-group">
                <button class="btn btn-primary btn-submit" type="submit" :disabled="contactSubmitting">
                  <span class="btn-submit__label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>
                    {{ $t("contact.form.submit") }}
                  </span>
                </button>
                <span
                  class="form__status"
                  :class="contactStatusClass"
                  :aria-live="'polite'"
                >
                  {{ contactStatus }}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
/* ===================== SEO META ===================== */
useSeoMeta({
  title: '迈途数创 Mito — 航司商业运营数字化系统 | 收益管理·运价·航线网络·数据中台',
  description:
    '海南迈途数创科技专注民航 IT 服务，为航空公司提供收益管理、动态定价、航线网络规划、航班主控、数据中台等数字化转型解决方案。已服务 10+ 航司客户，覆盖 6 大业务领域。',
  keywords:
    '民航数字化,航司IT服务,收益管理,RMS,动态定价,航线网络规划,航班主控,数据中台,航空AI,海南迈途数创,Mito,NDC,GDS,PSS',
  ogType: 'website',
  ogTitle: '迈途数创 Mito — 航司商业运营数字化系统',
  ogDescription:
    '国际航司业务服务商，专注收益管理、航线网络、数据中台与航空 AI。已服务 10+ 航司客户。',
  ogImage: 'https://mitoaitech.com/og/home.png',
  ogImageAlt: '迈途数创 Mito 官网首页',
  ogUrl: 'https://mitoaitech.com/',
  ogSiteName: '迈途数创 Mito',
  ogLocale: 'zh_CN',
  ogLocaleAlternate: ['zh_TW', 'en_US'],
  twitterCard: 'summary_large_image',
  twitterTitle: '迈途数创 Mito — 航司商业运营数字化系统',
  twitterDescription: '国际航司业务服务商，专注收益管理、航线网络、数据中台与航空 AI。',
  twitterImage: 'https://mitoaitech.com/og/home.png',
  twitterSite: '@mitoaitech',
  robots: 'index, follow, max-image-preview:large',
  author: '海南迈途数创科技有限公司'
})

const { locale } = useI18n()
const currentLocale = computed(() => locale.value)
const siteUrl = 'https://mitoaitech.com'

useHead({
  htmlAttrs: {
    lang: currentLocale,
    prefix: 'og: https://ogp.me/ns#'
  },
  link: [
    { rel: 'canonical', href: `${siteUrl}/?locale=zh-CN` },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.svg' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'alternate', hreflang: 'zh-CN', href: `${siteUrl}/?locale=zh-CN` },
    { rel: 'alternate', hreflang: 'zh-TW', href: `${siteUrl}/?locale=zh-TW` },
    { rel: 'alternate', hreflang: 'en-US', href: `${siteUrl}/?locale=en-US` },
    { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/` }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: '海南迈途数创科技有限公司',
        alternateName: ['Mito', '迈途数创', 'Hainan Mito Transport Intelligence'],
        url: siteUrl,
        logo: `${siteUrl}/og/home.png`,
        description:
          '海南迈途数创科技专注民航 IT 服务，为航空公司提供收益管理、动态定价、航线网络规划、航班主控、数据中台等数字化转型解决方案。',
        foundingDate: '2023',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '海南自由贸易港',
          addressLocality: '海口市',
          addressRegion: '海南省',
          addressCountry: 'CN'
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            areaServed: ['CN', 'APAC', 'GLOBAL'],
            availableLanguage: ['Chinese', 'English'],
            url: `${siteUrl}/#contact`
          }
        ],
        sameAs: ['https://github.com/bigdamowang/front']
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: '迈途数创 Mito',
        url: siteUrl,
        inLanguage: ['zh-CN', 'zh-TW', 'en-US'],
        publisher: {
          '@type': 'Organization',
          name: '海南迈途数创科技有限公司'
        }
      })
    }
  ]
})

/* ===================== HERO 数据条 ===================== */
const tickerBase = {
  airlines: 10,
  prices: 3210402,
  flights: 184260,
  latency: 86
}
const airlinesEl = ref<HTMLElement | null>(null)
const pricesEl = ref<HTMLElement | null>(null)
const flightsEl = ref<HTMLElement | null>(null)

const ticker = reactive({
  airlines: tickerBase.airlines,
  prices: tickerBase.prices,
  flights: tickerBase.flights,
  latency: tickerBase.latency
})

const fmtN = (n: number) => n.toLocaleString("en-US")

const airlinesFmt = computed(() => `${ticker.airlines}+`)
const pricesFmt = computed(() => fmtN(ticker.prices))
const flightsFmt = computed(() => fmtN(ticker.flights))
const latencyFmt = computed(() => `${ticker.latency}`)

/* Hero 产品面板：迷你柱状图（示意） */
const chartBars = [42, 55, 48, 63, 58, 71, 66, 80, 74, 88]

/* 认证 / 合规 */
const certifications = [
  { label: "IATA NDC" },
  { label: "One Order" },
  { label: "ISO 27001" },
  { label: "等保三级" }
]

/* ===================== KPI 计数 ===================== */
const kpiBase = { airlines: 10, modules: 6, experts: 90, passengers: 1.2 }
const kpiAirlines = ref(0)
const kpiModules = ref(0)
const kpiExperts = ref(0)
const kpiPassengers = ref(0)
const kpiAirlinesEl = ref<HTMLElement | null>(null)
const kpiModulesEl = ref<HTMLElement | null>(null)
const kpiExpertsEl = ref<HTMLElement | null>(null)
const kpiPassengersEl = ref<HTMLElement | null>(null)

const cuBase = { airlines: 10, years: 6, experts: 30, caps: 9 }
const cuAirlines = ref(0)
const cuYears = ref(0)
const cuExperts = ref(0)
const cuCaps = ref(0)
const cuAirlinesEl = ref<HTMLElement | null>(null)
const cuYearsEl = ref<HTMLElement | null>(null)
const cuExpertsEl = ref<HTMLElement | null>(null)
const cuCapsEl = ref<HTMLElement | null>(null)

function fmtKPI(v: number, decimals: number) {
  return decimals ? v.toFixed(decimals) : String(v)
}

function animateCount(el: HTMLElement | null, to: number, decimals: number, dur = 1500) {
  if (!el || typeof window === "undefined") return
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduced) {
    el.textContent = fmtKPI(to, decimals)
    return
  }
  const start = performance.now()
  const from = 0
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / dur)
    const eased = 1 - Math.pow(1 - t, 3)
    const v = from + (to - from) * eased
    el.textContent = fmtKPI(decimals ? Number(v.toFixed(decimals)) : Math.round(v), decimals)
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

/* ===================== 数据 ===================== */
const logos = [
  { file: "ces.svg", name: "东方航空", en: "China Eastern" },
  { file: "csa.svg", name: "中国南方航空", en: "China Southern" },
  { file: "csn.svg", name: "中国国际航空", en: "Air China" },
  { file: "gs.svg", name: "天津航空", en: "Tianjin Airlines" },
  { file: "hna.svg", name: "海南航空", en: "Hainan Airlines" },
  { file: "jd.svg", name: "首都航空", en: "Capital Airlines" },
  { file: "kn.svg", name: "吉祥航空", en: "Juneyao Airlines" },
  { file: "uba.svg", name: "春秋航空", en: "Spring Airlines" }
]

const solutions = [
  { slug: "rms", tagKey: "solutions.items.rm.tag", titleKey: "solutions.items.rm.title", descKey: "solutions.items.rm.desc" },
  { slug: "pms", tagKey: "solutions.items.pricing.tag", titleKey: "solutions.items.pricing.title", descKey: "solutions.items.pricing.desc" },
  { slug: "nps", tagKey: "solutions.items.network.tag", titleKey: "solutions.items.network.title", descKey: "solutions.items.network.desc" },
  { slug: "ofc", tagKey: "solutions.items.ops.tag", titleKey: "solutions.items.ops.title", descKey: "solutions.items.ops.desc" },
  { slug: "retail", tagKey: "solutions.items.retail.tag", titleKey: "solutions.items.retail.title", descKey: "solutions.items.retail.desc" },
  { slug: "data", tagKey: "solutions.items.data.tag", titleKey: "solutions.items.data.title", descKey: "solutions.items.data.desc" }
]

// lucide 风格 inline SVG 图标(24×24, stroke, currentColor)
const cloudSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19a4.5 4.5 0 1 0-1.2-8.84 6 6 0 0 0-11.6 2.34A4 4 0 0 0 5 19h12.5z"/><path d="M9 14h6"/><path d="M12 11v6"/></svg>'
const aiSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3.5"/></svg>'
const apiSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h12a4 4 0 0 1 4 4v2"/><path d="M16 21l4-4-4-4"/><path d="M20 17H8a4 4 0 0 1-4-4v-2"/></svg>'
const shieldSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v7c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5l-8-3z"/><path d="m9 12 2 2 4-4"/></svg>'
const networkSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v3.5"/><path d="m13.5 12-6 5"/><path d="m10.5 12 6 5"/></svg>'
const devopsSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'

const tech = [
  { svg: cloudSvg, titleKey: "tech.items.cloud.title", descKey: "tech.items.cloud.desc" },
  { svg: aiSvg, titleKey: "tech.items.ai.title", descKey: "tech.items.ai.desc" },
  { svg: apiSvg, titleKey: "tech.items.api.title", descKey: "tech.items.api.desc" },
  { svg: shieldSvg, titleKey: "tech.items.security.title", descKey: "tech.items.security.desc" },
  { svg: networkSvg, titleKey: "tech.items.ecosystem.title", descKey: "tech.items.ecosystem.desc" },
  { svg: devopsSvg, titleKey: "tech.items.devops.title", descKey: "tech.items.devops.desc" }
]

const testimonials = [
  { quoteKey: "customers.testimonials.t1.quote", nameKey: "customers.testimonials.t1.name", companyKey: "customers.testimonials.t1.company" },
  { quoteKey: "customers.testimonials.t2.quote", nameKey: "customers.testimonials.t2.name", companyKey: "customers.testimonials.t2.company" },
  { quoteKey: "customers.testimonials.t3.quote", nameKey: "customers.testimonials.t3.name", companyKey: "customers.testimonials.t3.company" }
]

const caseStudies = [
  {
    scopeKey: "customers.cases.c1.scope",
    headlineKey: "customers.cases.c1.headline",
    metrics: [
      { value: "+12.4%", labelKey: "customers.cases.c1.stats.0.label" },
      { value: "5x", labelKey: "customers.cases.c1.stats.1.label" }
    ],
    summaryKey: "customers.cases.c1.summary"
  },
  {
    scopeKey: "customers.cases.c2.scope",
    headlineKey: "customers.cases.c2.headline",
    metrics: [
      { value: "+7", labelKey: "customers.cases.c2.stats.0.label" },
      { value: "91%", labelKey: "customers.cases.c2.stats.1.label" }
    ],
    summaryKey: "customers.cases.c2.summary"
  },
  {
    scopeKey: "customers.cases.c3.scope",
    headlineKey: "customers.cases.c3.headline",
    metrics: [
      { value: "8x", labelKey: "customers.cases.c3.stats.0.label" },
      { value: "-43%", labelKey: "customers.cases.c3.stats.1.label" }
    ],
    summaryKey: "customers.cases.c3.summary"
  }
]

/* ===================== 表单 ===================== */
const form = reactive({ name: "", email: "", company: "", role: "", message: "" })
const contactSubmitting = ref(false)
const contactStatus = ref("")
const contactStatusClass = ref("")
async function onContactSubmit() {
  if (contactSubmitting.value) return
  contactSubmitting.value = true
  contactStatusClass.value = "is-loading"
  contactStatus.value = "正在提交..."
  try {
    await $fetch("/api/contact", {
      method: "POST",
      body: { name: form.name, email: form.email, company: form.company, role: form.role, message: form.message }
    })
    contactStatusClass.value = "is-success"
    contactStatus.value = "提交成功，我们会尽快与您联系！"
    Object.assign(form, { name: "", email: "", company: "", role: "", message: "" })
  } catch (err: any) {
    contactStatusClass.value = "is-error"
    contactStatus.value = err?.message || "提交失败，请稍后重试"
  } finally {
    contactSubmitting.value = false
  }
}

/* ===================== 锚点跳转 / Reveal ===================== */
function scrollTo(id: string, e: Event) {
  e.preventDefault()
  const target = document.getElementById(id)
  if (!target) return
  const headerOffset = 72
  const y = target.getBoundingClientRect().top + window.scrollY - headerOffset
  window.scrollTo({ top: y, behavior: "smooth" })
  history.pushState(null, "", `#${id}`)
}

let revealIO: IntersectionObserver | null = null

onMounted(() => {
  /* Reveal on scroll */
  revealIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible")
        revealIO!.unobserve(e.target)
      }
    })
  }, { threshold: 0.12 })
  document.querySelectorAll(".reveal").forEach(el => revealIO!.observe(el))

  /* Ticker 实时跳动 */
  setInterval(() => {
    ticker.prices += 56 + Math.floor(Math.random() * 12)
    ticker.flights += Math.floor(Math.random() * 6)
  }, 3600)
  setInterval(() => {
    ticker.latency = Math.max(72, Math.min(102, ticker.latency + (Math.random() > 0.5 ? 1 : -1)))
  }, 5000)

  /* KPI 计数 */
  const kpiMap: Array<[HTMLElement | null, number, number]> = [
    [kpiAirlinesEl.value, kpiBase.airlines, 0],
    [kpiModulesEl.value, kpiBase.modules, 0],
    [kpiExpertsEl.value, kpiBase.experts, 0],
    [kpiPassengersEl.value, kpiBase.passengers, 1]
  ]
  const kpiObs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return
      const target = e.target as HTMLElement
      kpiMap.forEach(([el, val, dec]) => {
        if (el === target) animateCount(el, val, dec)
      })
      kpiObs.unobserve(target)
    })
  }, { threshold: 0.4 })
  kpiMap.forEach(([el]) => el && kpiObs.observe(el))

  /* Customers KPI 计数 */
  const cuMap: Array<[HTMLElement | null, number, number]> = [
    [cuAirlinesEl.value, cuBase.airlines, 0],
    [cuYearsEl.value, cuBase.years, 0],
    [cuExpertsEl.value, cuBase.experts, 0],
    [cuCapsEl.value, cuBase.caps, 0]
  ]
  const cuObs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return
      const target = e.target as HTMLElement
      cuMap.forEach(([el, val, dec]) => {
        if (el === target) animateCount(el, val, dec)
      })
      cuObs.unobserve(target)
    })
  }, { threshold: 0.4 })
  cuMap.forEach(([el]) => el && cuObs.observe(el))
})

onBeforeUnmount(() => {
  if (revealIO) revealIO.disconnect()
})
</script>
