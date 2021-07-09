<template>

  <div class="w-full xl:max-w-screen-1/3 px-12">

    <div class="absolute xl:max-w-screen-1/3 px-12 w-full top-1/2 left-1/2 transform -translate-x-1/2 flex flex-col items-center" :class="setupData.installComplete ? 'animate-up' : '-translate-y-1/2'">
      <div class="mb-12 text-center">
        <p class="text-xl md:text-3xl uppercase font-medium mb-2">{{ setupData.project.name }}</p>
        <span class="text-sm md:text-base text-alphaLight-900">{{ storeDomain }}</span>
      </div>
      
      <progress class="mb-6" :value="setupData.progress" max="100"></progress>

      <p class="mb-12 text-sm text-alphaLight-800" v-html="setupData.progressText"></p>

      <ol class="flex flex-wrap gap-3 items-center text-alpha px-12 xl:px-0">
        <li v-for="(step, stepIndex) in steps">
          {{setupData.progressStep.split}}
          <span>
            <component :is="step.icon" class="h-6 w-6 transition duration-150" aria-hidden="true" :class="[ (setupData.progressStep > stepIndex || stepsComplete) ? 'text-green' : setupData.progressStep === stepIndex ? 'text-alpha-100' : 'text-alpha' ]" />
          </span>
        </li>
      </ol>
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
          <a href="/" class="button button-green hover:no-underline uppercase px-12 py-4 mb-3 text-center">View store</a>
          <a href="/admin" class="button button-transparent uppercase text-white underline">Login to admin</a>
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

      if (!setupData.agora.user) {
        jobs.push({
          class: 'Aero\\Setup\\Commands\\Actions\\Authenticate',
          message: 'Connecting to Agora',
          options: {},
        });
      }

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
        let [projectUsername, projectPassword] = btoa(setup.project.token).split(':')

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
            class: 'Aero\\Setup\\Commands\\Actions\\CreateStoreConfig',
            message: 'Creating a store config',
            options: {},
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
            class: 'Aero\\Setup\\Commands\\Actions\\InstallTheme',
            message: 'Installing the theme',
            options: {},
          }
      )

      jobs.push({
        class: 'Aero\\Setup\\Commands\\Actions\\InstallDependencies',
        message: 'Seeding catalog data',
        options: {
          url: setupData.project.catalog.url
        },
      })

      if (setup.project.catalog.type === 'import') {
        jobs.push({
          class: 'Aero\\Setup\\Commands\\Actions\\SeedCatalogData',
          message: 'Seeding catalog data',
          options: {
            url: setupData.project.catalog.url
          },
        })
      }

      if (setup.project.admin.create) {
        jobs.push({
          class: 'Aero\\Setup\\Commands\\Actions\\CreateAdminAccount',
          message: 'Creating the admin account',
          options: {},
        })
      }

      if (setup.project.store.logo.store !== '' || setup.project.store.logo.store !== '') {
        jobs.push({
          class: 'Aero\\Setup\\Commands\\Actions\\CopyLogoImages',
          message: 'Copying resources',
          options: {},
        })
      }

      return jobs;
    }

    const updateProgress = () => {

      setupData.progress = setupData.progress + 1

      if(setupData.progress < 100) {

          setTimeout(() => {
            updateProgress()
            updateText(setupData.progress)
          }, 100)

      } else if (setupData.progress === 100) {
        
        setTimeout(() => {
          setupData.installComplete = true
        }, 1200)

      }
    }

    // Append a list of jobs based on choices in UI to setupData
    let jobs = generateJobList(setupData);

    console.log(jobs)

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

    // this isn't good, but it worked for the purposes of testing the animations and design
    const updateText = (progress) => {

      if (progress < 10) {
        if(progress = 10) {
            setupData.progressStep = 0;
        }
        setupData.progressText = 'Connecting to Agora'
      } else if (progress < 20) {
        if(progress = 20) {
            setupData.progressStep = 1;
        }
        setupData.progressText = 'Creating the project'
      } else if (progress < 30) {
        if(progress = 30) {
            setupData.progressStep = 2;
        }
        setupData.progressText = 'Connecting to database server'
      } else if (progress < 40) {
        if(progress = 40) {
            setupData.progressStep = 3;
        }
        setupData.progressText = 'Creating the database'
      } else if (progress < 50) {
        if(progress = 50) {
            setupData.progressStep = 4;
        }
        setupData.progressText = 'Connecting to Elasticsearch server'
      } else if (progress < 60) {
        if(progress = 60) {
            setupData.progressStep = 5;
        }
        setupData.progressText = 'Creating ' + setupData.project.name
      } else if (progress < 70) {
        if(progress = 70) {
            setupData.progressStep = 6;
        }
        setupData.progressText = 'Applying the ' + setupData.project.theme.name + ' theme'
      } else if (progress < 80) {
        if(progress = 80) {
            setupData.progressStep = 7;
        }
        setupData.progressText = 'Updating the catalog'
      } else if (progress < 90) {
        if(progress = 90) {
            setupData.progressStep = 8;
        }
        setupData.progressText = 'Creating an admin account'
      } else if (progress < 100) {
        if(progress = 100) {
            setupData.progressStep = 9;
        }
        setupData.progressText = 'Checking things over...'
      } else if (progress = 100) {
        if(progress = 100) {
            setupData.progressStep = 10;
        }
        setupData.progressText = 'Setup complete!'
      }

    }

    return {
				setupData,
        storeDomain,
        steps,
        Logo
			}
  }
}
</script>
