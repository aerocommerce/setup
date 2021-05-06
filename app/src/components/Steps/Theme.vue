<template>
  <Step>
    <template #title>
      Theme selection
    </template>
    <template #description>
      Themes are a way to customise your store to fit your brand. In order to create your store we need to pick a theme to start with. If you have your own theme you wish to use you, select our blank theme and you can import or create your custom theme later.
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
