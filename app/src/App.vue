<template>
  <div class="relative flex flex-wrap bg-[#161721] h-full">
    <main class="relative z-10 transition-all duration-300 h-full flex flex-col" :class="[currentStepEntry.size === 'small' ? 'w-2/5' : 'w-1/2']">
      <component :is="currentStepEntry.component" />
    </main>
    <div class="relative transition-all duration-300" :class="[currentStepEntry.size === 'small' ? 'w-3/5' : 'w-1/2']">
      <div class="hidden xl:block fixed top-1/2 max-h-[50vh] h-full w-auto transition-transform duration-1000" :style="{ transform: 'translateX(calc(calc(-35vh * ' + currentStep +') + 6.472rem)) translateY(-50%)' }">
        <Illustration />
      </div>
      <div class="absolute bottom-0 inset-x-0 flex p-10 justify-end">
        <div v-for="(step, stepIndex) in steps" class="px-2">
          <component  :is="step.icon" class="h-6 w-6"
                      :class="[ currentStep > stepIndex ? 'text-green-400' : currentStep === stepIndex ? 'text-white' : 'text-gray-400' ]" aria-hidden="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, computed, provide} from 'vue'

import Illustration from './components/Elements/Illustration.vue'
import Steps from './steps'

const steps = Steps

const currentStep = ref(0)
const currentStepEntry = computed(() => steps[currentStep.value])
const totalSteps = steps.length

export default {
  components: {
    Illustration,
  },
  setup() {
    provide('advanceStep', () => {
      currentStep.value++
    })

    provide('retreatStep', () => {
      currentStep.value--
    })

    provide('currentStep', currentStep)
    provide('currentStepEntry', currentStepEntry)
    provide('totalSteps', totalSteps)

    return {
      steps,
      currentStep,
      currentStepEntry,
    }
  },
}
</script>
