import { ActionPanel, Icon, List } from "@raycast/api";
import { useTags } from "./hooks/useTags";
import { CreateTagAction } from "./actions/CreateTagAction";
import { UpdateTagAction } from "./actions/UpdateTagAction";

export default function ManageTodos() {
  const { tags, ...actions } = useTags();

  return (
    <List actions={<ActionPanel></ActionPanel>}>
      <List.Item
        title="Create Tag"
        icon={Icon.PlusCircle}
        actions={
          <ActionPanel>
            <CreateTagAction onCreate={actions.onCreate} />
          </ActionPanel>
        }
      />

      {tags.map((tag) => (
        <List.Item
          key={tag.id}
          title={tag.title}
          icon={{ source: Icon.Circle, tintColor: tag.color }}
          actions={
            <ActionPanel>
              <UpdateTagAction tag={tag} onUpdate={actions.onUpdate} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
