"use client"
import { 
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
interface ContextValue {
  content: string;
  setContent: (value: string) => void;
}

export const CommentsContext = createContext<ContextValue>({
  content: "",
  setContent: () => { }
});

const CommentsProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState("");
  
  return (
    <CommentsContext.Provider
      value={{
        content,
        setContent
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export const useCommentsContext = () => useContext(CommentsContext);

export default CommentsProvider;
