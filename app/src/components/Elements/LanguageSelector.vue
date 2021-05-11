<template>
	<Listbox v-model="selectedLanguage">
	  <div class="relative flex-grow text-alpha-150">
		<ListboxButton class="relative w-full pr-10 text-left cursor-default py-2 flex items-center">
			<div class="w-6 h-6 mr-3 text-alpha-150">
				<GlobeIcon />
			</div>
			<span class="block truncate">{{ selectedLanguage.name }}</span>
			<span class="absolute inset-y-0 right-0 flex items-center pointer-events-none">
				<ChevronDownIcon class="w-4 h-4 text-alpha-150" aria-hidden="true" />
			</span>
		</ListboxButton>

		<transition
		  leave-active-class="transition duration-100 ease-in"
		  leave-from-class="opacity-100"
		  leave-to-class="opacity-0"
		>
		  <ListboxOptions
			class="absolute w-full py-1 mt-1 overflow-auto text-base bg-alphaLight-400 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
		  >
			<ListboxOption
			  v-slot="{ active, selected }"
			  v-for="language in languages"
			  :key="language"
			  :value="language"
			  as="template"
			>
			  <li
				:class="[
				  active ? 'text-alpha-900 bg-alphaLight-100' : 'text-alpha-900',
				  'cursor-default select-none relative py-2 pl-10 pr-4',
				]"
			  >
				<span
				  :class="[
					selected ? 'font-medium' : 'font-normal',
					'block truncate',
				  ]"
				  >{{ language.name }}</span
				>
				<span
				  v-if="selected"
				  class="absolute inset-y-0 left-0 flex items-center pl-3 text-alpha-600"
				>
				  <CheckIcon class="w-5 h-5" aria-hidden="true" />
				</span>
			  </li>
			</ListboxOption>
		  </ListboxOptions>
		</transition>
	  </div>
	</Listbox>
</template>

<script>
import {ref} from 'vue'
import {
	Listbox,
	ListboxLabel,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from '@headlessui/vue'
import { GlobeIcon, CheckIcon, ChevronDownIcon } from '@heroicons/vue/outline'

export default {
	components: {
		Listbox,
		ListboxLabel,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
		CheckIcon,
		ChevronDownIcon,
		GlobeIcon,
	},

	setup() {
		const languages = [
			{ name: "English" },
			// { name: "French" },
			// { name: "Spanish" },
		]

		const selectedLanguage = ref(languages[0])

		return {
			languages,
			selectedLanguage,
		}
	},
}
</script>
