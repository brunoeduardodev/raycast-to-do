import { Action, Icon } from "@raycast/api";
import { UpsertTagForm } from "../forms/UpsertTagForm";
import { CreateTagPayload } from "../models";
import { UpsertTagScreen } from "../screens/UpsertTagScreen";

type Props = {
  onCreate: (input: CreateTagPayload) => void;
};

export const CreateTagAction = ({ onCreate }: Props) => {
  return (
    <Action.Push
      title="Create Tag"
      target={<UpsertTagScreen onSave={onCreate} targetTag={null} />}
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      icon={Icon.Plus}
    />
  );
};
