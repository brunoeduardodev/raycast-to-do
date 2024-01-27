import { Action, Icon } from "@raycast/api";
import { UpsertTagForm } from "../forms/UpsertTagForm";
import { Tag, UpdateTagPayload } from "../models";

type Props = {
  tag: Tag;
  onUpdate: (input: UpdateTagPayload) => void;
};

export const UpdateTagAction = ({ onUpdate, tag }: Props) => {
  return (
    <Action.Push
      title="Update Tag"
      target={<UpsertTagForm targetTag={tag} onSave={onUpdate} />}
      shortcut={{ modifiers: ["cmd"], key: "e" }}
      icon={Icon.Pencil}
    />
  );
};
