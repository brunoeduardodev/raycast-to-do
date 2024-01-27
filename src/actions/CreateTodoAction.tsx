import { Action, Icon } from "@raycast/api";
import { UpsertTodoForm } from "../forms/UpsertTodoForm";
import { CreateTodoPayload } from "../models";

type Props = {
  onCreate: (input: CreateTodoPayload) => void;
};

export const CreateTodoAction = ({ onCreate }: Props) => {
  return (
    <Action.Push
      title="Create Todo"
      target={<UpsertTodoForm onSave={onCreate} targetTodo={null} />}
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      icon={Icon.Plus}
    />
  );
};
