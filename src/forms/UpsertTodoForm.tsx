import { Action, ActionPanel, Form, Icon, useNavigation } from "@raycast/api";
import { CreateTodoPayload, Todo, UpdateTodoPayload } from "../models";
import { useTags } from "../hooks/useTags";
import { CreateTagAction } from "../actions/CreateTagAction";

type Props =
  | {
      targetTodo: Todo;
      onSave: (input: UpdateTodoPayload) => void;
    }
  | {
      onSave: (input: CreateTodoPayload) => void;
      targetTodo: null;
    };

export const UpsertTodoForm = ({ onSave, targetTodo }: Props) => {
  const { tags, isLoading, ...actions } = useTags();
  const navigation = useNavigation();

  if (isLoading) {
    return <Form isLoading />;
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm<CreateTodoPayload>
            title={targetTodo ? "Update" : "Create"}
            onSubmit={(payload) => {
              if (targetTodo) {
                onSave({ id: targetTodo.id, ...payload });
                navigation.pop();
                return;
              }

              onSave(payload);
              navigation.pop();
            }}
          />
          <CreateTagAction onCreate={actions.onCreate} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="title"
        title="Todo Description"
        placeholder="Buy ..."
        defaultValue={targetTodo?.title ?? ""}
      />

      <Form.TextArea id="description" title="Todo Description" defaultValue={targetTodo?.description ?? ""} />

      <Form.TagPicker id="tags" title="Tags" defaultValue={targetTodo?.tags ?? []}>
        {tags.map((tag) => (
          <Form.TagPicker.Item
            key={tag.id}
            title={tag.title}
            value={tag.id}
            icon={{ source: Icon.Circle, tintColor: tag.color }}
          />
        ))}
      </Form.TagPicker>
    </Form>
  );
};
