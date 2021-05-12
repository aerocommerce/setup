<template>

	<aside class="relative xl:flex-grow pb-48 md:pb-64 xl:order-2 overflow-hidden">

		<div v-if="!stepsComplete" class="absolute z-20 top-3 right-3 md:top-6 md:right-6">
			<LanguageSelector />
		</div>

		<div class="hidden illustration:block fixed top-1/2 ml-12 max-h-illustration h-full w-auto transition-transform duration-1000 delay-150" :style="{ transform: 'translateX(calc(-33vh *' + (currentStep < 7 ? currentStep : (currentStep+1.75)) + ')) translateY(-50%)' }">
      <Illustration :step="currentStep" />
		</div>

		<div class="hidden xl:block illustration:hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-full max-w-48 opacity-70">
			<Logo />
		</div>

		<div class="absolute z-20 top-6 left-6 md:top-12 md:left-12">
			<p class="text-xl md:text-3xl uppercase font-medium mb-2" style="line-height: 0.7;" v-show="setupData.project.name.length">{{ setupData.project.name }}&nbsp;</p>
			<span class="text-sm md:text-base text-alphaLight-900">{{ storeDomain }}</span>
		</div>

		<div class="absolute z-20 bottom-6 left-6 md:bottom-12 md:left-12 md:flex md:flex-wrap md:items-center md:justify-between xl:inline xl:left-auto xl:right-12 w-full pr-12 md:pr-24 xl:pr-0 xl:w-auto">

			<div v-if="setupData.agora && !stepsComplete" class="flex items-center xl:justify-end space-x-2 mb-3 md:mb-0 xl:mb-9">
				<p class="text-lg md:text-2xl text-alpha-100">Hi, {{ setupData.agora.user.name }}!</p>
				<span class="text-xl md:text-4xl animation-wave">👋</span>
			</div>

			<ol class="flex space-x-3 items-center text-alpha">
				<li v-for="(step, stepIndex) in steps">
          <button @click.prevent="!stepsComplete && currentStep > stepIndex ? jumpToStep(stepIndex) : null" :disabled="stepsComplete || currentStep <= stepIndex">
            <component :is="step.icon" class="h-6 w-6 transition-color duration-300"
                       :class="[ currentStep > stepIndex ? 'text-green' : currentStep === stepIndex ? 'text-alpha-100' : 'text-alpha' ]" aria-hidden="true" />
          </button>
				</li>
			</ol>
		</div>

		<!-- Theme overlay -->
    <transition name="fade">
      <component v-if="currentStepEntry.hasOwnProperty('subComponent')" :is="currentStepEntry.subComponent" />
    </transition>

	</aside>

	<transition name="fade">
    <main v-if="!stepsComplete" class="relative flex-grow bg-alpha-900 shadow z-10 w-full xl:min-h-full overflow-auto transition-all duration-300" :class="[ currentStepEntry.size === 'small' ? 'xl:max-w-xl 2xl:max-w-2xl' : 'xl:max-w-screen-1/2' ]">
      <div class="xl:relative md:px-6 xl:py-0 h-full">
        <component :is="currentStepEntry.component" />
      </div>
    </main>
    <main v-else>
      <InstallProgress />
    </main>
  </transition>

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

const currentStep = ref(0)
const setupComplete = ref(false)
const stepsComplete = ref(false)
const currentStepEntry = computed(() => steps[currentStep.value])
const totalSteps = steps.length

let baseData = {
  agora: null,
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
		}
	},
}
</script>
