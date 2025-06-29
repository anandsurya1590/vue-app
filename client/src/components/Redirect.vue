<template>
  <div class="redirect">
    <h1 v-if="isLoading">Redirecting...</h1>
  </div>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const { isLoading, isAuthenticated, user } = useAuth0()
const router = useRouter()

console.log('Auth0 isAuthenticated:', isLoading)

watch(isAuthenticated, (newValue) => {
  console.log('isAuthenticated changed:', newValue)
  if (newValue) {
    router.push('/about')
  } else {
    router.push('/login')
  }
})
</script>

<style scoped>
.redirect {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}
</style>
