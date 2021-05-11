<template>
  <button @click="action" type="button" class="button button-transparent">
    <ArrowNarrowLeftIcon class="mr-4" />
    <span>Back</span>
  </button>
</template>

<script>
import {ArrowNarrowLeftIcon} from '@heroicons/vue/outline/esm'

export default {
  props: ['action'],
  components: {
    ArrowNarrowLeftIcon,
  },
}
</script>
