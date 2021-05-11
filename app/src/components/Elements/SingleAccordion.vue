<template>
  <div>
    <Switch v-model="modelValue" class="flex justify-between items-center text-white">
      <div><slot name="title" /></div>
      <ChevronRightIcon class="ml-2 w-4 h-4 transform transition-transform duration-150" :class="modelValue ? 'rotate-90' : 'rotate-0'" />
    </Switch>
    <div v-if="modelValue" class="pt-3">
      <slot />
    </div>
  </div>
</template>

<script>
import { Switch } from '@headlessui/vue'
import { ChevronRightIcon } from '@heroicons/vue/outline'

export default {
  props: ['modelValue'],
  components: {
    Switch,
    ChevronRightIcon,
  },
};
</script>
