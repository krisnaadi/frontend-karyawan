<template>
  <UContainer class="h-screen flex justify-center items-center">
    <UCard>
      <template #header>
        <h1>Login</h1>
      </template>

      <UForm :state="state" class="space-y-4" @submit="login">
        <UFormGroup label="Username" name="username">
          <UInput v-model="state.username" />
          <div v-if="state.errors.username && state.errors.username.length" class="text-red-500">
            <small v-for="(error, index) in state.errors.username" :key="index">{{ error }}</small>
          </div>
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
          <div v-if="state.errors.password && state.errors.password.length" class="text-red-500">
            <small v-for="(error, index) in state.errors.password" :key="index">{{ error }}</small>
          </div> 
        </UFormGroup>

        <UButton type="submit">
          Login
        </UButton>
      </UForm>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { useRuntimeConfig } from '#app';

definePageMeta({
  layout: 'login'
})

const state = reactive({
  username: undefined,
  password: undefined,
  errors: {} as Record<string, string>
})

const config = useRuntimeConfig();
const router = useRouter()

async function login(event: FormSubmitEvent<any>) {
  try {
    const response = await $fetch(`${config.public.apiHost}/api/login`, {
      method: 'POST',
      body: {
        username: state.username,
        password: state.password,
      }
    })

    localStorage.setItem('auth_token', response.token)
    router.push('/');

  } catch (error) {
    switch (error.status) {
      case 422: {
        state.errors = error.data.errors
        break
      }
      case 401: {
        alert('Invalid username or password')
        break
      }
      default: {
        alert('Unexpedted error')
      }
    }
  }
}
</script>
