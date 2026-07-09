<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>MitoAI Technology</h3>
          <p>{{ $t("footer.description") }}</p>
        </div>
        <div class="footer-section">
          <h4>{{ $t("footer.quickLinks") }}</h4>
          <ul>
            <li><a href="#home" @click="scrollTo('home', $event)">{{ $t("nav.home") }}</a></li>
            <li><a href="#solutions" @click="scrollTo('solutions', $event)">{{ $t("nav.products") }}</a></li>
            <li><a href="#technology" @click="scrollTo('technology', $event)">{{ $t("nav.tech") }}</a></li>
            <li><a href="#customers" @click="scrollTo('customers', $event)">{{ $t("nav.customers") }}</a></li>
            <li><a href="#about" @click="scrollTo('about', $event)">{{ $t("nav.about") }}</a></li>
            <li><a href="#contact" @click="scrollTo('contact', $event)">{{ $t("nav.contact") }}</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>{{ $t("footer.contact") }}</h4>
          <p>{{ $t("footer.email") }}: contact@mitoaitech.com</p>
          <p>{{ $t("footer.phone") }}: +86 400-xxx-xxxx</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} MitoAI Technology. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

function scrollTo(id: string, e: Event) {
  e.preventDefault()
  const target = document.getElementById(id)
  if (!target) return
  const headerOffset = 64
  const y = target.getBoundingClientRect().top + window.scrollY - headerOffset
  window.scrollTo({ top: y, behavior: "smooth" })
  history.pushState(null, "", `#${id}`)
}
</script>

<style scoped>
.app-footer {
  background: #2c3e50;
  color: #fff;
  padding: 40px 0 20px;
  margin-top: 60px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 30px;
}

.footer-section h3 {
  font-size: 20px;
  margin-bottom: 16px;
}

.footer-section h4 {
  font-size: 16px;
  margin-bottom: 16px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 8px;
}

.footer-section a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-section a:hover {
  color: #fff;
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #34495e;
  color: #95a5a6;
  font-size: 14px;
}
</style>
