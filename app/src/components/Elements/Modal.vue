<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" :open="isOpen">
        <div class="fixed inset-0 z-50 overflow-y-auto text-white">
            <div class="min-h-screen px-4 text-center">
                <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <DialogOverlay class="fixed inset-0 bg-alphaLight-900 opacity-20" />
                </TransitionChild>

                <span class="inline-block h-screen align-middle" aria-hidden="true">
                    &#8203;
                </span>

                <TransitionChild
                    as="template"
                    enter="delay-75 duration-300 ease-out"
                    enter-from="opacity-0 scale-90"
                    enter-to="opacity-100 scale-100"
                    leave="delay-75 duration-200 ease-in"
                    leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 scale-90"
                >
                    <div class="inline-block w-full max-w-3xl p-6 xl:p-9 my-12 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-lg bg-alpha-900">
                        <DialogTitle as="h3" class="text-2xl font-medium leading-6 text-white mb-6">
                            <slot name="title" />
                        </DialogTitle>
                        
                        <DialogDescription class="text-white mb-6">
                            <slot name="description" />
                        </DialogDescription>

                        <div class="mt-12">
                            <slot />
                        </div>
                    </div>
                </TransitionChild>
            </div>
        </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
    import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogOverlay,
        DialogTitle,
        DialogDescription,
    } from '@headlessui/vue'

    export default {
        components: {
            TransitionRoot,
            TransitionChild,
            Dialog,
            DialogOverlay,
            DialogTitle,
            DialogDescription,
        },

        props: ['isOpen'],

    }
</script>
