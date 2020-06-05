<template lang="html">
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-btn x-small color="black" text v-on="on">Регистрация</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Регистрация
          <v-spacer></v-spacer>
          <v-alert v-if="error" dense border="left" type="warning">
            Ошибка при регистрации
          </v-alert>
        </v-card-title>

        <v-card-text>
          <!-- <v-form> -->
          <v-container grid-list-xs,sm,md,lg,xl>
            <v-row class="d-flex flex-column">
              <v-row>
                <v-text-field
                  v-model="user.number"
                  label="Номер телефона"
                  name="login"
                  type="text"
                  class="pa-5"
                  prefix="+7"
                  counter="10"
                  maxlength="10"
                ></v-text-field>
                <v-text-field
                  v-model="user.password"
                  label="Пароль"
                  name="password"
                  type="password"
                  class="pa-5"
                ></v-text-field>
              </v-row>

              <v-row>
                <v-text-field
                  v-model="user.surname"
                  label="Фамилия"
                  name="surname"
                  type="text"
                  class="pa-5"
                ></v-text-field>

                <v-text-field
                  v-model="user.name"
                  label="Имя"
                  name="name"
                  type="text"
                  class="pa-5"
                ></v-text-field>

                <v-text-field
                  v-model="user.midname"
                  label="Отчество"
                  name="midname"
                  type="text"
                  class="pa-5"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="user.email"
                  label="Электронный адрес"
                  name="address"
                  type="text"
                  class="pa-5"
                ></v-text-field>
              </v-row>
            </v-row>
          </v-container>

          <!-- </v-form> -->
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-container grid-list-xs,sm,md,lg,xl fluid>
            <v-row class="d-flex align-center">
              <v-spacer></v-spacer>
              <v-btn :disabled="processing" @click="register" color="primary"
                >Зарегистрироваться</v-btn
              >
              <v-btn color="primary" text @click="dialog = false">
                Закрыть
              </v-btn>
            </v-row>
          </v-container>
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
        password: "",
        surname: "",
        name: "",
        midname: "",
        email: ""
      }
    };
  },
  methods: {
    register: function() {
      this.$store
        .dispatch("register/register", this.user)
        .then(() => {
          this.$store.dispatch("snackbar/activate", {
            text: "Регистрация прошла успешно, авторизуйтесь с новыми данными!",
            color: "green"
          });
          this.dialog = !this.dialog;
        })
        .catch(err => {
          this.$store.dispatch("snackbar/activate", {
            text: err.data.message || "Ошибка регистрации!",
            color: "red"
          });
        });
      let timer = setTimeout(() => {
        this.$store.dispatch("snackbar/off");
      }, 5000);
    }
  },
  computed: {
    error: function() {
      return this.$store.getters["register/getStatus"] === "error"
        ? true
        : false;
    },
    processing() {
      return this.$store.getters["register/getStatus"] === "loading"
        ? true
        : false;
    }
  }
};
</script>

<style lang="css" scoped></style>
