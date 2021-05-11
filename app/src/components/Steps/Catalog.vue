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
					Import clothing retail sample
				</template>

				<WarningMessage>Importing sample data will override any catalog data that already exists</WarningMessage>
				
			</ContentGroup>
		</div>

		<div class="mb-9">
			<ContentGroup id="music" :selected="false" group="catalog">

				<template #title>
					Import music retail sample
				</template>

				<WarningMessage>Importing sample data will override any catalog data that already exists</WarningMessage>
				
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

	export default {
		components: {
			BackButton,
			NextButton,
			Step,
			SuccessMessage,
			WarningMessage,
			ContentGroup
		},
	}
</script>
