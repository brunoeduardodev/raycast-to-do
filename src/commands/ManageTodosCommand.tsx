import { ActionPanel, Icon, List } from "@raycast/api";
import { CreateTodoAction } from "../actions/CreateTodoAction";
import { TodoListSection } from "../components/TodoListSection";
import { useState } from "react";
import { useTodos } from "../contexts/TodosContext";
import { useTags } from "../contexts/TagsContext";

export const ManageTodosCommand = () => {
  const { todos: allTodos, ...todoActions } = useTodos();
  const { tags } = useTags();

  const [tagFilter, setTagFilter] = useState("all");

  const todos = allTodos.filter((todo) => {
    if (tagFilter === "all") return true;
    return todo.tags?.includes(tagFilter);
  });

  const uncompletedTodos = todos.filter((todo) => !todo.completedAt);
  const completedTodos = todos.filter((todo) => !!todo.completedAt);

  return (
    <List
      searchBarAccessory={
        <List.Dropdown tooltip="Search by tag" onChange={setTagFilter}>
          <List.Dropdown.Item title="All" value="all" />
          {tags.map((tag) => (
            <List.Dropdown.Item
              key={tag.id}
              title={tag.title}
              value={tag.id}
              icon={{
                source: Icon.Circle,
                tintColor: tag.color,
              }}
            />
          ))}
        </List.Dropdown>
      }
    >
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
};
