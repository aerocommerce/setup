<template>
    <Disclosure v-slot="{ open }" :defaultOpen="defaultOpen">
        <DisclosureButton class="flex justify-between items-center w-full text-white">
            <slot name="title"/>
            <ChevronRightIcon class="ml-2 w-4 h-4 transform transition-transform duration-150" :class="open ? 'rotate-90' : 'rotate-0'" />
        </DisclosureButton>
        <DisclosurePanel class="pt-3" v-if="open">
            <slot />
        </DisclosurePanel>
    </Disclosure>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronRightIcon } from "@heroicons/vue/outline/esm";

export default {
  	components: {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		ChevronRightIcon,
	},
};
</script>