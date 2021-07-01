<template>
	<Step>

		<template #title>
			Database
		</template>

		<template #description>
			Create or select the database you want to use for this store. We will create the tables needed if they don't already exist and scan for an existing catalog, theme and user account.
		</template>

    <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>

    <form @submit.prevent="attemptAdvance" method="post">

      <div class="mb-9">

        <ContentGroup id="new-db" v-model="setupData.project.databaseType" group="databaseType" value="new_database">

          <template #title>
            Create new database
          </template>

          <div class="mb-6">
            <label for="database-name" class="mb-1">Database name</label>
            <input type="text" id="database-name" placeholder="Enter database name" autocomplete="off" v-model="setupData.project.database">
          </div>

        </ContentGroup>

      </div>

      <div>

        <ContentGroup id="existing-db" v-model="setupData.project.databaseType" group="databaseType" value="existing_database">

          <template #title>
            Select existing database
          </template>

          <WarningMessage v-if="matchedDatabase" class="mb-6">
            A database already exists that we think you may wish to use.
            We've selected it for you below, however you can choose a different name or create a new database.
          </WarningMessage>

          <div class="mb-6">
            <select id="exisiting-db" v-model="setupData.project.database">
              <option value="">Select a database</option>
              <option v-for="database in setupData.project.databases" :value="database">{{ database }}</option>
            </select>
          </div>

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
import {inject, watch, ref, computed} from 'vue'
	import BackButton from '../Elements/BackButton.vue'
	import NextButton from '../Elements/NextButton.vue'
	import ContentGroup from '../Elements/ContentGroup.vue'
	import ErrorMessage from '../Elements/ErrorMessage.vue'
	import SingleAccordion from '../Elements/SingleAccordion.vue'
	import WarningMessage from '../Elements/WarningMessage.vue'
	import Step from '../Step.vue'
	import { RefreshIcon } from '@heroicons/vue/outline'

  const matchedDatabase = ref(false)

	export default {
		components: {
			BackButton,
			NextButton,
			Step,
			ContentGroup,
			ErrorMessage,
			SingleAccordion,
      WarningMessage,
			RefreshIcon,
		},

		setup() {
			const setupData = inject('setupData')
      const advanceStep = inject('advanceStep')
      const errorMessage = ref(null)

      const getGuessName = () => setupData.project.name
          .toLowerCase()
          .replace(/[\.]/g, '-')
          .replace(/[^a-z0-9 -]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
      const guessName = () => {
        if (!setupData.project.database.length) {
          let guessedName = getGuessName()

          setupData.project.database = guessedName

          if (setupData.project.databases.includes(guessedName)) {
            setupData.project.databaseType = 'existing_database'
            matchedDatabase.value = true
          }
        }
      }

      if (setupData.project.databaseType === 'new_database') guessName()
      else if (!setupData.project.databases.includes(setupData.project.database)) {
        setupData.project.database = ''
        matchedDatabase.value = false
      } else if (getGuessName() === setupData.project.database) matchedDatabase.value = true

      const databaseType = computed(() => setupData.project.databaseType)
      const databaseName = computed(() => setupData.project.database)

      watch(databaseType, (value) => {
        setupData.project.database = ''
      })

      watch(databaseName, (value) => {
        matchedDatabase.value = false
      })

      const attemptAdvance = () => {
        errorMessage.value = null

        if (!setupData.project.database.length) {
          if (databaseType.value === 'new_database') errorMessage.value = 'Please enter a database name.'
          else errorMessage.value = 'Please select a database.'
          return
        } else {
          let name = setupData.project.database
              .toLowerCase()
              .replace(/[a-z0-9_-]/g, '')

          if (name.length) {
            errorMessage.value = 'Invalid database name.'
            return
          }

          let found = false;
          Object.entries(setupData.project.databases).forEach((value) => {
            if (value[1] === setupData.project.database) {
              found = true;
            }
          })

          if (found) {
            errorMessage.value = 'Database with the provided name already exists!'
            return
          }
        }

        return advanceStep()
      }
			
			return {
        errorMessage,
        attemptAdvance,
				setupData,
        matchedDatabase,
			}
		},
	}
</script>
