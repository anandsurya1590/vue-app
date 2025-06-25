<script setup lang="ts">
import { ref, onMounted } from 'vue'

const users = ref([])

onMounted(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    users.value = await response.json()
  } catch (error) {
    console.error('Error fetching users:', error)
  }
})
</script>

<template>
  <main>
    <h1>Users List</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }} ({{ user.email }})</li>
    </ul>
  </main>
</template>

<style scoped>
main {
  padding: 20px;
}
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
li:last-child {
  border-bottom: none;
}
@media (min-width: 1024px) {
  main {
    max-width: 800px;
    margin: 0 auto;
  }
}
h1 {
  font-size: 32px;
}
li {
  font-size: 18px;
}
</style>
