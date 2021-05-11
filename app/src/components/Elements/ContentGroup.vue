<template>

	<div>
		<div class="py-3">
			<input type="radio" :id="id" :key="id" :checked="selected" :name="group" v-model="selected">
			<label :for="id" :key="id"><slot name="title" /></label>
		</div>

		<div class="mt-3" v-if="selected">
			<slot />
		</div>
	</div>

</template>

<script>
	
	export default {
		props: ['id', 'selected', 'group']
	}

</script>