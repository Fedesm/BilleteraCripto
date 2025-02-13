<script setup>
  import { ref } from 'vue';
  import { loginUser } from '../services/apiClient.js';
  import { useUserStore } from '@/store/user.js';
  
  const userId = ref('');
  const errorMessage = ref ('');
  const emit = defineEmits('login-success');
  const userStore = useUserStore();
  
  async function login() {
    try {
      if(!userId.value){
        errorMessage.value = 'Ingresar nombre de usuario.';
        return;
      }

      const users = await loginUser(userId.value);
  
      if(users) {
        userStore.setUserId(users.userId);
        emit('login-success');
      }
      else {
        errorMessage.value = 'Usuario no encontrado.';

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
      <input v-model="userId" placeholder="Ingresar ID"/>
      <button type="submit">Ingresar</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>

</template>
  
  
  <style>
    .error {
      color: red;
    }
  </style>
  