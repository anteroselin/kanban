<template>
  <transition name="fade">
    <div v-if="boardFormState" class="popup-modal">
      <div
        class="w-fit h-fit flex flex-col p-8 bg-charcoal rounded-xl relative m-10"
      >
        <button
          class="absolute right-0 translate-x-4 -translate-y-5 top-0 rounded-full bg-mauve p-3"
          @click="() => (boardFormState = false)"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>
        <h2>Edit board</h2>
        <div class="flex flex-col space-y-2 justify-between h-f md:w-96">
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
          <p class="pt-5" v-if="getBoardColumns(boardId)!.length > 0">
            Board Columns
          </p>
          <div class="flex flex-col gap-5 overflow-y-auto h-fit">
            <div
              v-for="column in boardColumns"
              class="w-full flex gap-2 justify-between"
            >
              <input
                autofocus
                v-model="column.name"
                type="text"
                name="task_name"
                placeholder="e.g Learn Nuxt.js"
                class="w-full"
              />
              <TrashIcon
                class="w-10 h-10 cursor-pointer text-marengo"
                @click="removeColumnFromBoard(column.id)"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3 mt-16">
          <ButtonBase
            label="Save Changes"
            @action="saveChanges"
            class="bg-green-600"
          />
          <ButtonBase
            label="Delete Board"
            @action="removeBoard"
            class="bg-savoy"
          />
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { useKanbanStore } from "~~/stores";
import { XMarkIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";

//Props and emits
const boardFormState = isEditBoardFormOpen();

//Store
const store = useKanbanStore();
const { boards } = storeToRefs(store);
const { editBoard, getBoardColumns, deleteBoard } = store;

//Refs
const route = useRoute();
const router = useRouter();
const boardId = route.params.board.toString();

const boardName = ref<string>("");
const boardColumns = ref<Column[] | null>(null);

const validateColumnsName = (): boolean => {
  const columnsNames = boardColumns.value!.map((column) => column.name);
  return useValidator(...columnsNames);
};

const saveChanges = () => {
  if (useValidator(boardName.value!) && validateColumnsName()) {
    editBoard(boardId, boardName.value!, boardColumns.value!);
    boardFormState.value = false;
  }
};

const removeColumnFromBoard = (columnId: string) => {
  const filteredBoard = boardColumns.value!.filter(
    (column) => column.id !== columnId
  );
  boardColumns.value = filteredBoard;
};

const removeBoard = () => {
  boardFormState.value = false;
  router.push("/");
  deleteBoard(boardId);
};

watch(boardFormState, () => {
  if (boardFormState.value) {
    boardColumns.value = JSON.parse(JSON.stringify(getBoardColumns(boardId)));
    boardName.value = JSON.parse(
      JSON.stringify(boards.value?.find((board) => board.id === boardId)!.name)
    );
  }
});
</script>
