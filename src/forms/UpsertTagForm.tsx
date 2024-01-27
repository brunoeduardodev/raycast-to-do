import { Action, ActionPanel, Color, Form, Icon, useNavigation } from "@raycast/api";
import { CreateTagPayload, Tag, UpdateTagPayload } from "../models";

type Props =
  | {
      targetTag: Tag;
      onSave: (input: UpdateTagPayload) => void;
    }
  | {
      onSave: (input: CreateTagPayload) => void;
      targetTag: null;
    };

export const UpsertTagForm = ({ onSave, targetTag }: Props) => {
  const navigation = useNavigation();
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm<CreateTagPayload>
            title={targetTag ? "Update" : "Create"}
            onSubmit={(payload) => {
              if (targetTag) {
                onSave({ id: targetTag.id, ...payload });
                navigation.pop();
                return;
              }

              onSave(payload);
              navigation.pop();
            }}
          />
        </ActionPanel>
      }
    >
      <Form.TextField id="title" title="Tag Description" placeholder="Buy ..." defaultValue={targetTag?.title ?? ""} />

      <Form.Dropdown id="color" title="Tag Color">
        <Form.Dropdown.Item value="red" title="Red" icon={{ source: Icon.Circle, tintColor: Color.Red }} />
        <Form.Dropdown.Item value="blue" title="Blue" icon={{ source: Icon.Circle, tintColor: Color.Blue }} />
        <Form.Dropdown.Item value="green" title="Green" icon={{ source: Icon.Circle, tintColor: Color.Green }} />
        <Form.Dropdown.Item value="magenta" title="Magenta" icon={{ source: Icon.Circle, tintColor: Color.Magenta }} />
        <Form.Dropdown.Item value="orange" title="Orange" icon={{ source: Icon.Circle, tintColor: Color.Orange }} />
        <Form.Dropdown.Item value="purple" title="Purple" icon={{ source: Icon.Circle, tintColor: Color.Purple }} />
        <Form.Dropdown.Item value="yellow" title="Yellow" icon={{ source: Icon.Circle, tintColor: Color.Yellow }} />
      </Form.Dropdown>
    </Form>
  );
};
