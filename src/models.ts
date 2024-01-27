export type Todo = {
  id: string;
  title: string;
  description: string;
  completedAt: string | null;
  tags: string[];
};

export type CreateTodoPayload = {
  title: string;
  description: string;
  tags: string[];
};

export type UpdateTodoPayload = CreateTodoPayload & {
  id: string;
};

export type Tag = {
  id: string;
  title: string;
  color: string;
};

export type CreateTagPayload = {
  title: string;
  color: string;
};

export type UpdateTagPayload = CreateTagPayload & {
  id: string;
};
