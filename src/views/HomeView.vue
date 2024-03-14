<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
const counterStore = useCounterStore()
</script>

<template>
  <div class="container">
    <span class="counter">Counter: {{ counterStore.count }}</span>
    <span class="counter">Double Counter: {{ counterStore.doubleCount }}</span>
    <button class="btn" @click="counterStore.increment()">plus</button>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.counter {
  font-size: 15px;
  padding-bottom: 10px;
}


.btn {
  color: white;
  background-color: cadetblue;
  width: 75px;
  height: 35px;
  text-align: center;
  border-radius: 50px;
  border: none;
  cursor: pointer;
}
</style>
