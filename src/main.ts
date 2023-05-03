import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { apolloProvider } from './client/ApolloProvider'

createApp(App)
  .use(store)
  .use(vuetify)
  .use(apolloProvider)
  .mount('#app')
