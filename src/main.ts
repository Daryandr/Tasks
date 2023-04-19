import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { apolloProvider } from './client/ApolloProvider'
import VueCookies from 'vue3-cookies'

loadFonts()

createApp(App)
  .use(store)
  .use(vuetify)
  .use(apolloProvider)
  .use(VueCookies, {
      expireTimes: "30d",
      path: "/",
      domain: "",
      secure: true,
      sameSite: "None"
  })
  .mount('#app')
