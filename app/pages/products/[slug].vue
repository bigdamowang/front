<template>
  <div>
    <!-- Hero -->
    <section class="product-hero">
      <div class="container">
        <div class="product-hero__content">
          <span class="eyebrow">{{ productTag }}</span>
          <h1>{{ productTitle }}</h1>
          <p class="product-hero__desc">{{ productDesc }}</p>
          <div class="product-hero__actions">
            <a class="btn btn-primary" href="#contact" @click="scrollTo('contact', $event)">
              {{ $t("cta.cta_primary") }}
            </a>
            <a class="btn btn-on-dark" href="#features" @click="scrollTo('features', $event)">
              {{ $t("cta.cta_secondary") }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="section">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">{{ $t("solutions.eyebrow") }}</span>
          <h2>{{ $t("solutions.title") }}</h2>
          <p>{{ $t("solutions.desc") }}</p>
        </div>
        <div class="solutions-grid">
          <div v-for="(s, i) in allSolutions" :key="i" class="card">
            <span class="tag">{{ s.tag }}</span>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
            <NuxtLink class="btn-link" :to="`/products/${s.slug}`">
              {{ $t("solutions.cta_more") }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section id="contact" class="section--tight">
      <div class="container">
        <div class="cta-banner">
          <h2>{{ $t("cta.title") }}</h2>
          <p>{{ $t("cta.desc") }}</p>
          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <NuxtLink class="btn btn-primary" to="/">
              {{ $t("cta.cta_primary") }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { t } = useI18n()

const solutionMap: Record<string, { tagKey: string; titleKey: string; descKey: string }> = {
  rms: { tagKey: "solutions.items.rm.tag", titleKey: "solutions.items.rm.title", descKey: "solutions.items.rm.desc" },
  pms: { tagKey: "solutions.items.pricing.tag", titleKey: "solutions.items.pricing.title", descKey: "solutions.items.pricing.desc" },
  nps: { tagKey: "solutions.items.network.tag", titleKey: "solutions.items.network.title", descKey: "solutions.items.network.desc" },
  ofc: { tagKey: "solutions.items.ops.tag", titleKey: "solutions.items.ops.title", descKey: "solutions.items.ops.desc" },
  retail: { tagKey: "solutions.items.retail.tag", titleKey: "solutions.items.retail.title", descKey: "solutions.items.retail.desc" },
  data: { tagKey: "solutions.items.data.tag", titleKey: "solutions.items.data.title", descKey: "solutions.items.data.desc" }
}

const current = computed(() => {
  const s = solutionMap[slug.value] || solutionMap.rms
  return {
    tag: t(s.tagKey),
    title: t(s.titleKey),
    desc: t(s.descKey),
    slug: slug.value
  }
})

const productTag = computed(() => current.value.tag)
const productTitle = computed(() => current.value.title)
const productDesc = computed(() => current.value.desc)

const allSolutions = computed(() =>
  Object.entries(solutionMap).map(([key, s]) => ({
    slug: key,
    tag: t(s.tagKey),
    title: t(s.titleKey),
    desc: t(s.descKey)
  }))
)

function scrollTo(id: string, e: MouseEvent) {
  e.preventDefault()
  const target = document.getElementById(id)
  if (target) {
    const y = target.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

useHead({
  title: () => productTitle.value,
  meta: [
    { name: 'description', content: () => productDesc.value }
  ]
})
</script>

<style scoped>
.product-hero {
  background: var(--bg-deep);
  padding: 120px 0 80px;
  color: var(--text-on-dark);
}

.product-hero__content {
  max-width: 800px;
}

.product-hero__desc {
  font-size: 1.25rem;
  line-height: 1.6;
  margin: 24px 0 40px;
  color: var(--text-on-dark-soft);
}

.product-hero__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
