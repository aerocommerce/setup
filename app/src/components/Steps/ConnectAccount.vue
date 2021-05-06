<template>
	<Step>

		<template #title>
			Agora login
		</template>

		<template #description>
			We'll connect your Agora account to take care of setting up project credentials and to retrieve your package and theme purchases.
		</template>

		<!-- <ErrorMessage>Login failed, please try again.</ErrorMessage> -->

		<div class="mb-6">
			<label for="username" class="mb-1">Email address</label>
			<input type="email" id="username" name="username" placeholder="Enter email address" autofocus>
		</div>

		<div class="mb-6">
			<label for="password" class="mb-1">Password</label>
			<input type="password" id="password" name="password" placeholder="Enter password">
		</div>

		<div class="mb-6">
			<a href="https://agora.aerocommerce.com/password/reset" target="_blank" rel="noopener noreferrer">Forgotten password</a>
		</div>

		<hr class="my-6">

		<div>
			<p>Don't have an account</p>
			<a href="https://agora.aerocommerce.com/register" target="_blank" rel="noopener noreferrer">Create new account</a>
		</div>

		<template #footer="{ advanceStep, retreatStep }">
			<!-- <BackButton :action="retreatStep" /> -->
			<NextButton class="ml-auto" :action="advanceStep" />
		</template>

	</Step>
</template>

<script>
	import ErrorMessage from '../Elements/ErrorMessage.vue'
	import BackButton from '../Elements/BackButton.vue'
	import NextButton from '../Elements/NextButton.vue'
	import Step from '../Step.vue'

	export default {
		components: {
			ErrorMessage,
			BackButton,
			NextButton,
			Step,
		},
	}
</script>
