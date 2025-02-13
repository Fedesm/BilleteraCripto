<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import LoginComponent from './components/LoginComponent.vue'

const LogOk = ref(false);
const currentView = ref('login');

const handleLoginSuccess = () => {
  LogOk.value = true;
  currentView.value = 'welcome';  
}

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/Dogecoin.avif" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="CCTYO!" />
    </div>
  </header>

  <main>
   <LoginComponent 
      v-if="currentView === 'login' && !LogOk"
      @login-success="handleLoginSuccess" 
    />
    <TheWelcome v-if="LogOk"/>
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
