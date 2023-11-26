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

    const classWeapons = data.value.weapons.filter((weapon) =>
      weapon.classId === currentClass.id
    )

    return classWeapons;
  })

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

  const masteryCamos = computed(() => {
    return weaponCamos.value.filter((camo) =>
        camo.type === "Mastery"
    )
  })

  function updateCamoComplete(currentCamo) {

    currentCamo.progress.status = "Complete";

    const target = weaponCamos.value.find((camo) => camo.name === currentCamo.name);

    Object.assign(target, currentCamo);

    queueNextInProgress(currentCamo);
  }

  function queueNextInProgress(currentCamo) {
    const baseCompletionCount = weaponCamos.value.filter((camo) =>
      camo.type === "Base" && camo.progress.status === "Complete"
    ).length;

    let nextLocked = weaponCamos.value.find((camo) =>
        camo.progress.status === "Locked"
    )

    if(!nextLocked) return;

    console.log(baseCompletionCount);

    if(baseCompletionCount === 4) {
    //    then continue to gilded
      if(nextLocked.type === "Mastery") {
        nextLocked.progress.status = "In Progress"
      }
    }
  }

  function updateCamoInProgress(currentCamo) {

    currentCamo.progress.status = "In Progress";

    const target = currentWeapon.value.camos.find((camo) => camo.name === currentCamo.name);

    Object.assign(target, currentCamo);
  }

  function decrement(currentCamo) {

    if(currentCamo.progress.count.current === 0) {
      return;
    };

    currentCamo.progress.count.current--;

    if(currentCamo.progress.count.current < currentCamo.progress.count.completion &&
      currentCamo.progress.status === "Complete"
    ) {
      updateCamoInProgress(currentCamo)
    }

    const target = currentWeapon.value.camos.find((camo) => camo.name === currentCamo.name);

    Object.assign(target, currentCamo);
  }

  function increment(currentCamo) {
    if(currentCamo.progress.count.current === currentCamo.progress.count.completion) {
      return;
    };

    currentCamo.progress.count.current++;

    if(currentCamo.progress.count.current === currentCamo.progress.count.completion) {
      console.log("increment currentCamo", currentCamo)
      updateCamoComplete(currentCamo);
      return;
    };

    const target = currentWeapon.value.camos.find((camo) => camo.name === currentCamo.name);

    Object.assign(target, currentCamo);
  }

  function complete(currentCamo) {

    currentCamo.progress.count.current = currentCamo.progress.count.completion;

    const target = currentWeapon.value.camos.find((camo) => camo.name === currentCamo.name);

    Object.assign(target, currentCamo);

    updateCamoComplete(currentCamo);
  }

  return { data, decrement, increment, complete, storeInProgress, storeComplete, storeLocked, currentClassWeapons, currentWeapon, currentClass, baseCamos, masteryCamos, currentWeaponGildedComplete, currentClassGildedProgress }
})
