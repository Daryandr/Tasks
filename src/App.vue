<template>
  <v-app>
    <v-toolbar color="primary-lighten-3" class="flex text-center" dark>
      <v-toolbar-title class="text-white text-h5 font-weight-regular"> <span class="material-icons">checklist</span> <span>TASK MANAGER</span></v-toolbar-title>
    </v-toolbar>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',

  components: {

  },

  data () {
    return {

    }
  },
})
</script>
<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
.v-application{
  font-family: 'Quicksand', sans-serif !important;
  .text-h1,.text-h2,.text-h3,.text-h4,.text-h5,.text-h6{
    font-family: 'Quicksand', sans-serif !important;
  }
}
</style>