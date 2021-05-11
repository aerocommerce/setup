<template>

    <div class="mb-6 bg-red p-4 text-white flex items-center">
        <ExclamationCircleIcon class="mr-4 w-6 h-6 flex-shrink-0" />
        <p class="uppercase font-medium">
            <slot />
        </p>
    </div>

</template>

<script>
import {ExclamationCircleIcon} from '@heroicons/vue/outline'

export default {
    components: {
        ExclamationCircleIcon,
    },
}
</script>