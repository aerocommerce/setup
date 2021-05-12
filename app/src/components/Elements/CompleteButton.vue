<template>
	<button @click="action" type="button" class="button bg-bravo">
		<span>Save and install</span>
    <span class="ml-4">🚀</span>
	</button>
</template>

<script>
	import { CheckCircleIcon } from '@heroicons/vue/outline'

	export default {
		props: ['action'],
		components: {
			CheckCircleIcon,
		},
	}
</script>
