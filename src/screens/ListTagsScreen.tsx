import { ListTagsCommand } from "../commands/ListTagsCommand";
import { RootProviders } from "../contexts/RootProviders";

export const ListTagsScreen = () => {
  return (
    <RootProviders>
      <ListTagsCommand />
    </RootProviders>
  );
};
