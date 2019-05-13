<template>
<vue-no-ssr>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md8>
      <PieChartDistribution/>
    </v-flex>
  </v-layout>
</vue-no-ssr>
</template>

<script>
import PieChartDistribution from "~/components/PieChartDistribution.vue";

export default {
  components: {
    PieChartDistribution
  }
};
</script>