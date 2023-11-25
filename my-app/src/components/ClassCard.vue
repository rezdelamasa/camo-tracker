<template>
  <v-container class="fill-height">
    <v-card width="400" class="class-card text-white">
      <v-card-item>
        <v-card-title>{{ weaponClass.name }}</v-card-title>

        <v-card-subtitle><span class="text-uppercase font-weight-bold mr-1">{{ classProgress.currentCamo }}</span>{{ classProgress.percentage }} / {{ classLength }}</v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <v-progress-linear :model-value="classProgress.percentage"></v-progress-linear>
        <div class="w-100 text-right mt-3">
          <router-link :to="'multiplayer/' + weaponClass.slug" class="text-white font-weight-bold">View</router-link>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  import {computed} from "vue";

  const props = defineProps({
    weaponClass: Object,
    classLength: Number
  })

  // a computed ref
  const classProgress = computed(() => {
    let camoProgress = {
      "currentCamo": "gold",
      "percentage": 0
    }
    if(props.weaponClass.progress.gold === props.classLength) {
      camoProgress.currentCamo = "platinum"
    } else if(props.weaponClass.progress.platinum === props.classLength) {
      camoProgress.currentCamo = "priceless"
    } else if(props.weaponClass.progress.priceless === props.classLength) {
      camoProgress.currentCamo = "interstellar"
    }

    camoProgress.percentage = props.weaponClass.progress[camoProgress.currentCamo] / props.classLength;

    return camoProgress;

  })
</script>
