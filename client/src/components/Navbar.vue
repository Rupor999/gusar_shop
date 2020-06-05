<template lang="html">
  <div>
    <v-card flat tile class="clear-background-opacity">
      <v-parallax src="/bg1.jpg" height="400">
        <v-system-bar light lights-out fixed window>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>

          <v-btn x-small color="black" text
            >Телефон отдела продаж: +7(920)920-10-10</v-btn
          >
          <v-spacer></v-spacer>
          <div class="d-flex align-center">
            <div v-if="token" class="d-flex align-center">
              <Profile />
              <v-btn @click="logout" x-small color="black" text>
                <v-icon>mdi-logout mdi-dark</v-icon>Выйти</v-btn
              >
            </div>

            <div v-else class="d-flex align-center">
              <Login />
              <Registration />
            </div>
          </div>
        </v-system-bar>

        <v-container class="fill-height" fluid>
          <v-row>
            <v-col>
              <v-row>
                <v-col cols="5">
                  <v-row class="justify-center">
                    <img width="300" src="/logo.png" alt="" />
                  </v-row>
                  <v-row class="justify-center">
                    <span :class="'white--text font-weight-thin title'"
                      >Интернет-магазин</span
                    >
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>

      <v-tabs
        v-model="tab"
        background-color="rgba(46,125,50,0.8)"
        centered
        dark
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab
          v-for="(item, index) in tabItems"
          :key="index"
          :href="'#tab-' + index"
        >
          {{ item.tabName }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" class="clear-background-opacity">
        <v-tab-item
          v-for="(item, index) in tabItems"
          :key="index"
          :value="'tab-' + index"
        >
          <v-card flat class="clear-background-opacity">
            <v-card-text>
              <!-- <keep-alive> -->
              <component v-bind:is="item.pageName"></component>
              <!-- </keep-alive> -->
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <!-- </v-card-actions> -->
    </v-card>
    <FloatCartButton />
  </div>
</template>

<script>
// Страницы modalwindow
import Login from "@/components/modalwindow/Login.vue";
import Registration from "@/components/modalwindow/Registration.vue";
import Profile from "@/components/modalwindow/Profile.vue";
// Страницы меню
import Catalog from "@/views/index/Catalog.vue";
import HowOrder from "@/views/index/HowOrder.vue";
import HowPay from "@/views/index/HowPay.vue";
import HowDelivery from "@/views/index/HowDelivery.vue";
import Contacts from "@/views/index/Contacts.vue";
import AboutUs from "@/views/index/AboutUs.vue";

//летающая кнопка корзины
import FloatCartButton from "@/components/FloatCartButton.vue";

export default {
  components: {
    Login,
    Registration,
    Profile,

    Catalog,
    HowOrder,
    HowPay,
    HowDelivery,
    Contacts,
    AboutUs,

    FloatCartButton
  },
  data() {
    return {
      tab: null,
      tabItems: [
        { tabName: "Каталог товаров", pageName: "Catalog" },
        { tabName: "Как сделать заказ", pageName: "HowOrder" },
        { tabName: "Оплата", pageName: "HowPay" },
        { tabName: "Доставка", pageName: "HowDelivery" },
        { tabName: "Контакты", pageName: "Contacts" },
        { tabName: "О нас", pageName: "AboutUs" }
      ]
    };
  },
  methods: {
    logout: function() {
      this.$store
        .dispatch("logout/logout")
        .then(() => {
          console.log("Navbar.vue - logout ok");
          location.reload(true);
        })
        .catch(err => {
          console.log("Navbar.vue - logout ne ok");
        });
    }
  },
  computed: {
    token() {
      return this.$store.getters["login/getToken"];
    }
  }
};
</script>

<style lang="css" scoped>
.clear-background-opacity {
  background-color: rgba(255,255,0,0);
}
</style>
