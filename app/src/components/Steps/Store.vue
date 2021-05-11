<template>
	<Step>

		<template #title>
			Store information
		</template>

		<template #description>
			Now we’ll take some information about the store you’re creating. We’ll use this information to populate your theme and email content. This information can be easily updated later from the store settings page.
		</template>

		<div class="grid md:grid-cols-2 gap-6 mb-6">

			<div>
				<label for="store-name" class="mb-1">Store name</label>
				<input type="text" id="store-name" name="store-name" placeholder="Enter host name" autofocus :value="setupData.projectName" required>
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
				<label for="sender-email" class="mb-1">Sender email address</label>
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
			<label for="store-upload" class="mb-1">Upload store logo</label>
			<input type="file" id="store-upload" name="store-upload">
			<small class="block text-alphaLight-800 mt-3">The logo you upload here will be used to populate the theme and email templates. Please upload an SVG if possible (we will convert the SVG to a PNG for use in emails)</small>
		</div>

		<div class="mb-6">
			<h2 class="text-xl font-medium mb-1">Store address</h2>
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
				<label for="address-postcode" class="mb-1">Post code</label>
				<input type="text" id="address-postcode" name="address-postcode" placeholder="Enter post code">
			</div>

			<div>
				<label for="address-tel" class="mb-1">Telephone number</label>
				<input type="text" id="address-tel" name="address-tel" placeholder="Enter telephone number">
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

	export default {
		components: {
			BackButton,
			NextButton,
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
