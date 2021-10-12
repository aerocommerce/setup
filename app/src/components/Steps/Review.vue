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
                    <div class="group cursor-pointer" @click="jumpToStepWithKey('project')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Project name</span>
                            <span v-if="hasStepWithKey('project')"
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

                    <div class="group cursor-pointer" @click="jumpToStepWithKey('databaseServer')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Database server</span>
                            <span v-if="hasStepWithKey('databaseServer')"
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

                    <div class="group cursor-pointer" @click="jumpToStepWithKey('database')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Database name</span>
                            <span v-if="hasStepWithKey('database')"
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

                    <div class="group cursor-pointer" @click="jumpToStepWithKey('elasticsearch')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Elasticsearch server</span>
                            <span v-if="hasStepWithKey('elasticsearch')"
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
                    <div class="group cursor-pointer" @click="jumpToStepWithKey('store')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Store name</span>
                            <span v-if="hasStepWithKey('store')"
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

                    <div class="group cursor-pointer" @click="jumpToStepWithKey('store')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Default country</span>
                            <span v-if="hasStepWithKey('store')"
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

                    <div class="group cursor-pointer" @click="jumpToStepWithKey('store')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Default currency</span>
                            <span v-if="hasStepWithKey('store')"
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

                    <div class="group cursor-pointer" @click="jumpToStepWithKey('store')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Default language</span>
                            <span v-if="hasStepWithKey('store')"
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

                    <div class="group cursor-pointer" @click="jumpToStepWithKey('store')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Sender email address (optional)</span>
                            <span v-if="hasStepWithKey('store')"
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

                    <div class="group cursor-pointer" @click="jumpToStepWithKey('store')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Logos (optional)</span>
                            <span v-if="hasStepWithKey('store')"
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
                        </template>
                        <template v-else>
                            <dd class="break-all">No store logo</dd>
                        </template>
                        <template v-if="setupData.project.store.logo.email">
                          <dd class="break-all">Email logo ✅</dd>
                        </template>
                        <template v-else>
                          <dd class="break-all">No email logo</dd>
                        </template>
                    </div>

                    <div class="group cursor-pointer" @click="jumpToStepWithKey('store')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Address country (optional)</span>
                            <span v-if="hasStepWithKey('store')"
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

                    <div class="group cursor-pointer" @click="jumpToStepWithKey('store')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Address line 1 (optional)</span>
                            <span v-if="hasStepWithKey('store')"
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

                    <div class="group cursor-pointer" @click="jumpToStepWithKey('store')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Address line 2 (optional)</span>
                            <span v-if="hasStepWithKey('store')"
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

                    <div class="group cursor-pointer" @click="jumpToStepWithKey('store')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Address city (optional)</span>
                            <span v-if="hasStepWithKey('store')"
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

                    <div class="group cursor-pointer" @click="jumpToStepWithKey('store')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Address postal code (optional)</span>
                            <span v-if="hasStepWithKey('store')"
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

                    <div class="group cursor-pointer" @click="jumpToStepWithKey('store')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Address telephone number (optional)</span>
                            <span v-if="hasStepWithKey('store')"
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

                    <div class="group cursor-pointer" @click="jumpToStepWithKey('store')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Tax ID (optional)</span>
                            <span v-if="hasStepWithKey('store')"
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
                    <div class="group cursor-pointer" @click="jumpToStepWithKey('catalog')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Catalog</span>
                            <span v-if="hasStepWithKey('catalog')"
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

                    <div class="group cursor-pointer" @click="jumpToStepWithKey('theme')">
                        <dt class="text-alphaLight-900 text-sm flex items-center relative">
                            <span>Theme</span>
                            <span v-if="hasStepWithKey('theme')"
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
                        <div class="group cursor-pointer" @click="jumpToStepWithKey('admin')">
                            <dt class="text-alphaLight-900 text-sm flex items-center relative">
                                <span>Email address</span>
                                <span v-if="hasStepWithKey('admin')"
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

                        <div class="group cursor-pointer" @click="jumpToStepWithKey('admin')">
                            <dt class="text-alphaLight-900 text-sm flex items-center relative">
                                <span>Password</span>
                                <span v-if="hasStepWithKey('admin')"
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
                        <div class="group cursor-pointer" @click="jumpToStepWithKey('admin')">
                            <dt class="text-alphaLight-900 text-sm flex items-center relative">
                                <span>Existing account</span>
                                <span v-if="hasStepWithKey('admin')"
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
            const jumpToStepWithKey = inject('jumpToStepWithKey')
            const hasStepWithKey = inject('hasStepWithKey')

            const showPassword = ref(false)

            return {
                setupData,
                jumpToStepWithKey,
                hasStepWithKey,
                showPassword,
                countries,
                currencies,
                languages,
            }
        },
    }
</script>
