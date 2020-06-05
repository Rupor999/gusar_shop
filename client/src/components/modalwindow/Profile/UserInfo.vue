<template lang="html">
  <v-container>
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
          :placeholder="userInfo.number || ''"
        ></v-text-field>
        <v-text-field
          v-model="user.password"
          label="Пароль"
          name="password"
          type="password"
          class="pa-5"
          :placeholder="
            userInfo.password ||
              'Введите в это поле новый пароль, если хотите его изменить'
          "
        ></v-text-field>
      </v-row>

      <v-row>
        <v-text-field
          v-model="user.surname"
          label="Фамилия"
          name="surname"
          type="text"
          class="pa-5"
          :placeholder="userInfo.surname || ''"
        ></v-text-field>

        <v-text-field
          v-model="user.name"
          label="Имя"
          name="name"
          type="text"
          class="pa-5"
          :placeholder="userInfo.name || ''"
        ></v-text-field>

        <v-text-field
          v-model="user.midname"
          label="Отчество"
          name="midname"
          type="text"
          class="pa-5"
          :placeholder="userInfo.midname || ''"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="user.email"
          label="Электронный адрес"
          name="email"
          type="text"
          class="pa-5"
          :placeholder="userInfo.email || ''"
        ></v-text-field>
      </v-row>
      <v-row class="d-flex justify-end">
        <v-btn color="primary" :disabled="disabledButton" @click="modifyUser"
          >Сохранить изменения</v-btn
        >
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      disabledButton: false,
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
    modifyUser() {
      this.disabledButton = true;

      if (
        this.user.number.trim().length === 0 &&
        this.user.password.trim().length === 0 &&
        this.user.surname.trim().length === 0 &&
        this.user.name.trim().length === 0 &&
        this.user.midname.trim().length === 0 &&
        this.user.email.trim().length === 0
      ) {
        this.$store.dispatch("snackbar/activate", {
          text: "Не изменено ни одно поле!",
          color: "yellow"
        });
        let timer = setTimeout(() => {
          this.$store.dispatch("snackbar/off");
          this.disabledButton = false;
        }, 5000);
        return;
      }

      let a = this.$store.getters["getInfoAccount/getAccountData"];
      this.$store
        .dispatch("userModifyData/putUser", {
          _id: a.id,
          number: this.user.number,
          password: this.user.password,
          surname: this.user.surname,
          name: this.user.name,
          midname: this.user.midname,
          email: this.user.email
        })
        .then(resp => {
          this.$store.dispatch("snackbar/activate", {
            text: resp.data.message || "Успешное изменение",
            color: "green"
          });

          this.user.number = "";
          this.user.password = "";
          this.user.surname = "";
          this.user.name = "";
          this.user.midname = "";
          this.user.email = "";

          this.$store.dispatch("getInfoAccount/getInfoAccount").then();
        })
        .catch(err => {
          this.$store.dispatch("snackbar/activate", {
            text: err.message || "Ошибка при сохранении данных",
            color: "red"
          });
        });
      let timer = setTimeout(() => {
        this.$store.dispatch("snackbar/off");
        this.disabledButton = false;
      }, 5000);
    }
  },
  computed: {
    userInfo() {
      let user_info = this.$store.getters["getInfoAccount/getAccountData"];
      if (user_info) {
        return user_info;
      }
    }
  }
};
</script>

<style lang="css" scoped></style>
