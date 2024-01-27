import { ActionPanel, Icon, List } from "@raycast/api";
import { CreateTodoAction } from "./actions/CreateTodoAction";
import { TodoListSection } from "./components/TodoListSection";
import { useTodos } from "./hooks/useTodos";

export default function ManageTodos() {
  const { todos, ...todoActions } = useTodos();
  const uncompletedTodos = todos.filter((todo) => !todo.completedAt);
  const completedTodos = todos.filter((todo) => !!todo.completedAt);

  return (
    <List actions={<ActionPanel></ActionPanel>}>
      <List.Item
        title="Create Todo"
        icon={Icon.PlusCircle}
        actions={
          <ActionPanel>
            <CreateTodoAction onCreate={todoActions.onCreate} />
          </ActionPanel>
        }
      />

      <TodoListSection title="Uncompleted" todos={uncompletedTodos} {...todoActions} />
      <TodoListSection title="Completed" todos={completedTodos} {...todoActions} />
    </List>
  );
}
