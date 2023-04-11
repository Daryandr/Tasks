<template>
  <v-dialog v-model="show" width="30rem" persistent>
    <vue-resizable :minWidth="370" :dragSelector="'#toDrag'" :disableAttributes="['h']">
    <v-card class="pa-2">
      <v-card-title class="d-flex justify-space-between" id="toDrag">
        <span class="text-h6">Редактирование задания</span>
        <v-btn class="ml-2" size="small" @click="cancel" variant="plain" icon="mdi-close"></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-form @submit.prevent="submit" ref="editForm" lazy-validation>
      <v-card-text>
        <span>Задание</span>
        <v-text-field class="my-2" v-model="task.title" variant="outlined" clearable :rules="[v => !!v || 'Введите название']"></v-text-field>
        <span>Список задач</span>
        <v-btn class="mx-2" min-width="40" max-width="40" variant="tonal" @click="add"><span class="material-icons">add</span></v-btn>
        <v-btn min-width="40" max-width="40" variant="tonal" @click="del"><span class="material-icons">clear</span></v-btn>
      <v-table  class="mt-4 border" ref="checkTable" style="overflow:scroll !important; height:40vh">
        <thead>
        <tr>
          <th class="text-left" width="10%">Статус</th>
          <th class="text-left pl-0">Название</th>
        </tr>
        </thead>
        <tbody v-for="(check,index) in task.checklist" :key="index">
        <tr @click="isActive=index" :class="isActive===index ? 'bg-grey-lighten-4':''">
          <td>
            <v-checkbox-btn color="primary" v-model="check.checked"></v-checkbox-btn>
          </td>
          <td class="pl-0">
            <v-text-field v-model="check.name" variant="underlined" clearable :rules="[v => !!v || 'Введите название']"></v-text-field>
          </td>
        </tr>
        </tbody>
      </v-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn min-width="40" variant="tonal"><v-icon icon="mdi-undo"></v-icon></v-btn>
        <v-btn min-width="40" class="mr-10" variant="tonal"><v-icon icon="mdi-redo"></v-icon></v-btn>
        <v-btn color="grey" @click="cancel">Отмена</v-btn>
        <v-btn color="primary" type="submit">Сохранить</v-btn>
      </v-card-actions>
      </v-form>
    </v-card>
    </vue-resizable>
  </v-dialog>
</template>

<script>
import VueResizable from 'vue-resizable'

export default {
  name: "EditModal",
  components: {VueResizable},
  props: ['visible','idx'],
  data () {
    return {
      task: {title:'',checklist:[]},
      isActive: 0
    }
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    },
    taskData(){
      return this.$store.getters.getTask(this.idx)
    }
  },
  watch: {
    taskData (val) {
      if(val)
        this.task = JSON.parse(JSON.stringify(val));
    }
  },
  methods:{
    clear(){
      if(this.taskData)
        this.task = JSON.parse(JSON.stringify(this.taskData));
      else this.task =  {title:'',checklist:[]}
    },
    cancel(){
      this.clear();
      this.show = false;
    },
    async submit(){
      const valid = await this.$refs.editForm.validate().then(result => result.valid)
      if(valid){
        this.$emit('edited',this.task);
        this.clear();
        this.show = false;
      }
    },
    del(){
      this.task.checklist.splice(this.isActive,1);
    },
    add(){
      const table = this.$refs.checkTable.$el;
      this.task.checklist.push({name:'',checked:false});
      this.isActive = this.task.checklist.length-1;
      setTimeout(() => table.scrollTop = table.scrollHeight, 1)
    }
  }
}
</script>

<style scoped>

</style>