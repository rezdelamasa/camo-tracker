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
<!--      <v-row>-->
<!--        <v-col-->
<!--          cols="7"-->
<!--          class="pb-0"-->
<!--        >-->
<!--          <p>Base and Gilded Camos</p>-->
<!--        </v-col>-->
<!--        <v-col-->
<!--          cols="5"-->
<!--          class="d-flex justify-end align-end pb-0"-->
<!--        >-->
<!--          <p class="text-right">{{ gildedProgressCount }} / 5</p>-->
<!--        </v-col>-->
<!--        <v-col-->
<!--          cols="12"-->
<!--        >-->
<!--          <v-progress-linear-->
<!--              :model-value="gildedProgressCount / 5 * 100"-->
<!--              color="green"-->
<!--          ></v-progress-linear>-->
<!--        </v-col>-->
<!--      </v-row>-->
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
              :model="forgedProgressPercentage"
              :text="forgedCamo.challenge"
              :completion-count="forgedCamo.progress.count.completion"
          ></ct-progress-bar>
          <div class="d-flex justify-end mt-4">
            <v-btn
                icon
                outlined
                class="mr-4 camo__progress-button"
                density="comfortable"
                @click="$emit('decrement', forgedCamo)"
            >-</v-btn>
            <v-btn
                icon
                outlined
                class="mr-4 camo__progress-button"
                density="comfortable"
                @click="$emit('increment',forgedCamo)"
            >+</v-btn>
            <v-btn
                icon
                outlined
                rounded="xs"
                class="camo__progress-button"
                density="comfortable"
                @click="$emit('complete', forgedCamo)"
            >&#10003;</v-btn>
          </div>
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

  const props = defineProps({
    weapon: Object,
  })

  const route = useRoute()
  const dataStore = useDataStore();

  const gildedProgressCount = computed(() => {
    return dataStore.weaponGildedProgress(props.weapon)
  })

  const forgedCamo = ref(dataStore.getWeaponCamo(props.weapon, 'Forged'))

  const forgedProgressPercentage = computed(() => {
    return forgedCamo.value.progress.count.current / forgedCamo.value.progress.count.completion * 100
  })
</script>
