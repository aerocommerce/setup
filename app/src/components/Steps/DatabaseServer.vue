<template>
    <Step>
        <template #title> Database server </template>

        <template #description>
            The database is used to store your products and everything else to do with your store. You can choose to
            connect to a local or remote database depending on your setup.
        </template>

        <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>

        <form @submit.prevent="attemptAdvance" method="post">
            <div class="mb-9">
                <ContentGroup
                    id="local-db-server"
                    v-model="setupData.project.databaseConnectionType"
                    name="databaseConnectionType"
                    value="local"
                >
                    <template #title> Local database server </template>

                    <div class="mb-6 flex items-center">
                        <div class="w-full">
                            <label for="local-host-name" class="mb-1">Host name</label>
                            <input
                                type="text"
                                id="local-host-name"
                                placeholder="Enter host name"
                                v-model="setupData.project.databaseHost"
                            />
                        </div>

                        <div class="px-6">
                            <label class="mb-1">&nbsp;</label>
                            <p>:</p>
                        </div>

                        <div>
                            <label for="local-port-number" class="mb-1">Port number</label>
                            <input
                                type="number"
                                id="local-port-number"
                                placeholder="Enter port no"
                                autocomplete="off"
                                v-model="setupData.project.databasePort"
                            />
                        </div>
                    </div>

                    <div class="mb-6">
                        <label for="local-username" class="mb-1">Database username</label>
                        <input
                            type="text"
                            id="local-username"
                            placeholder="Enter database username"
                            autocomplete="off"
                            v-model="setupData.project.databaseUsername"
                        />
                    </div>

                    <div class="mb-6">
                        <label for="local-pasword" class="mb-1">Database pasword <small>(optional)</small></label>
                        <input
                            type="password"
                            id="local-pasword"
                            placeholder="Enter database pasword"
                            autocomplete="off"
                            v-model="setupData.project.databasePassword"
                        />
                    </div>

                    <div v-if="setupData.project.databaseTestPassed">
                        <SuccessMessage>Successful connection</SuccessMessage>
                    </div>
                    <button v-else class="button button-secondary" type="button" @click="testConnection">
                        <RefreshIcon
                            class="mr-2 transition-transform duration-300 rotate-0"
                            :class="{ 'animation-rotate': testingDb }"
                        />
                        Test connection
                    </button>
                </ContentGroup>
            </div>

            <div>
                <ContentGroup
                    id="remote-db-server"
                    v-model="setupData.project.databaseConnectionType"
                    name="databaseConnectionType"
                    value="remote"
                >
                    <template #title> Remote database server </template>

                    <div class="mb-6 flex items-center">
                        <div class="w-full">
                            <label for="remote-host-name" class="mb-1">Host name</label>
                            <input
                                type="text"
                                id="remote-host-name"
                                placeholder="Enter host name"
                                autocomplete="off"
                                v-model="setupData.project.databaseHost"
                            />
                        </div>

                        <div class="px-6">
                            <label class="mb-1">&nbsp;</label>
                            <p>:</p>
                        </div>

                        <div>
                            <label for="remote-port-number" class="mb-1">Port number</label>
                            <input
                                type="number"
                                id="remote-port-number"
                                placeholder="Enter port no"
                                autocomplete="off"
                                v-model="setupData.project.databasePort"
                            />
                        </div>
                    </div>

                    <div class="mb-6">
                        <label for="remote-username" class="mb-1">Database username</label>
                        <input
                            type="text"
                            id="remote-username"
                            placeholder="Enter database username"
                            autocomplete="off"
                            v-model="setupData.project.databaseUsername"
                        />
                    </div>

                    <div class="mb-6">
                        <label for="remote-pasword" class="mb-1">Database pasword</label>
                        <input
                            type="password"
                            id="remote-pasword"
                            placeholder="Enter database pasword"
                            autocomplete="off"
                            v-model="setupData.project.databasePassword"
                        />
                    </div>

                    <div v-if="setupData.project.databaseTestPassed">
                        <SuccessMessage>Successful connection</SuccessMessage>
                    </div>
                    <button v-else class="button button-secondary" type="button" @click="testConnection">
                        <RefreshIcon class="mr-2" :class="{ 'animation-rotate': testingDb }" />
                        Test connection
                    </button>
                </ContentGroup>
            </div>

            <button class="hidden" aria-hidden="true" />
        </form>

        <template #footer="{ retreatStep }">
            <BackButton :action="retreatStep" />
            <NextButton :action="attemptAdvance" />
        </template>
    </Step>
</template>

<script>
    import { ref, inject, computed, watch } from 'vue'
    import BackButton from '../Elements/BackButton.vue'
    import NextButton from '../Elements/NextButton.vue'
    import ContentGroup from '../Elements/ContentGroup.vue'
    import ErrorMessage from '../Elements/ErrorMessage.vue'
    import SingleAccordion from '../Elements/SingleAccordion.vue'
    import SuccessMessage from '../Elements/SuccessMessage.vue'
    import Step from '../Step.vue'
    import { RefreshIcon } from '@heroicons/vue/outline'

    export default {
        components: {
            BackButton,
            NextButton,
            Step,
            ContentGroup,
            ErrorMessage,
            SingleAccordion,
            SuccessMessage,
            RefreshIcon,
        },

        setup() {
            const errorMessage = ref(null)
            const setupData = inject('setupData')
            const advanceStep = inject('advanceStep')
            const testingDb = ref(false)
            const attemptedToAdvance = ref(false)

            const connectionInfo = computed(() => {
                return {
                    type: setupData.project.databaseConnectionType,
                    host: setupData.project.databaseHost,
                    port: setupData.project.databasePort,
                    username: setupData.project.databaseUsername,
                    password: setupData.project.databasePassword,
                }
            })

            watch(connectionInfo, (value) => {
                setupData.project.databaseTestPassed = false
                attemptedToAdvance.value = false
            })

            const testConnection = () => {
                if (testingDb.value) return

                errorMessage.value = null

                testingDb.value = true
                setupData.project.databaseTestPassed = false

                fetch(`${setupData.host}/setup/actions/test-database-connection`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(connectionInfo.value),
                })
                    .then((result) => {
                        let json = result
                            .json()
                            .then((json) => {
                                if (!result.ok) throw new Error(json.message)

                                return json
                            })
                            .then((json) => {
                                setupData.project.databaseTestPassed = true

                                setupData.project.databases = json.databases.filter((database) => {
                                    if (database !== 'sys') {
                                        return database
                                    }
                                })

                                testingDb.value = false

                                if (attemptedToAdvance.value) attemptAdvance()
                            })
                            .catch((e) => {
                                errorMessage.value = e.message
                                testingDb.value = false
                            })
                    })
                    .catch((e) => {
                        errorMessage.value = e.message
                        testingDb.value = false
                    })
            }

            const attemptAdvance = () => {
                attemptedToAdvance.value = true

                if (setupData.project.databaseTestPassed) return advanceStep()

                testConnection()
            }

            return {
                errorMessage,
                testingDb,
                testConnection,
                attemptAdvance,
                setupData,
            }
        },
    }
</script>
