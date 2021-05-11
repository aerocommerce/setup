<template>
	<Step>

		<template #title>
			Catalog setup
		</template>

		<template #description>
			Now we’ll set up your catalog. The catalogue includes products, categories, tags and other parts of your store’s information. You can choose to import sample products or skip this step if you already have catalog data or wish to add it later.
		</template>
		
		<div class="mb-9">
			<SuccessMessage>The database you have selected already has catalog data</SuccessMessage>
		</div>

		<div class="mb-9">
			<ContentGroup id="retail" :selected="false" group="catalog">

				<template #title>
					Import sample data
				</template>
				
				<div class="mb-6">
					<WarningMessage>Importing sample data will override any catalog data that already exists</WarningMessage>
				</div>
				
				<div class="mb-6">
					<label for="select-sample" class="mb-1">Select sample</label>
					<select id="select-sample" name="select-sample">
						<option value="" selected disabled>Please select</option>
						<option value="clothing-store">Clothing store</option>
						<option value="music-store">Music store</option>
					</select>
				</div>

				<p class="mb-1 text-sm text-alphaLight-800">Sample preview;</p>

				<div class="grid grid-cols-4 gap-6">
					
					<div class="relative pb-full bg-alpha-300">
						<PhotographIcon class="text-alphaLight-200 w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
					</div>
					<div class="relative pb-full bg-alpha-300">
						<PhotographIcon class="text-alphaLight-200 w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />						
					</div>
					<div class="relative pb-full bg-alpha-300">
						<PhotographIcon class="text-alphaLight-200 w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
					</div>
					<div class="relative pb-full bg-alpha-300">
						<PhotographIcon class="text-alphaLight-200 w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
					</div>

				</div>

			</ContentGroup>
		</div>

		<div>
			<ContentGroup id="skip-catalog" :selected="true" group="catalog">

				<template #title>
					Skip this step and continue
				</template>
				
			</ContentGroup>
		</div>
		
		<template #footer="{ advanceStep, retreatStep }">
			<BackButton :action="retreatStep" />
			<NextButton :action="advanceStep" />
		</template>

	</Step>
</template>

<script>
	import BackButton from '../Elements/BackButton.vue'
	import NextButton from '../Elements/NextButton.vue'
	import Step from '../Step.vue'
	import SuccessMessage from '../Elements/SuccessMessage.vue'
	import WarningMessage from '../Elements/WarningMessage.vue'
	import ContentGroup from '../Elements/ContentGroup.vue'
	import { PhotographIcon } from '@heroicons/vue/outline'

	export default {
		components: {
			BackButton,
			NextButton,
			Step,
			SuccessMessage,
			WarningMessage,
			ContentGroup,
			PhotographIcon
		},
	}
</script>
