<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { onMounted } from 'vue'

const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()
const isLoggedIn = ref(isAuthenticated.value)
const showUserMenu = ref(false)

const handleLogout = async () => {
  await logout()
}

const close = () => {
  console.log('Closing user menu')

  showUserMenu.value = false
}

onMounted(() => {
  console.log('dashboard mounted')
})
</script>

<template>
  <div class="app">
    <header class="app_header">
      <div class="wrapper">
        <nav>
          <RouterLink to="/dashboard" exact-active-class="active">Home</RouterLink>
          <RouterLink to="/dashboard/users" exact-active-class="active">Users</RouterLink>
        </nav>
        <div class="user-menu">
          <img
            :src="user?.picture"
            alt="Logo"
            class="logo"
            v-on:click="showUserMenu = !showUserMenu"
          />
          <ul v-click-outside="close" v-if="isAuthenticated && showUserMenu">
            <li class="nav-item">
              <font-awesome-icon icon="user" class="mr-3" />
              <router-link to="/profile">{{ user?.name }}</router-link>
            </li>

            <li>
              <font-awesome-icon icon="power-off" class="mr-3" />
              <a href="#" @click.prevent="handleLogout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="app_body green">
      <RouterView />
    </div>
    <div class="app_footer">
      <div class="wrapper">
        <HelloWorld msg="This is a footer" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  width: 100%;
  overflow: hidden;
  &_header {
    background-color: #282c34;
    color: white;
    .wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      nav {
        display: flex;
        a {
          color: white;
          text-decoration: none;
          padding: 15px;

          &:hover {
            text-decoration: underline;
          }
          &.active {
            font-weight: bold;
            border-bottom: 2px solid #61dafb;
            background-color: #20232a;
          }
        }
      }

      .user-menu {
        position: relative;
        @include flex;
        height: 100%;
        width: 65px;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
        }
        ul {
          width: 200px;
          position: absolute;
          top: 50px;
          right: 0;
          background-color: white;
          color: black;
          list-style: none;
          padding: 10px;
          margin: 0;
          border-radius: 5px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          li {
            padding: 10px;
            cursor: pointer;
            &:hover {
              background-color: #f0f0f0;
            }
            a {
              color: black;
              text-decoration: none;
            }
            border-bottom: 1px solid #ddd;
            .mr-3 {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
  &_body {
    padding: 20px;
    min-height: calc(100vh - 15.5rem);
    overflow: auto;
    height: calc(100vh - 15.5rem);
    @include scrollBars(5px);
  }
  &_footer {
    background-color: #282c34;
    padding: 20px;
    color: white;
    text-align: center;
    .wrapper {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
