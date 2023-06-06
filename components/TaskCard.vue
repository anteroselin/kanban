<template>
  <div
    class="w-full p-5 rounded-xl bg-charcoal shadow-sm cursor-pointer hover:text-indigo-500 transition-colors"
  >
    <span class="font-medium select-none break-all w-full h-full">{{
      props.taskName
    }}</span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  taskName: string;
}>();
</script>
