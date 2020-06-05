<template lang="html">
  <v-container class="fill-height white" fluid>
    <v-row class="pa-1">
      <v-col>
        <v-row class="d-flex justify-center">
          <v-col cols="9" class="pt-0">
            <h1 class="display-1">Оплата</h1>
            <v-divider class="my-3"></v-divider>
            <div class="my-5 d-flex justify-space-around align-center">
              <h3 class="my-5">
                <b>Оплата производится через платежный сервис PayKeeper</b>
              </h3>
              <v-img src="/payment_logo.png" max-width="300"></v-img>
            </div>
            <div class="my-5">
              <h3 class="my-5">
                <b>PayKeeper - это...</b>
              </h3>
              <p>
                Крупнейший российский интегратор, специализирующийся на
                интернет-эквайринге и предоставляющий возможность принимать
                платежи через все типы банковских карт Visa, MasterCard, МИР ,
                American Express, UnionPay, JCB, DinersClub и распространённые
                платежные сервисы ApplePay, SamsungPay, AndroidPay, GooglePay.
              </p>
              <p>
                PayKeeper является единственным официальным банковским
                интегратором большинства крупнейших российских банков: «ВТБ»,
                «Сбербанк», «Промсвязьбанк», «Банк Открытие», «Московский
                Кредитный Банк», «Банк Русский Стандарт», «ТрансКапиталБанк»,
                «Газпромбанк», «БАНК УРАЛСИБ», «Банк «Санкт-Петербург», «УБРиР»,
                «ПОЧТА БАНК», «КИВИ Банк». Благодаря тесному сотрудничеству с
                банками-партнерами мы предоставляем услуги интернет-эквайринга
                на условиях минимально возможных комиссий.
              </p>
            </div>
            <v-container grid-list-xs,sm,md,lg,xl>
              <v-row>
                <v-col class="d-flex justify-center align-center">
                  <v-img class="ma-2" src="/payment1.png" />
                </v-col>
                <v-col class="d-flex justify-center align-center">
                  <v-img class="ma-2" src="/payment2.png" />
                </v-col>
                <v-col class="d-flex justify-center align-center">
                  <v-img class="ma-2" src="/payment3.png" />
                </v-col>
                <v-col class="d-flex justify-center align-center">
                  <v-img class="ma-2" src="/payment4.png" />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex justify-center align-center">
                  <v-img class="ma-5" src="/payment5.png" />
                </v-col>
                <v-col class="d-flex justify-center align-center">
                  <v-img class="ma-5" src="/payment6.png" />
                </v-col>
                <v-col class="d-flex justify-center align-center">
                  <v-img class="ma-5" src="/payment7.png" />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
h1, div.container h2 {
    font-size: 2em;
    font-size: 20px;
    margin: 0 0 .5em;
}
h1, h2, h3, h4, h5, h6 {
    color: #24394d;
    color:
    #505050;
    font-weight: normal;
    line-height: normal;
}
</style>
