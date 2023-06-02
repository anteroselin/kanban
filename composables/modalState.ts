export const isTaskFormOpen = () =>
  useState<boolean>("isTaskFormOpen", () => false);
export const taskToEdit = () =>
  useState<TaskToEdit | null>("taskToEdit", () => null);
export const isAddBoardFormOpen = () =>
  useState<boolean>("isAddBoardFormOpen", () => false);
export const isEditBoardFormOpen = () =>
  useState<boolean>("isEditBoardFormOpen", () => false);
