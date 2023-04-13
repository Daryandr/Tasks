<template>
  <v-dialog v-model="dialog" width="auto" persistent>
    <v-card>
      <v-toolbar color="grey-lighten-3" dense flat>
        <v-toolbar-title>Подтверждение</v-toolbar-title>
      </v-toolbar>
      <v-card-text v-show="!!message" class="pa-4" v-html="message"></v-card-text>
      <v-card-actions class="pt-3">
        <v-spacer></v-spacer>
        <v-btn color="grey" @click="cancel">Отмена</v-btn>
        <v-btn color="primary"  @click="agree">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmModal",
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      message: null
    };
  },

  methods: {
    open(message) {
      this.dialog = true;
      this.message = message;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    },
  }
}
</script>

<style scoped>

</style>