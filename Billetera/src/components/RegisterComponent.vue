<script setup>
  import { ref } from 'vue';
  import { registerUser } from '@/services/apiClient';
  
  const userId = ref('');
  const password = ref('');
  const message = ref('');
  const isSuccess = ref(false);
  const emit = defineEmits(['go-to-login']);


  async function register() {
    if (password.value.length >= 6){
    try {
      const newUser = { 
        userId: userId.value.trim(),
        // password: password.value.trim()
      }
      await registerUser(newUser);
  
      isSuccess.value = true;
      message.value = 'Usuario registrado con éxito.';

      setTimeout(() => {
        emit('go-to-login');
      }, 2000);
  
    } catch(error) {
      isSuccess.value = false;
      message.value = 'Error al registrar usuario.';
      console.error(error);
    }
  }else{
    message.value = 'Longitud de contraseña mínima 6 caracteres';
    isSuccess.value = false;
  }
  }
</script>

<template>
    <div>
      <h1>Registrar usuario</h1>
      <form @submit.prevent="register">
        <input v-model="userId" placeholder="Ingresa Id" required />
        <!-- <input v-model="password" type="password" placeholder="Contraseña" required /> -->
        <button type="submit">Registrar</button>
      </form>
      <p v-if="message" :class = "{'success': isSuccess, 'error': !isSuccess}">{{ message }}</p>
    
      <button @click="$emit('go-to-login')">Volver a Login</button>
    </div>
  </template>
  
  
  <style>
  .success{
    color: green;
  }
  .error{
    color: red;
  }
  </style>
  