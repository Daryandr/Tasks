<template>
<v-container class="mt-16">
  <v-sheet style="position:sticky !important; top: 0 !important; z-index: 10 !important;">
  <v-row class="bg-white">
    <v-col cols="1" class="mx-3"><v-btn min-width="40px" color="success" @click="add"><span class="material-icons">add</span></v-btn></v-col>
    <v-col cols="1" class="mx-3"><v-btn min-width="40px" color="warning" @click="edit"><span class="material-icons">edit</span></v-btn></v-col>
    <v-col cols="1" class="mx-3"><v-btn min-width="40px" color="error" @click="del"><span class="material-icons">clear</span></v-btn></v-col>
  </v-row>
  <v-row class="my-3 bg-white">
    <v-col class="border" cols="3">Задание</v-col>
    <v-col class="border" cols="9">Задачи</v-col>
  </v-row>
  </v-sheet>
  <div v-for="(task,index) in tasks" :key="index">
  <v-row @click="isActive=index" :class="isActive===index ? 'bg-grey-lighten-4':''" class="mb-3">
    <v-col class="border" cols="3">{{task.title}}</v-col>
    <v-col class="border" cols="9">
      <div v-for="(check,index) in task.checklist.slice(0,3)" :key="index">
        <v-checkbox class="mb-n6" v-model="check.checked" disabled :label="check.name"></v-checkbox>
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
import {mapActions} from "vuex";

export default {
  name: "TaskList",
  async beforeCreate() {
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
  methods:{
    ...mapActions([
    'delTask',
    'addTask',
    'editTask'
    ]),
    del(){
      this.delTask(this.isActive);
    },
    add(){
      this.addTask(this.isActive);
    },
    edit(){
      this.editTask(this.isActive);
    }
  }
}
</script>

<style lang="less" scoped>

</style>