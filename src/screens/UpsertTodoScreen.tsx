import { RootProviders } from "../contexts/RootProviders";
import { UpsertTodoForm, UpsertTodoFormProps } from "../forms/UpsertTodoForm";

export const UpsertTodoScreen = (props: UpsertTodoFormProps) => {
  return (
    <RootProviders>
      <UpsertTodoForm {...props} />
    </RootProviders>
  );
};
