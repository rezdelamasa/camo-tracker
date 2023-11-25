<script setup lang="ts">
  import { useDataStore } from '@/store/app'
  const props = defineProps({
    weapon: Object,
    camo: Object
  })

  // const { name, doubleCount } = store
</script>

<template>
  <v-card class="py-2 camo-card">
    <v-card-title class="mb-0 pb-0 text-h5 text-white">{{ camo.name }}</v-card-title>
    <v-card-subtitle class="text-subtitle-2 text-white">{{ camo.type }}</v-card-subtitle>
    <v-card-text>
      <div class="d-flex justify-space-between mb-2 text-white">
        <p class="w-50 text-body-1">{{ camo.challenge }}</p>
        <div class="d-flex w-50 justify-end align-center">
          <v-text-field class="progress__input mr-2" density="compact" hide-details type="number" v-model="camo.progress.count.current"></v-text-field>
          <p>/ {{ camo.progress.count.completion }}</p>
        </div>
      </div>
      <div class="mt-4">
        <v-progress-linear :model-value="camo.progress.count.current / camo.progress.count.completion * 100" height="6" color="green" class="mb-2">
        </v-progress-linear>

      </div>
      <div class="d-flex justify-end mt-4">
        <v-btn
            icon
            outlined
            class="mr-4 camo__progress-button"
            density="comfortable"
            @click="$emit('decrement', props.weapon, camo)"
        >-</v-btn>
        <v-btn
            icon
            outlined
            class="mr-4 camo__progress-button"
            density="comfortable"
            @click="$emit('increment', props.weapon, camo)"
        >+</v-btn>
        <v-btn
            icon
            outlined
            rounded="xs"
            class="camo__progress-button"
            density="comfortable"
        >&#10003;</v-btn>
      </div>
    </v-card-text>

  </v-card>
</template>

<style scoped>

</style>
