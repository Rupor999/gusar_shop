<template lang="html">
  <v-card id="create">
    <v-speed-dial
      v-model="fab"
      bottom
      right
      direction="left"
      style="z-index:1;"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" fab dark color="green darken-2">
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-badge v-else color="black" :content="getCardCount || '0'">
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-card class="mx-auto card-up" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">OVERLINE</div>
            <v-list-item-title class="headline mb-1"
              >Headline 5</v-list-item-title
            >
            <v-list-item-subtitle
              >Greyhound divisely hello coldly fonwderfully Lorem ipsum dolor
              sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn text>Button</v-btn>
          <v-btn text>Button</v-btn><v-btn text>Button</v-btn>
          <v-btn text>Button</v-btn><v-btn text>Button</v-btn>
          <v-btn text>Button</v-btn>
        </v-card-actions>
      </v-card>
    </v-speed-dial>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      fab: false
    };
  },
  computed: {
    getCardCount() {
      return this.$store.getters["cart/getCart"].length;
    }
  }
};
</script>

<style lang="css" scoped>
#create .v-speed-dial {
  position: fixed;
}

#create .v-btn--floating {
  position: relative;

}
#create .card-up{
  margin-bottom: 140px;
}
</style>
