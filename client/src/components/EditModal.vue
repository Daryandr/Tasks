<template>
  <v-dialog
      v-model="show"
      width="30rem"
      persistent
  >
    <vue-resizable
        :min-width="370"
        :drag-selector="'#toDrag'"
        :disable-attributes="['h']"
    >
      <v-card class="pa-2">
        <v-card-title
            id="toDrag"
            class="d-flex justify-space-between"
        >
          <span class="text-h6">{{ header }}</span>
          <v-btn
              class="ml-2"
              size="small"
              variant="plain"
              icon="mdi-close"
              @click="cancel"
          />
        </v-card-title>

        <v-divider/>

        <v-form
            ref="editForm"
            lazy-validation
            @submit.prevent="submit"
        >
          <v-card-text>
            <span class="font-weight-medium">Задание</span>
            <v-text-field
                v-model="task.title"
                class="my-2"
                variant="outlined"
                clearable
                :rules="[v => !!v || 'Введите название']"
            />

            <span class="font-weight-medium">Список задач</span>
            <v-btn
                class="mx-2"
                min-width="40"
                max-width="40"
                variant="tonal"
                @click="addCheck"
            >
              <span class="material-icons">add</span>
            </v-btn>
            <v-btn
                min-width="40"
                max-width="40"
                variant="tonal"
                :disabled="task.checklist.length === 0"
                @click="deleteCheck"
            >
              <span class="material-icons">clear</span>
            </v-btn>

            <v-table
                ref="checkTable"
                class="mt-4 border scroll"
            >
              <thead>
              <tr>
                <th
                    class="text-left"
                    width="10%"
                >
                  Статус
                </th>
                <th class="text-left pl-0">
                  Название
                </th>
              </tr>
              </thead>

              <tbody>
              <tr
                  v-for="(check,index) in task.checklist"
                  :key="check.id"
                  :class="{'bg-grey-lighten-4': selectedCheckIndex === index}"
                  @click="selectedCheckIndex = index"
              >
                <td class="border-none">
                  <v-checkbox-btn
                      v-model="check.checked"
                      color="primary"
                  />
                </td>

                <td class="pl-0 border-none">
                  <v-text-field
                      v-model="check.name"
                      variant="underlined"
                      clearable
                      :rules="[v => !!v || 'Введите название']"
                  />
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-card-text>

          <v-card-actions>
            <v-spacer/>
            <v-btn
                min-width="40"
                variant="tonal"
                :disabled="!canUndo"
                @click="undo"
            >
              <v-icon icon="mdi-undo"/>
            </v-btn>
            <v-btn
                min-width="40"
                class="mr-10"
                variant="tonal"
                :disabled="!canRedo"
                @click="redo"
            >
              <v-icon icon="mdi-redo"/>
            </v-btn>
            <v-btn
                color="grey"
                @click="cancel"
            >
              Отмена
            </v-btn>
            <v-btn
                color="primary"
                type="submit"
                :loading="isLoading"
            >
              Сохранить
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </vue-resizable>

    <ConfirmModal ref="confirm"/>
  </v-dialog>
</template>

<script>
import VueResizable from 'vue-resizable';
import ConfirmModal from "@/components/ConfirmModal";
import {uuid} from 'vue-uuid';

export default {
  name: "EditModal",
  components: {
    VueResizable,
    ConfirmModal
  },
  props: {
    visible: Boolean,
    taskId: {
      type: Number,
      default: undefined
    },
    header: {
      type: String,
      default: ''
    }
  },
  emits: ['edited', 'close'],
  data() {
    return {
      task: {id: 0, title: '', checklist: []},
      selectedCheckIndex: 0,
      isLoading: false,
      snapshots: [],
      historyIndex: -1,
      isHistoryChange: true
    }
  },
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) {
          this.$emit('close');
        }
      }
    },
    taskData() {
      return this.$store.getters.getTask(this.taskId)
    },
    clonedTask() {
      return structuredClone(this.task)
    },
    canUndo() {
      return this.historyIndex > 0
    },
    canRedo() {
      return this.snapshots.length - 1 - this.historyIndex > 0
    }
  },
  watch: {
    // eslint-disable-next-line
    clonedTask: function (newVal, oldVal) {
      if (this.isHistoryChange) {
        this.historyIndex += 1;
        this.snapshots.splice(this.historyIndex, this.snapshots.length, newVal);
      }
    }
  },
  created() {
    if (this.taskData) {
      this.task = structuredClone(this.taskData);
    } else this.task = {id: uuid.v1(), title: '', checklist: []};
  },
  methods: {
    async cancel() {
      if (await this.$refs.confirm.open(`Вы точно хотите отменить ${this.header.toLowerCase()}?`)) {
        this.show = false;
      }
    },
    async submit() {
      const valid = (await this.$refs.editForm.validate()).valid;
      if (valid) {
        this.isLoading = true;
        this.$emit('edited', this.task);
      }
    },
    deleteCheck() {
      this.task.checklist.splice(this.selectedCheckIndex, 1);
      this.checkSelectedIndex();
    },
    addCheck() {
      const table = this.$refs.checkTable.$el;
      this.task.checklist.push({id: uuid.v1(), name: '', checked: false});
      this.selectedCheckIndex = this.task.checklist.length - 1;
      setTimeout(() => table.scrollTop = table.scrollHeight, 1);
    },
    undo() {
      this.isHistoryChange = false;
      this.historyIndex -= 1;
      this.task = structuredClone(this.snapshots[this.historyIndex]);
      this.checkSelectedIndex();
      setTimeout(() => this.isHistoryChange = true, 1);
    },
    redo() {
      this.isHistoryChange = false;
      this.historyIndex += 1;
      this.task = structuredClone(this.snapshots[this.historyIndex]);
      this.checkSelectedIndex();
      setTimeout(() => this.isHistoryChange = true, 1);
    },
    checkSelectedIndex() {
      if (this.selectedCheckIndex === this.task.checklist.length) {
        this.selectedCheckIndex--;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.scroll {
  overflow-y: auto !important;
  height: 40vh
}
</style>