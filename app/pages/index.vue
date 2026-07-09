<template>
  <!-- ============================== HERO ============================== -->
  <header id="home" class="hero">
    <div class="hero__grid-bg"></div>
    <div class="container hero__inner">
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
        <a class="btn btn-on-dark-ghost" href="#solutions" @click="scrollTo('solutions', $event)">
          {{ $t("hero.cta_secondary") }}
        </a>
      </div>

      <!-- Live data ticker(SSR 用初始值;客户端 hydrate 后用 onMounted 做计数动画 + 浮动) -->
      <div class="hero__ticker" role="status" aria-live="polite">
        <div class="ticker-row">
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
            <span class="ticker-num">{{ latencyFmt }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧业务可视化: SVG 3D 地球 + 航线 + 3 个叠加面板 -->
    <div class="hero__business-visual" aria-hidden="true">
      <!-- 路线图 -->
      <div class="route-panel">
        <div class="route-panel__head">
          <span class="route-panel__title">
            <svg class="route-panel__title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/></svg>
            Route network
          </span>
          <strong class="route-panel__iata">PEK / SHA / CAN / HKG</strong>
        </div>
        <div class="route-map">
          <svg class="route-globe" viewBox="0 0 520 240" role="img" aria-label="Airline route network">
            <defs>
              <radialGradient id="globeFill" cx="32%" cy="24%" r="82%">
                <stop offset="0" stop-color="#F1FBFF" stop-opacity="0.42" />
                <stop offset="0.24" stop-color="#7DD9F2" stop-opacity="0.25" />
                <stop offset="0.58" stop-color="#1F6FA8" stop-opacity="0.20" />
                <stop offset="1" stop-color="#061421" stop-opacity="0.86" />
              </radialGradient>
              <radialGradient id="globeRim" cx="50%" cy="50%" r="52%">
                <stop offset="0.66" stop-color="#5BC8E8" stop-opacity="0" />
                <stop offset="0.92" stop-color="#5BC8E8" stop-opacity="0.28" />
                <stop offset="1" stop-color="#EAF8FF" stop-opacity="0.50" />
              </radialGradient>
              <radialGradient id="globeHalo" cx="50%" cy="50%" r="52%">
                <stop offset="0" stop-color="#5BC8E8" stop-opacity="0.22" />
                <stop offset="0.60" stop-color="#4FA3D9" stop-opacity="0.10" />
                <stop offset="1" stop-color="#4FA3D9" stop-opacity="0" />
              </radialGradient>
              <linearGradient id="routeLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#5BC8E8" stop-opacity="0" />
                <stop offset="0.45" stop-color="#5BC8E8" stop-opacity="0.95" />
                <stop offset="1" stop-color="#4FA3D9" stop-opacity="0" />
              </linearGradient>
              <filter id="routeGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <clipPath id="globeClip">
                <circle cx="260" cy="120" r="88" />
              </clipPath>
            </defs>
            <g class="globe-stage" transform="translate(260 120) scale(1.16) translate(-260 -120)">
              <g class="globe-shadow">
                <ellipse cx="260" cy="214" rx="112" ry="19" />
              </g>
              <circle class="globe-halo" cx="260" cy="120" r="118" />
              <circle class="globe-fill" cx="260" cy="120" r="88" />
              <circle class="globe-highlight" cx="224" cy="76" r="28" />
              <ellipse class="globe-terminator" cx="300" cy="148" rx="64" ry="76" />
              <circle class="globe-rim" cx="260" cy="120" r="88" />
              <g clip-path="url(#globeClip)">
                <path
                  class="globe-land"
                  d="M199 86c16-12 39-16 57-9 14 5 22 2 37-2 20-5 41 3 54 15-22 3-36 11-50 19-15 9-32 5-44-3-14-9-28-10-48-5-14 4-24-3-6-15Zm-25 51c22-11 42-13 61-7 18 6 29 18 49 15 18-3 38-16 62-9-12 19-39 33-67 36-43 4-78-7-105-35Z"
                />
                <g class="globe-latitudes">
                  <ellipse cx="260" cy="120" rx="108" ry="18" />
                  <ellipse cx="260" cy="120" rx="104" ry="45" />
                  <ellipse cx="260" cy="120" rx="96" ry="70" />
                </g>
                <g class="globe-longitudes">
                  <ellipse cx="260" cy="120" rx="22" ry="91" />
                  <ellipse cx="260" cy="120" rx="52" ry="91" />
                  <ellipse cx="260" cy="120" rx="82" ry="91" />
                  <path d="M172 120H348" />
                </g>
                <path class="route-arc route-arc--back" pathLength="100" d="M176 132C220 72 311 63 349 110" />
              </g>
              <path class="route-arc route-arc--a" pathLength="100" d="M184 143C229 84 298 80 348 112" />
              <path class="route-arc route-arc--b" pathLength="100" d="M194 154C248 170 317 155 374 126" />
              <path class="route-arc route-arc--c" pathLength="100" d="M228 83C280 101 330 139 354 165" />
              <circle class="route-node route-node--a" cx="184" cy="143" r="5" />
              <circle class="route-node route-node--b" cx="228" cy="83" r="5" />
              <circle class="route-node route-node--c" cx="314" cy="120" r="5" />
              <circle class="route-node route-node--d" cx="354" cy="165" r="5" />
              <circle class="route-flight route-flight--a" r="3.5" filter="url(#routeGlow)">
                <animateMotion dur="5.6s" repeatCount="indefinite" path="M184 143C229 84 298 80 348 112" />
              </circle>
              <circle class="route-flight route-flight--b" r="3.5" filter="url(#routeGlow)">
                <animateMotion dur="6.4s" begin="-1.6s" repeatCount="indefinite" path="M194 154C248 170 317 155 374 126" />
              </circle>
              <circle class="route-flight route-flight--c" r="3.5" filter="url(#routeGlow)">
                <animateMotion dur="5.1s" begin="-2.4s" repeatCount="indefinite" path="M228 83C280 101 330 139 354 165" />
              </circle>
            </g>
          </svg>
        </div>
      </div>
      <!-- 运营状态 -->
      <div class="ops-panel">
        <div class="ops-panel__row">
          <span class="ops-panel__label">
            <span class="ops-panel__dot ops-panel__dot--up"></span>
            RMS forecast
          </span>
          <strong class="ops-panel__val ops-panel__val--up">+3.2%</strong>
        </div>
        <div class="ops-panel__bar"><i style="width: 72%; background: linear-gradient(90deg, #3DD9B6, #5BC8E8);"></i></div>
        <div class="ops-panel__row">
          <span class="ops-panel__label">
            <span class="ops-panel__dot ops-panel__dot--ok"></span>
            Fare filing
          </span>
          <strong class="ops-panel__val ops-panel__val--ok">Ready</strong>
        </div>
        <div class="ops-panel__bar"><i style="width: 84%; background: linear-gradient(90deg, var(--brand-primary), var(--brand-cyan));"></i></div>
        <div class="ops-panel__row">
          <span class="ops-panel__label">
            <span class="ops-panel__dot ops-panel__dot--mid"></span>
            NDC orders
          </span>
          <strong class="ops-panel__val">18.4k <em>/day</em></strong>
        </div>
        <div class="ops-panel__bar"><i style="width: 58%; background: linear-gradient(90deg, #2D86BF, #4FA3D9);"></i></div>
      </div>
      <!-- 运价控制 -->
      <div class="fare-panel">
        <div class="fare-panel__head">
          <span>Route</span>
          <span>Cabin</span>
          <span>Action</span>
        </div>
        <div class="fare-panel__row">
          <strong>SHA-CAN</strong>
          <span class="fare-panel__cabin">M</span>
          <em class="fare-panel__action fare-panel__action--hold">Hold</em>
        </div>
        <div class="fare-panel__row">
          <strong>PEK-HKG</strong>
          <span class="fare-panel__cabin">Y</span>
          <em class="fare-panel__action fare-panel__action--open">Open</em>
        </div>
        <div class="fare-panel__row">
          <strong>SHA-CTU</strong>
          <span class="fare-panel__cabin">K</span>
          <em class="fare-panel__action fare-panel__action--close">Close</em>
        </div>
      </div>
    </div>
  </header>

  <main role="main" id="main">
    <!-- =========================== LOGO WALL =========================== -->
    <!-- 设计参考 v1.html 合作伙伴区块: 纯文字 + 蓝边框 + 渐变短横线 (无 SVG) -->
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
      </div>
    </section>

    <!-- ============================== KPI ============================== -->
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

    <!-- =========================== SOLUTIONS 6 卡 =========================== -->
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

    <!-- =========================== TECH 暗色 6 项 =========================== -->
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

    <!-- =========================== CUSTOMERS =========================== -->
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

        <!-- Case Studies with Metrics -->
        <div class="cases-grid reveal" style="margin-top: 60px;">
          <div v-for="(cs, i) in caseStudies" :key="i" class="case-card">
            <div class="case-card__header">
              <span class="tag">{{ $t(cs.scopeKey) }}</span>
              <h3>{{ $t(cs.headlineKey) }}</h3>
            </div>
            <div class="case-card__metrics">
              <div v-for="(m, j) in cs.metrics" :key="j" class="metric">
                <div class="metric__value">{{ m.value }}</div>
                <div class="metric__label">{{ m.label }}</div>
              </div>
            </div>
            <p class="case-card__summary">{{ $t(cs.summaryKey) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================== INSIGHTS(3 张封面式) =========================== -->
    <section class="section section--soft">
      <div class="container">
        <div class="section-head section-head--center reveal">
          <span class="eyebrow">{{ $t("insights.eyebrow") }}</span>
          <h2>{{ $t("insights.title") }}</h2>
          <p>{{ $t("insights.desc") }}</p>
        </div>
        <div class="insights-grid">
          <article v-for="(w, i) in whitepapers" :key="i" class="insight-card reveal">
            <div class="cover">{{ String(i + 1).padStart(2, "0") }}</div>
            <div class="body">
              <span class="tag">{{ $t(w.tagKey) }}</span>
              <h3>{{ $t(w.titleKey) }}</h3>
              <p>{{ $t(w.descKey) }}</p>
              <a class="btn-link" href="#" @click.prevent>{{ $t(w.btnKey) }}</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- =========================== NEWS LIST =========================== -->
    <section class="section">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">{{ $t("news.eyebrow") }}</span>
          <h2>{{ $t("news.title") }}</h2>
        </div>
        <div class="news-list reveal">
          <div v-for="(n, i) in newsItems" :key="i" class="news-item">
            <div class="date">{{ $t(n.dateKey) }}</div>
            <div class="title">{{ $t(n.titleKey) }}</div>
            <div class="tag">{{ $t(n.tagKey) }}</div>
          </div>
        </div>
        <div style="margin-top: 24px;">
          <a class="btn-link" href="#" @click.prevent>{{ $t("news.more") }}</a>
        </div>
      </div>
    </section>

    <!-- =========================== INSIGHTS 6 卡(平铺式) =========================== -->
    <section id="insights" class="section">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">{{ $t("insights.eyebrow") }}</span>
          <h2>{{ $t("insights.title2", $t("insights.title")) }}</h2>
          <p>{{ $t("insights.desc2", $t("insights.desc")) }}</p>
        </div>

        <div class="insight-grid reveal">
          <article
            v-for="(c, i) in insightCards"
            :key="i"
            class="insight-card"
            :data-filter="c.filter"
          >
            <span
              class="insight-card__tag"
              :class="c.tagModifier"
            >{{ $t(c.tagKey) }}</span>
            <h3>{{ $t(c.titleKey) }}</h3>
            <p>{{ $t(c.descKey) }}</p>
            <div class="insight-card__meta">
              <span>{{ $t(c.metaKey) }}</span>
            </div>
            <a class="insight-card__cta" href="#" @click.prevent>{{ $t(c.btnKey) }} →</a>
          </article>
        </div>

        <div class="insight-strip reveal">
          <div class="insight-count" aria-live="polite">
            {{ $t("insights.count_prefix") }} {{ visibleInsightCount }} {{ $t("insights.count_suffix") }}
          </div>
          <div class="insight-strip__filters" role="tablist" aria-label="内容过滤">
            <button
              v-for="f in insightFilters"
              :key="f.key"
              role="tab"
              :aria-selected="insightFilter === f.key ? 'true' : 'false'"
              class="insight-strip__chip"
              :class="{ 'is-active': insightFilter === f.key }"
              @click="setInsightFilter(f.key)"
            >
              {{ $t(f.labelKey) }}
            </button>
          </div>
          <a class="insight-strip__all" href="#" @click.prevent>{{ $t("insights.view_all") }} →</a>
        </div>
      </div>
    </section>

    <!-- =========================== PRICING / COMMITMENT =========================== -->
    <section class="section section--soft">
      <div class="container">
        <div class="section-head section-head--center reveal">
          <span class="eyebrow">{{ $t("pricing.eyebrow") }}</span>
          <h2>{{ $t("pricing.title") }}</h2>
          <p>{{ $t("pricing.desc") }}</p>
        </div>
        <div class="pricing-grid reveal">
          <div class="pricing-card">
            <div class="pricing-card__icon"></div>
            <h3>{{ $t("pricing.items.p1.title") }}</h3>
            <p>{{ $t("pricing.items.p1.desc") }}</p>
          </div>
          <div class="pricing-card pricing-card--featured">
            <div class="pricing-card__badge">{{ $t("pricing.items.p2.badge") }}</div>
            <div class="pricing-card__icon">⚡</div>
            <h3>{{ $t("pricing.items.p2.title") }}</h3>
            <p>{{ $t("pricing.items.p2.desc") }}</p>
          </div>
          <div class="pricing-card">
            <div class="pricing-card__icon"></div>
            <h3>{{ $t("pricing.items.p3.title") }}</h3>
            <p>{{ $t("pricing.items.p3.desc") }}</p>
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
            <a class="btn btn-on-dark" href="#solutions" @click="scrollTo('solutions', $event)">
              {{ $t("cta.cta_secondary") }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================== NEWSLETTER =========================== -->
    <section class="section--tight">
      <div class="container">
        <form class="newsletter reveal" @submit.prevent="onNewsletterSubmit">
          <h2>{{ $t("newsletter.title") }}</h2>
          <p>{{ $t("newsletter.desc") }}</p>
          <div class="newsletter__form">
            <input
              v-model="newsletterEmail"
              type="email"
              required
              :placeholder="$t('newsletter.placeholder')"
            />
            <button class="btn btn-primary" type="submit" :disabled="newsletterSubmitting">
              {{ $t("newsletter.submit") }}
            </button>
          </div>
          <small class="newsletter__small">{{ $t("newsletter.small") }}</small>
          <p v-if="newsletterStatus" class="form__status" :class="newsletterStatusClass">
            {{ newsletterStatus }}
          </p>
        </form>
      </div>
    </section>

    <!-- =========================== ABOUT Mission/Team/Values =========================== -->
    <section id="about" class="section">
      <div class="container">
        <div class="section-head section-head--center reveal">
          <span class="eyebrow">{{ $t("about.eyebrow") }}</span>
          <h2>{{ $t("about.title") }}</h2>
          <p>{{ $t("about.desc") }}</p>
        </div>
        <div class="about-grid">
          <article v-for="(card, i) in aboutCards" :key="i" class="about-card reveal">
            <span class="eyebrow">{{ card.eyebrow }}</span>
            <h3>{{ card.title }}</h3>
            <p>{{ card.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- =========================== TIMELINE =========================== -->
    <section class="section section--soft">
      <div class="container">
        <div class="section-head section-head--center reveal">
          <span class="eyebrow">{{ $t("about.timeline.eyebrow", "Timeline") }}</span>
          <h2>{{ $t("about.timeline.title") }}</h2>
        </div>
        <ol class="timeline reveal">
          <li v-for="(tl, i) in timeline" :key="i">
            <strong>{{ tl.year }}</strong>
            <span>{{ tl.text }}</span>
          </li>
        </ol>
      </div>
    </section>

    <!-- =========================== CONTACT =========================== -->
    <section id="contact" class="section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <span class="eyebrow">{{ $t("contact.eyebrow") }}</span>
            <h2>{{ $t("contact.title") }}</h2>
            <p>{{ $t("contact.subtitle") }}</p>
            <ul class="contact-list">
              <li>
                <span class="contact-list__label">{{ $t("contact.info.email") }}</span>
                <span class="contact-list__value">contact@mitoaitech.com</span>
              </li>
              <li>
                <span class="contact-list__label">{{ $t("contact.info.phone") }}</span>
                <span class="contact-list__value">+86 400-xxx-xxxx</span>
              </li>
              <li>
                <span class="contact-list__label">{{ $t("contact.info.address") }}</span>
                <span class="contact-list__value">{{ $t("contact.info.addressDetail") }}</span>
              </li>
            </ul>
          </div>

          <form class="card" style="padding: var(--sp-6);" @submit.prevent="onContactSubmit">
            <h3 style="margin-bottom: var(--sp-4);">{{ $t("contact.form.title") }}</h3>
            <label style="display:flex; flex-direction:column; gap:6px; margin-bottom: var(--sp-3); font-size:14px; font-weight:500; color:var(--text-secondary);">
              <span>{{ $t("contact.form.name") }}</span>
              <input v-model="form.name" type="text" name="name" required :placeholder="$t('contact.form.name')" style="padding:10px 12px; border:1px solid var(--border); border-radius: var(--r-md); background:#fff;" />
            </label>
            <label style="display:flex; flex-direction:column; gap:6px; margin-bottom: var(--sp-3); font-size:14px; font-weight:500; color:var(--text-secondary);">
              <span>{{ $t("contact.form.email") }}</span>
              <input v-model="form.email" type="email" name="email" required :placeholder="$t('contact.form.email')" style="padding:10px 12px; border:1px solid var(--border); border-radius: var(--r-md); background:#fff;" />
            </label>
            <label style="display:flex; flex-direction:column; gap:6px; margin-bottom: var(--sp-3); font-size:14px; font-weight:500; color:var(--text-secondary);">
              <span>{{ $t("contact.form.company", "公司") }}</span>
              <input v-model="form.company" type="text" name="company" :placeholder="$t('contact.form.company', '公司')" style="padding:10px 12px; border:1px solid var(--border); border-radius: var(--r-md); background:#fff;" />
            </label>
            <label style="display:flex; flex-direction:column; gap:6px; margin-bottom: var(--sp-3); font-size:14px; font-weight:500; color:var(--text-secondary);">
              <span>{{ $t("contact.form.message") }}</span>
              <textarea v-model="form.message" name="message" rows="5" required :placeholder="$t('contact.form.message')" style="padding:10px 12px; border:1px solid var(--border); border-radius: var(--r-md); background:#fff; font-family: inherit;"></textarea>
            </label>
            <div class="form__actions">
              <button class="btn btn-primary" type="submit" :disabled="contactSubmitting">
                {{ $t("contact.form.submit") }}
              </button>
              <span
                class="form__status"
                :class="contactStatusClass"
                :aria-live="'polite'"
              >
                {{ contactStatus }}
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

/* ===================== SEO META (P0) ===================== */
// 需求文档 [官网设计需求文档.md] 第 207-212 行要求:
// 首屏 LCP < 2.5s, CLS < 0.1,OG 图,canonical,hreflang 三件套
useSeoMeta({
  // 基础
  title: '迈途数创 MitoAI - 民航数字化解决方案 | 收益管理·航线网络·数据中台',
  description:
    '海南迈途数创科技专注民航 IT 服务,为航空公司提供收益管理、动态定价、航线网络规划、航班主控、数据中台等数字化转型解决方案。已服务 10+ 航司客户,覆盖 6 大业务领域。',
  keywords:
    '民航数字化,航司IT服务,收益管理,RMS,动态定价,航线网络规划,航班主控,数据中台,航空AI,海南迈途数创,MitoAI,NDC,GDS,PSS',
  // Open Graph(LinkedIn / Facebook / 微信 / 微博 分享卡片)
  ogType: 'website',
  ogTitle: '迈途数创 MitoAI - 民航数字化解决方案',
  ogDescription:
    '国际航司业务服务商,专注收益管理、航线网络、数据中台与航空 AI。已服务 10+ 航司客户。',
  ogImage: 'https://mitoaitech.com/og/home.png',
  ogImageAlt: '迈途数创 MitoAI 官网首页',
  ogUrl: 'https://mitoaitech.com/',
  ogSiteName: '迈途数创 MitoAI',
  ogLocale: 'zh_CN',
  ogLocaleAlternate: ['zh_TW', 'en_US'],
  // Twitter Card
  twitterCard: 'summary_large_image',
  twitterTitle: '迈途数创 MitoAI - 民航数字化解决方案',
  twitterDescription: '国际航司业务服务商,专注收益管理、航线网络、数据中台与航空 AI。',
  twitterImage: 'https://mitoaitech.com/og/home.png',
  twitterSite: '@mitoaitech',
  // Article(可省,这里用 website 类型就够了)
  robots: 'index, follow, max-image-preview:large',
  author: '海南迈途数创科技有限公司'
})

/* hreflang 多语言互链 + canonical + favicon + JSON-LD */
const { locale } = useI18n()
const currentLocale = computed(() => locale.value)
const siteUrl = 'https://mitoaitech.com'

useHead({
  htmlAttrs: {
    lang: currentLocale,
    prefix: 'og: https://ogp.me/ns#'
  },
  link: [
    // canonical
    { rel: 'canonical', href: `${siteUrl}/?locale=zh-CN` },
    // favicon
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.svg' },
    { rel: 'manifest', href: '/site.webmanifest' },
    // hreflang 三语言互链(需求文档 7.2 + Google 多语言 SEO 规范)
    { rel: 'alternate', hreflang: 'zh-CN', href: `${siteUrl}/?locale=zh-CN` },
    { rel: 'alternate', hreflang: 'zh-TW', href: `${siteUrl}/?locale=zh-TW` },
    { rel: 'alternate', hreflang: 'en-US', href: `${siteUrl}/?locale=en-US` },
    { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/` }
  ],
  script: [
    // JSON-LD Organization
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: '海南迈途数创科技有限公司',
        alternateName: ['MitoAI Technology', '迈途数创', 'Hainan Mito Transport Intelligence'],
        url: siteUrl,
        logo: `${siteUrl}/og/home.png`,
        description:
          '海南迈途数创科技专注民航 IT 服务,为航空公司提供收益管理、动态定价、航线网络规划、航班主控、数据中台等数字化转型解决方案。',
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
        sameAs: [
          'https://github.com/bigdamowang/front'
        ]
      })
    },
    // JSON-LD WebSite(含搜索框,Google 支持)
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: '迈途数创 MitoAI',
        url: siteUrl,
        inLanguage: ['zh-CN', 'zh-TW', 'en-US'],
        publisher: {
          '@type': 'Organization',
          name: '海南迈途数创科技有限公司'
        }
      })
    },
    // JSON-LD BreadcrumbList(虽然没有多页路由,但为 SEO 完整性保留结构)
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: '首页',
            item: `${siteUrl}/`
          }
        ]
      })
    }
  ]
})

/* ===================== HERO TICKER ===================== */
// 用 SSR 兜底初始值 + onMounted 后做计数动画
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

/* ===================== 数据(从 v6 扒) ===================== */
// 8 个航司真实 logo(从 /public/logos/*.svg 通过 Vite ?raw 内联,SSR 直出,无需异步 fetch)
// 用 ~~/ 指向 *根目录*(Nuxt 4 compatibility 模式下,~/ 会重写到 app/,但 logo 文件在 v8/public/)
// logo-wall 已改为 v1 纯文字设计 (蓝边 + 渐变短横线), 不再需要 SVG 资源
// import cesSvg from "~~/public/logos/ces.svg?raw"
// import csaSvg from "~~/public/logos/csa.svg?raw"
// import csnSvg from "~~/public/logos/csn.svg?raw"
// import gsSvg from "~~/public/logos/gs.svg?raw"
// import hnaSvg from "~~/public/logos/hna.svg?raw"
// import jdSvg from "~~/public/logos/jd.svg?raw"
// import knSvg from "~~/public/logos/kn.svg?raw"
// import ubaSvg from "~~/public/logos/uba.svg?raw"

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

// lucide 风格 inline SVG 图标(24×24, stroke 2, currentColor)
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

const whitepapers = [
  { tagKey: "insights.items.w1.tag", titleKey: "insights.items.w1.title", descKey: "insights.items.w1.desc", btnKey: "insights.items.w1.btn" },
  { tagKey: "insights.items.w2.tag", titleKey: "insights.items.w2.title", descKey: "insights.items.w2.desc", btnKey: "insights.items.w2.btn" },
  { tagKey: "insights.items.w3.tag", titleKey: "insights.items.w3.title", descKey: "insights.items.w3.desc", btnKey: "insights.items.w3.btn" }
]

const newsItems = [
  { dateKey: "news.items.n1.date", titleKey: "news.items.n1.title", tagKey: "news.items.n1.tag" },
  { dateKey: "news.items.n2.date", titleKey: "news.items.n2.title", tagKey: "news.items.n2.tag" },
  { dateKey: "news.items.n3.date", titleKey: "news.items.n3.title", tagKey: "news.items.n3.tag" }
]

const insightCards = [
  { filter: "wp", tagModifier: "", tagKey: "insights.c1.tag", titleKey: "insights.c1.title", descKey: "insights.c1.desc", metaKey: "insights.meta.minutes", btnKey: "insights.c1.btn" },
  { filter: "case", tagModifier: "--case", tagKey: "insights.c2.tag", titleKey: "insights.c2.title", descKey: "insights.c2.desc", metaKey: "insights.meta.minutes", btnKey: "insights.c2.btn" },
  { filter: "blog", tagModifier: "--blog", tagKey: "insights.c3.tag", titleKey: "insights.c3.title", descKey: "insights.c3.desc", metaKey: "insights.meta.minutes", btnKey: "insights.c3.btn" },
  { filter: "case", tagModifier: "--case", tagKey: "insights.c4.tag", titleKey: "insights.c4.title", descKey: "insights.c4.desc", metaKey: "insights.meta.case", btnKey: "insights.c4.btn" },
  { filter: "video", tagModifier: "--video", tagKey: "insights.c5.tag", titleKey: "insights.c5.title", descKey: "insights.c5.desc", metaKey: "insights.meta.video", btnKey: "insights.c5.btn" },
  { filter: "video", tagModifier: "--pod", tagKey: "insights.c6.tag", titleKey: "insights.c6.title", descKey: "insights.c6.desc", metaKey: "insights.meta.audio", btnKey: "insights.c6.btn" }
]
const insightFilters = [
  { key: "all", labelKey: "insights.filter.all" },
  { key: "wp", labelKey: "insights.filter.wp" },
  { key: "case", labelKey: "insights.filter.case" },
  { key: "video", labelKey: "insights.filter.video" }
]
const insightFilter = ref<"all" | "wp" | "case" | "video" | "blog">("all")
const visibleInsightCount = computed(() =>
  insightFilter.value === "all"
    ? insightCards.length
    : insightCards.filter(c => c.filter === insightFilter.value).length
)
function setInsightFilter(k: "all" | "wp" | "case" | "video" | "blog") {
  insightFilter.value = k
}

const aboutCards = [
  {
    eyebrow: "Mission",
    title: "让航司数字化,从海南连接世界",
    desc: "我们相信中国民航的数字化不是单点工具的堆砌,而是围绕收益、运价、航线、运行、分销与数据的整体工程。迈途数创以模块化、可演进的方式参与其中。"
  },
  {
    eyebrow: "Team",
    title: "90% 民航专家,平均 10+ 年经验",
    desc: "团队来自国内主要航司、PSS 厂商与互联网公司,对航司业务系统、收益管理、运价规则与运行控制有第一手经验。"
  },
  {
    eyebrow: "Values",
    title: "专业、克制、长期主义",
    desc: "我们不卖概念、不追风口;做能用、能交付、能被审计的系统 — 把复杂留给工程师,把简单留给航司运营人员。"
  }
]

const timeline = [
  { year: "2022", text: "公司成立于海口,海南自贸港政策落地之年" },
  { year: "2023", text: "收益管理 RMS 与运价 PMS 完成首个航司 PoC 上线" },
  { year: "2024", text: "航线网络 NPS 2.0 发布,启动与 PSS 厂商的集成合作" },
  { year: "2025", text: "分销与电商模块上线,并支持 NDC / One Order 渠道" },
  { year: "2026", text: "累计服务 10+ 航司,海口 / 北京 / 上海三地办公室" }
]

/* ===================== 表单 ===================== */
const form = reactive({ name: "", email: "", company: "", message: "" })
const contactSubmitting = ref(false)
const contactStatus = ref("")
const contactStatusClass = ref("")
async function onContactSubmit() {
  if (contactSubmitting.value) return
  contactSubmitting.value = true
  contactStatusClass.value = "is-loading"
  contactStatus.value = "正在提交..."
  try {
    // 直接走 $fetch(不引 service/* 链路)
    await $fetch("/api/contact", {
      method: "POST",
      body: { name: form.name, email: form.email, message: form.message }
    })
    contactStatusClass.value = "is-success"
    contactStatus.value = "提交成功,我们会尽快与您联系!"
    Object.assign(form, { name: "", email: "", company: "", message: "" })
  } catch (err: any) {
    contactStatusClass.value = "is-error"
    contactStatus.value = err?.message || "提交失败,请稍后重试"
  } finally {
    contactSubmitting.value = false
  }
}

const newsletterEmail = ref("")
const newsletterSubmitting = ref(false)
const newsletterStatus = ref("")
const newsletterStatusClass = ref("")
async function onNewsletterSubmit() {
  if (newsletterSubmitting.value) return
  newsletterSubmitting.value = true
  newsletterStatusClass.value = "is-loading"
  newsletterStatus.value = "正在订阅..."
  try {
    await $fetch("/api/newsletter", {
      method: "POST",
      body: { email: newsletterEmail.value }
    })
    newsletterStatusClass.value = "is-success"
    newsletterStatus.value = "订阅成功!"
    newsletterEmail.value = ""
  } catch (err: any) {
    newsletterStatusClass.value = "is-error"
    newsletterStatus.value = err?.message || "订阅失败"
  } finally {
    newsletterSubmitting.value = false
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

  /* Ticker 实时刻跳动(prices 每 3.6s +56,flights +13,延迟 每 5s -1,+1 随机) */
  setInterval(() => {
    ticker.prices += 56 + Math.floor(Math.random() * 12)
    ticker.flights += Math.floor(Math.random() * 6)
  }, 3600)
  setInterval(() => {
    ticker.latency = Math.max(72, Math.min(102, ticker.latency + (Math.random() > 0.5 ? 1 : -1)))
  }, 5000)

  /* KPI 段渲染后做计数动画(IntersectionObserver 触发) */
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
