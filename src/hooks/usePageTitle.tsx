import { useEffect } from "react";

const DEFAULT_TITLE = "PlatterMap - Discover Delicious Recipes from Around the World";

export const usePageTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} | PlatterMap` : DEFAULT_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
};
