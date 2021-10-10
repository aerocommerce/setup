<template>
    <div>
        <Switch v-model="value" class="flex justify-between items-center text-white">
            <div><slot name="title" /></div>
            <ChevronRightIcon
                class="ml-2 w-4 h-4 transform transition-transform duration-150"
                :class="value ? 'rotate-90' : 'rotate-0'"
            />
        </Switch>
        <div v-if="value" class="pt-3">
            <slot />
        </div>
    </div>
</template>

<script>
    import { ref, watch } from 'vue'
    import { Switch } from '@headlessui/vue'
    import { ChevronRightIcon } from '@heroicons/vue/outline'

    export default {
        props: ['modelValue'],
        components: {
            Switch,
            ChevronRightIcon,
        },
        setup(props, { emit }) {
            let value = ref(props.modelValue)

            watch(value, (value) => emit('update:modelValue', value))

            return {
                value,
            }
        },
    }
</script>
