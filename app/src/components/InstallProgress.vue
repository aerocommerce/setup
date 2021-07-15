<template>

  <div class="w-full xl:max-w-screen-1/3 px-12">

    <div class="absolute xl:max-w-screen-1/3 px-12 w-full top-1/2 left-1/2 transform -translate-x-1/2 flex flex-col items-center" :class="setupData.installComplete ? 'animate-up' : '-translate-y-1/2'">
      <div class="mb-12 text-center">
        <p class="text-xl md:text-3xl uppercase font-medium mb-2">{{ setupData.project.name }}</p>
        <span class="text-sm md:text-base text-alphaLight-900">{{ storeDomain }}</span>
      </div>
      
      <progress class="mb-6" :value="setupData.progress" max="100"></progress>

      <p class="mb-12 text-sm text-alphaLight-800" v-html="setupData.progressText"></p>

      <template v-if="setupData.project.errors.length">
        <ul class="list-none text-center">
          <li style="color: red" v-for="error in setupData.project.errors">{{ error }}</li>
        </ul>
      </template>
    </div>

    <ol class="absolute top-0 left-1/2 flex flex-wrap gap-3 items-center text-alpha transform -translate-x-1/2 duration-300 delay-300" :class="setupData.installComplete ? 'opacity-100 translate-y-6' : 'opacity-0'">
      <li v-for="(step, stepIndex) in steps">
        {{setupData.progressStep.split}}
        <span>
          <component :is="step.icon" class="h-6 w-6 text-green" />
        </span>
      </li>
    </ol>

    <transition name="delayFadeTwo">
      <div v-if="setupData.installComplete" class="flex flex-col items-center">
          <span class="w-full max-w-64 mb-6">
            <Logo />
          </span>
          <h3 class="text-2xl mb-24">We're all set</h3>
          <button type="button" class="button button-green hover:no-underline uppercase px-12 py-4 mb-3 text-center" @click="redirectToHome">View store</button>
          <button type="button" class="button button-transparent uppercase text-white underline" @click="redirectToAdmin">Login to admin</button>
      </div>
    </transition>

  </div>

</template>

<script>
import {inject, onMounted} from 'vue'
import Steps from '../steps'
import Logo from './Elements/Logo.vue'

const steps = Steps

export default {

  components: {
		Logo,
	},

  setup() {
    const setupData = inject('setupData');
    const storeDomain = document.location.hostname
    setupData.progress = 0
    setupData.progressText = 'Getting warmed up'
    setupData.progressStep = 0
    setupData.highestStep = 0
    setupData.installComplete = false

    onMounted(() => {
    
      setTimeout(() => {
        updateProgress()
      }, 1200)
        
    })

    const generateJobList = (setup) => {
      let jobs = [];

      if (setup.project.type === 'new_project') {
        jobs.push({
          class: 'Aero\\Setup\\Commands\\Actions\\CreateProject',
          message: 'Creating Agora project',
          options: {
            name: setup.project.name,
            domain: setup.host,
            token: setup.agora.token,
          },
        })
      } else {
        let [projectUsername, projectPassword] = window.atob(setup.project.token).split(':')

        jobs.push({
          class: 'Aero\\Setup\\Commands\\Actions\\CreateAuthFile',
          message: 'Creating auth files',
          options: {
            user: projectUsername,
            pass: projectPassword,
          },
        })
      }

      jobs.push({
        class: 'Aero\\Setup\\Commands\\Actions\\AddComposerDependencies',
        message: 'Adding composer dependencies',
        options: {},
      })

      if (setup.project.databaseType === 'new_database') {
        jobs.push({
          class: 'Aero\\Setup\\Commands\\Actions\\CreateDatabase',
          message: 'Creating the database',
          options: {
            host: setup.project.databaseHost,
            port: setup.project.databasePort,
            username: setup.project.databaseUsername,
            password: setup.project.databasePassword,
            database: setup.project.database,
          },
        })
      }

      jobs.push(
          {
            class: 'Aero\\Setup\\Commands\\Actions\\WriteStoreDetails',
            message: 'Writing store details',
            options: {
              name: setup.project.name,
              host: setup.host,
            },
          },
          {
            class: 'Aero\\Setup\\Commands\\Actions\\WriteDatabaseCredentials',
            message: 'Writing database credentials',
            options: {
              host: setup.project.databaseHost,
              port: setup.project.databasePort,
              username: setup.project.databaseUsername,
              password: setup.project.databasePassword,
              database: setup.project.database,
            },
          },
          {
            class: 'Aero\\Setup\\Commands\\Actions\\WriteElasticsearchCredentials',
            message: 'Writing Elasticsearch credentials',
            options: {
              identifier: setup.project.storeIdentifier,
              host: setup.project.elasticsearchHost,
              port: setup.project.elasticsearchPort,
            },
          },
          {
            class: 'Aero\\Setup\\Commands\\Actions\\InstallDependencies',
            message: 'Installing dependencies',
            options: {
              host: setup.project.databaseHost,
              port: setup.project.databasePort,
              username: setup.project.databaseUsername,
              password: setup.project.databasePassword,
              database: setup.project.database,
            },
          },
          {
            class: 'Aero\\Setup\\Commands\\Actions\\InstallTheme',
            message: 'Installing the theme',
            options: {
              themeKey: setup.project.theme.name,
              themeName: setup.project.theme.name.split('/')[1]
            },
          },
      )

      if (setup.project.catalog.type === 'import') {
        jobs.push({
          class: 'Aero\\Setup\\Commands\\Actions\\SeedCatalogData',
          message: 'Seeding catalog data',
          options: {
            url: setup.project.catalog.url
          },
        })
      }

      if (setup.project.admin.create) {
        jobs.push({
          class: 'Aero\\Setup\\Commands\\Actions\\CreateAdminAccount',
          message: 'Creating the admin account',
          options: {
            name: setup.project.admin.name,
            email: setup.project.admin.email,
            password: setup.project.admin.password,
            database: setup.project.database,
          },
        })
      }

      if (setup.project.store.logo.store !== '' || setup.project.store.logo.store !== '') {
        jobs.push({
          class: 'Aero\\Setup\\Commands\\Actions\\CopyLogoImages',
          message: 'Copying resources',
          options: {},
        })
      }

      jobs.push({
        class: 'Aero\\Setup\\Commands\\Actions\\Finalize',
        message: 'Finalizing',
        options: {},
      })

      return jobs;
    }

    let jobs = generateJobList(setupData);

    fetch(`${setupData.host}/setup/actions/finalize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({jobs})
    })
    .then((result) => {
      result.json()
          .then(json => {
            if (! result.ok) throw new Error(json.message)
            return json
          })
          .then((json) => {
            if (json.success) {
              setupData.project.errors = json.errors
            } else {
              // ERROR
            }
          })
          .catch((_) => {
            // ERROR
          })
    })
    .catch((_) => {
      // ERROR
    })

    function redirectToHome() {
      window.location.href = `${setupData.host}`;
    }

    function redirectToAdmin() {
      window.location.href = `${setupData.host}/admin`;
    }

    const updateProgress = () => {
      fetch(`${setupData.host}/setup/actions/ping-progress`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {
        result.json()
            .then(json => {
              if (! result.ok) throw new Error(json.message)

              return json
            })
            .then((json) => {
              if (json.message === 'Finalizing') {
                setupData.progress = 100
              }

              if(setupData.progress < 100) {

                setTimeout(() => {
                  setupData.progress = json.progress
                  setupData.progressText = json.message

                  if (setupData.progress % 10 === 0) {
                    setupData.progressStep++
                  }

                  updateProgress()
                }, 100)

              } else if (setupData.progress === 100) {

                setTimeout(() => {
                  setupData.installComplete = true

                  window.onbeforeunload = function () {
                    window.location.href = `${setupData.host}`
                  }
                }, 1200)

              }
            })
            .catch((_) => {
              // ERROR
            })
      })
      .catch((_) => {
        // ERROR
      })
    }

    return {
				setupData,
        storeDomain,
        steps,
        Logo,
        redirectToHome,
        redirectToAdmin
			}
  }
}
</script>
