<template>
  <v-card
    width="400"
    class="camo-card text-white"
  >
    <v-card-item>
      <v-card-title class="text-h5">{{ props.weapon.name }}</v-card-title>

      <v-card-subtitle>
        <span
            v-if="gildedProgressCount === 5"
            class="text-amber font-weight-bold font-italic"
        >
          Gilded
        </span>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <ct-progress-bar
          v-if="gildedProgressCount < 5"
          :model="gildedProgressCount"
          text="Base and Gilded Camos"
          :completion-count="5"
      ></ct-progress-bar>
      <v-row
        class="mt-0"
        :class="{'text-white': dataStore.allClassWeaponsGilded, 'text-grey': !dataStore.allClassWeaponsGilded}"
        v-if="gildedProgressCount === 5"
      >
        <v-col
          cols="12"
          class="pb-0"
        >
          <p class="text-h6">Forged Camo</p>
          <p v-if="!dataStore.allClassWeaponsGilded" class="mt-0"><span class="font-weight-bold mr-1">{{ forgedCamo.progress.status }}:</span>{{ forgedCamo.progress.statusReason }}</p>
        </v-col>
        <v-col>
          <ct-progress-bar
              :model="forgedCamo.progress.count.current"
              :text="forgedCamo.challenge"
              :completion-count="forgedCamo.progress.count.completion"
          ></ct-progress-bar>
          <progress-button-group :camo="forgedCamo"></progress-button-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          class="d-flex justify-end"
        >
          <router-link
              :to="route.fullPath + '/' + props.weapon.slug"
              class="text-white text-decoration-none font-weight-bold"
          >
            View Weapon
          </router-link>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
  import {useRoute} from "vue-router";
  import {useDataStore} from "@/store/app";
  import {computed, ref} from "vue";
  import CtProgressBar from "@/components/CtProgressBar.vue";
  import ProgressButtonGroup from "@/components/ProgressButtonGroup.vue";

  const props = defineProps({
    weapon: Object,
  })

  const route = useRoute()
  const dataStore = useDataStore();

  const gildedProgressCount = computed(() => {
    return dataStore.weaponGildedProgress(props.weapon)
  })

  const forgedCamo = ref(dataStore.getWeaponCamo(props.weapon, 'Forged'))
</script>
