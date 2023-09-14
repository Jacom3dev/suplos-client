<script setup>
  import { reactive,ref,watch,onMounted} from 'vue';
  import { RouterLink,useRouter } from 'vue-router';
  import SearchForm from '../components/SearchForm.vue';
  import SearchTable from '../components/SearchTable.vue';
  import {exportToExcel} from "../helpers/exportExcel";
  import { api } from '../api';

  const search = reactive({
    "id": "",
    "object": "",
    "client":"",
    "status": ""
  });

  const router = useRouter();

  const isDisableButton = ref(true);
  const events = ref([]);

  function updateValidate() {
    isDisableButton.value = !Object.values(search).some(value => value !== '');
  }

  watch(search, updateValidate, { deep: true });
  
  const getEvents = async()=>{
    const filteredSearch = {};
    for (const key in search) {
      if (search[key] !== '') {
        filteredSearch[key] = search[key];
      }
    }
    router.push({ query: filteredSearch });
    const {data} = await api.get('/proccess-event/search',{params:filteredSearch});
    events.value = data.data;
  }

  onMounted(async()=>{
    try {
      if (Object.keys(router.currentRoute.value.query).length>0) {
        const {data} = await api.get('/proccess-event/search',{params:router.currentRoute.value.query});
        events.value = data.data;
      }
    } catch (e) {
      console.error(e);  
    } 
  })


</script>

<template>
  <div class="w-full flex justify-between mb-8">
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <a href="#"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 20 20">
              <path
                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Procesos /eventos
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 9 4-4-4-4" />
            </svg>
            <a href="#"
              class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Consultar</a>
          </div>
        </li>
      </ol>
    </nav>
    <RouterLink :to="{ name: 'events' }"
      class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Volver
    </RouterLink>
  </div>

  <div class="w-full flex flex-col justify-center items-center">
    <SearchForm v-model:id="search.id" v-model:object="search.object" v-model:client="search.client" v-model:status="search.status" />

    <div class="flex w-full lg:justify-end justify-center my-7">
      <button type="button"
      :disabled="isDisableButton"
        @click="getEvents"
        class="rounded-md bg-slate-500 px-6 py-2 text-sm font-semibold disabled:bg-slate-300 text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-2"
        >Buscar</button>
      <button type="button"
      :disabled="events.length === 0"
      @click="exportToExcel(events)"
        class="rounded-md bg-green-700 px-6 py-2 text-sm font-semibold disabled:bg-green-300 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Generar
        excel</button>
    </div>

    <SearchTable :events="events" />
  </div>
</template>
