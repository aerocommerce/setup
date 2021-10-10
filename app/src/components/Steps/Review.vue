<template>
    <Step>
        <template #title> Review setup </template>

        <template #description>
            Review your setup, by clicking the save and install button you will not be able to make any changes and your
            store will be installed.
        </template>

        <div class="mb-9">
            <SingleAccordion :value="false">
                <template #title>
                    <span class="text-xl py-3">Project information</span>
                </template>

                <dl class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-6">
                    <div class="group cursor-pointer" @click="jumpToStep(1)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Project name</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <dd class="break-all">{{ setupData.project.name }}</dd>
                    </div>

                    <div></div>

                    <div class="group cursor-pointer" @click="jumpToStep(2)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Database server</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <dd class="break-all">
                            {{ setupData.project.databaseHost }}:{{ setupData.project.databasePort }}
                        </dd>
                    </div>

                    <div class="group cursor-pointer" @click="jumpToStep(3)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Database name</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <dd class="break-all">{{ setupData.project.database }}</dd>
                    </div>

                    <div class="group cursor-pointer" @click="jumpToStep(4)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Elasticsearch server</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <dd class="break-all">
                            {{ setupData.project.elasticsearchHost }}:{{ setupData.project.elasticsearchPort }}
                        </dd>
                    </div>
                </dl>
            </SingleAccordion>
        </div>

        <div class="mb-9">
            <SingleAccordion :value="false">
                <template #title>
                    <span class="text-xl py-3">Store information</span>
                </template>

                <dl class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-6">
                    <div class="group cursor-pointer" @click="jumpToStep(5)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Store Name</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <dd class="break-all">{{ setupData.project.store.name }}</dd>
                    </div>

                    <div></div>

                    <div class="group cursor-pointer" @click="jumpToStep(5)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Industry (optional)</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <template v-if="setupData.project.store.industry">
                            <dd class="break-all">{{ setupData.project.store.industry }}</dd>
                        </template>
                        <template v-else>
                            <dd class="break-all">-</dd>
                        </template>
                    </div>

                    <div class="group cursor-pointer" @click="jumpToStep(5)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Store country</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <dd class="break-all">{{ countries[setupData.project.store.country].name }}</dd>
                    </div>

                    <div class="group cursor-pointer" @click="jumpToStep(5)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Default currency</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <dd class="break-all">{{ currencies[setupData.project.store.currency].name }}</dd>
                    </div>

                    <div class="group cursor-pointer" @click="jumpToStep(5)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Language</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <dd class="break-all">{{ languages[setupData.project.store.locale].name }}</dd>
                    </div>

                    <div class="group cursor-pointer" @click="jumpToStep(5)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Sender email address (optional)</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <template v-if="setupData.project.store.sender_email">
                            <dd class="break-all">{{ setupData.project.store.sender_email }}</dd>
                        </template>
                        <template v-else>
                            <dd class="break-all">-</dd>
                        </template>
                    </div>

                    <div class="group cursor-pointer" @click="jumpToStep(5)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Images uploaded (optional)</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <template v-if="setupData.project.store.logo.store">
                            <dd class="break-all">Store logo ✅</dd>

                            <template v-if="setupData.project.store.logo.email">
                                <dd class="break-all">Email logo ✅</dd>
                            </template>
                        </template>
                        <template v-else>
                            <dd class="break-all">No</dd>
                        </template>
                    </div>

                    <div class="group cursor-pointer" @click="jumpToStep(5)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Address country</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <template v-if="setupData.project.store.address.country">
                            <dd class="break-all">{{ setupData.project.store.address.country }}</dd>
                        </template>
                        <template v-else>
                            <dd class="break-all">-</dd>
                        </template>
                    </div>

                    <div class="group cursor-pointer" @click="jumpToStep(5)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Address line 1 (optional)</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <template v-if="setupData.project.store.address.line_1">
                            <dd class="break-all">{{ setupData.project.store.address.line_1 }}</dd>
                        </template>
                        <template v-else>
                            <dd class="break-all">-</dd>
                        </template>
                    </div>

                    <div class="group cursor-pointer" @click="jumpToStep(5)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Address line 2 (optional)</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <template v-if="setupData.project.store.address.line_2">
                            <dd class="break-all">{{ setupData.project.store.address.line_2 }}</dd>
                        </template>
                        <template v-else>
                            <dd class="break-all">-</dd>
                        </template>
                    </div>

                    <div class="group cursor-pointer" @click="jumpToStep(5)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>City (optional)</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <template v-if="setupData.project.store.address.city">
                            <dd class="break-all">{{ setupData.project.store.address.city }}</dd>
                        </template>
                        <template v-else>
                            <dd class="break-all">-</dd>
                        </template>
                    </div>

                    <div class="group cursor-pointer" @click="jumpToStep(5)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Postal code (optional)</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <template v-if="setupData.project.store.address.post_code">
                            <dd class="break-all">{{ setupData.project.store.address.post_code }}</dd>
                        </template>
                        <template v-else>
                            <dd class="break-all">-</dd>
                        </template>
                    </div>

                    <div class="group cursor-pointer" @click="jumpToStep(5)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Telephone number (optional)</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <template v-if="setupData.project.store.address.phone">
                            <dd class="break-all">{{ setupData.project.store.address.phone }}</dd>
                        </template>
                        <template v-else>
                            <dd class="break-all">-</dd>
                        </template>
                    </div>

                    <div class="group cursor-pointer" @click="jumpToStep(5)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Tax ID (optional)</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <template v-if="setupData.project.store.address.tax_id">
                            <dd class="break-all">{{ setupData.project.store.address.tax_id }}</dd>
                        </template>
                        <template v-else>
                            <dd class="break-all">-</dd>
                        </template>
                    </div>
                </dl>
            </SingleAccordion>
        </div>

        <div class="mb-9">
            <SingleAccordion :value="false">
                <template #title>
                    <span class="text-xl py-3">Catalog & theme</span>
                </template>

                <dl class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-6">
                    <div class="group cursor-pointer" @click="jumpToStep(7)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Catalog</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <template v-if="setupData.project.catalog.type === 'import'">
                            <dd class="text-gray-300">
                                {{
                                    setupData.project.catalog.name
                                        .replace('-', ' ')
                                        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
                                }}
                            </dd>
                        </template>
                        <template v-else>
                            <dd class="break-all">No catalog data</dd>
                        </template>
                    </div>

                    <div class="group cursor-pointer" @click="jumpToStep(6)">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Theme</span>
                            <span
                                class="
                                    absolute
                                    top-0
                                    right-0
                                    opacity-0
                                    group-hover:opacity-100
                                    text-bravo
                                    transition-opacity
                                    duration-150
                                    ml-1
                                "
                            >
                                <PencilIcon class="w-3 h-3" />
                            </span>
                        </dt>
                        <dd class="break-all">{{ setupData.project.theme.name }}</dd>
                    </div>
                </dl>
            </SingleAccordion>
        </div>

        <div>
            <SingleAccordion :value="false">
                <template #title>
                    <span class="text-xl py-3">Admin account</span>
                </template>

                <dl class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-6">
                    <template v-if="setupData.project.admin.create === true">
                        <div class="group cursor-pointer" @click="jumpToStep(8)">
                            <dt class="text-alphaLight-900 text-sm flex items-center relative">
                                <span>Email address</span>
                                <span
                                    class="
                                        absolute
                                        top-0
                                        right-0
                                        opacity-0
                                        group-hover:opacity-100
                                        text-bravo
                                        transition-opacity
                                        duration-150
                                        ml-1
                                    "
                                >
                                    <PencilIcon class="w-3 h-3" />
                                </span>
                            </dt>
                            <dd class="break-all">{{ setupData.project.admin.email }}</dd>
                        </div>

                        <div class="group cursor-pointer" @click="jumpToStep(8)">
                            <dt class="text-alphaLight-900 text-sm flex items-center relative">
                                <span>Password</span>
                                <span
                                    class="
                                        absolute
                                        top-0
                                        right-0
                                        opacity-0
                                        group-hover:opacity-100
                                        text-bravo
                                        transition-opacity
                                        duration-150
                                        ml-1
                                    "
                                >
                                    <PencilIcon class="w-3 h-3" />
                                </span>
                            </dt>
                            <dd class="break-all">
                                <template v-if="showPassword">
                                    {{ setupData.project.admin.password.length }}
                                </template>
                                <template v-else>
                                    {{ '*'.repeat(setupData.project.admin.password.length) }}
                                </template>
                            </dd>
                        </div>
                    </template>

                    <template v-else>
                        <div class="group cursor-pointer" @click="jumpToStep(8)">
                            <dt class="text-alphaLight-900 text-sm flex items-center relative">
                                <span>Existing account</span>
                                <span
                                    class="
                                        absolute
                                        top-0
                                        right-0
                                        opacity-0
                                        group-hover:opacity-100
                                        text-bravo
                                        transition-opacity
                                        duration-150
                                        ml-1
                                    "
                                >
                                    <PencilIcon class="w-3 h-3" />
                                </span>
                            </dt>
                            <dd class="break-all">{{ setupData.project.admin.email }}</dd>
                        </div>
                    </template>
                </dl>
            </SingleAccordion>
        </div>

        <template #footer="{ retreatStep, advanceStep }">
            <BackButton :action="retreatStep" />
            <CompleteButton :action="advanceStep" />
        </template>
    </Step>
</template>

<script>
    import { inject, ref } from 'vue'
    import BackButton from '../Elements/BackButton.vue'
    import CompleteButton from '../Elements/CompleteButton.vue'
    import SingleAccordion from '../Elements/SingleAccordion.vue'
    import Step from '../Step.vue'
    import { PencilIcon } from '@heroicons/vue/outline'
    import countries from '../../countries'
    import currencies from '../../currencies'
    import languages from '../../languages'

    export default {
        components: {
            BackButton,
            CompleteButton,
            SingleAccordion,
            Step,
            PencilIcon,
        },

        setup() {
            const setupData = inject('setupData')
            const jumpToStep = inject('jumpToStep')

            const showPassword = ref(false)

            return {
                setupData,
                jumpToStep,
                showPassword,
                countries,
                currencies,
                languages,
            }
        },
    }
</script>
