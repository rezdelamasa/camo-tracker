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

  // GETTER for current class weapons
  const currentClassWeapons = computed(() => {
    return data.value.weapons.filter((weapon) =>
      weapon.classId === currentClass.value.id
    )
  })

  // GETTER for current weapon based on route params
  const currentWeapon = computed(() => {
    return data.value.weapons.find((weapon) =>
        weapon.slug === routeParams.value.weapon
    )
  })

  // GETTER for current weapon's base camos
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

  // function get weapon parameter's camos
  const getWeaponsCamosForGilded = (weapon) => {
    return data.value.camos.filter((camo) =>
      camo.weaponId === weapon.id && (camo.type === "Base" || camo.name === "Gilded")
    )
  }

  const getWeaponCamo = (weapon, camoString) => {
    console.log(weapon);
    console.log(camoString)
    const foundCamo = data.value.camos.find((camo) =>
      camo.weaponId === weapon.id && camo.name == camoString
    )

    console.log(foundCamo)
    return foundCamo
  }

  // GETTER for weapon gilded progress
  const weaponGildedProgress = (weapon) => {
    return getWeaponsCamosForGilded(weapon).filter((camo) =>
      camo.progress.status === "Complete"
    ).length
  }

  // FUNCTION to update current camo progress status to complete
  // Used when incrementing, decrementing, or completing
  function updateCamoComplete(currentCamo) {
    currentCamo.progress.status = "Complete";

    const target = weaponCamos.value.find((camo) => camo.name === currentCamo.name);

    Object.assign(target, currentCamo);

    queueNextInProgress(currentCamo);
  }

  // GETTER boolean if all weapons in class are gilded
  // Used determine if locked forged challenge can be set to In Progress
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

  // GETTER boolean if all weapons are forged
  // Used determine if locked priceless challenge can be set to In Progress
  const allWeaponsForged = computed(() => {
    const completedForgedChallenges = data.value.camos.filter((camo) =>
      camo.name === "Forged" && camo.progress.status === "Complete"
    );

    return completedForgedChallenges.length === data.value.weapons.length;
  })

  // FUNCTION to update the status of the next locked mastery camo to in progress
  // Used when completing a camo
  // Only applicable to mastery camos
  // because all base camos will always be unlocked (not tracking level progression, just camo progression)
  function queueNextInProgress() {
    const nextLocked = weaponCamos.value.find((camo) =>
        camo.progress.status === "Locked" && camo.type === "Mastery"
    )

    if(!nextLocked) return;
    if(nextLocked.name === "Gilded" && !allBaseCamosCompleted.value) return;
    if(nextLocked.name === "Forged" && !allClassWeaponsGilded.value) return;
    if(nextLocked.name === "Priceless" && !allWeaponsForged.value) return;

    nextLocked.progress.status = "In Progress"
  }

  // FUNCTION to update the current camo to in progress
  function updateCamoInProgress(currentCamo) {

    currentCamo.progress.status = "In Progress";

    const target = weaponCamos.value.find((camo) => camo.name === currentCamo.name);

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

    const target = weaponCamos.value.find((camo) => camo.name === currentCamo.name);

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

  return { data, decrement, increment, complete, currentClassWeapons, currentWeapon, currentClass, baseCamos, masteryCamos, weaponCamos, weaponGildedProgress, getWeaponCamo, allClassWeaponsGilded }
})
