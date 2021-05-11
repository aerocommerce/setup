<template>
	<Step>

		<template #title>
			Review setup
		</template>

		<template #description>
			Review your setup, by clicking the save and start setup button you will not be able to make any changes and your store will be installed.
		</template>

		<div class="mb-9">
			<SingleAccordion :defaultOpen="true">
				
				<template #title>
					<span class="text-xl py-3">Project information</span>
				</template>
				
				<dl class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-6">

					<div>
						<dt class="text-alphaLight-900 text-sm">Project</dt>
						<dd class="break-all">{{ setupData.projectName }}</dd>
					</div>

					<div>
						<dt class="text-alphaLight-900 text-sm">Database server</dt>
						<dd class="break-all">127.0.0.1:3306</dd>
					</div>

					<div>
						<dt class="text-alphaLight-900 text-sm">Database name</dt>
						<dd class="break-all">demo-store</dd>
					</div>

					<div>
						<dt class="text-alphaLight-900 text-sm">Elasticsearch server</dt>
						<dd class="break-all">127.0.0.1:9200</dd>
					</div>

				</dl>
			
			</SingleAccordion>
		</div>

		<div class="mb-9">
			<SingleAccordion :defaultOpen="true">
				
				<template #title>
					<span class="text-xl py-3">Store information</span>
				</template>
				
				<dl class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-6">

					<div>
						<dt class="text-alphaLight-900 text-sm">Name</dt>
						<dd class="break-all">Demo Store</dd>
					</div>

					<div>
						<dt class="text-alphaLight-900 text-sm">Industry</dt>
						<dd class="break-all">–</dd>
					</div>

					<div>
						<dt class="text-alphaLight-900 text-sm">Store country</dt>
						<dd class="break-all">United Kingdom</dd>
					</div>

					<div>
						<dt class="text-alphaLight-900 text-sm">Default currency</dt>
						<dd class="break-all">Bitish Pounds (GBP)</dd>
					</div>

					<div>
						<dt class="text-alphaLight-900 text-sm">Language</dt>
						<dd class="break-all">English</dd>
					</div>

					<div>
						<dt class="text-alphaLight-900 text-sm">Sender email address</dt>
						<dd class="break-all">info@demo-store.test</dd>
					</div>

					<div>
						<dt class="text-alphaLight-900 text-sm">Logo uploaded</dt>
						<dd class="break-all">demo-store-logo.svg</dd>
					</div>

					<div>
						<dt class="text-alphaLight-900 text-sm">Address line 1</dt>
						<dd class="break-all">Commerce House</dd>
					</div>

					<div>
						<dt class="text-alphaLight-900 text-sm">Address line 2</dt>
						<dd class="break-all">1 Exchange Square</dd>
					</div>

					<div>
						<dt class="text-alphaLight-900 text-sm">City</dt>
						<dd class="break-all">Middlesbrough</dd>
					</div>

					<div>
						<dt class="text-alphaLight-900 text-sm">Postal code</dt>
						<dd class="break-all">TS1 1DE</dd>
					</div>

					<div>
						<dt class="text-alphaLight-900 text-sm">Telephone number</dt>
						<dd class="break-all">–</dd>
					</div>

				</dl>
			
			</SingleAccordion>
		</div>

		<div class="mb-9">
			<SingleAccordion :defaultOpen="true">
				
				<template #title>
					<span class="text-xl py-3">Catalog & theme</span>
				</template>
				
				<dl class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-6">

					<div>
						<dt class="text-alphaLight-900 text-sm">Catalog</dt>
						<dd class="break-all">DB has catalog data</dd>
					</div>

					<div>
						<dt class="text-alphaLight-900 text-sm">Theme</dt>
						<dd class="break-all">Metal</dd>
					</div>

				</dl>
			
			</SingleAccordion>
		</div>

		<div>
			<SingleAccordion :defaultOpen="true">
				
				<template #title>
					<span class="text-xl py-3">Admin account</span>
				</template>
				
				<dl class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-6">

					<div>
						<dt class="text-alphaLight-900 text-sm">Email address</dt>
						<dd class="break-all">steven@aerocommerce.com</dd>
					</div>

					<div>
						<dt class="text-alphaLight-900 text-sm">Password</dt>
						<dd class="break-all">*********************</dd>
					</div>

				</dl>
			
			</SingleAccordion>
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
	import SingleAccordion from '../Elements/SingleAccordion.vue'
	import Step from '../Step.vue'

	export default {
		components: {
			BackButton,
			NextButton,
			SingleAccordion,
			Step,
		},
		setup() {
			const setupData = inject('setupData')
			
			return {
				setupData,
			}
		},
	}
</script>
