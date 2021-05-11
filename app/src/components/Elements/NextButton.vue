<template>
  <button @click="action" type="button" class="button">
    <span>Next step</span>
    <ArrowNarrowRightIcon class="ml-4" />
  </button>
</template>

<script>
import {ArrowNarrowRightIcon} from '@heroicons/vue/outline'

export default {
  props: ['action'],
  components: {
    ArrowNarrowRightIcon,
  },
}
</script>
