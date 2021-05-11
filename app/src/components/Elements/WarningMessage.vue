<template>

    <div class="mb-6 border-2 border-orange p-4 text-orange flex items-center">
        <ExclamationIcon class="mr-4 w-6 h-6 flex-shrink-0" />
        <p class="uppercase font-medium">
            <slot />
        </p>
    </div>

</template>

<script>
import {ExclamationIcon} from '@heroicons/vue/outline/esm'

export default {
    components: {
        ExclamationIcon,
    },
}
</script>