<template>
  <div
    class="grid grid-flow-col gap-10 p-5 overflow-x-auto h-[calc(100vh-100px)]"
  >
    <div
      v-for="column in getBoardColumns(boardId)"
      :key="column.id"
      class="w-80 overflow-y-auto select-none"
      @drop="onDrop($event, column.id)"
      @dragenter.prevent
      @dragover.prevent
    >
      <div class="w-full py-4 mb-5 pl-2 bg-mauve rounded-xl">
        <p class="text-marengo">
          {{ column.name.toUpperCase() }} ({{ countTasks(column.id) }})
        </p>
      </div>

      <TransitionGroup tag="div" name="tasks" class="flex flex-col gap-5">
        <TaskCard
          v-for="task in getColumnTasks(boardId, column.id)"
          :key="task.id"
          :task-name="task.name"
          draggable="true"
          @click="openEditForm(task, column.id)"
          @dragstart="startDrag($event, task, column.id)"
        />
      </TransitionGroup>
    </div>
    <FormColumn />
  </div>
</template>

<script setup lang="ts">
import { useKanbanStore } from "~~/stores";
//Route
const route = useRoute();
const boardId = route.params.board.toString();

//Store
const store = useKanbanStore();
const { getBoardColumns, getColumnTasks, editTask } = store;

//Refs
const isFormOpenState = isTaskFormOpen();
const taskToEditState = taskToEdit();

//Methods
const openEditForm = (task: Task, columnId: string): void => {
  isFormOpenState.value = true;
  taskToEditState.value = { ...task, columnParentId: columnId };
};

const startDrag = (
  event: DragEvent,
  item: Task,
  fromColumnId: string
): void => {
  event.dataTransfer!.dropEffect = "move";
  event.dataTransfer!.effectAllowed = "move";
  event.dataTransfer!.setData("itemID", item.id);
  event.dataTransfer!.setData("fromColumnId", fromColumnId.toString());
};

const onDrop = (event: DragEvent, columnId: string): void => {
  const itemID = event.dataTransfer!.getData("itemID");
  const fromColumnId = event.dataTransfer!.getData("fromColumnId");
  const item = getColumnTasks(boardId, fromColumnId)?.find(
    (task) => task.id === itemID
  );
  editTask(boardId, fromColumnId, columnId, item!);
};

const countTasks = (columnId: string): number => {
  return getColumnTasks(boardId, columnId)!.length;
};
</script>
