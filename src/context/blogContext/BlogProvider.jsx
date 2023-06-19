import { useState } from "react";
import { BlogContext } from "./BlogContext";

export const BlogProvider = ({ children }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState("");
  const [imagen, setImagen] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");

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
        setCategories,
        loading,
        setLoading,
        category,
        setCategory,
        name, 
        setName
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
