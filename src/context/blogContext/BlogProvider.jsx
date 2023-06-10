import { useState } from "react";
import { BlogContext } from "./BlogContext";

export const BlogProvider = ({ children }) => {
  const [content, setContent] = useState("");

  return (
    <BlogContext.Provider
      value={{
        content, 
        setContent,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};