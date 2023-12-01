<script setup lang="ts">
  import CtProgressBar from "@/components/CtProgressBar.vue";
  import ProgressButtonGroup from "@/components/ProgressButtonGroup.vue";

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
      <progress-button-group
          :camo="props.camo"
      ></progress-button-group>
    </v-card-text>

  </v-card>
</template>

<style scoped>

</style>
