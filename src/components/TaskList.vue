<template>
<v-container>
  <v-row>
    <v-col class="border mb-3" cols="3">Задание</v-col>
    <v-col class="border mb-3" cols="9">Задачи</v-col>
  </v-row>
  <div v-for="(task,index) in tasks" :key="index">
  <v-row @click="isActive=index" :class="isActive===index ? 'bg-grey-lighten-4':''" class="mb-3">
    <v-col class="border" cols="3">{{task.title}}</v-col>
    <v-col class="border" cols="9">
      <div v-for="(check,index) in task.checklist.slice(0,3)" :key="index">
        <v-checkbox class="mb-n5" v-model="check.checked" disabled :label="check.name"></v-checkbox>
      </div>
      <v-btn variant="plain" size="x-small" class="mt-n2 text-grey" v-if="task.checklist.length>3">...
        <v-tooltip activator="parent" location="end">
          <div v-for="(check,index) in task.checklist.slice(3)" :key="index">
            <v-checkbox class="mb-n8 text-white" v-model="check.checked" readonly :label="check.name"></v-checkbox>
          </div>
        </v-tooltip></v-btn>
    </v-col>
  </v-row>
  </div>
</v-container>
</template>

<script>
export default {
  name: "TaskList",
  beforeCreate() {
    this.$store.dispatch('fetchTasks');
  },
  data () {
    return {
      isActive: 0
    }
  },
  computed:{
    tasks(){
     return this.$store.getters.allTasks
    }
  },
}
</script>

<style lang="less" scoped>

</style>