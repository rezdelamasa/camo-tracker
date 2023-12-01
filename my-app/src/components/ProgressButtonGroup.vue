<script setup lang="ts">
import {useDataStore} from "@/store/app";

const props = defineProps({
  camo: Object
})

const dataStore = useDataStore();
</script>

<template>
  <v-row no-gutters>
    <v-col
      cols="2"
      class="pr-1"
    >
      <v-btn
          color="#4e4e51"
          block
          class="text-h6"
          @click="dataStore.decrement(props.camo)"
          @contextmenu.prevent="dataStore.reset(props.camo)"
      >-</v-btn>
    </v-col>
    <v-spacer/>
    <v-col
      cols="2"
      class="pl-1"
    >
      <v-btn
          block
          color="#4e4e51"
          class="text-h6"
          @click="dataStore.increment(props.camo)"
          @contextmenu.prevent="dataStore.complete(props.camo)"
      >+</v-btn>
    </v-col>
  </v-row>
</template>

<style scoped>
.progress-input :deep(input) {
  text-align: center;
  color: white;
}
</style>
