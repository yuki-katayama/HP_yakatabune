<script setup lang="ts">
import { onMounted } from "vue";

const route = useRoute();
onMounted(() => {
  console.log(route.params.id, " . ", route.params.companyId);
});
</script>

<template></template>
