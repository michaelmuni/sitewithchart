<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md8>
      <Login/>
    </v-flex>
  </v-layout>
</template>

<script>
import Login from "~/components/Login.vue";

export default {
  components: {
    Login
  }
};
</script>

