<script lang="ts" setup>
  import WeaponCard from "@/components/WeaponCard.vue";
  import data from "@/data/data.json"
  import {computed, ref} from "vue";
  import {useRoute} from "vue-router";

  import { useDataStore } from '@/store/app'

  const dataStore = useDataStore();

  const route = useRoute()
  const routeClass = computed(() => {
    return route.params.weaponClass;
  })

</script>
<template>
  <v-container>
    <v-row>
      <v-col
        v-for="weapon in dataStore.currentClassWeapons"
        :key="weapon.name"
        cols="12"
        sm="4"
      >
        <weapon-card :weapon="weapon"></weapon-card>
      </v-col>
    </v-row>
  </v-container>
</template>
