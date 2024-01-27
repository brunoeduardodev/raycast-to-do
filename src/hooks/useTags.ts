import { useEffect, useRef, useState } from "react";
import { CreateTagPayload, Tag, UpdateTagPayload } from "../models";
import { LocalStorage } from "@raycast/api";
import { nanoid } from "nanoid";

export const useTags = () => {
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

  return {
    tags,
    onCreate,
    onUpdate,
    onDelete,
    isLoading,
  };
};
