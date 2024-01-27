import { Action, Icon } from "@raycast/api";
import { CreateTodoPayload } from "../models";
import { UpsertTodoScreen } from "../screens/UpsertTodoScreen";

type Props = {
  onCreate: (input: CreateTodoPayload) => void;
};

export const CreateTodoAction = ({ onCreate }: Props) => {
  return (
    <Action.Push
      title="Create Todo"
      target={<UpsertTodoScreen onSave={onCreate} targetTodo={null} />}
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      icon={Icon.Plus}
    />
  );
};
