import { RootProviders } from "../contexts/RootProviders";
import { UpsertTagForm, UpsertTagFormProps } from "../forms/UpsertTagForm";

export const UpsertTagScreen = (props: UpsertTagFormProps) => {
  return (
    <RootProviders>
      <UpsertTagForm {...props} />
    </RootProviders>
  );
};
