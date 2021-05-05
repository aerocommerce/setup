<template>
  <RadioGroup v-model="value">
    <RadioGroupLabel class="sr-only">{{ label }}</RadioGroupLabel>
    <div class="bg-white rounded-md -space-y-px">
      <RadioGroupOption as="template" v-for="(option, id) in options" :key="option.key" :value="option.key" v-slot="{ checked, active }">
        <div :class="[id === 0 ? 'rounded-tl-md rounded-tr-md' : '', id === options.length - 1 ? 'rounded-bl-md rounded-br-md' : '', checked ? 'bg-blue-50 border-blue-600 z-10' : 'border-gray-200', 'relative border p-4 flex cursor-pointer focus:outline-none']">
              <span :class="[checked ? 'bg-blue-600 border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-1 ring-blue-500' : '', 'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center']" aria-hidden="true">
                <span class="rounded-full bg-white w-1.5 h-1.5" />
              </span>
          <div class="ml-3 flex flex-col">
            <RadioGroupLabel as="span" :class="[checked ? 'text-blue-900' : 'text-gray-900', 'block text-sm font-medium']">
              {{ option.name }}
            </RadioGroupLabel>
            <RadioGroupDescription as="span" :class="[checked ? 'text-blue-700' : 'text-gray-500', 'block text-sm']">
              {{ option.description }}
            </RadioGroupDescription>
          </div>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>

<script>
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

export default {
  components: {
    RadioGroup,
    RadioGroupDescription,
    RadioGroupLabel,
    RadioGroupOption,
  },
  props: ['value', 'options', 'label'],
}
</script>
