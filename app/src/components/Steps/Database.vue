<template>
	<Step>

		<template #title>
			Database
		</template>

		<template #description>
			Create or select the database you want to use for this store. We will create the tables needed if they don't already exist and scan for an exisiting catalog, theme and user account.
		</template>

		<div class="mb-9">

			<ContentGroup id="new-db" :selected="true" group="database">

				<template #title>
					Create new database
				</template>

				<div class="mb-6">
					<label for="database-name" class="mb-1">Database name</label>
					<input type="text" id="database-name" name="database-name" placeholder="Enter database name" value="demo-store">
				</div>
				
			</ContentGroup>

		</div>

		<div>

			<ContentGroup id="existing-db" :selected="false" group="database">

				<template #title>
					Select existing database
				</template>

				<!-- <ErrorMessage>The database you’re trying to create already exists, we have selected it for you below, alternatively you can choose a different name and create a new database</ErrorMessage> -->

				<div class="mb-6">
					<select id="exisiting-project" name="exisiting-project">
						<option value="" selected>Create a new database</option>
						<option value="demo-store">demo-store</option>
						<option value="music-store">music-store</option>
						<option value="techquity">techquity</option>
					</select>
				</div>
				
			</ContentGroup>

		</div>

		<template #footer="{ advanceStep, retreatStep }">
			<BackButton :action="retreatStep" />
			<NextButton :action="advanceStep" />
		</template>

	</Step>
</template>

<script>
	import { inject } from 'vue'
	import BackButton from '../Elements/BackButton.vue'
	import NextButton from '../Elements/NextButton.vue'
	import ContentGroup from '../Elements/ContentGroup.vue'
	import ErrorMessage from '../Elements/ErrorMessage.vue'
	import SingleAccordion from '../Elements/SingleAccordion.vue'
	import Step from '../Step.vue'
	import { RefreshIcon } from '@heroicons/vue/outline/esm'

	export default {
		components: {
			BackButton,
			NextButton,
			Step,
			ContentGroup,
			ErrorMessage,
			SingleAccordion,
			RefreshIcon
		},

		setup() {
			const setupData = inject('setupData')
			
			return {
				testing: false,
				setupData,
			}
		},
	}
</script>
