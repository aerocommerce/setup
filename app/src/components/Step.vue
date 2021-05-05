<template>
  <div class="flex flex-col justify-between flex-1 bg-[#1F202D] py-12 px-12">
    <div class="space-y-4 pb-6 border-b border-gray-400">
      <div class="w-full flex items-center justify-between">
        <div>
          <svg class="w-28 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 764.8 178.1">
            <title>Aero</title>
            <path class="fill-current text-white"
                  d="M675.8 178.1c-49.1 0-89-39.9-89-89s39.9-89 89-89 89 39.9 89 89c0 49-39.9 89-89 89m0-138.1c-27 0-49 22-49 49s22 49 49 49 49-22 49-49-22-49-49-49M570.4 63.7C569.9 28.2 540.3 0 504.9 0h-54.8c-2.3 0-4.4 1.4-5.3 3.6l-66.4 166.7c-1.5 3.7 1.3 7.8 5.3 7.8h30.9c2.3 0 4.4-1.4 5.3-3.6l16.7-41.9c.9-2.2 2.9-3.6 5.3-3.6h37.7c2.3 0 4.4 1.4 5.3 3.6l16.7 41.9c.9 2.2 2.9 3.6 5.3 3.6h30.8c4 0 6.7-4 5.3-7.8l-16.5-41.4c-.6-1.5.2-3.2 1.7-3.7 24.8-9.2 42.5-33.3 42.2-61.5M505.3 89h-47.2c-2 0-3.4-2-2.6-3.9l17.3-43.4c.4-1.1 1.5-1.8 2.6-1.8h30.5c13.4 0 24.3 10.7 24.5 24C530.6 77.8 519 89 505.3 89M190.4 170.3l-67-166.7c-.9-2.1-2.9-3.6-5.3-3.6h-46c-2.3 0-4.4 1.4-5.3 3.6L.4 170.3c-1.5 3.7 1.3 7.8 5.3 7.8h30.9c2.3 0 4.4-1.4 5.3-3.6l16.7-41.9c.9-2.2 2.9-3.6 5.3-3.6H127c2.3 0 4.4 1.4 5.3 3.6l16.8 41.9c.9 2.1 2.9 3.6 5.3 3.6h30.9c3.8 0 6.6-4.1 5.1-7.8m-113-85.2l15.1-38c.9-2.4 4.3-2.4 5.3 0l15.3 38c.7 1.9-.6 3.9-2.6 3.9H80c-2 0-3.4-2-2.6-3.9"/>
            <path class="fill-current text-[#54e0e4]"
                  d="M330.9 178.1c11 0 20-9 20-20s-9-20-20-20H216.8c-4 0-6.8 4.1-5.3 7.8l11.5 28.7c.9 2.1 2.9 3.6 5.3 3.6h102.6zM386.3 0h-225c-4 0-6.8 4.1-5.3 7.8l16.6 41.4c1.3 3.2 4.4 5.3 7.9 5.3h84.3c2.5 0 4.7-1.5 5.6-3.8l3.6-8.9c.5-1.1 1.6-1.9 2.8-1.9h109.1c10.8 0 20.1-8.4 20.5-19.3.3-11.2-8.8-20.6-20.1-20.6M358.6 69H189c-4 0-6.8 4.1-5.3 7.8l16.6 41.4c1.3 3.2 4.4 5.3 7.9 5.3h29c2.4 0 4.7-1.5 5.6-3.8l3.6-8.9c.5-1.1 1.6-1.9 2.8-1.9h108.9c10.8 0 20.1-8.4 20.5-19.3.4-11.2-8.7-20.6-20-20.6"/>
          </svg>
        </div>
        <div class="text-white">
          <component :is="currentStepEntry.icon" class="h-6 w-6" />
        </div>
      </div>
      <div class="w-full flex items-center justify-between">
        <div>
          <h1 class="text-2xl leading-6 font-medium text-white"><slot name="title"/></h1>
        </div>
        <div>
          <span class="text-gray-400 text-sm">Step {{ currentStep + 1 }} of {{ totalSteps }}</span>
        </div>
      </div>
    </div>
    <div class="flex-1">
      <p class="mt-6 text-base text-gray-400"><slot name="description" /></p>
      <slot />
    </div>
    <div class="flex justify-between">
      <slot name="footer" v-bind="{ advanceStep, retreatStep }" />
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  setup() {
    const advanceStep = inject('advanceStep')
    const retreatStep = inject('retreatStep')
    const currentStep = inject('currentStep')
    const currentStepEntry = inject('currentStepEntry')
    const totalSteps = inject('totalSteps')

    return {
      advanceStep,
      currentStep,
      currentStepEntry,
      totalSteps,
      retreatStep,
    }
  },
}
</script>
