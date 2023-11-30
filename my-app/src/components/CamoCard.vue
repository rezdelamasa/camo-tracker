<script setup lang="ts">
  import CtProgressBar from "@/components/CtProgressBar.vue";

  const props = defineProps({
    weapon: Object,
    camo: Object
  })

  // const { name, doubleCount } = store
</script>

<template>
  <v-card class="py-2 camo-card">
    <v-card-subtitle
        v-if="props.camo.type === 'Base'"
        class="text-subtitle-2 mt-2 text-white"
    >
      Level {{ props.camo.level }}
    </v-card-subtitle>
    <v-card-title class="mb-0 text-h5 text-white">{{ props.camo.name }}</v-card-title>
    <p
        v-if="props.camo.progress.status === 'Locked'"
        class="text-white px-4 mt-2"
    >
      <span class="text-grey-lighten-1 font-weight-bold">{{ props.camo.progress.status  }}:</span> {{ props.camo.progress.statusReason }}
    </p>
    <v-card-text>
      <ct-progress-bar
        :model="props.camo.progress.count.current"
        :completion-count="props.camo.progress.count.completion"
        :text="props.camo.challenge"
      ></ct-progress-bar>
      <div class="d-flex justify-end mt-4">
        <v-btn
            icon
            outlined
            class="mr-4 camo__progress-button"
            density="comfortable"
            :disabled="props.camo.progress.status === 'Locked'"
            @click="$emit('decrement', props.camo)"
        >-</v-btn>
        <v-btn
            icon
            outlined
            class="mr-4 camo__progress-button"
            density="comfortable"
            :disabled="props.camo.progress.status === 'Locked'"
            @click="$emit('increment',props.camo)"
        >+</v-btn>
        <v-btn
            icon
            outlined
            rounded="xs"
            class="camo__progress-button"
            density="comfortable"
            :disabled="props.camo.progress.status === 'Locked'"
            @click="$emit('complete', props.camo)"
        >&#10003;</v-btn>
      </div>
    </v-card-text>

  </v-card>
</template>

<style scoped>

</style>
