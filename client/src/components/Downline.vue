<template lang="html">
  <div :height="'40px'">
    <v-spacer></v-spacer>
    <v-btn x-small color="secondary" text>Ваш город: Владимир</v-btn>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <div v-if="isLoggedIn">
      <v-btn :to="{ name: 'login' }" x-small color="secondary" text
        >Войти</v-btn
      >
      <v-btn :to="{ name: 'register' }" x-small color="secondary" text
        >Регистрация</v-btn
      >
    </div>
    <div v-else>
      <v-btn :to="{ name: 'profile' }" x-small color="secondary" text
        >Профиль</v-btn
      >
      <v-btn @click="logout" x-small color="secondary" text>
        <v-icon>mdi-logout mdi-dark</v-icon>Выйти</v-btn
      >
    </div>
    <v-spacer></v-spacer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped></style>
