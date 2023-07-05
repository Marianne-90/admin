import { useState } from "react";
import { BlogContext } from "./BlogContext";

export const BlogProvider = ({ children }) => {
  const [blogElements, setBlogElements] = useState({
    content: "",
    content_eng: "",
    title: "",
    title_eng:"",
    meta: "",
    imagen: null,
    previewImage: null,
    category: "",
    date: "",
    comments: 0,
    autor:"",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const [pageBlock, setPageBlock] = useState("");
  const [comentsList, setComentsList] = useState([]);

  return (
    <BlogContext.Provider
      value={{
        categories,
        setCategories,
        loading,
        setLoading,
        blogList,
        setBlogList,
        pageBlock,
        setPageBlock,
        comentsList,
        setComentsList,
        blogElements,
        setBlogElements,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
