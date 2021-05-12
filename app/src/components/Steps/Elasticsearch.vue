<template>
	<Step>

		<template #title>
			Elasticsearch connection
		</template>

		<template #description>
			Elasticsearch is used to index your product listings in order for the data to be rapidly searchable, sortable and filterable.
      You can choose to connect to a local or remote instance depending on your setup.
		</template>

    <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>

    <form @submit.prevent="attemptAdvance" method="post">

      <div class="mb-9">

        <ContentGroup id="local-es" v-model="setupData.project.elasticsearchConnectionType" name="elasticsearchConnectionType" value="local">

          <template #title>
            Local Elasticsearch connection
          </template>

          <div class="mb-6 flex items-center">

            <div class="w-full">
              <label for="local-es-host-name" class="mb-1">Host name</label>
              <input type="text" id="local-es-host-name" placeholder="Enter host name" v-model="setupData.project.elasticsearchHost">
            </div>

            <div class="px-6">
              <label class="mb-1">&nbsp;</label>
              <p>:</p>
            </div>

            <div class="">
              <label for="local-es-port-number" class="mb-1">Port number</label>
              <input type="number" id="local-es-port-number" placeholder="Enter port no" autocomplete="off" v-model="setupData.project.elasticsearchPort">
            </div>

          </div>

          <div class="mb-6">
            <SingleAccordion v-model="setupData.project.showAdvancedElasticsearchOptions">

              <template #title>
                <span class="text-sm uppercase underline">Advanced settings</span>
              </template>

              <div>
                <label for="local-es-store-id" class="mb-1">Store identifier</label>
                <input type="text" id="local-es-store-id" placeholder="Enter store identifier" autocomplete="off" v-model="setupData.project.storeIdentifier">
              </div>

            </SingleAccordion>
          </div>

          <div v-if="setupData.project.elasticsearchTestPassed">
            <SuccessMessage>Successful connection</SuccessMessage>
          </div>
          <button v-else class="button button-secondary" type="button" @click="testConnection">
            <RefreshIcon class="mr-2 transition-transform duration-300 rotate-0" :class="{ 'animation-rotate': testingEs }" />
            Test connection
          </button>

        </ContentGroup>

      </div>

      <div>

        <ContentGroup id="remote-es" v-model="setupData.project.elasticsearchConnectionType" name="elasticsearchConnectionType" value="remote">

          <template #title>
            Remote Elasticsearch connection
          </template>

          <div class="mb-6 flex items-center">

            <div class="w-full">
              <label for="local-es-host-name" class="mb-1">Host name</label>
              <input type="text" id="local-es-host-name" placeholder="Enter host name" v-model="setupData.project.elasticsearchHost">
            </div>

            <div class="px-6">
              <label class="mb-1">&nbsp;</label>
              <p>:</p>
            </div>

            <div class="">
              <label for="local-es-port-number" class="mb-1">Port number</label>
              <input type="number" id="local-es-port-number" placeholder="Enter port no" autocomplete="off" v-model="setupData.project.elasticsearchPort">
            </div>

          </div>

          <div class="mb-6">
            <SingleAccordion v-model="setupData.project.showAdvancedElasticsearchOptions">

              <template #title>
                <span class="text-sm uppercase underline">Advanced settings</span>
              </template>

              <div>
                <label for="local-es-store-id" class="mb-1">Store identifier</label>
                <input type="text" id="local-es-store-id" placeholder="Enter store identifier" autocomplete="off" v-model="setupData.project.storeIdentifier">
              </div>

            </SingleAccordion>
          </div>

          <div v-if="setupData.project.elasticsearchTestPassed">
            <SuccessMessage>Successful connection</SuccessMessage>
          </div>
          <button v-else class="button button-secondary" type="button" @click="testConnection">
            <RefreshIcon class="mr-2 transition-transform duration-300 rotate-0" :class="{ 'animation-rotate': testingEs }" />
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
  import {computed, inject, ref, watch} from 'vue'
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
      SuccessMessage,
			SingleAccordion,
			RefreshIcon,
		},

		setup() {
      const errorMessage = ref(null)
			const setupData = inject('setupData')
      const advanceStep = inject('advanceStep')
      const testingEs = ref(false)
      const attemptedToAdvance = ref(false)

      const connectionInfo = computed(() => {
        return {
          type: setupData.project.elasticsearchConnectionType,
          host: setupData.project.elasticsearchHost,
          port: setupData.project.elasticsearchPort,
          storeIdentifier: setupData.project.storeIdentifier,
        }
      })

      watch(connectionInfo, (value) => {
        setupData.project.elasticsearchTestPassed = false
        attemptedToAdvance.value = false
      })

      if (!setupData.project.storeIdentifier) {
        let name = setupData.project.name
            .toLowerCase()
            .replace(/[\.]/g, '-')
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
        setupData.project.storeIdentifier = `${name}-${Math.random().toString(36).substr(2, 4)}`
      }

      const testConnection = () => {
        if (testingEs.value) return

        errorMessage.value = null

        testingEs.value = true
        setupData.project.elasticsearchTestPassed = false
        setupData.project.elasticsearchVersion = null

        let host = window.location.origin

        host = 'http://test.test'

        fetch(`${host}/setup/actions/test-elasticsearch-connection`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(connectionInfo.value)
        })
            .then((result) => {
              let json = result.json()
                  .then(json => {
                    if (! result.ok) throw new Error(json.message)

                    return json
                  })
                  .then((json) => {
                    setupData.project.elasticsearchTestPassed = true
                    setupData.project.elasticsearchVersion = json.major_version

                    testingEs.value = false

                    if (attemptedToAdvance.value) attemptAdvance()
                  })
                  .catch((e) => {
                    errorMessage.value = e.message
                    testingEs.value = false
                  })
            })
            .catch((e) => {
              errorMessage.value = e.message
              testingEs.value = false
            })
      }

      const attemptAdvance = () => {
        attemptedToAdvance.value = true

        if (setupData.project.elasticsearchTestPassed) return advanceStep()

        testConnection()
      }
			
			return {
        errorMessage,
				setupData,
        advanceStep,
        testingEs,
        testConnection,
        attemptAdvance,
			}
		},
	}
</script>
