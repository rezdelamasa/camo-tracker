<template>
  <v-container class="fill-height">
    <v-card width="400">
      <v-card-item>
        <v-card-title>{{ weapon.name }}</v-card-title>

<!--        <v-card-subtitle>{{ weapon.progress }} / {{ classLength }}</v-card-subtitle>-->
      </v-card-item>

      <v-card-text>
        <v-progress-linear :model-value="20"></v-progress-linear>
        <router-link :to="route.fullPath + '/' + weapon.slug">View</router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  import {useRoute} from "vue-router";

  defineProps({
    weapon: Object,
  })

  const route = useRoute()
</script>
