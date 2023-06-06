<template>
  <transition name="fade">
    <div v-if="isFormOpenState" class="popup-modal">
      <div
        class="w-96 lg:w-1/3 h-4/5 flex flex-col p-8 bg-charcoal rounded-xl gap-10 relative m-10"
      >
        <button
          class="absolute right-0 translate-x-4 -translate-y-5 top-0 rounded-full bg-mauve p-3"
          @click="toggleFormModal(false)"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>

        <h2>{{ !!taskToEditState ? "Edit" : "Add" }} Task</h2>

        <div class="w-full h-full space-y-10 pr-8 flex flex-col">
          <div class="flex flex-col space-y-2">
            <label for="task_name">Title</label>
            <input
              v-model.trim="taskName"
              type="text"
              name="task_name"
              placeholder="e.g Learn Nuxt.js"
            />
          </div>

          <div class="flex flex-col space-y-2 h-full overflow-hidden">
            <label for="task_description">Description</label>
            <textarea
              v-model.trim="taskDescription"
              type="text"
              name="task_description"
              placeholder="e.g Learn how to generate server side rendered pages"
              class="h-full"
            />
          </div>

          <div class="space-y-2">
            <p>Current status</p>
            <select name="status" v-model="taskColumnId">
              <option
                v-for="column in getBoardColumns(boardId)"
                :key="column.id"
                :value="column.id"
              >
                {{ column.name }}
              </option>
            </select>
          </div>
        </div>
        <BaseButton
          :label="buttonLabel"
          @action="taskToEditState ? editTaskInfos() : createNewTask()"
          class="bg-savoy"
        />
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { useKanbanStore } from "~~/stores";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const isFormOpenState = isTaskFormOpen();
const taskToEditState = taskToEdit();

const toggleFormModal = (isOpen: boolean): void => {
  isFormOpenState.value = isOpen;
  taskToEditState.value = null;
};

//Route
const route = useRoute();
const boardId = route.params.board.toString();

//Store
const store = useKanbanStore();
const { addTaskToColumn, getBoardColumns, editTask } = store;

//Refs
const taskColumnId = ref<string>("");
const taskName = ref<string>("");
const taskDescription = ref<string>("");

//Methods
const createNewTask = (): void => {
  const newTask = {
    name: taskName.value,
    description: taskDescription.value,
  };
  if (useValidator(taskDescription.value, taskName.value)) {
    addTaskToColumn(boardId, taskColumnId.value, newTask);
    resetValues();
    toggleFormModal(false);
  }
};

const editTaskInfos = (): void => {
  const editedTask = {
    id: taskToEditState.value!.id,
    name: taskName.value,
    description: taskDescription.value,
  };
  if (useValidator(taskDescription.value, taskName.value)) {
    editTask(
      boardId,
      taskToEditState.value!.columnParentId,
      taskColumnId.value,
      editedTask
    );
    resetValues();
    toggleFormModal(false);
  }
};

const resetValues = (): void => {
  taskColumnId.value = getBoardColumns(boardId)![0].id;
  taskName.value = "";
  taskDescription.value = "";
};

const buttonLabel = computed(() => {
  return taskToEditState.value ? "Save Changes" : "Add Task";
});

watch(isFormOpenState, () => {
  if (taskToEditState.value !== null) {
    taskName.value = taskToEditState.value.name;
    taskDescription.value = taskToEditState.value.description;
    taskColumnId.value = taskToEditState.value.columnParentId;
  } else {
    resetValues();
  }
});
</script>
