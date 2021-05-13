<template>
	<Step>

		<template #title>
			Admin account
		</template>

		<template #description>
			The last thing we need to do is setup your account for accessing the admin of your store.
		</template>

		<div class="mb-9">
			<SuccessMessage>The database you have selected already has an admin account</SuccessMessage>
		</div>

		<div class="mb-9">
			<ContentGroup id="create-new" :selected="false" group="admin-account">

				<template #title>
					Create admin account
				</template>

				<div class="mb-6">
					<label for="admin-username" class="mb-1">Name</label>
					<input type="text" id="admin-username" name="admin-username" placeholder="Enter your name">
				</div>

				<div class="mb-6">
					<label for="admin-email" class="mb-1">Email address</label>
					<input type="email" id="admin-email" name="admin-email" placeholder="Enter email address">
				</div>

				<div>
					<label for="admin-password" class="mb-1">Password</label>
					<input type="password" id="admin-password" name="admin-password" placeholder="Enter password">
				</div>

			</ContentGroup>
		</div>

		<div>
			<ContentGroup id="skip-account" :selected="true" group="admin-account">

				<template #title>
					Skip this step and continue
				</template>
				
			</ContentGroup>
		</div>

		<template #footer="{ advanceStep, retreatStep }">
			<BackButton :action="retreatStep" />
			<NextButton :action="advanceStep" />
		</template>

	</Step>
</template>

<script>
	import BackButton from '../Elements/BackButton.vue'
	import NextButton from '../Elements/NextButton.vue'
	import ContentGroup from '../Elements/ContentGroup.vue'
	import SuccessMessage from '../Elements/SuccessMessage.vue'
	import Step from '../Step.vue'

	export default {
		components: {
			BackButton,
			NextButton,
			ContentGroup,
			SuccessMessage,
			Step,
		},
	}
	</script>
