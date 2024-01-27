import { ManageTodosCommand } from "../commands/ManageTodosCommand";
import { RootProviders } from "../contexts/RootProviders";

export const ManageTodosScreen = () => {
  return (
    <RootProviders>
      <ManageTodosCommand />
    </RootProviders>
  );
};
