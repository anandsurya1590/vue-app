<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
})

async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

console.log(data, isLoading.value, error.value)
</script>

<template>
  <main class="users">
    <h1>Users List</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">{{ error.message }}</div>
    <ul>
      <li v-for="user in data" :key="user.id">{{ user.name }} ({{ user.email }})</li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
.users {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
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
}
</style>
