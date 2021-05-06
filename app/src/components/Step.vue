<template>

	<form action="" class="xl:absolute flex flex-col h-full overflow-scroll xl:pr-12 xl:py-12">

		<div class="flex justify-between">

			<div>
				<div class="w-32 mb-3">
					<Logo />
				</div>

				<h1 class="text-xl font-normal m-0 tracking-tight"><slot name="title"/></h1>
			</div>

			<div class="flex flex-col flex-wrap">

				<div class="self-end w-7 h-7 mb-3">
					<component :is="currentStepEntry.icon" />
				</div>

				<p class="text-sm mb-0 mx-0 mt-auto text-alphaLight-700">Step {{ currentStep + 1 }} of {{ totalSteps }}</p>

			</div>

		</div>

		<hr class="my-6">

		<p class="text-alphaLight-800 mb-12"><slot name="description" /></p>

        <div class="mb-12">
			<slot />
		</div>

		<div class="mt-auto">
			<div class="flex items-center justify-end mb-9">
				<QuestionMarkCircleIcon class="w-4 h-4 mr-2 text-bravo" />
				<a href="#" target="_blank" rel="noopener noreferrer">I need help with this</a>
			</div>
			
			<div class="flex justify-between items-center">
				<slot name="footer" v-bind="{ advanceStep, retreatStep }" />
			</div>
		</div>

	</form>

</template>

<script>
import { inject } from 'vue'

import Logo from './Elements/Logo.vue'
import {QuestionMarkCircleIcon} from '@heroicons/vue/outline/esm'

export default {
	components: {
		Logo,
		QuestionMarkCircleIcon,
	},

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
