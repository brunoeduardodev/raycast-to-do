import { Action, Icon } from "@raycast/api";
import { UpsertTagForm } from "../forms/UpsertTagForm";
import { CreateTagPayload } from "../models";

type Props = {
  onCreate: (input: CreateTagPayload) => void;
};

export const CreateTagAction = ({ onCreate }: Props) => {
  return (
    <Action.Push
      title="Create Tag"
      target={<UpsertTagForm targetTag={null} onSave={onCreate} />}
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      icon={Icon.Plus}
    />
  );
};
