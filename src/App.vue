<template>
  <v-app>
    <v-toolbar color="primary-lighten-3" class="flex text-center" dark>
      <v-toolbar-title class="text-white text-h5 font-weight-regular"> <span class="material-icons">checklist</span> <span>TASK MANAGER</span></v-toolbar-title>
    </v-toolbar>
    <TaskList/>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TaskList from './components/TaskList.vue'

export default defineComponent({
  name: 'App',
  components: {
    TaskList,
  },

  data () {
    return {
    }
  },
})
</script>
<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
.v-application{
  font-family: 'Montserrat', sans-serif !important;
  .text-h1,.text-h2,.text-h3,.text-h4,.text-h5,.text-h6{
    font-family: 'Montserrat', sans-serif !important;
  }
}
</style>