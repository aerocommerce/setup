<template>
    <Step>
        <template #title> Theme selection </template>

        <template #description>
            Themes are a way to customise your store to fit your brand. In order to create your store we need to pick a
            theme to start with. If you have your own theme you wish to use you, select our blank theme and you can
            import or create your custom theme later.
        </template>

        <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-y-9">
            <div v-for="theme in existingThemes" :key="theme.id">
                <ThemeSelector
                    :id="theme.key"
                    v-model="setupData.project.theme.id"
                    :value="theme.id"
                    name="theme"
                    :theme="theme"
                ></ThemeSelector>
            </div>
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
    import ThemeSelector from '../Elements/ThemeSelector.vue'
    import ErrorMessage from '../Elements/ErrorMessage.vue'
    import Step from '../Step.vue'

    export default {
        components: {
            BackButton,
            NextButton,
            ThemeSelector,
            Step,
            ErrorMessage,
        },
        setup() {
            const setupData = inject('setupData')
            const advanceStep = inject('advanceStep')
            const errorMessage = ref(null)
            const selectedTheme = computed(() => setupData.project.theme.id)
            const existingThemes = ref([])
            let canAdvance = false

            let themeFetch

            errorMessage.value = null

            if (setupData.project.id) {
                themeFetch = fetch('https://agora.aerocommerce.com/api/projects/themes', {
                    headers: {
                        Authorization: 'Basic ' + setupData.project.token,
                        'Content-Type': 'application/json',
                    },
                })
            } else {
                themeFetch = fetch('https://agora.aerocommerce.com/api/themes', {
                    headers: {
                        Authorization: 'Bearer ' + setupData.agora.token,
                        'Content-Type': 'application/json',
                    },
                })
            }

            themeFetch
                .then((result) => {
                    result
                        .json()
                        .then((json) => {
                            if (!result.ok) throw new Error(json.message)

                            return json
                        })
                        .then((json) => {
                            existingThemes.value = json.themes

                            setupData.project.themes = json.themes.length

                            if (json.themes.length === 0) {
                                errorMessage.value = 'No themes are associated with your account'

                                return
                            }

                            if (setupData.project.theme.id === '') {
                                Object.entries(existingThemes.value).forEach((theme, count) => {
                                    if (count > 0) return

                                    setupData.project.theme.id = theme[1].id
                                    setupData.project.theme.key = theme[1].key
                                    setupData.project.theme.name = theme[1].name
                                    setupData.project.theme.author = theme[1].author
                                    setupData.project.theme.organization = theme[1].organization
                                    setupData.project.theme.description = theme[1].description
                                    setupData.project.theme.thumbnail = theme[1].media ? theme[1].media[1].url : null
                                    setupData.project.theme.frameworks = theme[1].frameworks
                                })
                            }

                          canAdvance = true
                        })
                        .catch((e) => {
                            errorMessage.value = e.message
                        })
                })
                .catch((e) => {
                    errorMessage.value = e.message
                })

            watch(selectedTheme, (value) => {
                Object.entries(existingThemes.value).forEach((theme) => {
                    if (parseInt(theme[1].id) === parseInt(value)) {
                        setupData.project.theme.key = theme[1].key
                        setupData.project.theme.name = theme[1].name
                        setupData.project.theme.author = theme[1].author
                        setupData.project.theme.organization = theme[1].organization
                        setupData.project.theme.description = theme[1].description
                        setupData.project.theme.thumbnail = theme[1].media[1] ? theme[1].media[1].url : null
                        setupData.project.theme.frameworks = theme[1].frameworks
                    }
                })
            })

            const attemptAdvance = () => {
                errorMessage.value = null

              if (!canAdvance) return

                if (selectedTheme === null) {
                    errorMessage.value = 'You must choose a theme before proceeding'
                    return
                }

                if (setupData.project.themes === 0) {
                    return
                }

                return advanceStep()
            }

            return {
                attemptAdvance,
                selectedTheme,
                existingThemes,
                errorMessage,
                setupData,
            }
        },
    }
</script>
