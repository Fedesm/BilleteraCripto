<script setup>
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import LoginComponent from './components/LoginComponent.vue'
import RegisterComponent from './components/RegisterComponent.vue';

const LogOk = ref(false);
const currentView = ref('login');

const handleLoginSuccess = () => {
  logOk.value = true;
  currentView.value = 'welcome';  
}

const goToRegister = () => {
  currentView.value = 'register';
}

const goToLogin = () => {
  currentView.value = 'login';
}

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="CCTYO!" />
    </div>
  </header>

  <main>
    <LoginComponent 
      v-if="currentView === 'login' && !logOk"
      @login-success="handleLoginSuccess"
      @go-to-register="goToRegister"
    />
    <RegisterComponent
      v-else-if="currentView === 'register'"
      @go-to-login="goToLogin" />
    <TheWelcome v-else-if="logOk"/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
