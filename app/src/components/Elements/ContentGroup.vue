<template>
    <Disclosure v-slot="{ open }" :defaultOpen="defaultOpen">
        <DisclosureButton class="flex w-full uppercase text-alphaLight-900" :class="open ? 'active' : ''">
            <span class="indicator">
				<slot name="title"/>
			</span>
        </DisclosureButton>
        <DisclosurePanel class="pt-3" v-if="open">
            <slot />
        </DisclosurePanel>
    </Disclosure>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/solid";

export default {
  	components: {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		ChevronUpIcon,
	},
};
</script>

<style scoped>

    .indicator {
        @apply p-3 pl-8 relative;
    }

    .indicator::before {
        position: absolute;
        width: theme('spacing.5');
        height: theme('spacing.5');
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        content: '';
        border: 2px solid theme('colors.alpha.100');
        border-radius: 50%;
	}
	
	.active .indicator {
		@apply text-white;
	}

    .active .indicator::before {
		@apply bg-white border-white;
        box-shadow: 0 0 0 theme('spacing.1') theme('colors.alpha.1100') inset;
    }

</style>