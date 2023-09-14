<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="w-full flex justify-center items-center">
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="flex flex-col items-center pb-2">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/cubo.png" alt="Bonnie image" />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Procesos</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">Eventos</span>
        <div class="flex mt-4 space-x-3 md:mt-6">
          <RouterLink :to="{ name: 'events' }"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
            Acceder</RouterLink>
        
        </div>
      </div>
    </div>

  </div></template>
