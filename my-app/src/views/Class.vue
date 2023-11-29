<script lang="ts" setup>
  import WeaponCard from "@/components/WeaponCard.vue";
  import {computed} from "vue";
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
    <v-row class="position-relative">
      <v-col
        cols="12"
        class="pb-4 pt-0 text-white position-sticky bg-rd-black z-index-10"
        style="top: 64px;"
      >
        <div class="position-relative d-flex align-center my-4">
          <router-link
            to="/multiplayer"
            class="text-white text-decoration-none position-absolute text-h5"
            style="left: 0;"
          >
            &lt;
          </router-link>
          <h3 class="text-center w-100">{{ dataStore.currentClass.name }}</h3>
        </div>
        <v-card class="camo-card text-white mt-2">
          <v-card-text>
            <v-row
              no-gutters
              class="my-1"
            >
              <v-col
                cols="6"
              >
                <h4 class="text-amber">Gilded</h4>
              </v-col>
              <v-col
                cols="6"
              >
                <p class="text-right">2 / 6</p>
              </v-col>
              <v-col
                cols="12"
                class="py-2"
              >
                <v-progress-linear
                  height="8"
                  rounded
                  :model-value="dataStore.getClassGildedProgress / 6 * 100" color="amber"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
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
