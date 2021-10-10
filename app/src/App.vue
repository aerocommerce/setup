<template>

  <div class="bg-alpha-1100 min-h-screen text-white xl:flex xl:flex-row h-screen xl:overflow-auto xl:h-auto">

    <aside class="relative xl:flex-grow p-6 xl:order-2 overflow-hidden">

      <transition name="fade">
        <div v-if="!stepsComplete" class="float-right xl:float-none mb-6 xl:mb-0 xl:absolute xl:top-6 xl:right-6">
          <LanguageSelector v-model="setupData.locale"/>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="!stepsComplete"
             class="hidden illustration:block fixed top-1/2 ml-12 max-h-illustration h-full w-auto transition-transform"
             :style="{ transform: 'translateX(calc(-33vh *' + (currentStep < 6 ? currentStep : (currentStep+1.75)) + ')) translateY(-50%)' }"
             :class="currentStep === 6 ? 'duration-150 delay-1000' : 'duration-1000 delay-150'">
          <Illustration :step="currentStep"/>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="!stepsComplete"
             class="hidden xl:block illustration:hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-full max-w-48 opacity-70">
          <Logo/>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="!stepsComplete">
          <div class="mb-12 xl:absolute z-20 top-6 left-6 md:top-12 md:left-12">
            <p class="text-3xl uppercase font-medium xl:mb-2" v-show="setupData.project.name.length">
              {{ setupData.project.name }}&nbsp;</p>
            <span class="text-lg text-alphaLight-900">{{ storeDomain }}</span>
          </div>

          <div
              class="xl:absolute z-20 xl:bottom-12 flex flex-col md:flex-row gap-6 md:flex-wrap md:items-center md:justify-between xl:inline xl:left-auto xl:right-12 w-full xl:pr-0 xl:pl-24">

            <transition name="fade">
              <div v-if="setupData.agora && !currentStepEntry.subComponent"
                   class="hidden xl:flex items-center xl:justify-end gap-2 xl:mb-6">
                <p class="text-2xl text-alpha-100">Hi, {{ setupData.agora.user.name }}!</p>
                <span class="text-4xl" :class="setupData.agora && currentStep === 2 ? 'animation-wave' : ''">👋</span>
              </div>
            </transition>

            <div class="flex flex-wrap flex-col xl:flex-row gap-6 justify-between xl:items-center">

              <div class="flex items-center gap-3">
                <span class="flex-shrink-0 w-3 h-3 block rounded-full animation-blink border-2 border-alphaLight-400"
                      :title="serviceWorkerStatus" :class="serviceWorkerConnected ? 'bg-green' : (serviceWorkerConnected === false ? 'bg-red' : 'bg-gray')"></span>
                <span class="text-sm text-alpha-100">{{ serviceWorkerStatus }}</span>
              </div>


              <ol class="flex flex-wrap gap-3 items-center text-alpha">
                <li v-for="(step, stepIndex) in steps" class="flex items-center">
                  <button @click.prevent="!stepsComplete && currentStep > stepIndex ? jumpToStep(stepIndex) : null"
                          :disabled="stepsComplete || currentStep <= stepIndex">
                    <component :is="step.icon" class="h-6 w-6 transition-color duration-300"
                               :class="[ (currentStep > stepIndex || stepsComplete) ? 'text-green' : currentStep === stepIndex ? 'text-alpha-100' : 'text-alpha' ]"
                               aria-hidden="true"/>
                  </button>
                </li>
              </ol>

            </div>

          </div>
        </div>
      </transition>

      <!-- Theme overlay -->
      <transition name="delayFade">
        <component v-if="currentStepEntry.hasOwnProperty('subComponent')" :is="currentStepEntry.subComponent"/>
      </transition>

    </aside>

    <transition name="slide">

      <main v-if="!stepsComplete"
            class="relative bg-alpha-900 shadow z-10 xl:min-h-full overflow-auto transition-all duration-300 delay-300 ease-linear"
            :class="[ currentStepEntry.size === 'small' ? 'w-full xl:max-w-2xl' : 'w-full xl:max-w-[50vw]' ]">
        <div class="xl:relative md:px-6 xl:py-0 h-full">
          <component :is="currentStepEntry.component"/>
        </div>
      </main>

    </transition>

    <transition name="slowFade">

      <main v-if="stepsComplete"
            class="fixed z-40 w-full h-full top-0 left-0 flex flex-col items-center justify-center">
        <InstallProgress/>
      </main>

    </transition>

    <!-- Install modal - not sure if we can add it to the final step instead of the main file -->
    <Modal :is-open="installModal">
      <template #title>
        Begin install
      </template>
      <template #description>
        The installation process will take a short time so grab a cup of tea, sit back and relax while we install your
        store.
      </template>
      <div class="flex flex-wrap justify-between gap-6">
        <button type="button" class="button button-red" @click="installModal = false">
          Cancel
        </button>

        <button type="button" class="button button-secondary uppercase" @click="installStore()" :disabled="!serviceWorkerConnected">
          Install my store
          <span class="ml-4"><LightningBoltIcon/></span>
        </button>
      </div>
    </Modal>

    <!-- Status modal -->
    <Modal :is-open="serviceWorkerConnected === false" :is-error="true">
      <template #title>
        Connection lost
      </template>
      <template #description>
        We have lost connection to the service worker, please run the following command in the project root directory:
        <code class="block rounded bg-white text-black mt-6 px-4 py-3">php artisan setup</code>
      </template>

      <div class="flex flex-wrap justify-end gap-6">
        <button type="button" class="button button-secondary" @click="serviceWorkerConnected = null">
          Got it 👍
        </button>
      </div>
    </Modal>

  </div>

</template>

<script>
import { ref, computed, provide, reactive, onMounted, watch } from 'vue'
import { LightningBoltIcon } from '@heroicons/vue/outline'

import Illustration from './components/Elements/Illustration.vue'
import Logo from './components/Elements/Logo.vue'
import LanguageSelector from './components/Elements/LanguageSelector.vue'
import Modal from './components/Elements/Modal.vue'
import InstallProgress from './components/InstallProgress.vue'
import ImageUpload from './components/Elements/ImageUpload.vue'
import Steps from './steps'
import baseProject from './project'

const steps = Steps

const currentStep = ref(0)
const setupComplete = ref(false)
const stepsComplete = ref(false)
const installModal = ref(false)
const currentStepEntry = computed(() => steps[currentStep.value])
const totalSteps = steps.length

let serviceWorkerConnected = ref(null)
let serviceWorkerStatus = ref(null)

let baseData = {
  agora: null,
  locale: 'en_GB',
  project: baseProject,
  host: window.location.origin,
  installComplete: false,
}

const setupData = reactive({
  ...JSON.parse(JSON.stringify(baseData)),
  reset() {
    let data = JSON.parse(JSON.stringify(baseData))
    this.agora = data.agora
    this.project = data.project
  },
})

export default {
  components: {
    Illustration,
    InstallProgress,
    Logo,
    LanguageSelector,
    Modal,
    ImageUpload,
    LightningBoltIcon,
  },
  setup() {

    provide('advanceStep', () => {
      if (currentStep.value + 1 === totalSteps) {
        installModal.value = true
      } else {
        currentStep.value++
      }
    })

    provide('retreatStep', () => {
      currentStep.value--
    })

    onMounted(() => {
      window.onbeforeunload = function () {
        return 'Do you really want to refresh this tab and lose your progress?';
      }
    })

    const jumpToStep = (step) => {
      currentStep.value = step
    }

    const installStore = () => {
      stepsComplete.value = true
      installModal.value = false
    }

    provide('jumpToStep', jumpToStep)

    provide('currentStep', currentStep)
    provide('currentStepEntry', currentStepEntry)
    provide('totalSteps', totalSteps)
    provide('setupData', setupData)

    const storeDomain = document.location.hostname

    watch(serviceWorkerConnected, (value) => {
      switch (value) {
        case true:
          serviceWorkerStatus.value = 'Connected'
          break
        case null:
          serviceWorkerStatus.value = 'Connecting...'
          break
        case false:
          serviceWorkerStatus.value = 'Disconnected'
          break
      }
    })

    const checkConnection = () => {
      fetch(`${setupData.host}/setup/actions/check-connection`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
          .then((result) => {
            result.json()
                .then(json => {
                  serviceWorkerConnected.value = json.hasOwnProperty('connected') && json.connected
                })
          })
    }

    let connectionInterval = setInterval(() => {
      if (setupData.installComplete) {
        clearInterval(connectionInterval)

        return
      }

      checkConnection()
    }, 5000)

    setTimeout(checkConnection, 500)

    return {
      jumpToStep,
      setupData,
      steps,
      storeDomain,
      stepsComplete,
      setupComplete,
      currentStep,
      currentStepEntry,
      serviceWorkerConnected,
      serviceWorkerStatus,
      installModal,
      installStore,
    }
  },
}
</script>
