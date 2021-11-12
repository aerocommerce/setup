<template>
    <Step>
        <template #title> Catalog setup </template>

        <template #description>
            Now we’ll set up your catalog, which includes products, categories, tags and other parts of your store's
            information. You can choose to import sample products or skip this step if you already have catalog data or
            wish to add it later.
        </template>

        <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>

        <SuccessMessage v-if="successMessage">The database you have selected already has catalog data</SuccessMessage>

        <div class="mb-9">
            <ContentGroup
                v-if="!successMessage"
                id="retail"
                v-model="setupData.project.catalog.type"
                group="catalog"
                value="import"
            >
                <template #title> Import sample data </template>

                <div class="mb-6">
                    <label for="select-sample" class="mb-1">Select sample</label>
                    <select
                        id="select-sample"
                        v-model="setupData.project.catalog.name"
                        name="select-sample"
                        @change="changePreview"
                    >
                        <option value="" selected disabled>Please select</option>
                        <option
                            v-for="catalog in existingCatalog"
                            :value="catalog.name.replace(' ', '-').toLowerCase()"
                        >
                            {{ catalog.name }}
                        </option>
                    </select>
                </div>

                <template v-if="setupData.project.catalog.preview">
                    <p class="mb-1 text-sm text-alphaLight-800">Sample preview:</p>

                    <div class="grid grid-cols-4 gap-6">
                        <div v-for="preview in setupData.project.catalog.images" class="relative rounded bg-alpha-300">
                            <img :src="preview" class="rounded" alt="" />
                            <!--              <PhotographIcon class="text-alphaLight-200 w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />-->
                        </div>
                    </div>
                </template>
            </ContentGroup>
        </div>

        <div>
            <ContentGroup
                id="skip-catalog"
                group="catalog"
                v-model="setupData.project.catalog.type"
                value="skip_import"
            >
                <template #title> Skip this step and continue </template>
            </ContentGroup>
        </div>

        <template #footer="{ retreatStep }">
            <BackButton :action="retreatStep" />
            <NextButton :action="attemptAdvance" />
        </template>
    </Step>
</template>

<script>
    import { computed, inject, ref, watch } from 'vue'
    import BackButton from '../Elements/BackButton.vue'
    import NextButton from '../Elements/NextButton.vue'
    import Step from '../Step.vue'
    import SuccessMessage from '../Elements/SuccessMessage.vue'
    import ErrorMessage from '../Elements/ErrorMessage.vue'
    import WarningMessage from '../Elements/WarningMessage.vue'
    import ContentGroup from '../Elements/ContentGroup.vue'
    import { PhotographIcon } from '@heroicons/vue/outline'

    export default {
        components: {
            BackButton,
            NextButton,
            Step,
            SuccessMessage,
            ErrorMessage,
            WarningMessage,
            ContentGroup,
            PhotographIcon,
        },

        setup() {
            const setupData = inject('setupData')
            const advanceStep = inject('advanceStep')
            const errorMessage = ref(null)
            const successMessage = ref(null)
            const existingCatalog = ref([])

            let canAdvance = false

            const connectionInfo = computed(() => {
                return {
                    type: setupData.project.databaseConnectionType,
                    database: setupData.project.database,
                    host: setupData.project.databaseHost,
                    port: setupData.project.databasePort,
                    username: setupData.project.databaseUsername,
                    password: setupData.project.databasePassword,
                }
            })

            const selectedCatalog = computed(() => setupData.project.catalog.name)

            fetch('https://agora.aerocommerce.com/api/catalog', {
                headers: {
                    Authorization: 'Bearer ' + setupData.agora.token,
                    'Content-Type': 'application/json',
                },
            })
                .then((result) => {
                    result
                        .json()
                        .then((json) => {
                            if (!result.ok) throw new Error(json.message)

                            return json
                        })
                        .then((json) => {
                            existingCatalog.value = json.catalog

                            canAdvance = true
                        })
                        .catch((e) => {
                            errorMessage.value = e.message
                        })
                })
                .catch((e) => {
                    errorMessage.value = e.message
                })

            watch(selectedCatalog, (value) => {
                Object.entries(existingCatalog.value).forEach((catalog) => {
                    if (catalog[1].name.replace(' ', '-').toLowerCase() === value) {
                        setupData.project.catalog.name = value
                        setupData.project.catalog.url = catalog[1].url

                        if (catalog[1].thumbnails.length) {
                            setupData.project.catalog.preview = true
                            setupData.project.catalog.images = catalog[1].thumbnails
                        }
                    }
                })
            })

            fetch(`${setupData.host}/setup/actions/check-catalog-contents`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(connectionInfo.value),
            })
                .then((result) => {
                    result
                        .json()
                        .then((json) => {
                            if (!result.ok) throw new Error(json.message)

                            return json
                        })
                        .then((json) => {
                            successMessage.value = json.success

                            if (json.success) {
                                setupData.project.catalog.type = 'skip_import'
                            }
                        })
                        .catch((e) => {
                            errorMessage.value = e.message
                        })
                })
                .catch((e) => {
                    errorMessage.value = e.message
                })

            const attemptAdvance = () => {
                errorMessage.value = null

                if (!canAdvance) return

                if (setupData.project.catalog.type === 'import') {
                    let select = document.getElementById('select-sample')
                    if (select.value === '') {
                        errorMessage.value =
                            'You must choose sample data if you wish to import, otherwise skip this step and continue'

                        return
                    }
                }

                return advanceStep()
            }

            const changePreview = (value) => {
                setupData.project.catalog.preview = value.target.value !== ''
            }

            return {
                errorMessage,
                successMessage,
                setupData,
                attemptAdvance,
                changePreview,
                existingCatalog,
            }
        },
    }
</script>
