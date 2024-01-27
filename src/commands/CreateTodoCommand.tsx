import { useTodos } from "../contexts/TodosContext";
import { UpsertTodoForm } from "../forms/UpsertTodoForm";

export const CreateTodoCommand = () => {
  const { onCreate } = useTodos();

  return <UpsertTodoForm onSave={onCreate} targetTodo={null} />;
};
