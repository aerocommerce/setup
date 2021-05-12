<template>
	<Step>

		<template #title>
			Store information
		</template>

		<template #description>
			Now we'll take some information about the store you're creating.
      We'll use this information to populate your theme and email content.
      This information can be easily updated later from the store settings page in the admin.
		</template>

		<div class="grid md:grid-cols-2 gap-6 mb-6">

			<div>
				<label for="store-name" class="mb-1">Store name</label>
				<input type="text" id="store-name" name="store-name" placeholder="Enter store name" :value="setupData.project.storeName" required>
			</div>

			<div class="hidden md:block">&nbsp;</div>

			<div>
				<label for="industry" class="mb-1">Industry <small>(optional)</small></label>
				<select id="industry" name="industry">
					<option value="" selected>Select industry</option>
					<option value="fashion">Fashion and Apparel</option>
					<option value="beauty">Beauty and Personal Care</option>
					<option value="entertainment">Entertainment</option>
					<option value="household">Household goods</option>
					<option value="electronics">Electronics</option>
				</select>
			</div>

			<div>
				<label for="country" class="mb-1">Store country</label>
				<select id="country" name="country" required>
					<option value="">Select country</option>
					<option value="UK" selected>United Kingdom</option>
					<option value="france">France</option>
					<option value="spain">Spain</option>
				</select>
			</div>

			<div>
				<label for="currency" class="mb-1">Default currency</label>
				<select id="currency" name="currency" required>
					<option value="">Select currency</option>
					<option value="gbp" selected>British Pounds (GBP)</option>
					<option value="euro">Euros (EUR)</option>
					<option value="spain">Spain</option>
				</select>
			</div>

			<div>
				<label for="language" class="mb-1">Default language</label>
				<select id="language" name="language" required>
					<option value="">Select language</option>
					<option value="english" selected>English</option>
					<option value="french">French</option>
					<option value="spanish">Spanish</option>
				</select>
			</div>

			<div>
				<label for="sender-email" class="mb-1">Sender email address <small>(optional)</small></label>
				<input type="text" id="sender-email" name="sender-email" placeholder="Enter email address" required>
				<small class="block text-alphaLight-800 mt-3">The email address entered here will be the address used to communicate with customers</small>
			</div>

			<div>
				<label for="tax-settings" class="mb-1">Tax settings</label>
				<select id="tax-settings" name="tax-settings" required>
					<option value="inc-tax" selected>All prices include tax</option>
					<option value="exc-tax">All prices exclude tax</option>
				</select>
				<small class="block text-alphaLight-800 mt-3">Advanced tex settings can be managed in the admin</small>
			</div>

		</div>

		<div class="mb-6">
			<label for="file" class="mb-1">Upload store logo <small>(optional)</small></label>
			<small class="block text-alphaLight-800 mb-3">The logo you upload here will be used to populate the theme and email templates. Please upload an SVG if possible (we will convert the SVG to a PNG for use in emails)</small>

			<label for="file" class="[ dashed-border ] text-sm text-alphaLight-800 rounded px-6 py-12 flex items-center justify-center mb-3 hover:text-bravo focus:text-bravo">

				<ul v-if="files.length">
					<li v-for="file in files" :key="file.id">
            <span>{{file.name}}</span> -
            <span>{{$formatSize(file.size)}}</span> -
            <span v-if="file.error">{{file.error}}</span>
            <span v-else-if="file.success">success</span>
            <span v-else-if="file.active">active</span>
            <span v-else></span>
					</li>
				</ul>

				<div v-else class="flex items-center">
					<UploadIcon class="w-5 h-5 mr-2" />
					Drag and drop or click here to select a file
				</div>

				<div v-show="$refs.upload && $refs.upload.dropActive" class="fixed z-50 top-0 left-0 w-full h-full bg-alphaLight-100 text-alpha-900 bg-opacity-80 flex flex-col items-center justify-center">
					<UploadIcon class="w-12 h-12 mb-6" />
					<h3 class="text-3xl  font-medium">Drop files to upload</h3>
				</div>
				
				<div class="hidden">
					<FileUpload post-action="/upload/logo" :multiple="false" :drop="true" :drop-directory="false" v-model="files" ref="upload" />
				</div>
				
			</label>

			<button type="button" class="button button-secondary" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
				<UploadIcon class="mr-2" />
				Start Upload
			</button>

			<button type="button" class="button button-secondary" v-else @click.prevent="$refs.upload.active = false">
				Stop Upload
			</button>
		</div>

		<div class="mb-6">
			<h2 class="text-xl font-medium mb-1">Store address <small>(optional)</small></h2>
			<small class="block text-alphaLight-800">The address entered here will be used to populate customer emails and the footer of your store</small>
		</div>
		
		<div class="grid md:grid-cols-2 gap-6">

			<div>
				<label for="address-1" class="mb-1">Address line 1</label>
				<input type="text" id="address-1" name="address-1" placeholder="Enter address line 1">
			</div>

			<div>
				<label for="address-2" class="mb-1">Address line 2</label>
				<input type="text" id="address-2" name="address-2" placeholder="Enter address line 2">
			</div>

			<div>
				<label for="address-city" class="mb-1">City</label>
				<input type="text" id="address-city" name="address-city" placeholder="Enter city">
			</div>

			<div>
				<label for="address-postcode" class="mb-1">Postcode</label>
				<input type="text" id="address-postcode" name="address-postcode" placeholder="Enter postcode">
			</div>

			<div>
				<label for="address-tel" class="mb-1">Phone number</label>
				<input type="tel" id="address-tel" name="address-tel" placeholder="Enter phone number">
			</div>

			<div>
				<label for="tax-id" class="mb-1">Tax ID</label>
				<input type="text" id="tax-id" name="tax-id" placeholder="Enter tax ID">
			</div>

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
	import Step from '../Step.vue'
	import { UploadIcon } from '@heroicons/vue/outline'

	import FileUpload from 'vue-upload-component'

	export default {
		components: {
			BackButton,
			NextButton,
			Step,
			FileUpload,
			UploadIcon,
		},

		data: function () {
			return {
				files: [],
			}
		},

		setup() {
			const setupData = inject('setupData')
			
			return {
				setupData,
			}
		},
	}
</script>
