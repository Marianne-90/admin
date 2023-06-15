import { useState } from "react";
import { BlogContext } from "./BlogContext";

export const BlogProvider = ({ children }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState("");
  const [imagen, setImagen] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  return (
    <BlogContext.Provider
      value={{
        content,
        setContent,
        title,
        setTitle,
        meta,
        setMeta,
        imagen,
        setImagen,
        previewImage,
        setPreviewImage,
        categories, 
        setCategories
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
