<template>
	<Step>

		<template #title>
			Database server
		</template>

		<template #description>
			The database is used to store your products and everything else to do with your store.
      You can choose to connect to a local or remote database depending on your setup.
		</template>

    <!-- <ErrorMessage>Connection failed please try again</ErrorMessage> -->

    <form @submit.prevent="attemptAdvance" method="post">

      <div class="mb-9">

        <ContentGroup id="local-db-server" v-model="setupData.project.databaseType" name="databaseType" value="local">

          <template #title>
            Local database setup
          </template>

          <div class="mb-6 flex items-center">

            <div class="w-full">
              <label for="local-host-name" class="mb-1">Host name</label>
              <input type="text" id="local-host-name" placeholder="Enter host name" v-model="setupData.project.databaseHost">
            </div>

            <div class="px-6">
              <label class="mb-1">&nbsp;</label>
              <p>:</p>
            </div>

            <div class="">
              <label for="local-port-number" class="mb-1">Port number</label>
              <input type="text" id="local-port-number" placeholder="Enter port no" v-model="setupData.project.databasePort">
            </div>

          </div>

          <div class="mb-6">
            <SingleAccordion v-model="setupData.project.showAdvancedDatabaseOptions">

              <template #title>
                <span class="text-sm uppercase underline">Advanced settings</span>
              </template>

              <div class="mb-6">
                <label for="local-username" class="mb-1">Database username</label>
                <input type="text" id="local-username" placeholder="Enter database username" v-model="setupData.project.databaseUsername">
              </div>

              <div>
                <label for="local-pasword" class="mb-1">Database pasword</label>
                <input type="password" id="local-pasword" placeholder="Enter database pasword" v-model="setupData.project.databasePassword">
              </div>

            </SingleAccordion>
          </div>

          <button class="button button-secondary" type="button" @click="setupData.testingDb = !setupData.testingDb">
            <RefreshIcon class="mr-2 transition-transform duration-300 rotate-0" :class="{ 'animation-rotate': setupData.testingDb }" />
            Test connection
          </button>

        </ContentGroup>

      </div>

      <div>

        <ContentGroup id="remote-db-server" v-model="setupData.project.databaseType" name="databaseType" value="remote">

          <template #title>
            Remote database setup
          </template>

          <div class="mb-6 flex items-center">

            <div class="w-full">
              <label for="remote-host-name" class="mb-1">Host name</label>
              <input type="text" id="remote-host-name" name="remote-host-name" placeholder="Enter host name" autofocus value="">
            </div>

            <div class="px-6">
              <label class="mb-1">&nbsp;</label>
              <p>:</p>
            </div>

            <div class="">
              <label for="remote-port-number" class="mb-1">Port number</label>
              <input type="text" id="remote-port-number" name="remote-port-number" placeholder="Enter port no" autofocus value="">
            </div>

          </div>

          <div class="mb-6">
            <SingleAccordion>

              <template #title>
                <span class="text-sm uppercase underline">Advanced settings</span>
              </template>

              <div class="mb-6">
                <label for="remote-username" class="mb-1">Database username</label>
                <input type="text" id="remote-username" name="remote-username" placeholder="Enter database username">
              </div>

              <div>
                <label for="remote-pasword" class="mb-1">Database pasword</label>
                <input type="password" id="remote-pasword" name="remote-pasword" placeholder="Enter database pasword">
              </div>

            </SingleAccordion>
          </div>

          <button class="button button-secondary" type="button" @click="setupData.testingDb = !setupData.testingDb">
            <RefreshIcon class="mr-2 transition-transform duration-300 rotate-0" :class="{ 'animation-rotate': setupData.testingDb }" />
            Test connection
          </button>

        </ContentGroup>

      </div>

    </form>

		<template #footer="{ retreatStep }">
			<BackButton :action="retreatStep" />
			<NextButton :action="attemptAdvance" />
		</template>

	</Step>
</template>

<script>
	import { inject, computed, watch } from 'vue'
	import BackButton from '../Elements/BackButton.vue'
	import NextButton from '../Elements/NextButton.vue'
	import ContentGroup from '../Elements/ContentGroup.vue'
	import ErrorMessage from '../Elements/ErrorMessage.vue'
	import SingleAccordion from '../Elements/SingleAccordion.vue'
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
			RefreshIcon,
		},

		setup() {
			const setupData = inject('setupData')
      const advanceStep = inject('advanceStep')

      const connectionInfo = computed(() => {
        return {
          type: setupData.project.databaseType.value,
          host: setupData.project.databaseHost.value,
          port: setupData.project.databasePort.value,
          username: setupData.project.databaseUsername.value,
          password: setupData.project.databasePassword.value,
        }
      })

      watch(connectionInfo, (value) => {
        setupData.project.databaseTestPassed = false
      })

      const attemptAdvance = () => {


        advanceStep()
      }
			
			return {
        attemptAdvance,
				setupData,
			}
		},
	}
</script>
