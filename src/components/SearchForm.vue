<script setup>
    const props = defineProps({
        id: {
            type: String,
        },
        object: {
            type: String,
        },
        client: {
            type: String,
        },
        status: {
            type: String,
        }
    });

    const emits = defineEmits(['update:id', 'update:object', 'update:client','update:status']);


</script>
<template >
    <form class="w-full">
        <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900"></h2>
            <div class="flex flex-wrap justify-between mr-4">
                <div class="md:w-4/12 w-full px-1 mt-2">
                    <label for="id" class="block text-sm font-medium leading-6 text-gray-900">ID cerrada</label>
                    <input type="text" name="id" id="id" placeholder="Número id procesos / eventos"
                        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        :value="id" @input="$emit('update:id', $event.target.value)" />
                </div>
                <div class="md:w-4/12 w-full px-1 mt-2">
                    <label for="object" class="block text-sm font-medium leading-6 text-gray-900">Objeto /
                        Descripción</label>
                    <input type="text" name="object" id="object" placeholder="Objeto / Descripción"
                        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        :value="object" @input="$emit('update:object', $event.target.value)" />
                </div>
                <div class="md:w-4/12 w-full px-1 mt-2">
                    <label for="client" class="block text-sm font-medium leading-6 text-gray-900">Comprador</label>
                    <input type="text" name="client" id="client" placeholder="Responsable Evento"
                        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        :value="client" @input="$emit('update:client', $event.target.value)" />
                </div>
                <div class="md:w-4/12 w-full px-1 mt-2">
                    <label for="status" class="block text-sm font-medium leading-6 text-gray-900">Estado</label>
                    <select id="status" name="status"
                        class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        :value="status" @input="$emit('update:status', $event.target.value)">
                        <option value="ACTIVE">Activo</option>
                        <option value="PUBLISHED">Publicado</option>
                        <option value="EVALUATION">Evaluacion</option>
                    </select>
                </div>
            </div>
        </div>
    </form>
</template>
