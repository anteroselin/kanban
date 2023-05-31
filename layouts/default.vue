<template>
  <main class="flex h-screen w-screen">
    <aside
      class="hidden md:block h-full w-96 bg-charcoal border-r border-white border-opacity-10 text-marengo overflow-y-auto"
    >
      <div class="w-full p-5">
        <NuxtLink to="/" exact-active-class="text-savoy"
          ><h1 class="mb-20">||| kanban</h1></NuxtLink
        >
        <p class="mb-5 tracking-widest">ALL BOARDS ({{ boardsCount }})</p>
      </div>
      <div v-if="boards!.length > 0">
        <NuxtLink
          v-for="board in boards"
          :key="board.id"
          :to="`/${board.id}`"
          class="flex gap-2 px-5 py-3 mr-5 items-center hover:bg-red-400 transition-colors rounded-r-3xl font-bold"
          exact-active-class="bg-savoy"
        >
          <ViewColumnsIcon class="w-5 h-5" />
          {{ board.name }}
        </NuxtLink>
      </div>
      <div
        class="px-5 py-3 mr-5 flex gap-2 items-center text-savoy cursor-pointer hover:bg-gray-500/20 transition-colors rounded-r-3xl"
      >
        <ViewColumnsIcon class="w-5 h-5" />+ Create New Board
      </div>
    </aside>
    <slot></slot>
    <FormAddBoard />
  </main>
</template>
<script setup lang="ts">
import { useKanbanStore } from "~~/stores";
import { ViewColumnsIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";

const store = useKanbanStore();

const { boards } = storeToRefs(store);

const boardsCount = computed(() => {
  return boards.value?.length;
});
</script>
