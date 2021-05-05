<template>
  <Step>
    <template #title>
      Project
    </template>
    <template #description>
      Projects are used to manage your stores Aero credentials.
      You can create a new project if you're starting local development or you can choose an existing project if you're continuing development or setting up on a live server.
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
