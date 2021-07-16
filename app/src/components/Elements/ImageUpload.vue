<template>
  <div v-if="!files">
    <label :for="inputName" class="[ dashed-border ] text-sm text-alphaLight-800 rounded px-6 py-12 flex items-center justify-center mb-3 hover:text-bravo focus:text-bravo hover:cursor-pointer"
           :class="[dragging === true ? 'dropZone-over' : 'dropZone']" @dragover.prevent="dragging = true" @dragleave.prevent="dragging = false" @drop.prevent="drop">

      <div class="flex items-center">
        <UploadIcon class="w-5 h-5 mr-2" />
        Drag and drop or click here to select an image...
      </div>

      <input :id="inputName" type="file" :name="inputName ? inputName : 'image'" @change="onChange" class="hidden">

    </label>
  </div>

  <div v-else>
    <label class="[ dashed-border ] text-sm text-alphaLight-800 rounded px-6 py-12 block items-center justify-center mb-3">

      <template v-if="preview !== null">
        <img :src="preview" alt="" class="mx-auto max-h-44" />
      </template>

      <div class="flex items-center justify-center mt-3 hover:cursor-pointer pt-4 pb-4 delete-image" @click.prevent="removeFile">
        <XIcon class="w-5 h-5 mr-2" />
        Delete {{ files.name }}
      </div>

    </label>
  </div>

  <div v-if="errorMessage">
    <span class="text-red">{{ errorMessage }}</span>
  </div>
</template>

<style>
.dropZone-over {
  background: #5C5C5C;
  opacity: 0.8;
}

.dropZone {
  background: transparent;
  opacity: 1;
}

.delete-image:hover {
  color: red;
}
</style>

<script>
import ErrorMessage from '../Elements/ErrorMessage.vue'
import {CheckIcon, ChevronDownIcon, GlobeIcon, XIcon} from "@heroicons/vue/outline/esm";
import {UploadIcon} from "@heroicons/vue/outline";
import {inject, ref, watch} from "vue";

export default {
  components: {
    CheckIcon,
    ChevronDownIcon,
    GlobeIcon,
    UploadIcon,
    XIcon,
    ErrorMessage,
  },

  props: {
    inputName: '',
  },

  setup(props) {
    const setupData = inject('setupData')
    const errorMessage = ref(null)
    const files = ref(null)
    const preview = ref(null)
    const dragging = ref(false)

    function onChange(e) {
      let file = e.target.files

      errorMessage.value = null

      if (!file.length) {
        dragging.value = false
        return
      }

      createFile(file[0])
    }

    function createFile(file) {
      if (document.getElementById(props.inputName).name === 'store-logo') {
        if (!file.type.match('image.svg')) {
          errorMessage.value = 'The store logo is required to be of SVG format!'
          dragging.value = false
          return
        }
      } else if (document.getElementById(props.inputName).name === 'email-logo') {
        if (!file.type.match('image.png')) {
          errorMessage.value = 'The store logo is required to be of PNG format!'
          dragging.value = false
          return
        }
      }

      if (file.size > 5000000) {
        errorMessage.value = 'File is bigger than 5MB!'
        dragging.value = false
        return
      }

      files.value = file
      dragging.value = false

      let reader = new FileReader()
      let baseString = null
      reader.onloadend = function () {
        baseString = reader.result
        preview.value = baseString
      };

      reader.readAsDataURL(file);

      if (document.getElementById(props.inputName).name === 'store-logo') {
        setupData.project.store.logo.store = file
        return
      }

      if (document.getElementById(props.inputName).name === 'email-logo') {
        setupData.project.store.logo.email = file
      }
    }

    function removeFile() {
      files.value = ''
      errorMessage.value = null

      if (document.getElementById(props.inputName).name === 'store-logo') {
        if (!file.type.match('image.svg')) {
          setupData.project.store.logo.store = ''
        }
      } else if (document.getElementById(props.inputName).name === 'email-logo') {
        if (!file.type.match('image.png')) {
          setupData.project.store.logo.email = ''
        }
      }
    }

    function drop(event) {
      errorMessage.value = null

      if (document.getElementById(props.inputName).name === 'store-logo') {
        if (!event.dataTransfer.files[0].type.match('image.svg')) {
          errorMessage.value = 'The store logo is required to be of SVG format!'
          dragging.value = false
          return
        }
      } else if (document.getElementById(props.inputName).name === 'email-logo') {
        if (!event.dataTransfer.files[0].type.match('image.png')) {
          errorMessage.value = 'The store logo is required to be of PNG format!'
          dragging.value = false
          return
        }
      }

      files.value = event.dataTransfer.files[0]

      dragging.value = false

      let reader = new FileReader()
      let baseString = null
      reader.onloadend = function () {
        baseString = reader.result
        preview.value = baseString
      };

      reader.readAsDataURL(event.dataTransfer.files[0])

      if (document.getElementById(props.inputName).name === 'store-logo') {
        setupData.project.store.logo.store = event.dataTransfer.files[0]
        return
      }

      if (document.getElementById(props.inputName).name === 'email-logo') {
        setupData.project.store.logo.email = event.dataTransfer.files[0]
      }
    }

    return {
      errorMessage,
      files,
      dragging,
      preview,
      drop,
      onChange,
      createFile,
      removeFile,
    }
  },
}
</script>
