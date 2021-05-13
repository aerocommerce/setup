<template>
  <div class="block w-full max-w-screen-1/3 flex flex-col items-center">
      <div class="mb-12 text-center">
        <p class="text-xl md:text-3xl uppercase font-medium mb-2">Demo Store</p>
        <!-- {{ setupData.project.name }} -->
			  <span class="text-sm md:text-base text-alphaLight-900">{{ storeDomain }}</span>
      </div>
      
      <progress class="mb-12" :value="setupData.progress" max="100"></progress>

      <ol class="flex space-x-3 items-center text-alpha">
					<li v-for="(step, stepIndex) in steps">
						<span>
							<component :is="step.icon" class="h-6 w-6 text-green" aria-hidden="true" />
						</span>
					</li>
				</ol>
  </div>
</template>

<script>
import {inject, onMounted} from 'vue'
import Steps from '../steps'
const steps = Steps

export default {
  setup() {
    const setupData = inject('setupData');
    const storeDomain = document.location.hostname
    setupData.progress = 0;

    onMounted(() => {
    
      updateProgress()
        
    })

    const updateProgress = () => {
      setupData.progress = setupData.progress + 1
      if(setupData.progress < 100) {
          setTimeout(() => {
            updateProgress()
          }, 50)
      }
    }

    return {
				setupData,
        storeDomain,
        steps
			}
  }
}
</script>
