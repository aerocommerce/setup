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

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Project</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
						<dd class="break-all">{{ setupData.projectName }}</dd>
					</div>

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Database server</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
						<dd class="break-all">127.0.0.1:3306</dd>
					</div>

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Database name</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
						<dd class="break-all">demo-store</dd>
					</div>

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Elasticsearch server</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
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

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Name</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
						<dd class="break-all">Demo Store</dd>
					</div>

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Industry</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
						<dd class="break-all">Industry</dd>
					</div>

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Store country</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
						<dd class="break-all">United Kingdom</dd>
					</div>

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Default currency</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
						<dd class="break-all">British Pounds (GBP)</dd>
					</div>

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Language</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
						<dd class="break-all">English</dd>
					</div>

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Sender email address</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
						<dd class="break-all">info@demo-store.test</dd>
					</div>

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Logo uploaded</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
						<dd class="break-all">demo-store-logo.svg</dd>
					</div>

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Address line 1</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
						<dd class="break-all">Commerce house</dd>
					</div>

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Address line 2</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
						<dd class="break-all">1 Exchange Square</dd>
					</div>

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>City</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
						<dd class="break-all">Middlesbrough</dd>
					</div>

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Postal code</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
						<dd class="break-all">TS1 1DE</dd>
					</div>

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Telephone number</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
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

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Catalog</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
						<dd class="break-all">Database has catalog data</dd>
					</div>

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Theme</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
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

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Email address</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
						<dd class="break-all">steven@aerocommerce.com</dd>
					</div>

					<div class="group cursor-pointer">
						<dt class="text-alphaLight-900 text-sm flex items-center relative">
							<span>Password</span>
							<span class="absolute top-0 right-0 hidden group-hover:block ml-1">
								<PencilIcon class="w-3 h-3" />
							</span>
						</dt>
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
	import { PencilIcon } from '@heroicons/vue/outline/esm'

	export default {
		components: {
			BackButton,
			NextButton,
			SingleAccordion,
			Step,
			PencilIcon
		},
		setup() {
			const setupData = inject('setupData')
			
			return {
				setupData,
			}
		},
	}
</script>
