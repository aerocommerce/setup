<template>
	<Step>

		<template #title>
			Admin account
		</template>

		<template #description>
			The last thing we need to do is setup your account for accessing the admin of your store.
		</template>

    <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>

<!--		<div class="mb-9">-->
<!--			<SuccessMessage>The database you have selected already has an admin account</SuccessMessage>-->
<!--		</div>-->

		<div class="mb-9">
			<ContentGroup id="create-new" v-model="setupData.project.admin.create" group="admin-account" :value="true">

				<template #title>
					Create admin account
				</template>

				<div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-6">
					<div>
						<label for="admin-username" class="mb-1">Name</label>
						<input type="text" id="admin-username" name="admin-username" v-model="setupData.project.admin.name" placeholder="Enter your name">
					</div>

					<div>
						<label for="admin-email" class="mb-1">Email address</label>
						<input type="email" id="admin-email" name="admin-email" v-model="setupData.project.admin.email" placeholder="Enter email address">
					</div>

					<div>
						<label for="admin-password" class="mb-1">Password</label>
						<input type="password" id="admin-password" name="admin-password" v-model="setupData.project.admin.password" placeholder="Enter password">
					</div>
				</div>

			</ContentGroup>
		</div>

		<div>
			<ContentGroup id="skip-account" v-model="setupData.project.admin.create" group="admin-account" :value="false">

				<template #title>
					Skip this step and continue
				</template>
				
			</ContentGroup>
		</div>

		<template #footer="{ retreatStep }">
			<BackButton :action="retreatStep" />
			<NextButton :action="attemptAdvance" />
		</template>

	</Step>
</template>

<script>
	import BackButton from '../Elements/BackButton.vue'
	import NextButton from '../Elements/NextButton.vue'
	import ContentGroup from '../Elements/ContentGroup.vue'
	import SuccessMessage from '../Elements/SuccessMessage.vue'
  import ErrorMessage from '../Elements/ErrorMessage.vue'
	import Step from '../Step.vue'
  import {inject, ref} from "vue";

	export default {
		components: {
			BackButton,
			NextButton,
			ContentGroup,
			SuccessMessage,
      ErrorMessage,
			Step,
		},

    setup() {
      const setupData = inject('setupData')
      const advanceStep = inject('advanceStep')
      const errorMessage = ref(null)

      const attemptAdvance = () => {
        errorMessage.value = null

        if (setupData.project.admin.create === true) {
          let name = document.getElementById('admin-username').value;
          let email = document.getElementById('admin-email').value;
          let password = document.getElementById('admin-password').value;

          if (name === '') {
            errorMessage.value = 'You must provide a user name for the admin account.'

            return;
          }

          if (email === '') {
            errorMessage.value = 'You must provide an email for the admin account.'

            return;
          }

          if (password === '') {
            errorMessage.value = 'You must provide a password for the admin account.'

            return;
          }
        }

        return advanceStep()
      }

      return {
		    setupData,
        attemptAdvance,
        errorMessage,
      }
    }
	}
	</script>
