import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { useStorage } from "@vueuse/core";

export const useKanbanStore = defineStore("kanban", {
  state: () => ({
    boards: useStorage("board", [
      {
        id: "499ff073-7759-45c4-a62b-020860056830",
        name: "Any Board",
        columns: [
          {
            id: "52a3c12c-a755-46e1-9a95-22ab10d61a1d",
            name: "Todo",
            tasks: [
              {
                id: "52a96e6f-1213-46f6-8ae3-6a8fb00b126e",
                name: "Title example",
                description: "Description example",
              },
            ],
          },
          {
            id: "c46c6c66-9da0-42f2-97fd-1c212e4e8de2",
            name: "In Progress",
            tasks: [],
          },
          {
            id: "3e6f2fa2-1c93-4409-85b7-4660c36a1242",
            name: "Done",
            tasks: [],
          },
        ],
      },
    ] as Board[] | undefined),
  }),
  getters: {
    getBoardColumns:
      (state) =>
      (boardId: string): Column[] | undefined => {
        const findBoard = state.boards?.find((board) => board.id === boardId);
        return findBoard?.columns;
      },
    getColumnTasks() {
      return (boardId: string, columnId: string): Task[] | undefined => {
        const column = this.getBoardColumns(boardId)?.find(
          (column) => column.id === columnId
        );
        return column?.tasks;
      };
    },
  },
  actions: {
    addTaskToColumn(
      boardId: string,
      columnId: string,
      taskInfos: Omit<Task, "id">
    ) {
      const newTask = { id: uuidv4(), ...taskInfos };
      this.boards
        ?.find((board) => board.id === boardId)!
        .columns.find((column) => column.id === columnId)!
        .tasks.push(newTask);
    },
    removeTaskFromColumn(boardId: string, columnId: string, editedTask: Task) {
      const boardTasks = this.getColumnTasks(boardId, columnId);
      const filteredTasks = boardTasks!.filter(
        (task) => task.id !== editedTask.id
      );
      //Removing task from original column
      this.boards!.find((board) => board.id === boardId)!.columns.find(
        (column) => column.id === columnId
      )!.tasks = filteredTasks;
    },
    createNewBoard(boardName: string) {
      const boardTemplate: Board = {
        id: uuidv4(),
        name: boardName,
        columns: [
          { id: uuidv4(), name: "Todo", tasks: [] },
          { id: uuidv4(), name: "In Progress", tasks: [] },
          { id: uuidv4(), name: "Done", tasks: [] },
        ],
      };
      //Modifing state
      this.boards?.push(boardTemplate);
    },
    editTask(
      boardId: string,
      columnId: string,
      newColumnId: string,
      editedTask: Task
    ) {
      const boardTasks = this.getColumnTasks(boardId, columnId);

      //If it has a new status, remove from original column and add to new column
      if (newColumnId !== columnId) {
        this.removeTaskFromColumn(boardId, columnId, editedTask);
        this.addTaskToColumn(boardId, newColumnId, editedTask);
      } else {
        const modifiedTasks = boardTasks!.map((task) =>
          task.id === editedTask.id ? editedTask : task
        );

        //Modifing state
        this.boards!.find((board) => board.id === boardId)!.columns.find(
          (column) => column.id === columnId
        )!.tasks = modifiedTasks;
      }
    },
    createNewColumn(boardId: string, columnName: string) {
      this.boards!.find((board) => board.id === boardId)!.columns.push({
        id: uuidv4(),
        name: columnName,
        tasks: [],
      });
    },
    editColumnName(boardId: string, columnId: string, columnName: string) {
      this.boards!.find((board) => board.id === boardId)!.columns.find(
        (column) => column.id === columnId
      )!.name = columnName;
    },
    editBoard(boardId: string, newBoardName: string, newColumnsName: Column[]) {
      const findBoard = this.boards!.find((board) => board.id === boardId)!;
      findBoard.name = newBoardName;
      findBoard.columns = newColumnsName;
    },
    deleteBoard(boardId: string) {
      this.boards!.splice(
        this.boards!.findIndex((board) => board.id === boardId),
        1
      );
    },
  },
});
