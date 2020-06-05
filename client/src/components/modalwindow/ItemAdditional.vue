<template lang="html">
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-btn color="secondary" text v-on="on">Подробнее</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Информация о товаре
        </v-card-title>

        <v-card-text>
          <v-container grid-list-xs,sm,md,lg,xl>
            <v-row>
              <v-col class="d-flex flex-column">
                <span class="ma-1 font-weight-black headline"
                  >Категория товара:
                  <span class="title font-weight-bold">{{
                    product.Category
                  }}</span></span
                >
                <span class="ma-1 font-weight-black headline"
                  >Название продукции:
                  <span class="title font-weight-bold">{{
                    product.ProductName
                  }}</span></span
                >
                <span class="ma-1 font-weight-black headline"
                  >DN:
                  <span class="title font-weight-bold">{{
                    product.DN
                  }}</span></span
                >
                <span class="ma-1 font-weight-black headline"
                  >PN:
                  <span class="title font-weight-bold">{{
                    product.PN
                  }}</span></span
                >
                <span class="ma-1 font-weight-black headline"
                  >Температура рабочей среды:
                  <span class="title font-weight-bold">{{
                    product.TempWorkEnv
                  }}</span></span
                >
                <span class="ma-1 font-weight-black headline"
                  >Рабочая среда:
                  <span class="title font-weight-bold">{{
                    product.WorkEnv
                  }}</span></span
                >
                <span class="ma-1 font-weight-black headline"
                  >Материал корпуса:
                  <span class="title font-weight-bold">{{
                    product.Material
                  }}</span></span
                >
                <span class="ma-1 font-weight-black headline"
                  >Класс герметичности:
                  <span class="title font-weight-bold">{{
                    product.ClassGermetich
                  }}</span></span
                >
                <span class="ma-1 font-weight-black headline"
                  >Тип исполнения:
                  <span class="title font-weight-bold">{{
                    product.TypeIspolneniya
                  }}</span></span
                >
                <span class="ma-1 font-weight-black headline"
                  >Строительная длина:
                  <span class="title font-weight-bold">{{
                    product.BuildLength
                  }}</span></span
                >
                <span class="ma-1 font-weight-black headline"
                  >Описание:
                  <span class="title font-weight-bold">{{
                    product.Description
                  }}</span></span
                >
                <span class="ma-1 font-weight-black headline"
                  >Цена:
                  <span class="title font-weight-bold"
                    >{{ product.Price }}.00 руб.</span
                  ></span
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="dialog = false">
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style lang="css" scoped></style>
