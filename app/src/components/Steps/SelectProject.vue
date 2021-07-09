<template>
	<Step>

		<template #title>
			Project
		</template>

		<template #description>
			Projects are used to manage your stores Aero credentials.
			You can create a new project if you're developing locally or you can choose an existing project to continue development.
		</template>

    <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>

    <form @submit.prevent="attemptAdvance" method="post">

      <div class="mb-9">

        <ContentGroup id="new-project" v-model="setupData.project.type" name="projectType" value="new_project">

          <template #title>
            Create new project
          </template>

          <label for="project-name" class="mb-1">Project name</label>
          <input type="text" id="project-name" ref="projectName" v-model="setupData.project.name" placeholder="Enter project name" autocomplete="off">

        </ContentGroup>

      </div>

      <div>

        <ContentGroup id="existing-project" v-model="setupData.project.type" name="projectType" value="existing_project">

          <template #title>
            Select existing project
          </template>

          <label for="existing-project" class="mb-1">Select project</label>
          <select id="existing-project" v-model="setupData.project.id">
            <option :value="null" disabled>Select an existing project</option>
            <option v-for="project in existingProjects" :value="project.id">{{ project.name }}</option>
          </select>

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
  import {computed, inject, ref, watch, onMounted, nextTick} from 'vue'
	import BackButton from '../Elements/BackButton.vue'
	import NextButton from '../Elements/NextButton.vue'
	import ContentGroup from '../Elements/ContentGroup.vue'
	import ErrorMessage from '../Elements/ErrorMessage.vue'
	import Step from '../Step.vue'

	export default {
		components: {
			BackButton,
			NextButton,
			Step,
			ContentGroup,
			ErrorMessage
		},
		setup() {
			const setupData = inject('setupData')
      const advanceStep = inject('advanceStep')
      const errorMessage = ref(null)
      const existingProjects = ref([])

      errorMessage.value = null

      fetch('https://agora.test/api/projects', {
        headers: {
          'Authorization': `Bearer ${setupData.agora.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {
        let json = result.json()
            .then(json => {
              if (! result.ok) throw new Error(json.message)

              return json
            })
            .then((json) => {
              existingProjects.value = json.projects
            })
            .catch((e) => {
              errorMessage.value = e.message
            })
      })
      .catch((e) => {
        errorMessage.value = e.message
      })

      const projectName = ref(null)
      const selectedProject = computed(() => setupData.project.id)
      const selectedProjectType = computed(() => setupData.project.type)
      const selectProjectName = computed(() => setupData.project.name)

      watch(selectedProject, (value) => {
        existingProjects.value.forEach((project) => {
          if (project.id === value) {
            setupData.project.token = project.token;
            setupData.project.name = project.name

            return
          }
        })
      })

      watch(selectedProjectType, (value) => {
        setupData.project.id = null
        setupData.project.name = ''
        errorMessage.value = null

        nextTick(() => {
          if (value === 'new_project' && projectName.value) projectName.value.focus()
        })
      })

      watch(selectProjectName, (value) => {
        setupData.project.database = ''
        setupData.project.store.name = value
      })

      onMounted(() => {
        nextTick(() => {
          setTimeout(() => {
            !setupData.project.name.length && projectName.value && projectName.value.focus()
          }, 50)
        })
      })

      const attemptAdvance = () => {
        errorMessage.value = null

			  if (selectedProjectType.value === 'new_project') {
          if (!setupData.project.name.length) {
            errorMessage.value = 'Please enter a project name.'
            return
          }

          let found = false;
          Object.entries(existingProjects.value).forEach((value) => {
              if (value[1].name.toLowerCase() === setupData.project.name.toLowerCase()) {
                found = true;
              }
          })

          if (found) {
            errorMessage.value = 'Project with the provided name already exists!'
            return
          }
        } else {
          if (!setupData.project.id) {
            errorMessage.value = 'Please select a project.'
            return
          }
        }

			  return advanceStep()
      }

			return {
        attemptAdvance,
        errorMessage,
        projectName,
        existingProjects,
				setupData,
        selectedProject,
			}
		},
	}
</script>
