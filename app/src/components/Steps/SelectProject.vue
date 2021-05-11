<template>
	<Step>

		<template #title>
			Project
		</template>

		<template #description>
			Projects are used to manage your stores Aero credentials.
			You can create a new project if you're starting local development or you can choose an existing project if you're continuing development or setting up on a live server.
		</template>

		<div class="mb-9">

			<ContentGroup id="new-project" :selected="true" group="project">

				<template #title>
					Create new project
				</template>

				<!-- <ErrorMessage>A project using this name already exists, please choose a different name or select an existing project</ErrorMessage> -->

				<label for="project-name" class="mb-1">Project name</label>
				<input type="text" id="project-name" name="project-name" placeholder="Enter project name" autofocus v-model="setupData.projectName">

			</ContentGroup>

		</div>

		<div>

			<ContentGroup id="existing-project" :selected="false" group="project">

				<template #title>
					Select existing project
				</template>

				<label for="exisiting-project" class="mb-1">Select project</label>
				<select id="exisiting-project" name="exisiting-project">
					<option value="" selected>Create a new project</option>
					<option value="demo-store">Demo store</option>
					<option value="music-store">Music store</option>
					<option value="techquity">Techquity</option>
				</select>

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
	import Step from '../Step.vue'

	export default {
		components: {
			BackButton,
			NextButton,
			Step,
			ContentGroup,
			ErrorMessage
		},

		setup() {
			const setupData = inject('setupData')
			
			return {
				setupData,
			}
		},
	}
</script>
