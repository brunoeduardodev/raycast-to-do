import { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from "react";
import { CreateTagPayload, Tag, UpdateTagPayload } from "../models";
import { LocalStorage } from "@raycast/api";
import { nanoid } from "nanoid";

type TagsContextData = {
  tags: Tag[];
  onCreate: (input: CreateTagPayload) => void;
  onUpdate: (input: UpdateTagPayload) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
};

export const TagsContext = createContext<TagsContextData | null>(null);

export const TagsContextProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState<Tag[]>([]);
  const didInitialLoad = useRef<boolean>();

  useEffect(() => {
    async function load() {
      const existingTags = await LocalStorage.getItem<string>("@tags/tags");
      if (!existingTags) {
        return;
      }

      try {
        const parsedTags = JSON.parse(existingTags);
        setTags(parsedTags);
      } catch (err) {
        LocalStorage.setItem("@tags/tags", JSON.stringify([]));
        return;
      }
    }

    load().then(() => {
      didInitialLoad.current = true;
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!didInitialLoad.current) {
      return;
    }
    LocalStorage.setItem("@tags/tags", JSON.stringify(tags));
  }, [tags]);

  const onCreate = (input: CreateTagPayload) => {
    const id = nanoid();
    const newTag: Tag = {
      id,
      ...input,
    };

    setTags((prevTags) => [...prevTags, newTag]);
  };

  const onUpdate = (input: UpdateTagPayload) => {
    setTags((prevTags) =>
      prevTags.map((tag) => {
        if (tag.id !== input.id) {
          return tag;
        }

        return {
          ...tag,
          ...input,
        };
      }),
    );
  };

  const onDelete = (id: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };

  return (
    <TagsContext.Provider
      value={{
        tags,
        onCreate,
        onUpdate,
        onDelete,
        isLoading,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
};

export const useTags = () => {
  const context = useContext(TagsContext);
  if (!context) {
    throw new Error("useTags must be used within a TagsContextProvider");
  }

  return context;
};
