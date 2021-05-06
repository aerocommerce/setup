<template>
  <Step>
    <template #title>
      Store information
    </template>
    <template #description>
      Now we’ll take some information about the store you’re creating. We’ll use this information to populate your theme and email content. This information can be easily updated later from the store settings page.
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
