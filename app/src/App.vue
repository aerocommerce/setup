<template>

	<aside class="relative xl:flex-grow pb-48 md:pb-72 xl:order-2 overflow-hidden">

		<div class="absolute z-20 top-3 right-3 md:top-6 md:right-6">
			<LanguageSelector />
		</div>

		<div class="hidden illustration:block fixed top-1/2 ml-12 max-h-illustration h-full w-auto transition-transform duration-1000 delay-150" :style="{ transform: 'translateX(calc(-33vh *' + (currentStep < 8 ? currentStep : (currentStep+1.75)) + ')) translateY(-50%)' }">
			<Illustration :step="currentStep" />
		</div>

		<div class="hidden xl:block illustration:hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-full max-w-48 opacity-70">
			<Logo />
		</div>

		<div class="absolute z-20 top-6 left-6 md:top-12 md:left-12">
			<p class="text-xl md:text-3xl uppercase font-medium mb-2" style="line-height: 0.7;">{{ setupData.projectName }}&nbsp;</p>
			<span class="text-sm md:text-base text-alphaLight-900">demo-store.test</span>
		</div>

		<div class="absolute z-20 bottom-6 left-6 md:bottom-12 md:left-12 md:flex md:flex-wrap md:items-center md:justify-between xl:inline xl:left-auto xl:right-12 w-full pr-12 md:pr-24 xl:pr-0 xl:w-auto">

			<div v-if="currentStep >= 1" class="flex items-center xl:justify-end space-x-2 mb-3 md:mb-0 xl:mb-9">
				<p class="text-lg md:text-2xl text-alpha-100">Hi, Steven!</p>
				<span class="text-xl md:text-4xl" :class="{ 'animation-wave' : currentStep >= 1 }">👋</span>
			</div>

			<ol class="flex space-x-3 items-center text-alpha">
				<li v-for="(step, stepIndex) in steps">
					<component :is="step.icon" class="h-6 w-6 transition-color duration-300"
							:class="[ currentStep > stepIndex ? 'text-green' : currentStep === stepIndex ? 'text-alpha-100' : 'text-alpha' ]" aria-hidden="true" />
				</li>
			</ol>
		</div>

		<!-- Theme overlay -->
		<div class="hidden xl:block absolute z-10 top-0 left-0 w-full h-full bg-alpha-900 transition-opacity duration-300 delay-150" :class="[ currentStep === 7 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none' ]"> 

			<svg class="absolute z-10 top-0 left-0 w-full h-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1008" height="318" viewBox="0 0 1008 318">
				<defs>
					<linearGradient id="linear-gradient" x1="0.5" y1="1" x2="0.5" gradientUnits="objectBoundingBox">
						<stop offset="0" stop-color="#181926" stop-opacity="0"/>
						<stop offset="0.507" stop-color="#181926" stop-opacity="0.78"/>
						<stop offset="1" stop-color="#181926"/>
					</linearGradient>
				</defs>
				<path id="Path_1083" data-name="Path 1083" d="M0,0H1008V318H0Z" fill="url(#linear-gradient)"/>
			</svg>

			<svg  class="absolute z-30 bottom-0 left-0 w-full h-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1008" height="312" viewBox="0 0 1008 312">
				<defs>
					<linearGradient id="linear-gradient-2" x1="0.5" y1="1" x2="0.5" gradientUnits="objectBoundingBox">
						<stop offset="0" stop-color="#181926" stop-opacity="0"/>
						<stop offset="0.507" stop-color="#181926" stop-opacity="0.78"/>
						<stop offset="1" stop-color="#181926"/>
					</linearGradient>
				</defs>
				<path id="Path_1084" data-name="Path 1084" d="M0,0H1008V312H0Z" transform="translate(1008 312) rotate(180)" fill="url(#linear-gradient-2)"/>
			</svg>

			<!-- <svg class="absolute z-40 bottom-24 w-full h-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1008" height="192" viewBox="0 0 1008 192">
				<defs>
					<linearGradient id="linear-gradient-3" x1="0.5" y1="1" x2="0.5" gradientUnits="objectBoundingBox">
						<stop offset="0" stop-color="#181926" stop-opacity="0"/>
						<stop offset="0.507" stop-color="#181926" stop-opacity="0.78"/>
						<stop offset="1" stop-color="#181926"/>
					</linearGradient>
				</defs>
				<path id="Path_1617" data-name="Path 1617" d="M0,0H1008V192H0Z" transform="translate(1008 192) rotate(180)" fill="url(#linear-gradient-3)"/>
			</svg> -->

			<div class="relative mt-36 px-12 flex flex-col h-full overflow-scroll z-20">
				<div class="mb-96">
					
					<h2 class="text-4xl font-medium text-white mb-1">Blank theme</h2>
					<p class="text-alphaLight-800">Aero Commerce</p>

					<hr class="my-6">

					<div class="flex flex-wrap">

						<div class="mr-12 mb-6">
							<p class="text-xs text-alphaLight-800">CSS framework</p>
							<p class="text-white">–</p>
						</div>
						
						<div class="mr-12 mb-6">
							<p class="text-xs text-alphaLight-800">JS framework</p>
							<p class="text-white">–</p>
						</div>

					</div>

					<p class="text-alphaLight-800 mb-12">The blank theme will create all of the required files and output basic HTML elements but with no styling. This is a good place to start if you want to create your own theme.</p>

					<img src="/src/images/theme-blade-thumb.png" alt="">

				</div>
			</div>

		</div>

	</aside>

	<main v-if="!setupData.setupComplete" class="relative flex-grow bg-alpha-900 shadow z-10 w-full xl:min-h-full overflow-scroll xl:overflow-auto transition-all duration-300" :class="[ currentStepEntry.size === 'small' ? 'xl:max-w-xl' : 'xl:max-w-screen-1/2' ]">
		<div class="p-6 md:p-12 xl:py-0 xl:px-12 ">
			<component :is="currentStepEntry.component" />
		</div>
	</main>

</template>

<script>
import {ref, computed, provide} from 'vue'

import Illustration from './components/Elements/Illustration.vue'
import Logo from './components/Elements/Logo.vue'
import LanguageSelector from './components/Elements/LanguageSelector.vue'
import Steps from './steps'

const steps = Steps

const currentStep = ref(8)
const currentStepEntry = computed(() => steps[currentStep.value])
const totalSteps = steps.length

const setupData = ref({
	projectName: '',
	testingDb: false,
	setupComplete: false
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

		provide('completeSetup', () => {
			console.log('complete');
			// this.setupData.setupComplete = true;
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
