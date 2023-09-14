<script setup>
  import {RouterView} from "vue-router";
  import Header from "./components/Header.vue";
</script>

<template>
  <Header/>
  <main class="max-w-6xl w-10/12 mx-auto mt-10 p-5">
    <RouterView/>
  </main>
</template>
