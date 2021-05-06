<template>
	<Step>
		
		<template #title>
			Database server
		</template>

		<template #description>
			The database is used to store your products and everything else to do with your store, you can choose to connect to a local or remote database depending on your setup.
		</template>

		<div>
			This is the code!
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

export default {
	components: {
		BackButton,
		NextButton,
		Step,
	},
}
</script>
