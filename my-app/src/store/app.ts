// Utilities
import { defineStore } from 'pinia'
import {computed, ref} from "vue";
import mock from "@/data/restructuredData.json"
import {useRoute} from "vue-router";

export const useDataStore = defineStore('counter', () => {
  const route = useRoute()
  const routeParams = computed(() => {
    return route.params;
  })
  const data:Object = ref(mock.data)

  // GETTER for current weapon camos
  const weaponCamos = computed(() => {
    if(route.params.weapon) {
      return data.value.camos.filter((camo) =>
        camo.weaponId == currentWeapon.value.id
      )
    }
    return [];
  })

  // GETTER for current class based on route params
  const currentClass = computed(() => {
    return data.value.classes.find((dataClass) =>
        dataClass.slug === routeParams.value.weaponClass
    )
  })

  const currentWeaponGildedComplete = computed(() => {
    const gildedCamo = currentWeapon.value.camos.find((camo) =>
      camo.name === 'Gilded'
    )

    return gildedCamo.progress.status === "Complete";
  })

  const currentClassGildedProgress = computed(() => {
    let gildedProgress = 0;
    const classWeapons = data.value.weapons.filter((weapon) =>
      weapon.classId === currentClass.value.id
    )

    classWeapons.forEach((weapon) => {
      const gildedChallenge = weapon.camos.find((camo) =>
        camo.name === "Gilded"
      );

      if(gildedChallenge.progress.status === "Complete") {
        gildedProgress++;
      }
    })

    return gildedProgress;

  })

  const currentClassWeapons = computed(() => {
    const currentClass = data.value.classes.find((dataClass) =>
      dataClass.slug === routeParams.value.weaponClass
    )

    return data.value.weapons.filter((weapon) =>
      weapon.classId === currentClass.id
    )
  })

  // GETTER for current weapon based on route params
  const currentWeapon = computed(() => {
    return data.value.weapons.find((weapon) =>
        weapon.slug === routeParams.value.weapon
    )
  })

  const storeInProgress = computed(() => {
    return currentWeapon.value.camos.filter((camo) =>
      camo.progress.status === "In Progress"
    )
  })

  const storeComplete = computed(() => {
    return currentWeapon.value.camos.filter((camo) =>
        camo.progress.status === "Complete"
    )
  })

  const storeLocked = computed(() => {
    return currentWeapon.value.camos.filter((camo) =>
        camo.progress.status === "Locked"
    )
  })

  const baseCamos = computed(() => {
    return weaponCamos.value.filter((camo) =>
      camo.type === "Base"
    )
  })

  // GETTER for current weapon's mastery camos
  const masteryCamos = computed(() => {
    return weaponCamos.value.filter((camo) =>
        camo.type === "Mastery"
    )
  })

  // GETTER boolean if weapon's base camos are completed
  const allBaseCamosCompleted = computed(() => {
    return baseCamos.value.filter((camo) =>
        camo.progress.status === "Complete"
    ).length === baseCamos.value.length;
  })

  // FUNCTION to update current camo progress status to complete
  // Used when incrementing, decrementing, or completing
  function updateCamoComplete(currentCamo) {

    currentCamo.progress.status = "Complete";

    const target = weaponCamos.value.find((camo) => camo.name === currentCamo.name);

    Object.assign(target, currentCamo);

    queueNextInProgress(currentCamo);
  }

  // GETTER boolean if all weapons in class are gilded
  // Used determine if locked gilded challenge can be set to In Progress
  const allClassWeaponsGilded = computed(() => {
    const classWeaponCount = currentClassWeapons.value.length;

    const weaponIds = currentClassWeapons.value.map((weapon) => weapon.id);

    let gildedCounter = 0;

    data.value.camos.forEach((camo) => {
      if(weaponIds.includes(camo.weaponId) && camo.name === "Gilded" && camo.progress.status === "Complete") {
        gildedCounter++;
      }
    })

    return gildedCounter === classWeaponCount;
  })

  // FUNCTION to update the status of the next locked mastery camo to in progress
  // Used when completing a camo
  // Only applicable to mastery camos
  // because all base camos will always be unlocked (not tracking level progression, just camo progression)
  function queueNextInProgress() {
    const baseCompletionCount = weaponCamos.value.filter((camo) =>
      camo.type === "Base" && camo.progress.status === "Complete"
    ).length;

    let nextLocked = weaponCamos.value.find((camo) =>
        camo.progress.status === "Locked"
    )

    if(!nextLocked) return;

    if(baseCompletionCount === 4) {
    //    then continue to gilded
      if(nextLocked.type === "Mastery") {
        nextLocked.progress.status = "In Progress"
      }
    }
  }

  // FUNCTION to update the current camo to in progress
  function updateCamoInProgress(currentCamo) {

    currentCamo.progress.status = "In Progress";

    const target = currentWeapon.value.camos.find((camo) => camo.name === currentCamo.name);

    Object.assign(target, currentCamo);
  }

  // ACTION to decrement the current camo's progression
  // dispatched from UI
  function decrement(currentCamo) {

    if(currentCamo.progress.count.current === 0) {
      return;
    }

    currentCamo.progress.count.current--;

    if(currentCamo.progress.count.current < currentCamo.progress.count.completion &&
      currentCamo.progress.status === "Complete"
    ) {
      updateCamoInProgress(currentCamo)
    }

    const target = currentWeapon.value.camos.find((camo) => camo.name === currentCamo.name);

    Object.assign(target, currentCamo);
  }

  // ACTION to increment the current camo's progression
  // dispatched from UI
  function increment(currentCamo) {
    if(currentCamo.progress.count.current === currentCamo.progress.count.completion) {
      return;
    }

    currentCamo.progress.count.current++;

    if(currentCamo.progress.count.current === currentCamo.progress.count.completion) {
      updateCamoComplete(currentCamo);
      return;
    }

    const target = currentWeapon.value.camos.find((camo) => camo.name === currentCamo.name);

    Object.assign(target, currentCamo);
  }

  // ACTION to max the current camo's progression
  // dispatched from UI
  function complete(currentCamo) {

    currentCamo.progress.count.current = currentCamo.progress.count.completion;

    const target = weaponCamos.value.find((camo) => camo.name === currentCamo.name);

    Object.assign(target, currentCamo);

    updateCamoComplete(currentCamo);
  }

  return { data, decrement, increment, complete, storeInProgress, storeComplete, storeLocked, currentClassWeapons, currentWeapon, currentClass, baseCamos, masteryCamos, currentWeaponGildedComplete, currentClassGildedProgress,
    weaponCamos }
})
