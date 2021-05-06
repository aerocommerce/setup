<template>
  <Step>
    <template #title>
      Catalog setup
    </template>
    <template #description>
      Now we’ll set up your catalog. The catalogue includes products, categories, tags and other parts of your store’s information. You can choose to import sample products or skip this step if you already have catalog data or wish to add it later.
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
