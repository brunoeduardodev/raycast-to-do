import { Action, Icon } from "@raycast/api";
import { Todo, UpdateTodoPayload } from "../models";
import { UpsertTodoScreen } from "../screens/UpsertTodoScreen";

type Props = {
  todo: Todo;
  onUpdate: (input: UpdateTodoPayload) => void;
};
export const UpdateTodoAction = ({ onUpdate, todo }: Props) => {
  return (
    <Action.Push
      title="Update Todo"
      target={<UpsertTodoScreen onSave={onUpdate} targetTodo={todo} />}
      shortcut={{ modifiers: ["cmd"], key: "e" }}
      icon={Icon.Pencil}
    />
  );
};
