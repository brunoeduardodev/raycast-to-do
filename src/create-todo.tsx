import { UpsertTodoForm } from "./forms/UpsertTodoForm";
import { useTodos } from "./hooks/useTodos";

export default function CreateTodoCommand() {
  const { onCreate } = useTodos();

  return <UpsertTodoForm onSave={onCreate} targetTodo={null} />;
}
