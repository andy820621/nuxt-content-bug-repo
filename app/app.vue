<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() =>
  (locales.value || []).map((item) => ({
    code: typeof item === 'string' ? item : item.code,
    name: typeof item === 'string' ? item : item.name || item.code,
  })),
)
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <header class="language-switcher">
      <NuxtLink
        v-for="item in availableLocales"
        :key="item.code"
        :to="switchLocalePath(item.code)"
        :aria-current="locale === item.code ? 'page' : undefined"
        class="language-button"
        :class="{ active: locale === item.code }"
      >
        {{ item.name }}
      </NuxtLink>
    </header>
    <NuxtPage />
  </div>
</template>

<style scoped>
.language-switcher {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
}

.language-button {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  text-decoration: none;
  color: #1a1a1a;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.language-button:hover {
  border-color: #0070f3;
}

.active {
  background-color: #0070f3;
  color: white;
  border-color: #0070f3;
}
</style>
