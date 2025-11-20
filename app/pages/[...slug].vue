<script setup lang="ts">
const route = useRoute()
const { locale, localeProperties } = useI18n()

const slugPath = computed(() => {
  const slugParam = route.params.slug
  if (Array.isArray(slugParam)) {
    const joined = slugParam.filter(Boolean).join('/')
    return joined ? `/${joined}` : '/index'
  }
  if (typeof slugParam === 'string' && slugParam.length > 0) {
    return `/${slugParam}`
  }
  return '/index'
})

const collection = computed(() => `content_${locale.value}`)

const { data: page } = await useAsyncData(
  async () => {
    const result = await queryCollection(collection.value).path(slugPath.value).first()
    if (!result) {
      throw createError({ statusCode: 404, statusMessage: 'Page not found' })
    }
    return result
  },
  {
    watch: [collection, slugPath],
  },
)

watch(
  () => page.value?.seo,
  (seo) => {
    if (seo) {
      useSeoMeta(seo)
    }
  },
  { immediate: true },
)

const dir = computed(() => localeProperties.value?.dir || 'ltr')
</script>

<template>
  <main :dir="dir">
    <ContentRenderer v-if="page" :value="page" />
  </main>
</template>
