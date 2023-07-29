<template>
  <v-container class="mt-16">
    <v-sheet class="scroll">
      <v-row class="bg-white">
        <v-col
            cols="1"
            class="mx-1"
        >
          <v-btn
              variant="flat"
              min-width="40px"
              color="success"
              @click="isAddModalOpen = true"
          >
            <span class="material-icons">add</span>
          </v-btn>
        </v-col>
        <v-col
            cols="1"
            class="mx-1"
        >
          <v-btn
              variant="flat"
              min-width="40px"
              color="warning"
              :disabled="tasks.length === 0"
              @click="isEditModalOpen = true"
          >
            <span class="material-icons">edit</span>
          </v-btn>
        </v-col>
        <v-col
            cols="1"
            class="mx-1"
        >
          <v-btn
              variant="flat"
              min-width="40px"
              color="error"
              :loading="btnLoading"
              :disabled="tasks.length === 0"
              @click="del"
          >
            <span class="material-icons">clear</span>
          </v-btn>
        </v-col>
      </v-row>

      <v-row class="my-3 bg-white">
        <v-col
            class="border"
            cols="3"
        >
          Задание
        </v-col>
        <v-col
            class="border"
            cols="9"
        >
          Задачи
        </v-col>
      </v-row>
    </v-sheet>

    <ConfirmModal ref="confirm"/>

    <EditModal
        v-if="isEditModalOpen"
        :task-id="selectedTaskIndex"
        :visible="isEditModalOpen"
        :header="'Редактирование задания'"
        @close="isEditModalOpen = false"
        @edited="edit"
    />
    <EditModal
        v-if="isAddModalOpen"
        :visible="isAddModalOpen"
        :header="'Добавление задания'"
        @close="isAddModalOpen = false"
        @edited="add"
    />

    <v-row
        v-for="(task,index) in tasks"
        :key="task.id"
        :class="{'bg-grey-lighten-4': selectedTaskIndex === index}"
        @click="selectedTaskIndex = index"
    >
      <v-col
          class="border break-word"
          cols="3"
      >
        {{ task.title }}
      </v-col>

      <v-col
          class="border"
          cols="9"
      >
        <div
            v-for="check in task.checklist.slice(0,3)"
            :key="check.id"
        >
          <v-checkbox
              v-model="check.checked"
              class="mb-n6"
              disabled
              :label="check.name"
          />
        </div>

        <v-btn
            v-if="task.checklist.length > 3"
            variant="plain"
            size="x-small"
            class="mt-n2 text-grey font-weight-bold"
        >
          ...
          <v-tooltip
              activator="parent"
              location="end"
          >
            <v-checkbox
                v-for="check in task.checklist.slice(3)"
                :key="check.id"
                v-model="check.checked"
                class="mb-n8 text-white"
                readonly
                :label="check.name"
            />
          </v-tooltip>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";
import EditModal from './EditModal';
import ConfirmModal from "./ConfirmModal";

export default {
  name: "TaskList",
  components: {
    EditModal,
    ConfirmModal
  },
  data() {
    return {
      selectedTaskIndex: 0,
      isEditModalOpen: false,
      isAddModalOpen: false,
      btnLoading: false
    }
  },
  computed: {
    tasks() {
      return this.$store.state.tasks
    }
  },
  beforeCreate() {
    this.$store.dispatch('fetchTasks');
  },
  methods: {
    ...mapActions([
      'delTask',
      'addTask',
      'editTask'
    ]),
    async del() {
      if (await this.$refs.confirm.open(`Вы точно хотите удалить задание "${this.tasks[this.selectedTaskIndex].title}"?`)) {
        this.btnLoading = true;
        await this.delTask(this.selectedTaskIndex);
        if (this.selectedTaskIndex === this.tasks.length) {
          this.selectedTaskIndex--;
        }
        this.btnLoading = false;
      }
    },
    async add(taskToAdd) {
      await this.addTask(taskToAdd);
      this.selectedTaskIndex = 0;
      this.isAddModalOpen = false;
    },
    async edit(editedTask) {
      await this.editTask({taskId: this.selectedTaskIndex, task: editedTask});
      this.isEditModalOpen = false;
    }
  }
}
</script>

<style lang="less" scoped>
.scroll {
  position: sticky !important;
  top: 0 !important;
  z-index: 10 !important;
}

.break-word {
  overflow-wrap: break-word !important;
}
</style>