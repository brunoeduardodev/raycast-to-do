import { useEffect, useRef, useState } from "react";
import { CreateTodoPayload, Todo, UpdateTodoPayload } from "../models";
import { LocalStorage } from "@raycast/api";
import { nanoid } from "nanoid";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const didInitialLoad = useRef<boolean>();

  useEffect(() => {
    async function load() {
      const existingTodos = await LocalStorage.getItem<string>("@todos/todos");
      if (!existingTodos) {
        return;
      }

      try {
        const parsedTodos = JSON.parse(existingTodos);
        setTodos(parsedTodos);
      } catch (err) {
        LocalStorage.setItem("@todos/todos", JSON.stringify([]));
        return;
      }
    }

    load().then(() => {
      didInitialLoad.current = true;
    });
  }, []);

  useEffect(() => {
    if (!didInitialLoad.current) {
      return;
    }
    LocalStorage.setItem("@todos/todos", JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          completedAt: todo.completedAt ? null : new Date().toISOString(),
        };
      }),
    );
  };

  const onCreate = (input: CreateTodoPayload) => {
    const id = nanoid();
    const newTodo: Todo = {
      id,
      completedAt: null,
      ...input,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const onUpdate = (input: UpdateTodoPayload) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id !== input.id) {
          return todo;
        }

        return {
          ...todo,
          ...input,
        };
      }),
    );
  };

  const onDelete = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    toggleTodo,
    onCreate,
    onUpdate,
    onDelete,
  };
};
