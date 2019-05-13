<template>
  <v-app light>
    <Navbar/>
    <v-content>
      <v-container>
        <transition name="fade" mode="in-out" appear>
          <nuxt/>
        </transition>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from '~/components/Navbar.vue'

export default {
  data() {
    return {
      fixed: false
    }
  },
  components: {
    Navbar
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

