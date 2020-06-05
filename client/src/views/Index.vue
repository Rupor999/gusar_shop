<template lang="html">
  <div>
    <v-content>
      <Navbar />
      <router-view />
    </v-content>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Navbar,
    Footer
  }
};
</script>

<style lang="css" scoped></style>
