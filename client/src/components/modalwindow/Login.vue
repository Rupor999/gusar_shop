<template lang="html">
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn x-small color="black" text v-on="on"
          >Войти в личный кабинет</v-btn
        >
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Авторизация
          <v-spacer></v-spacer>
          <v-alert v-show="error" dense border="left" type="warning">
            Ошибка авторизации
          </v-alert>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="user.number"
              label="Номер телефона"
              name="number"
              prepend-icon="mdi-cellphone-android"
              prefix="+7"
              type="text"
            ></v-text-field>

            <v-text-field
              v-model="user.password"
              label="Пароль"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="processing" color="primary" @click.prevent="login"
            >Войти</v-btn
          >
          <v-btn color="primary" text @click="dialog = false">
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      user: {
        number: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login/login", this.user)
        .then(() => {
          // this.$router.push("/control")
          this.$store.dispatch("snackbar/activate", {
            text: "Успешная авторизация! Получение данных пользователя...",
            color: "green"
          });
          this.$store
            .dispatch("getInfoAccount/getInfoAccount")
            .then(() => {
              this.$store.dispatch("snackbar/activate", {
                text:
                  "Успешная авторизация! Получение данных пользователя...Успешно!",
                color: "green"
              });
              let timer = setTimeout(() => {
                this.$store.dispatch("snackbar/off");
              }, 5000);
            })
            .catch(err => {
              this.$store.dispatch("snackbar/activate", {
                text:
                  "Успешная авторизация! Получение данных пользователя...ОШИБКА при полчении данных!",
                color: "red"
              });
              let timer = setTimeout(() => {
                this.$store.dispatch("snackbar/off");
              }, 5000);
            });
        })
        .catch(err => {
          this.$store.dispatch("snackbar/activate", {
            text: "Ошибка авторизации!",
            color: "red"
          });
          let timer = setTimeout(() => {
            this.$store.dispatch("snackbar/off");
          }, 5000);
        });
    }
  },
  computed: {
    error() {
      return this.$store.getters["login/loginStatus"] === "error"
        ? true
        : false;
    },
    processing() {
      return this.$store.getters["login/loginStatus"] === "loading"
        ? true
        : false;
    },
    status() {
      // return this.$store.getters.authStatus;
      console.log(this.$store.getters["auth/authStatus"]);
    }
  }
};
</script>

<style lang="css" scoped></style>
