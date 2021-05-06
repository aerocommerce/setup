<template>
  <Step>
    <template #title>
      Database
    </template>
    <template #description>
      Create or select the database you want to use for this store. We will create the tables needed if they don't already exist and scan for an exisiting catalog, theme and user account.
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
