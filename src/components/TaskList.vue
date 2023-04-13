<template>
<v-container class="mt-16">
  <v-sheet style="position:sticky !important; top: 0 !important; z-index: 10 !important;">
  <v-row class="bg-white">
    <v-col cols="1" class="mx-1"><v-btn variant="flat" min-width="40px" color="success" @click="addModal = true"><span class="material-icons">add</span></v-btn></v-col>
    <v-col cols="1" class="mx-1"><v-btn variant="flat" min-width="40px" color="warning" @click="modal = true" :disabled="tasks.length===0"><span class="material-icons">edit</span></v-btn></v-col>
    <v-col cols="1" class="mx-1"><v-btn variant="flat" min-width="40px" color="error" :loading="btnLoading" @click="del" :disabled="tasks.length===0"><span class="material-icons">clear</span></v-btn></v-col>
  </v-row>
  <v-row class="my-3 bg-white">
    <v-col class="border" cols="3">Задание</v-col>
    <v-col class="border" cols="9">Задачи</v-col>
  </v-row>
  </v-sheet>
  <ConfirmModal ref="confirm" />
  <EditModal v-if="modal" :idx="isActive" :visible="modal" :header="'Редактирование задания'" @close="modal=false" @edited="edit"></EditModal>
  <EditModal v-if="addModal" :visible="addModal" :header="'Добавление задания'" @close="addModal=false" @edited="add"></EditModal>
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
import EditModal from './EditModal';
import ConfirmModal from "@/components/ConfirmModal";

export default {
  name: "TaskList",
  components: {
    EditModal,
    ConfirmModal
  },
  beforeCreate() {
    this.$store.dispatch('fetchTasks');
  },
  data () {
    return {
      isActive: 0,
      modal: false,
      addModal: false,
      btnLoading: false
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
    async del(){
      if (await this.$refs.confirm.open(`Вы точно хотите удалить задание "${this.tasks[this.isActive].title}"?`)){
        this.btnLoading=true;
        await this.delTask(this.isActive);
        if(this.isActive===this.tasks.length-1)
          this.isActive--;
        this.btnLoading=false;
      }

    },
    async add(taskToAdd){
      await this.addTask(taskToAdd);
      this.isActive=0;
      this.addModal=false;
    },
    async edit(editedTask){
      await this.editTask({idx: this.isActive, task: editedTask});
      this.modal=false;
    }
  }
}
</script>

<style lang="less" scoped>

</style>