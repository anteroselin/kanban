<template>
  <transition name="fade">
    <div v-if="boardFormState" class="popup-modal">
      <div
        class="w-fit h-fit flex flex-col p-8 bg-charcoal rounded-xl gap-10 relative m-10"
      >
        <button
          class="absolute right-0 translate-x-4 -translate-y-5 top-0 rounded-full bg-mauve p-3"
          @click="() => (boardFormState = false)"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>
        <h2>Create a New Board</h2>
        <div class="flex flex-col space-y-2 justify-between h-full md:w-96">
          <div class="flex flex-col gap-5">
            <label for="task_name">Board Name</label>
            <input
              autofocus
              v-model.trim="boardName"
              type="text"
              name="task_name"
              placeholder="e.g Learn Nuxt.js"
            />
          </div>
        </div>
        <BaseButton label="Create Board" @action="useCreateNewBoard" class="bg-savoy"/>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { useKanbanStore } from "~~/stores";
import { XMarkIcon } from "@heroicons/vue/24/outline";

//Props and emits
const boardFormState = isAddBoardFormOpen();

//Refs
const boardName = ref<string>("");

//Store
const store = useKanbanStore();
const { createNewBoard } = store;

//Methods
const resetValues = (): void => {
  boardName.value = "";
};

const useCreateNewBoard = () => {
  if (useValidator(boardName.value)) {
    createNewBoard(boardName.value);
    resetValues();
    boardFormState.value = false;
  }
};
</script>
