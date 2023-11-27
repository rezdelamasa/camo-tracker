<script lang="ts" setup>
  import ClassCard from "@/components/ClassCard.vue";
  import { useDataStore } from '@/store/app'

  const dataStore = useDataStore();
</script>
<template>
  <v-container>
    <v-row>
      <v-col
        v-for="weaponClass in dataStore.data.classes"
        :key="weaponClass.name"
        cols="12"
        sm="4"
      >
        <class-card :weaponClass="weaponClass" :classLength="dataStore.data.classes.length"></class-card>
      </v-col>
    </v-row>
  </v-container>
</template>
