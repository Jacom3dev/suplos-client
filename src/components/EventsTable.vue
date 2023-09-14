<script setup>
    import { ref, onMounted} from 'vue';
    import {api} from "../api";
    import { validateDate } from '../helpers/validateDate';

    const events = ref([]);

    const status = {
        ACTIVE:"Activo",
        PUBLISHED: "Publicado",
        EVALUATION:"Evaluacíon"
    }

    const getEvents = async()=>{
        try {
            const {data} = await api.get("/proccess-event");
            events.value = data.data;
        } catch (e) {
          console.error(e);  
        } 
    }
    onMounted(()=>{
        getEvents();
        console.log('mount');
    })

    const changeState = async(id)=>{
        try {
          await api.put(`/proccess-event/${id}`);
          await getEvents();
          alert('Evento publicado');
        } catch (e) {
           console.error(e); 
        }
    }
</script>
<template>
    <div class="overflow-x-auto w-full">
            <table class="table-auto min-w-full">
                <thead>
                    <tr>
                        <th class="py-3 bg-zinc-700 text-white text-center font-semibold">ID</th>
                        <th class="py-3 bg-zinc-700 text-white text-center font-semibold">Objeto</th>
                        <th class="py-3 bg-zinc-700 text-white text-center font-semibold">Descripción</th>
                        <th class="py-3 bg-zinc-700 text-white text-center font-semibold">Moneda</th>
                        <th class="py-3 bg-zinc-700 text-white text-center font-semibold">Presupuesto</th>
                        <th class="py-3 bg-zinc-700 text-white text-center font-semibold">Fecha Inicio</th>
                        <th class="py-3 bg-zinc-700 text-white text-center font-semibold">Hora Inicio</th>
                        <th class="py-3 bg-zinc-700 text-white text-center font-semibold">Fecha Cierre</th>
                        <th class="py-3 bg-zinc-700 text-white text-center font-semibold">Hora cierre</th>
                        <th class="py-3 bg-zinc-700 text-white text-center font-semibold">Estado</th>
                        <th class="py-3 bg-zinc-700 text-white text-center font-semibold">Responsable</th>
                        <th class="py-3 bg-zinc-700 text-white text-center font-semibold">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="event in events" class="hover:bg-gray-100">
                        <td class="py-2 text-center font-light">{{ event.id }}</td>
                        <td class="py-2 text-center font-light">{{ event.object }}</td>
                        <td class="py-2 text-center font-light">{{ event.description }}</td>
                        <td class="py-2 text-center font-light">{{ event.currency }}</td>
                        <td class="py-2 text-center font-light">{{ event.budget }}</td>
                        <td class="py-2 text-center font-light">{{ event.start_date }}</td>
                        <td class="py-2 text-center font-light">{{ event.start_time }}</td>
                        <td class="py-2 text-center font-light">{{ event.end_date }}</td>
                        <td class="py-2 text-center font-light">{{ event.end_time }}</td>
                        <td class="py-2 text-center font-light">{{ status[event.status] }}</td>
                        <td class="py-2 text-center font-light">{{ event.client_name }}</td>
                        <td class="py-2 text-center font-light">
                            <button type="button"
                            @click="changeState(event.id)"
                            v-if="(validateDate(event.start_date,event.start_time) && event.status  == 'ACTIVE')"
                                class="rounded-md bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >Publicar</button>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
</template>