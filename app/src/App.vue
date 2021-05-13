<template>

	<div class="bg-alpha-1100 min-h-screen text-white flex flex-col xl:flex-row h-screen overflow-hidden xl:overflow-auto xl:h-auto">

		<aside class="relative xl:flex-grow pb-48 md:pb-64 xl:order-2 overflow-hidden">

			<transition name="fade">
				<div v-if="!stepsComplete" class="absolute z-20 top-3 right-3 md:top-6 md:right-6">
					<LanguageSelector />
				</div>
			</transition>

			<transition name="fade">
				<div v-if="!stepsComplete" class="hidden illustration:block fixed top-1/2 ml-12 max-h-illustration h-full w-auto transition-transform duration-1000 delay-150" :style="{ transform: 'translateX(calc(-33vh *' + (currentStep < 7 ? currentStep : (currentStep+1.75)) + ')) translateY(-50%)' }">
					<Illustration :step="currentStep" />
				</div>
			</transition>

			<div v-if="!stepsComplete" class="hidden xl:block illustration:hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-full max-w-48 opacity-70">
				<Logo />
			</div>

			<transition name="fade">
				<div v-if="!stepsComplete">
					<div class="absolute z-20 top-6 left-6 md:top-12 md:left-12">
						<p class="text-xl md:text-3xl uppercase font-medium mb-2" v-show="setupData.project.name.length">{{ setupData.project.name }}&nbsp;</p>
						<span class="text-sm md:text-base text-alphaLight-900">{{ storeDomain }}</span>
					</div>

					<div class="absolute z-20 bottom-6 left-6 md:bottom-12 md:left-12 md:flex md:flex-wrap md:items-center md:justify-between xl:inline xl:left-auto xl:right-12 w-full pr-12 md:pr-24 xl:pr-0 xl:pl-24">

						<div v-if="setupData.agora" class="flex items-center xl:justify-end space-x-2 mb-3 md:mb-0 xl:mb-9">
							<p class="text-lg md:text-2xl text-alpha-100">Hi, {{ setupData.agora.user.name }}!</p>
							<span class="text-xl md:text-4xl animation-wave">👋</span>
						</div>

						<div class="flex justify-between items-center">

							<span class="w-3 h-3 block rounded-full animation-blink border-2 border-alphaLight-400 mr-12" :title="serviceWorker.statusText" :class="serviceWorker.status ? 'bg-green' : 'bg-red'"></span>

							<ol class="flex space-x-3 items-center text-alpha">
								<li v-for="(step, stepIndex) in steps" class="flex items-center">
									<button @click.prevent="!stepsComplete && currentStep > stepIndex ? jumpToStep(stepIndex) : null" :disabled="stepsComplete || currentStep <= stepIndex">
										<component :is="step.icon" class="h-6 w-6 transition-color duration-300"
												:class="[ (currentStep > stepIndex || stepsComplete) ? 'text-green' : currentStep === stepIndex ? 'text-alpha-100' : 'text-alpha' ]" aria-hidden="true" />
									</button>
								</li>
							</ol>

						</div>

					</div>
				</div>
			</transition>
			
			<!-- Theme overlay -->
			<transition name="delayFade">
				<component v-if="currentStepEntry.hasOwnProperty('subComponent')" :is="currentStepEntry.subComponent" />
			</transition>

		</aside>

		<transition name="slide">

			<main v-if="!stepsComplete" class="relative bg-alpha-900 shadow z-10 xl:min-h-full overflow-auto transition-all duration-300" :class="[ currentStepEntry.size === 'small' ? 'w-full xl:max-w-xl 2xl:max-w-2xl' : 'w-full xl:w-screen-1/2 2xl:max-w-[75rem]' ]">
				<div class="xl:relative md:px-6 xl:py-0 h-full">
					<component :is="currentStepEntry.component" />
				</div>
			</main>

		</transition>

		<transition name="slowFade">

			<main v-if="stepsComplete" class="fixed z-40 w-full h-full top-0 left-0 flex flex-col items-center justify-center">
				<InstallProgress />
			</main>

		</transition>

	</div>

</template>

<script>
import {ref, computed, provide, reactive, watch} from 'vue'

import Illustration from './components/Elements/Illustration.vue'
import Logo from './components/Elements/Logo.vue'
import LanguageSelector from './components/Elements/LanguageSelector.vue'
import InstallProgress from './components/InstallProgress.vue'
import Steps from './steps'
import baseProject from './project'

const steps = Steps

const currentStep = ref(9)
const setupComplete = ref(false)
const stepsComplete = ref(false)
const currentStepEntry = computed(() => steps[currentStep.value])
const totalSteps = steps.length

let serviceWorker = {
	status: true,
	statusText: 'Service worker connected'
}

let baseData = {
  agora: { 
	user: {
		  'name': 'Steven',
		  'email': 'steven@aerocommerce.com'
  	} 
  },
  project: baseProject,
}

const setupData = reactive({
  ...JSON.parse(JSON.stringify(baseData)),
  reset() {
    let data = JSON.parse(JSON.stringify(baseData))
    this.agora = data.agora
    this.project = data.project
  },
})

export default {
	components: {
		Illustration,
    InstallProgress,
		Logo,
		LanguageSelector,
	},
	setup() {

		provide('advanceStep', () => {
      if (currentStep.value + 1 === totalSteps) {
        stepsComplete.value = true
      } else {
        currentStep.value++
      }
		})

		provide('retreatStep', () => {
			currentStep.value--
		})

    const jumpToStep = (step) => {
      currentStep.value = step
    }

    provide('jumpToStep', jumpToStep)

		provide('currentStep', currentStep)
		provide('currentStepEntry', currentStepEntry)
		provide('totalSteps', totalSteps)
		provide('setupData', setupData)

    const storeDomain = document.location.hostname

		return {
      jumpToStep,
			setupData,
			steps,
      storeDomain,
      stepsComplete,
      setupComplete,
			currentStep,
			currentStepEntry,
			serviceWorker
		}
	},
}
</script>
