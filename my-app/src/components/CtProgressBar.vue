<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  model: Number,
  text: String,
  completionCount: Number,
  locked: {
    type: Boolean,
    default: false
  }
})

const barColor = computed(() => {
  if(props.locked) return 'grey'
  else {
    return props.model < props.completionCount ? 'orange' : 'green'
  }
});
</script>

<template>
  <v-row
      no-gutters
      class="my-1"
      :class="{'text-white': !locked, 'text-grey': locked}"
  >
    <v-col
        cols="6"
    >
      <p>{{ props.text }}</p>
    </v-col>
    <v-col
        cols="6"
        class="d-flex align-end justify-end"
    >
      <p class="text-right">{{ props.model }} / {{ props.completionCount }}</p>
    </v-col>
    <v-col
        cols="12"
        class="py-4"
    >
      <v-progress-linear
          height="8"
          rounded
          :model-value="props.model / props.completionCount * 100"
          :color="barColor"
      />
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
