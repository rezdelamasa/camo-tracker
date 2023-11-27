<script lang="ts" setup>
  import WeaponCard from "@/components/WeaponCard.vue";
  import {computed, ref} from "vue";
  import {useRoute} from "vue-router";

  import { useDataStore } from '@/store/app'

  const dataStore = useDataStore();

  const route = useRoute()
  const routeClass = computed(() => {
    return route.params.weaponClass;
  })

  const handleDecrement = (inProgressCamo) => {
    dataStore.decrement(inProgressCamo);
  }

  const handleIncrement = (inProgressCamo) => {
    dataStore.increment(inProgressCamo);
  }

  const handleComplete = (inProgressCamo) => {
    dataStore.complete(inProgressCamo);
  }

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
        <weapon-card
            :weapon="weapon"
            @decrement="(inProgressCamo) => handleDecrement(inProgressCamo)"
            @increment="(inProgressCamo) => handleIncrement(inProgressCamo)"
            @complete="(inProgressCamo) => handleComplete(inProgressCamo)"
        ></weapon-card>
      </v-col>
    </v-row>
  </v-container>
</template>
