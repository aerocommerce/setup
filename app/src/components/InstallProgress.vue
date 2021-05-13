<template>

  <div class="w-full max-w-screen-1/3">

    <div class="absolute max-w-screen-1/3 w-full top-1/2 left-1/2 transform -translate-x-1/2 flex flex-col items-center" :class="setupData.installComplete ? 'animate-up' : '-translate-y-1/2'">
      <div class="mb-12 text-center">
        <p class="text-xl md:text-3xl uppercase font-medium mb-2">{{ setupData.project.name }}</p>
        <span class="text-sm md:text-base text-alphaLight-900">{{ storeDomain }}</span>
      </div>
      
      <progress class="mb-6" :value="setupData.progress" max="100"></progress>

      <p class="mb-12 text-sm text-alphaLight-800" v-html="setupData.progressText"></p>

      <ol class="flex space-x-3 items-center text-alpha">
        <li v-for="(step, stepIndex) in steps">
          {{setupData.progressStep.split}}
          <span>
            <component :is="step.icon" class="h-6 w-6 transition duration-150" aria-hidden="true" :class="[ (setupData.progressStep > stepIndex || stepsComplete) ? 'text-green' : setupData.progressStep === stepIndex ? 'text-alpha-100' : 'text-alpha' ]" />
          </span>
        </li>
      </ol>
    </div>

    <ol class="absolute top-0 left-1/2 flex space-x-3 items-center text-alpha transform -translate-x-1/2 duration-300 delay-300" :class="setupData.installComplete ? 'opacity-100 translate-y-6' : 'opacity-0'">
      <li v-for="(step, stepIndex) in steps">
        {{setupData.progressStep.split}}
        <span>
          <component :is="step.icon" class="h-6 w-6 text-green" />
        </span>
      </li>
    </ol>

    <transition name="delayFade">
      <div v-if="setupData.installComplete" class="flex flex-col items-center">
          <span class="w-full max-w-64 mb-6">
            <Logo />
          </span>
          <h3 class="text-2xl mb-24">We're all set</h3>
          <a href="#" class="button bg-green border-green text-alpha-1000 hover:no-underline uppercase px-12 py-4 mb-3">View store</a>
          <a href="#" class="button button-transparent uppercase text-white underline">Login to admin</a>
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
    setupData.installComplete = false

    onMounted(() => {
    
      setTimeout(() => {
        updateProgress()
      }, 1200)
        
    })

    const updateProgress = () => {

      setupData.progress = setupData.progress + 1

      if(setupData.progress < 100) {

          setTimeout(() => {
            updateProgress()
            updateText(setupData.progress)
          }, 20)

      } else if (setupData.progress === 100) {
        
        setTimeout(() => {
          setupData.installComplete = true
        }, 1200)

      }
    }

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
        setupData.progressText = 'Creating project'
      } else if (progress < 30) {
        if(progress = 30) {
            setupData.progressStep = 2;
        }
        setupData.progressText = 'Connecting to database server'
      } else if (progress < 40) {
        if(progress = 40) {
            setupData.progressStep = 3;
        }
        setupData.progressText = 'Creating database'
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
        setupData.progressText = 'Applying ' + setupData.project.theme + ' theme'
      } else if (progress < 80) {
        if(progress = 80) {
            setupData.progressStep = 7;
        }
        setupData.progressText = 'Updating catalog'
      } else if (progress < 90) {
        if(progress = 90) {
            setupData.progressStep = 8;
        }
        setupData.progressText = 'Creating admin account'
      } else if (progress < 100) {
        if(progress = 100) {
            setupData.progressStep = 9;
        }
        setupData.progressText = 'Checking things over'
      } else if (progress = 100) {
        if(progress = 100) {
            setupData.progressStep = 10;
        }
        setupData.progressText = 'Setup complete'
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
