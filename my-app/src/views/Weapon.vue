<script lang="ts" setup>
  import { useDataStore } from '@/store/app'
  import {computed, ref} from "vue";
  import {useRoute} from "vue-router";
  import CamoCard from "@/components/CamoCard.vue";

  const dataStore = useDataStore();

  const route = useRoute()
  const routeParams = computed(() => {
    return route.params;
  })

  const panels = ref(["base"]);
</script>
<template>
  <v-container class="text-white">
    <v-row>
      <v-col
        cols="12"
      >
        <router-link class="text-white text-decoration-none" :to="'/multiplayer/' + routeParams.weaponClass">&#8592; {{ dataStore.currentClass.name }}</router-link>
      </v-col>
      <v-col cols="12" class="weapon__row">
        <v-img :src="dataStore.currentWeapon.image"></v-img>
        <h1 class="font-italic">{{ dataStore.currentWeapon.name }}</h1>
<!--        <h4 class="font-weight-bold text-grey-lighten-1 mb-2">{{ filteredClass.name }}</h4>-->
        <p class="text-white">{{ dataStore.currentWeapon.description }}</p>
      </v-col>
      <v-col
        cols="12"
      >
        <v-expansion-panels
          v-model="panels"
          :multiple="true"
        >
          <v-expansion-panel
              class="bg-transparent"
              title="Base Camos"
              value="base"
          >
            <v-expansion-panel-text>
              <v-row>
                <v-col
                  cols="12"
                  v-for="camo in dataStore.baseCamos"
                >
                  <camo-card
                      :weapon="dataStore.currentWeapon"
                      :camo="camo"
                  ></camo-card>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
              class="bg-transparent"
              title="Mastery Camos"
              value="mastery"
          >
            <v-expansion-panel-text>
              <v-row>
                <v-col
                    cols="12"
                    v-for="camo in dataStore.masteryCamos"
                >
                  <camo-card
                      :weapon="dataStore.currentWeapon"
                      :camo="camo"
                  ></camo-card>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>
