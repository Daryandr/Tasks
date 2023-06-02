<template>
  <v-dialog
      v-model="isDialogShown"
      width="auto"
      max-width="60vw"
      persistent
  >
    <v-card>
      <v-toolbar
          color="grey-lighten-3"
          dense
          flat
      >
        <v-toolbar-title>Подтверждение</v-toolbar-title>
      </v-toolbar>

      <v-card-text
          v-if="!!message"
          class="pa-4"
      >
        {{ message }}
      </v-card-text>

      <v-card-actions class="pt-3">
        <v-spacer/>
        <v-btn
            color="grey"
            @click="cancel"
        >
          Отмена
        </v-btn>
        <v-btn
            color="primary"
            @click="agree"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmModal",
  data() {
    return {
      isDialogShown: false,
      resolve: null,
      message: null
    };
  },

  methods: {
    open(message) {
      this.isDialogShown = true;
      this.message = message;
      return new Promise(resolve => {
        this.resolve = resolve;
      });
    },
    agree() {
      this.resolve(true);
      this.isDialogShown = false;
    },
    cancel() {
      this.resolve(false);
      this.isDialogShown = false;
    },
  }
}
</script>