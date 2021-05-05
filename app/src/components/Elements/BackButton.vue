<template>
  <button @click="action" type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 space-x-1.5">
    <ArrowNarrowLeftIcon class="h-5 w-5" />
    <span>Back</span>
  </button>
</template>

<script>
import {ArrowNarrowLeftIcon} from '@heroicons/vue/solid'

export default {
  props: ['action'],
  components: {
    ArrowNarrowLeftIcon,
  },
}
</script>
