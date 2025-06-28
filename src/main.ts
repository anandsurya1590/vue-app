import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import { createAuth0 } from '@auth0/auth0-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLink, faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import vClickOutside from '@/directives/v-click-outside.ts'

library.add(faLink, faUser, faPowerOff)

const app = createApp(App)

app.directive('click-outside', vClickOutside)

app.use(createRouter(app))

// TanStack Vue Query setup
app.use(VueQueryPlugin, {
  queryClient: new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
    },
  }),
})

// Auth0 setup
app
  .use(
    createAuth0({
      domain: import.meta.env.VITE_AUTH0_DOMAIN,
      clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  )
  .component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
