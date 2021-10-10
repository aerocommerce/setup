<template>
    <div>
        <div class="py-3">
            <input
                type="radio"
                :id="id"
                :key="id"
                :name="name"
                v-model="modelValue"
                :value="value"
                @input="$emit('update:modelValue', $event.target.value)"
            />
            <label :for="id" :key="id"><slot name="title" /></label>
        </div>

        <div class="mt-3" v-if="modelValue === value">
            <slot />
        </div>
    </div>
</template>

<script>
    export default {
        props: ['id', 'name', 'value', 'modelValue'],
    }
</script>
