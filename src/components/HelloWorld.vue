<script setup lang="ts">
const props = defineProps<{ msg: string }>()
</script>

<template>
  <div>
    <h1>Hello world</h1>
    <p>{{ props.msg}}</p>
  </div>
</template>

<style scoped>

</style>
