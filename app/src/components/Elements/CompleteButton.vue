<template>
	<button @click="action" type="button" class="button button-secondary">
		<span>Save and install</span>
    	<span class="ml-4"><LightningBoltIcon /></span>
	</button>
</template>
	
<script>
	import { CheckCircleIcon, LightningBoltIcon } from '@heroicons/vue/outline'

	export default {
		props: ['action'],
		components: {
			CheckCircleIcon,
			LightningBoltIcon
		},
	}
</script>
