<template>
  <div class="login">
    <h1>Welcome to company name</h1>
    <button v-on:click="isAuthenticated ? goToDashboard() : handleLogin()">
      {{ isAuthenticated ? 'Go to Dashboard' : 'Login' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import { useMutation } from '@tanstack/vue-query'
import { watch } from 'vue'

const router = useRouter()
const { loginWithRedirect, getAccessTokenSilently, user, isAuthenticated } = useAuth0()

const syncUser = async () => {
  const token = await getAccessTokenSilently()
  if (!token) {
    throw new Error('Failed to retrieve access token')
  }
  const response = await fetch('http://localhost:3000/api/users/sync-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      auth0Id: user.value?.sub,
      name: user.value?.name,
      email: user.value?.email,
      updated_at: user.value?.updated_at,
      picture: user.value?.picture,
    }),
  })
  if (!response.ok) {
    throw new Error('Failed to sync user')
  }
  const data = await response.json()
  return data
}

const { mutate } = useMutation({
  mutationKey: ['syncUsers'],
  mutationFn: syncUser,
})

watch(
  isAuthenticated,
  (newValue) => {
    if (newValue) {
      mutate()
    }
  },
  { immediate: true },
)

const handleLogin = async () => {
  loginWithRedirect()
}

const goToDashboard = () => {
  router.push('/dashboard')
}
</script>

<style scoped>
.login {
  margin: 0 auto;
  margin-top: 10vh;
  max-width: 400px;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.12),
    0 1.5px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  gap: 1.5rem;
}

.login button {
  width: 100%;
  padding: 0.75rem;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.login button:hover {
  background: #369870;
}
</style>
