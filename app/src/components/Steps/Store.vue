<template>
	<Step>

    <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>

		<template #title>
			Store information
		</template>

		<template #description>
			Now we'll take some information about the store you're creating.
      We'll use this information to populate your theme and email content.
      This information can be easily updated later from the store settings page in the admin.
		</template>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6 mb-6">

			<div>
				<label for="store-name" class="mb-1">Store name</label>
				<input type="text" id="store-name" name="store-name" placeholder="Enter store name" :value="setupData.project.store.name" required>
			</div>

		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6 mb-6">

			<div>
				<label for="industry" class="mb-1">Industry <small>(optional)</small></label>
				<select id="industry" v-model="setupData.project.store.industry" name="industry">
					<option value="" disabled selected>Select industry</option>
					<option>Fashion and Apparel</option>
					<option>Beauty and Personal Care</option>
					<option>Entertainment</option>
					<option>Household goods</option>
					<option>Electronics</option>
				</select>
			</div>

			<div>
				<label for="country" class="mb-1">Store country</label>
				<select id="country" v-model="setupData.project.store.country" name="country" required>
					<option value="" selected disabled>Select country</option>
          <option v-for="(country, key) in countries" :value="key">{{ country.name }}</option>
				</select>
			</div>

			<div>
				<label for="currency" class="mb-1">Default currency</label>
				<select id="currency" v-model="setupData.project.store.currency" name="currency" required>
					<option value="" disabled>Select currency</option>
          <option v-for="(currency, key) in currencies" :value="key">{{ currency.name }}</option>
				</select>
			</div>

			<div>
				<label for="language" class="mb-1">Default language</label>
				<select id="language" v-model="setupData.project.store.language" name="language" required>
					<option value="" disabled>Select language</option>
          <option v-for="(language, key) in languages" :value="key">{{ language.name }}</option>
				</select>
			</div>

			<div>
				<label for="sender-email" class="mb-1">Sender email address <small>(optional)</small></label>
				<input type="text" id="sender-email" v-model="setupData.project.store.sender_email" name="sender-email" placeholder="Enter email address" required>
				<small class="block text-alphaLight-800 mt-3">The email address entered here will be the address used to communicate with customers</small>
			</div>

			<div>
				<label for="tax-settings" class="mb-1">Tax settings</label>
				<select id="tax-settings" v-model="setupData.project.store.tax" name="tax-settings" required>
          <option value="" disabled>Select tax setting</option>
					<option value="inc-tax" selected>Prices include tax</option>
					<option value="exc-tax">Prices exclude tax</option>
				</select>
				<small class="block text-alphaLight-800 mt-3">Advanced tex settings can be managed in the admin</small>
			</div>

		</div>

		<div class="mb-6">
			<label for="file" class="mb-1">Upload store logo <small>(optional)</small></label>
			<small class="block text-alphaLight-800 mb-3">The logo you upload here will be used to populate the theme. Uploading an SVG will ensure the best quality on all devices and screens.</small>

      <ImageUpload input-name="store-logo"></ImageUpload>
		</div>

		<div class="mb-6">
			<label for="file" class="mb-1">Upload email logo <small>(optional)</small></label>
			<small class="block text-alphaLight-800 mb-3">The logo you upload here will be used to populate the email templates. Please upload a PNG or JPG image of your logo.</small>

      <ImageUpload input-name="email-logo"></ImageUpload>
		</div>

		<div class="mb-6">
			<h2 class="text-xl font-medium mb-1">Store address <small>(optional)</small></h2>
			<small class="block text-alphaLight-800">The address entered here will be used to populate customer emails and the footer of your store</small>
		</div>
		
		<div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">

			<div>
				<label for="address-country" class="mb-1">Address country</label>
				<select id="address-country" v-model="setupData.project.store.address.country" name="address-country">
					<option value="" disabled selected>Select country</option>
					<option v-for="(country, key) in countries" :value="key">{{ country.name }}</option>
				</select>
			</div>

			<div>
				<label for="address-1" class="mb-1">Address line 1</label>
				<input type="text" id="address-1" v-model="setupData.project.store.address.line_1" name="address-1" placeholder="Enter address line 1">
			</div>

			<div>
				<label for="address-2" class="mb-1">Address line 2</label>
				<input type="text" id="address-2" v-model="setupData.project.store.address.line_2" name="address-2" placeholder="Enter address line 2">
			</div>

			<div>
				<label for="address-city" class="mb-1">City</label>
				<input type="text" id="address-city" v-model="setupData.project.store.address.city" name="address-city" placeholder="Enter city">
			</div>

			<div>
				<label for="address-postcode" class="mb-1">Postal code</label>
				<input type="text" id="address-postcode" v-model="setupData.project.store.address.post_code" name="address-postcode" placeholder="Enter postcode">
			</div>

			<div>
				<label for="address-tel" class="mb-1">Phone number</label>
				<input type="tel" id="address-tel" v-model="setupData.project.store.address.phone" name="address-tel" placeholder="Enter phone number">
			</div>

			<div>
				<label for="tax-id" class="mb-1">Tax ID</label>
				<input type="text" id="tax-id" v-model="setupData.project.store.address.tax_id" name="tax-id" placeholder="Enter tax ID">
			</div>

		</div>

    <div class="mt-6">
      <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>
    </div>

		<template #footer="{ retreatStep }">
			<BackButton :action="retreatStep" />
			<NextButton :action="attemptAdvance" />
		</template>

    <button class="hidden" aria-hidden="true" />

	</Step>
</template>

<script>
import {computed, inject, ref} from 'vue'
	import BackButton from '../Elements/BackButton.vue'
	import NextButton from '../Elements/NextButton.vue'
  import ErrorMessage from '../Elements/ErrorMessage.vue'
	import Step from '../Step.vue'
	import { UploadIcon } from '@heroicons/vue/outline'
  import countries from "../../countries";
  import currencies from "../../currencies"
  import languages from "../../languages"
  import ImageUpload from "../Elements/ImageUpload.vue";

	export default {
		components: {
      ImageUpload,
			BackButton,
			NextButton,
      ErrorMessage,
			Step,
			UploadIcon,
		},

		data: function () {
			return {
				files: [],
			}
		},

		setup() {
			const setupData = inject('setupData')
      const advanceStep = inject('advanceStep')
      const errorMessage = ref(null)

      const attemptAdvance = () => {
        errorMessage.value = null

        if (setupData.project.store.name === '') {
          errorMessage.value = 'You must give your store a name before you proceed.'

          return
        }

        if (setupData.project.store.country === '') {
          errorMessage.value = 'You must set a country before you proceed.'

          return
        }

        if (setupData.project.store.currency === '') {
          errorMessage.value = 'You must set a currency before you proceed.'

          return
        }

        if (setupData.project.store.language === '') {
          errorMessage.value = 'You must set a language before you proceed.'

          return
        }

        if (setupData.project.store.tax === '') {
          errorMessage.value = 'You must select a tax setting before you proceed.'

          return
        }

        if (setupData.project.store.logo.store !== ''
            || setupData.project.store.logo.email !== '') {

          const formData = new FormData()

          Object.entries(setupData.project.store.logo).forEach((image) => {
            formData.append(image[0], image[1]);
          })

          fetch(`${setupData.host}/setup/actions/save-uploaded-images`, {
            method: 'POST',
            body: formData,
          })
              .then((result) => {
                result.json()
                    .then(json => {
                      if (! result.ok) throw new Error(json.message)

                      return json
                    })
                    .then((json) => {
                      if (json.success) {
                        return advanceStep()
                      }

                      errorMessage.value = 'Could not upload images!'
                    })
                    .catch((e) => {
                      errorMessage.value = e.message
                    })
              })
              .catch((_) => {
                errorMessage.value = 'Could not upload images!'
              })
        } else {
          return advanceStep()
        }
      }

			return {
				setupData,
        attemptAdvance,
        errorMessage,
        countries,
        currencies,
        languages,
			}
		},
	}
</script>
