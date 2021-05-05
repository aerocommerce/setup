<template>
  <button @click="action" type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 space-x-1.5">
    <span>Next step</span>
    <ArrowNarrowRightIcon class="h-5 w-6" />
  </button>
</template>

<script>
import {ArrowNarrowRightIcon} from '@heroicons/vue/solid'

export default {
  props: ['action'],
  components: {
    ArrowNarrowRightIcon,
  },
}
</script>
