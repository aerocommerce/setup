<template>
	<Step>

		<template #title>
			Catalog setup
		</template>

		<template #description>
			Now we’ll set up your catalog, which includes products, categories, tags and other parts of your store's information.
      You can choose to import sample products or skip this step if you already have catalog data or wish to add it later.
		</template>

    <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>

<!--		<div class="mb-9">-->
<!--			<SuccessMessage>The database you have selected already has catalog data</SuccessMessage>-->
<!--		</div>-->

		<div class="mb-9">
			<ContentGroup id="retail" v-model="setupData.project.catalog.type" group="catalog" value="import">

				<template #title>
					Import sample data
				</template>

				<div class="mb-6">
					<WarningMessage>Importing sample data will override any catalog data that already exists</WarningMessage>
				</div>

				<div class="mb-6">
					<label for="select-sample" class="mb-1">Select sample</label>
					<select id="select-sample" name="select-sample" @change="changePreview">
						<option value="" selected disabled>Please select</option>
						<option value="clothing-store">Clothing store</option>
						<option value="music-store">Music store</option>
					</select>
				</div>

        <template v-if="setupData.project.catalog.preview">
          <p class="mb-1 text-sm text-alphaLight-800">Sample preview:</p>

          <div class="grid grid-cols-4 gap-6">

            <div class="relative pb-full bg-alpha-300">
              <PhotographIcon class="text-alphaLight-200 w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div class="relative pb-full bg-alpha-300">
              <PhotographIcon class="text-alphaLight-200 w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div class="relative pb-full bg-alpha-300">
              <PhotographIcon class="text-alphaLight-200 w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div class="relative pb-full bg-alpha-300">
              <PhotographIcon class="text-alphaLight-200 w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>

          </div>
        </template>

			</ContentGroup>
		</div>

		<div>
			<ContentGroup id="skip-catalog" group="catalog" v-model="setupData.project.catalog.type" value="skip_import">

				<template #title>
					Skip this step and continue
				</template>

			</ContentGroup>
		</div>

		<template #footer="{ retreatStep }">
			<BackButton :action="retreatStep" />
			<NextButton :action="attemptAdvance" />
		</template>

	</Step>
</template>

<script>
	import BackButton from '../Elements/BackButton.vue'
	import NextButton from '../Elements/NextButton.vue'
	import Step from '../Step.vue'
	import SuccessMessage from '../Elements/SuccessMessage.vue'
  import ErrorMessage from '../Elements/ErrorMessage.vue'
	import WarningMessage from '../Elements/WarningMessage.vue'
	import ContentGroup from '../Elements/ContentGroup.vue'
	import { PhotographIcon } from '@heroicons/vue/outline'
  import {computed, inject, ref, watch} from "vue";

	export default {
		components: {
			BackButton,
			NextButton,
			Step,
			SuccessMessage,
      ErrorMessage,
			WarningMessage,
			ContentGroup,
			PhotographIcon
		},

    setup() {
      const setupData = inject('setupData')
      const advanceStep = inject('advanceStep')
      const errorMessage = ref(null)

      const attemptAdvance = () => {
        errorMessage.value = null

        if (setupData.project.catalog.type === 'import') {
          let select = document.getElementById('select-sample');
          if (select.value === '') {
            errorMessage.value = 'You must choose sample data if you wish to import, otherwise skip this step and continue!'

            return;
          }
        }

        return advanceStep()
      }

      const changePreview = (value) => {
        setupData.project.catalog.preview = value.target.value !== '';
      }

      return {
        errorMessage,
        setupData,
        attemptAdvance,
        changePreview,
      }
    }
	}
</script>
