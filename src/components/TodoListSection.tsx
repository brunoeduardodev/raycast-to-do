import { ActionPanel, Color, Icon, List } from "@raycast/api";
import { CreateTodoPayload, Todo, UpdateTodoPayload } from "../models";
import { CreateTodoAction } from "../actions/CreateTodoAction";
import { ToggleTodoAction } from "../actions/ToggleTodoAction";
import { UpdateTodoAction } from "../actions/UpdateTodoAction";
import { DeleteTodoAction } from "../actions/DeleteTodoAction";
import { DateTime } from "luxon";
import { useTags } from "../contexts/TagsContext";

type Props = {
  title: string;
  todos: Todo[];
  onCreate: (input: CreateTodoPayload) => void;
  onUpdate: (input: UpdateTodoPayload) => void;
  onDelete: (id: string) => void;
  toggleTodo: (id: string) => void;
};

export const TodoListSection = ({ title, todos, onCreate, toggleTodo, onUpdate, onDelete }: Props) => {
  const { tags } = useTags();
  return (
    <List.Section title={title}>
      {todos.map((todo) => (
        <List.Item
          key={todo.id}
          title={todo.title}
          subtitle={todo.description}
          accessories={[
            ...(todo.completedAt
              ? [
                  {
                    text: DateTime.fromISO(todo.completedAt).toFormat("dd MMM, hh:mm"),
                  },
                ]
              : []),
            ...todo.tags.map((tagId) => {
              const tag = tags.find((tag) => tag.id === tagId)!;
              if (!tag)
                return {
                  text: "Deleted Tag",
                  icon: { source: Icon.Circle, tintColor: Color.Green },
                };

              return {
                text: tag.title,
                icon: { source: Icon.Circle, tintColor: tag.color },
              };
            }),
          ]}
          icon={todo.completedAt ? Icon.CheckCircle : Icon.Circle}
          actions={
            <ActionPanel>
              <ToggleTodoAction todo={todo} onToggle={toggleTodo} />
              <CreateTodoAction onCreate={onCreate} />
              <UpdateTodoAction todo={todo} onUpdate={onUpdate} />
              <DeleteTodoAction onDelete={() => onDelete(todo.id)} />
            </ActionPanel>
          }
        />
      ))}
    </List.Section>
  );
};
