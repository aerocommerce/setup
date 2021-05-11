<template>
	<Step>

		<template #title>
			Elasticsearch connection
		</template>

		<template #description>
			Elasticsearch is used to index your products, pages and other content in order for the data to be easily searchable, sortable and filterable. You can choose to connect to a local or remote database depending on your setup.
		</template>

		<div class="mb-9">

			<ContentGroup id="local-es" :selected="true" group="es-server">

				<template #title>
					Local Elasticsearch setup
				</template>

				<!-- <ErrorMessage>Connection failed please try again</ErrorMessage> -->

				<div class="mb-6 flex items-center">

					<div class="w-full">
						<label for="local-es-host-name" class="mb-1">Host name</label>
						<input type="text" id="local-es-host-name" name="local-es-host-name" placeholder="Enter host name" autofocus value="127.0.0.1">
					</div>

					<div class="px-6">
						<label class="mb-1">&nbsp;</label>
						<p>:</p>
					</div>

					<div class="">
						<label for="local-es-port-number" class="mb-1">Port number</label>
						<input type="text" id="local-es-port-number" name="local-es-port-number" placeholder="Enter port no" autofocus value="3306">
					</div>

				</div>

				<div class="mb-6">
					<SingleAccordion>

						<template #title>
							<span class="text-sm uppercase underline">Advanced settings</span>
						</template>

						<div>
							<label for="local-es-store-id" class="mb-1">Store identifier</label>
							<input type="text" id="local-es-store-id" name="local-es-store-id" placeholder="Enter store identifier" value="demo-store-erAY">
						</div>

					</SingleAccordion>
				</div>

				<button class="button button-secondary" type="button" @click="setupData.testingDb = !setupData.testingDb">
					<RefreshIcon class="mr-2 transition-transform duration-300 rotate-0" :class="{ 'animation-rotate': setupData.testingDb }" />
					Test connection
				</button>
				
			</ContentGroup>

		</div>

		<div>

			<ContentGroup id="remote-es" :selected="false" group="es-server">

				<template #title>
					Remote database setup
				</template>

				<!-- <ErrorMessage>Connection failed please try again</ErrorMessage> -->

				<div class="mb-6 flex items-center">

					<div class="w-full">
						<label for="remote-es-host-name" class="mb-1">Host name</label>
						<input type="text" id="remote-es-host-name" name="remote-es-host-name" placeholder="Enter host name" autofocus value="">
					</div>

					<div class="px-6">
						<label class="mb-1">&nbsp;</label>
						<p>:</p>
					</div>

					<div class="">
						<label for="remote-es-port-number" class="mb-1">Port number</label>
						<input type="text" id="remote-es-port-number" name="remote-es-port-number" placeholder="Enter port no" autofocus value="">
					</div>

				</div>

				<div class="mb-6">
					<SingleAccordion>

						<template #title>
							<span class="text-sm uppercase underline">Advanced settings</span>
						</template>

						<div>
							<label for="remote-es-store-id" class="mb-1">Store identifier</label>
							<input type="text" id="remote-es-store-id" name="remote-es-store-id" placeholder="Enter store identifier" value="demo-store-erAY">
						</div>

					</SingleAccordion>
				</div>

				<button class="button button-secondary" type="button" @click="setupData.testingDb = !setupData.testingDb">
					<RefreshIcon class="mr-2 transition-transform duration-300 rotate-0" :class="{ 'animation-rotate': setupData.testingDb }" />
					Test connection
				</button>

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
	import { RefreshIcon } from '@heroicons/vue/outline'

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
