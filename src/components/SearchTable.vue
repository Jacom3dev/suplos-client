<script setup>

    defineProps({
        events:{
            type:[]
        }
    })

    const status = {
        ACTIVE:"Activo",
        PUBLISHED: "Publicado",
        EVALUATION:"Evaluacíon"
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
                        <th class="py-3 bg-zinc-700 text-white text-center font-semibold">Fecha Inicio</th>
                        <th class="py-3 bg-zinc-700 text-white text-center font-semibold">Fecha Cierre</th>
                        <th class="py-3 bg-zinc-700 text-white text-center font-semibold">Estado</th>
                        <th class="py-3 bg-zinc-700 text-white text-center font-semibold">Responsable</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="event in events" class="hover:bg-gray-100">
                        <td class="py-2 text-center font-light">{{ event.id }}</td>
                        <td class="py-2 text-center font-light">{{ event.object }}</td>
                        <td class="py-2 text-center font-light">{{ event.description }}</td>
                        <td class="py-2 text-center font-light">{{ event.start_date }}</td>
                        <td class="py-2 text-center font-light">{{ event.end_date }}</td>
                        <td class="py-2 text-center font-light">{{ status[event.status] }}</td>
                        <td class="py-2 text-center font-light">{{ event.client_name }}({{ event.client_document}})</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
</template>