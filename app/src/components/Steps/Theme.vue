<template>
	<Step>

		<template #title>
			Theme selection
		</template>

		<template #description>
			Themes are a way to customise your store to fit your brand. In order to create your store we need to pick a theme to start with. If you have your own theme you wish to use you, select our blank theme and you can import or create your custom theme later.
		</template>

		<div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-y-9">

			<ThemeSelector id="metal" name="theme" v-model="theme" value="metal" title="Metal" author="Aero Commerce" thumbnail="src/images/theme-metal-thumb.png" />
			<ThemeSelector id="shadow" name="theme" v-model="theme" value="shadow" title="Shadow" author="Aero Commerce" thumbnail="src/images/theme-shadow-thumb.png" />
			<ThemeSelector id="blade" name="theme" v-model="theme" value="blade" title="Blade" author="Aero Commerce" thumbnail="src/images/theme-blade-thumb.png" />
			<ThemeSelector id="highway" name="theme" v-model="theme" value="highway" title="Highway" author="Aero Commerce" thumbnail="src/images/theme-highway-thumb.png" />
			<ThemeSelector id="blank" name="theme" v-model="theme" value="blank" title="Blank" author="Aero Commerce" />

		</div>

		<template #footer="{ advanceStep, retreatStep }">
			<BackButton :action="retreatStep" />
			<NextButton :action="advanceStep" />
		</template>

	</Step>
</template>

<script>
  import {ref} from 'vue'
	import BackButton from '../Elements/BackButton.vue'
	import NextButton from '../Elements/NextButton.vue'
	import ThemeSelector from '../Elements/ThemeSelector.vue'
	import Step from '../Step.vue'

	export default {
		components: {
			BackButton,
			NextButton,
			ThemeSelector,
			Step,
		},
    setup() {
		  const theme = ref('metal')

      return {
		    theme,
      }
    },
	}
</script>
