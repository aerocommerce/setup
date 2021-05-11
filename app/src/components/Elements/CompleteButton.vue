<template>
	<button @click="action" type="button" class="button">
		<CheckCircleIcon class="mr-4" />
		<span>Save and start setup</span>
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
