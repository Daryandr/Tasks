<template>
  <v-app>
    <v-toolbar
        color="primary-lighten-3"
        class="flex text-center"
        dark
    >
      <v-toolbar-title class="text-white text-h5 font-weight-regular">
        <span class="material-icons">checklist</span>
        <span>TASK MANAGER</span>
      </v-toolbar-title>
    </v-toolbar>

    <TaskList/>
  </v-app>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import TaskList from './components/TaskList.vue'

export default defineComponent({
  name: 'App',
  components: {
    TaskList,
  }
})
</script>
<style lang="less">
.v-application, .v-overlay-container {
  font-family: 'Montserrat', sans-serif !important;

  .text-h1, .text-h2, .text-h3, .text-h4, .text-h5, .text-h6 {
    font-family: 'Montserrat', sans-serif !important;
  }

  .v-btn {
    font-weight: 600;
  }
}
</style>