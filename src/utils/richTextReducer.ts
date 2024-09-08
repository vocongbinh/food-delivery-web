import { marked } from "marked";

export const richTextReducer = (rawRichText: string) => {
  const parsedRichText = marked.parse(rawRichText);
  return parsedRichText;
};
