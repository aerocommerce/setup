<template>
  <div class="hidden xl:block absolute z-10 top-0 left-0 w-full h-full bg-alpha-900">

    <svg class="absolute z-10 top-0 left-0 w-full h-auto pointer-events-none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1008" height="318" viewBox="0 0 1008 318">
      <defs>
        <linearGradient id="linear-gradient" x1="0.5" y1="1" x2="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#181926" stop-opacity="0"/>
          <stop offset="0.507" stop-color="#181926" stop-opacity="0.78"/>
          <stop offset="1" stop-color="#181926"/>
        </linearGradient>
      </defs>
      <path id="Path_1083" data-name="Path 1083" d="M0,0H1008V318H0Z" fill="url(#linear-gradient)"/>
    </svg>

    <svg class="absolute z-30 bottom-0 left-0 w-full h-auto pointer-events-none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1008" height="312" viewBox="0 0 1008 312">
      <defs>
        <linearGradient id="linear-gradient-2" x1="0.5" y1="1" x2="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#181926" stop-opacity="0"/>
          <stop offset="0.507" stop-color="#181926" stop-opacity="0.78"/>
          <stop offset="1" stop-color="#181926"/>
        </linearGradient>
      </defs>
      <path id="Path_1084" data-name="Path 1084" d="M0,0H1008V312H0Z" transform="translate(1008 312) rotate(180)" fill="url(#linear-gradient-2)"/>
    </svg>

    <div class="relative mt-36 px-12 flex flex-col h-full overflow-auto z-20" :class="{ 'hidden' : setupData.project.themes === 0 }">
      <div class="mb-96">

        <h2 class="text-5xl font-medium text-white mb-1" v-text="setupData.project.theme.name"></h2>

        <template v-if="setupData.project.theme.organization">
          <p class="text-alphaLight-800" v-text="'by ' + setupData.project.theme.organization.name"></p>
        </template>
        <template v-else>
          <p class="text-alphaLight-800" v-text="'by ' + setupData.project.theme.author.name"></p>
        </template>

        <hr class="my-6">

        <div class="flex flex-wrap">

          <div class="mr-12 mb-6" v-if="setupData.project.theme.frameworks.length">
            <p class="text-xs text-alphaLight-800">Frameworks</p>
            <div v-for="(framework, index) in setupData.project.theme.frameworks" class="inline-flex">
              <span class="text-white inline" v-text="framework"></span>
              <span v-if="index !== Object.keys(setupData.project.theme.frameworks).length - 1">,&nbsp</span>
            </div>
          </div>

        </div>

        <p class="text-alphaLight-800 mb-12" v-text="setupData.project.theme.description"></p>

        <img :src="setupData.project.theme.thumbnail" alt="">

      </div>
    </div>

  </div>
</template>

<script>
import {ref, inject, onMounted, onBeforeUnmount, computed, watch} from 'vue'

import Logo from './Elements/Logo.vue'
import { QuestionMarkCircleIcon } from '@heroicons/vue/outline'

export default {
  components: {
    Logo,
    QuestionMarkCircleIcon,
  },

  setup() {
    const setupData = inject('setupData')
    const advanceStep = inject('advanceStep')
    const errorMessage = ref(null)

    return {
      setupData,
      advanceStep,
      errorMessage,
    }
  },
}
</script>
