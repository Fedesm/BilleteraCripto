<script setup>
  import { ref } from 'vue';
  import { loginUser } from '../services/apiClient.js';
  
  const userId = ref('');
  const password = ref('');
  const errorMessage = ref ('');
  const emit = defineEmits(['login-success']);
  
  async function login() {
    try {
      const users = await loginUser(userId.value, password.value);
  
      if(users.length > 0) {
        emit('login-success');
      }
      else {
        errorMessage.value = 'Usuario o contraseña inválidos.';
      }
    } catch (error) {
      errorMessage.value = 'Error al conectar al servidor.';
      console.error(error);
    }
  } 
</script>

<template>
    <div>
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <input v-model="userId" placeholder="ID" required />
        <input type="password" v-model="password" placeholder="Contraseña" required />
        <button type="submit">Ingresar</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
    <div>
      <h2>No tenes cuenta? Regístrate!</h2>
      <button @click="$emit('go-to-register')" type="button">Registrarse</button>
    </div>
</template>
  
  
  <style>
    .error {
      color: red;
    }
  </style>
  