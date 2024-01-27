import { CreateTodoCommand } from "../commands/CreateTodoCommand";
import { RootProviders } from "../contexts/RootProviders";

export default function CreateTodoScreen() {
  return (
    <RootProviders>
      <CreateTodoCommand />
    </RootProviders>
  );
}
