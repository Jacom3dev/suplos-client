<script setup>
    import { ref,onMounted } from "vue";
    import {api} from "../api";

    const currencies = ref([]);
    const activities = ref([]);

    const props = defineProps({
        form:{
            type: Boolean
        },
        object: {
            type: String,
        },
        description: {
            type: String,
        },
        currency_id: {
            type: String,
        },
        budget: {
            type: String
        },
        activity: {
            type: String,
        }
    });

    const emits = defineEmits(['update:description', 'update:currency_id', 'update:activity','update:budget']);

    onMounted(async()=>{
        try {
            const {data} = await api.get("/currency");
            const {data:data2} = await api.get("/activity");
            currencies.value = data.data;
            activities.value = data2.data;
        } catch (e) {
          console.error(e);  
        } 
    })


</script>
<template >
    <div v-if="form == 'INFO_BASIC'" class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900"></h2>
            <div class="flex flex-wrap">
                <div class="lg:w-6/12 md:w-full flex flex-wrap justify-between p-1">
                    <div class="w-full mt-2">
                        <label for="object" class="block text-sm font-medium leading-6 text-gray-900">Objeto</label>
                        <input
                            readonly
                            type="text"
                            name="object"
                            id="object"
                            class="block w-full read-only:bg-gray-100 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                            :value="object"
                        />
                    </div>
                    <div class="w-full mt-2">
                        <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Descripción /
                            Alcance</label>
                        <textarea
                            id="description"
                            name="description"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            :value="description"
                            @input="$emit('update:description',$event.target.value)"
                        />
                    </div>
                    <div class="lg:w-6/12 w-full mt-2">
                        <label for="currency" class="block text-sm font-medium leading-6 text-gray-900">Moneda</label>
                        <select id="currency" name="currency"
                            class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            :value="currency_id"
                            @input="$emit('update:currency_id',$event.target.value)"
                        >
                            <option value="">--selecciona la modena --</option>
                            <option v-for="currency in currencies" :value="currency.id">{{ currency.currency }}</option>
                        </select>
                    </div>
                    <div class="lg:w-6/12 w-full mt-2">
                        <label for="budget" class="block text-sm font-medium leading-6 text-gray-900">Presupuesto</label>
                        <input
                            type="number"
                            name="budget"
                            id="budget"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            :value="budget"
                            @input="$emit('update:budget',$event.target.value)" 
                        />
                    </div>
                </div>

                <div class="lg:w-6/12 w-full p-1">
                    <div class="w-full mt-2">
                        <label for="activity" class="block text-sm font-medium leading-6 text-gray-900">Actividad</label>
                        <select id="activity" name="activity"
                            class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            :value="activity"
                            @input="$emit('update:activity',$event.target.value)"
                        >
                            <option value="">--selecciona la actividad --</option>
                            <option v-for="activity in activities" :value="activity.id">{{ activity.name }}</option>
                        </select>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
