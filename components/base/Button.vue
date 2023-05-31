<template>
  <button
    @click="() => emits('action')"
    class="p-2 rounded-lg font-semibold"
  >
    {{ props.label }}
  </button>
</template>
<script setup lang="ts">
const emits = defineEmits(["action"]);
const props = defineProps<{
  label: string;
}>();
</script>
