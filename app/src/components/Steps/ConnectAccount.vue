<template>
    <Step>
        <template #title> Agora login </template>

        <template #description>
            We'll connect your Agora account to take care of setting up project credentials and to retrieve your module
            and theme purchases.
        </template>

        <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>

        <template v-if="setupData.agora && setupData.agora.user">
            <SuccessMessage>You are connected as {{ setupData.agora.user.name }}</SuccessMessage>

            <button @click.prevent="setupData.reset" class="button button-secondary">
                <span class="mr-4"><LogoutIcon class="transform rotate-180" /></span> Log out
            </button>
        </template>
        <template v-else>
            <form @submit.prevent="attemptAdvance" method="post">
                <div class="mb-6">
                    <label for="username" class="mb-1">Email address</label>
                    <input
                        type="email"
                        id="username"
                        name="username"
                        v-model="form.email"
                        placeholder="Enter email address"
                        autofocus
                        autocomplete="username"
                    />
                </div>

                <div class="mb-6">
                    <label for="password" class="mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        v-model="form.password"
                        placeholder="Enter password"
                        autocomplete="current-password"
                    />
                </div>

                <button class="hidden" aria-hidden="true" />
            </form>

            <div class="mb-6">
                <a href="https://agora.aerocommerce.com/password/reset" target="_blank" rel="noopener noreferrer"
                    >Forgotten password</a
                >
            </div>

            <hr class="my-6" />

            <div class="space-y-1">
                <p>Don't have an account?</p>
                <a href="https://agora.aerocommerce.com/register" target="_blank" rel="noopener noreferrer"
                    >Create new account</a
                >
            </div>
        </template>

        <template #footer>
            <NextButton class="ml-auto" :action="attemptAdvance" />
        </template>
    </Step>
</template>

<script>
    import { ref, inject, reactive } from 'vue'
    import ErrorMessage from '../Elements/ErrorMessage.vue'
    import BackButton from '../Elements/BackButton.vue'
    import NextButton from '../Elements/NextButton.vue'
    import SuccessMessage from '../Elements/SuccessMessage.vue'
    import { LogoutIcon } from '@heroicons/vue/outline'
    import Step from '../Step.vue'

    export default {
        components: {
            ErrorMessage,
            BackButton,
            NextButton,
            SuccessMessage,
            Step,
            LogoutIcon,
        },
        setup() {
            const errorMessage = ref(null)
            const form = reactive({
                email: '',
                password: '',
            })

            const advanceStep = inject('advanceStep')

            const setupData = inject('setupData')

            const attemptAdvance = () => {
                const { email, password } = form

                errorMessage.value = null

                if (setupData.agora && setupData.agora.user) return advanceStep()

                if (!email.length || !password.length) {
                    errorMessage.value = 'Please enter your email and password'
                    return
                }

                fetch('https://agora.aerocommerce.com/api/auth', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                })
                    .then((result) => {
                        let json = result
                            .json()
                            .then((json) => {
                                if (!result.ok) throw new Error(json.message)

                                return json
                            })
                            .then((json) => {
                                setupData.agora = json

                                advanceStep()
                            })
                            .catch((e) => {
                                errorMessage.value = e.message
                            })
                    })
                    .catch((e) => {
                        errorMessage.value = e.message
                    })
            }

            return {
                errorMessage,
                setupData,
                form,
                attemptAdvance,
            }
        },
    }
</script>
