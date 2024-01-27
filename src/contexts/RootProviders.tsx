import { PropsWithChildren } from "react";
import { TodosContextProvider } from "./TodosContext";
import { TagsContextProvider } from "./TagsContext";

export const RootProviders = ({ children }: PropsWithChildren) => {
  return (
    <TodosContextProvider>
      <TagsContextProvider>{children}</TagsContextProvider>
    </TodosContextProvider>
  );
};
