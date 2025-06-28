<template>
  <div class="login">
    <h1>Welcome to company name</h1>
    <button v-on:click="isAuthenticated ? goToDashboard() : handleLogin()">
      {{ isAuthenticated ? 'Go to Dashboard' : 'Login' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const router = useRouter()
const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

const handleLogin = async () => {
  loginWithRedirect()
}
</script>
  setup() {
    const router = useRouter()
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

    const handleLogin = async () => {
      loginWithRedirect()
    }

    return {
      isAuthenticated,
      handleLogin,
      handleLogout: logout,
      goToDashboard: () => {
        router.push('/dashboard')
      },
    }
  },
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
