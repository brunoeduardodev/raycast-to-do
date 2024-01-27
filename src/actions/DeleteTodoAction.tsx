import { Action, Icon } from "@raycast/api";

type Props = {
  onDelete: () => void;
};
export const DeleteTodoAction = ({ onDelete }: Props) => {
  return (
    <Action title="Delete Todo" shortcut={{ modifiers: ["cmd"], key: "d" }} onAction={onDelete} icon={Icon.Trash} />
  );
};
