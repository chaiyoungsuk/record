<template>
  <Aside></Aside>
  <main class="main-wrapper">
    <Header></Header>
    <router-view></router-view>
  </main>  
</template>

<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import Aside from './components/layouts/Aside.vue'
import Header from './components/layouts/Header.vue'

</script>

