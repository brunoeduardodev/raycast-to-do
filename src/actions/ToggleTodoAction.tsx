import { Action, Icon } from "@raycast/api";
import { Todo } from "../models";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
};
export const ToggleTodoAction = ({ onToggle, todo }: Props) => {
  return (
    <Action
      title={`Mark as ${todo.completedAt ? "Uncompleted" : "Completed"}`}
      onAction={() => {
        onToggle(todo.id);
      }}
      icon={todo.completedAt ? Icon.Circle : Icon.CheckCircle}
    />
  );
};
