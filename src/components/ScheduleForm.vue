<script setup>
    const props = defineProps({
        form:{
            type: Boolean
        },
        start_date: {
            type: String,
            default: ""
        },
        start_time: {
            type: String,
            default: ""
        },
        end_date: {
            type: String,
            default: ""
        },
        end_time: {
            type: String,
            default: ""
        }
    });

    const emits = defineEmits(['update:start_date','update:start_time','update:end_date','update:end_time']);


</script>
<template >
    <div v-if="form == 'SCHELDULE'" class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
            <div class="w-full flex flex-wrap justify-between">
                <div class="lg:w-4/12 w-full px-1">
                    <label for="start_date" class="block text-sm font-medium leading-6 text-gray-900">Fecha de
                        inicio (*)</label>
                    <div class="mt-2">
                        <input
                            type="date"
                            name="start_date"
                            id="start_date"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            :value="start_date"
                            @input="$emit('update:start_date',$event.target.value)"
                        />
                    </div>
                </div>
                <div class="lg:w-4/12 w-full px-1">
                    <label for="start_time" class="block text-sm font-medium leading-6 text-gray-900">Hora inicio
                        (*)</label>
                    <div class="mt-2">
                        <input
                            type="time"
                            name="start_time" id="start_time" 
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" 
                            :value="start_time"
                            @input="$emit('update:start_time',$event.target.value)"
                        />
                    </div>
                </div>

                <div class="lg:w-4/12 w-full px-1">
                    <label for="end_date" class="block text-sm font-medium leading-6 text-gray-900">Fecha de
                        cierre</label>
                    <div class="mt-2">
                        <input
                            type="date"
                            name="end_date" id="end_date"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            :value="end_date"
                            @input="$emit('update:end_date',$event.target.value)"    
                        />
                    </div>
                </div>

                <div class="lg:w-4/12 w-full px-1">
                    <label for="end_time" class="block text-sm font-medium leading-6 text-gray-900">Hora cierre
                        (*)</label>
                    <div class="mt-2">
                        <input type="time"
                            name="end_time" id="end_time"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            :value="end_time"
                            @input="$emit('update:end_time',$event.target.value)"    
                        />
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>
