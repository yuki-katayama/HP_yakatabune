<script setup lang="ts">
const appConfig: any = useAppConfig();
</script>

<template>
  <Head>
    <Title>{{ appConfig.title }}</Title>
    <Meta name="description" :content="`{{appConfig.title}}`" />
  </Head>
</template>
