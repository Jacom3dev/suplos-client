<script setup>
    import { ref, reactive } from 'vue';
    import InformationForm from '../components/InformationForm.vue';
    import ScheduleForm from '../components/ScheduleForm.vue';
    import EventsTable from '../components/EventsTable.vue';
    import Alert from '../components/Alert.vue';
    import {generateObject} from "../helpers/generateObject";
    import { api } from '../api';


    const event = reactive({
        "object": generateObject(),
        "description": "",
        "currency_id": "",
        "activity": "",
        "budget": "" ,
        "start_date": "",
        "start_time": "",
        "end_date": "",
        "end_time": ""
    });

    const form = ref("INFO_BASIC");

    const alert = reactive({
        type: '',
        message: ''
    });
    
    const validate = async() =>{
        const {start_date,start_time,end_date,end_time,...informationBasic} = event;

        if(Object.values(informationBasic).includes('') && form.value){  
            Object.assign(alert,{
                message: 'Toda la información basica es requerida',
                type: 'ERROR'
            })
        }else {
            form.value = 'SCHELDULE';
        }

        if(Object.values({start_date,start_time,end_date,end_time}).includes('') && !form.value){  
            Object.assign(alert,{
                message: 'El cronograma el requerido',
                type: 'ERROR'
            })
        }

        if (!Object.values(event).includes('')) {
            try {
                await api.post('/proccess-event',event);
                form.value = 'INFO_BASIC';
                Object.assign(alert,{
                    message: 'Evento registrado',
                    type: 'SUCCESS'
                })
                Object.assign(event, {
                    "object": generateObject(),
                    "description": "",
                    "currency_id": "",
                    "activity": "",
                    "budget": "" ,
                    "start_date": "",
                    "start_time": "",
                    "end_date": "",
                    "end_time": ""
                });

            } catch (e) {
                console.error(e);
            }
        }

        setTimeout(()=>{
            Object.assign(alert,
            {
                type: '',
                message: ''
            }); 
        },3000)
    
    }

    const cancel = ()=>{
        Object.assign(event, {
            "object": generateObject(),
            "description": "",
            "currency_id": "",
            "activity": "",
            "budget": "" ,
            "start_date": "",
            "start_time": "",
            "end_date": "",
            "end_time": ""
        });
    }

</script>

<template>
    <div class="w-full flex justify-between mb-8">
        <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                    <a href="#"
                        class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        Procesos /eventos
                    </a>
                </li>
                <li>
                    <div class="flex items-center">
                        <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                        <a href="#"
                            class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Crear</a>
                    </div>
                </li>
            </ol>
        </nav>
        <RouterLink :to="{ name: 'events' }"
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Volver
        </RouterLink>
    </div>

    <div
        class="text-sm font-medium text-center mb-7 text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px">
            <li class="mr-2" @click="form = 'INFO_BASIC' ">
                <a href="#" class="inline-block p-4  border-b-2 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                    :class="{ 'border-blue-600 text-blue-600': form == 'INFO_BASIC' }" aria-current="page">Information Basica</a>
            </li>
            <li class="mr-2" @click="form = 'SCHELDULE'">
                <a href="#" class="inline-block p-4 border-b-2 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                    :class="{ 'border-blue-600 text-blue-600': form == 'SCHELDULE' }" aria-current="page">Cronograma</a>
            </li>
            <li class="mr-2" @click="form = 'EVENTS'">
                <a href="#" class="inline-block p-4 border-b-2 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                    :class="{ 'border-blue-600 text-blue-600': form == 'EVENTS' }" aria-current="page">Procesos/eventos creados</a>
            </li>
        </ul>

    </div>

    <Alert v-if="alert.message" :alert="alert"/>
    
    <form  @submit.prevent="validate">
        <InformationForm
            :form="form"
            v-model:object="event.object"
            v-model:description="event.description"
            v-model:currency_id="event.currency_id"
            v-model:activity="event.activity"
            v-model:budget="event.budget"
        />
        <ScheduleForm
            :form="form"
            v-model:start_date="event.start_date"
            v-model:start_time="event.start_time"
            v-model:end_date="event.end_date"
            v-model:end_time="event.end_time"
        />

        <div v-if="form != 'EVENTS'" class="mt-6 flex items-center lg:justify-end justify-center gap-x-6">
            <button type="button" class="text-sm font-semibold leading-6 text-gray-900" @click="cancel">Cancelar</button>
            <button type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Guardar</button>
        </div>
    </form>

    <EventsTable v-if="form == 'EVENTS'"/>
</template>

