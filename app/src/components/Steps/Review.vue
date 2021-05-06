<template>
  <Step>
    <template #title>
      Review setup
    </template>
    <template #description>
      Review your setup, by clicking the save and start setup button you will not be able to make any changes and your store will be installed.
    </template>
    <div>
      This is the code!
    </div>
    <template #footer="{ advanceStep, retreatStep }">
      <BackButton :action="retreatStep" />
      <NextButton :action="advanceStep" />
    </template>
  </Step>
</template>

<script>
import BackButton from '../Elements/BackButton.vue'
import NextButton from '../Elements/NextButton.vue'
import Step from '../Step.vue'

export default {
  components: {
    BackButton,
    NextButton,
    Step,
  },
}
</script>
