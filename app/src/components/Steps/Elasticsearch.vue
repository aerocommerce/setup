<template>
  <Step>
    <template #title>
      Elasticsearch connection
    </template>
    <template #description>
      Elasticsearch is used to index your products, pages and other content in order for the data to be easily searchable, sortable and filterable. You can choose to connect to a local or remote database depending on your setup.
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
