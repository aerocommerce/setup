<template>

	<aside class="relative xl:flex-grow pb-48 md:pb-72 xl:order-2 overflow-hidden">

		<div class="absolute top-3 right-3 md:top-6 md:right-6 z-20">
			<language-selector />
		</div>
		
		<!-- <div class="hidden xl:block fixed top-1/2 max-h-illustration h-full w-auto transition-transform duration-1000" :style="{ transform: 'translateX(calc((-35vh * ' + (currentStep < 8 ? currentStep : (currentStep+1)) + ') ' + (currentStep < 8 ? '+ 6.472rem' : '') + ')) translateY(-50%)' }"> -->
		
		<div class="hidden illustration:block fixed top-1/2 ml-12 max-h-illustration h-full w-auto transition-transform duration-1000 delay-150" :style="{ transform: 'translateX(calc(-33vh *' + (currentStep < 8 ? currentStep : (currentStep+1.75)) + ')) translateY(-50%)' }">
			<Illustration />
		</div>

		<div class="hidden xl:block illustration:hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-full max-w-48 opacity-70">
			<Logo />
		</div>

		<div class="absolute top-6 left-6 md:top-12 md:left-12">
			<p class="text-xl md:text-3xl uppercase font-medium mb-2" style="line-height: 0.7;">{{ setupData.projectName }}</p>
			<span class="text-sm md:text-base text-alphaLight-900">demo-store.test</span>
		</div>

		<div class="absolute bottom-6 left-6 md:bottom-12 md:left-12 md:flex md:flex-wrap md:items-center md:justify-between xl:inline xl:left-auto xl:right-12 w-full pr-12 md:pr-24 xl:pr-0 xl:w-auto">

			<div v-if="currentStep >= 1" class="flex items-center xl:justify-end space-x-2 mb-3 md:mb-0 xl:mb-9 mr-3">
				<p class="text-lg md:text-2xl">Hi, Steven!</p>
				<span class="text-xl md:text-4xl" :class="{ 'animation-wave' : currentStep >= 1 }">👋</span>
			</div>

			<ol class="flex space-x-3 items-center text-alpha">
				<li v-for="(step, stepIndex) in steps">
					<component :is="step.icon" class="h-6 w-6 transition-color duration-300"
							:class="[ currentStep > stepIndex ? 'text-green' : currentStep === stepIndex ? 'text-alpha-200' : 'text-alpha' ]" aria-hidden="true" />
				</li>
			</ol>
		</div>

	</aside>

	<main class="relative flex-grow p-6 md:p-12 xl:py-0 xl:px-12 bg-alpha-900 shadow z-10 w-full xl:min-h-full overflow-scroll xl:overflow-auto transition-all duration-300" :class="[currentStepEntry.size === 'small' ? 'xl:max-w-xl' : 'xl:max-w-[50vw]']">

		<component :is="currentStepEntry.component" />

	</main>

  <!-- <div class="relative flex flex-wrap bg-[#161721] h-full">
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
  </div> -->
</template>

<script>
import {ref, computed, provide} from 'vue'

import Illustration from './components/Elements/Illustration.vue'
import Logo from './components/Elements/Logo.vue'
import LanguageSelector from './components/Elements/LanguageSelector.vue'
import Steps from './steps'

const steps = Steps

const currentStep = ref(0)
const currentStepEntry = computed(() => steps[currentStep.value])
const totalSteps = steps.length

const setupData = ref({
	projectName: 'Demo store',
})

export default {

	components: {
		Illustration,
		Logo,
		LanguageSelector
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
		provide('setupData', setupData)

		return {
			setupData,
			steps,
			currentStep,
			currentStepEntry,
		}
	},
}
</script>
