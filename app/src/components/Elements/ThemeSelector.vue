<template>

    <div>
        <label class="[ selector ] relative block pb-full bg-white bg-cover bg-center-top cursor-pointer" :class="selected ? 'active' : ''" :for="id" :key="id" :style="thumbnail ? 'background-image: url(' + thumbnail + ');' : null">
            <input type="radio" :id="id" :checked="selected" :key="id" :name="group" v-model="selected">
        </label>

        <label class="block mt-3" :for="id">
            <p class="mb-0">{{ title }}</p>	
            <small class="block text-alphaLight-900">{{ author }}</small>
        </label>
    </div>
    
</template>

<script>
	
	export default {
		props: ['id', 'selected', 'group', 'title', 'author', 'thumbnail'],
	}

</script>

<style scoped>

    .selector::after {
        @apply absolute w-full h-full border-6 border-transparent transition-colors duration-150;
        content: '';
    }

    .selector::before {
        @apply block absolute z-10 top-0 right-0 w-9 h-9 bg-green rounded-full transform -translate-y-1/3 translate-x-1/3 scale-0 transition-transform duration-150 text-alpha-900 bg-center bg-no-repeat;
        content: '';
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /%3E%3C/svg%3E");
        background-size: theme('spacing.5') theme('spacing.5');
    }

    .selector:hover::after,
    .selector:focus::after {
        @apply border-bravo;
    }

    .selector.active::after {
        @apply border-green;
    }

    .selector.active::before {
        @apply scale-100;
    }

</style>
