import { useNavigate, useLocation } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../../../context/blogContext/BlogContext";
import { RoutesDictionary } from "./RoutesDictionary";
import { MainContext } from "../../../context/MainContext";

export const Prev = () => {
  const { mainUrl } = useContext(MainContext);

  const {
    previewImage,
    content,
    setContent,
    title,
    setTitle,
    category,
    setCategory,
    meta,
    setMeta,
    setImagen,
    imagen,
    setPreviewImage,
    loading,
    setLoading,
    name,
    setName,
    setCategories,
    categories,
    pageBlock,
    setPageBlock,
    comments,
    setComments,
    date, 
    setDate
  } = useContext(BlogContext);

  const [categoryName, setcategoryName] = useState("");

  const navigate = useNavigate();

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const edit = new URLSearchParams(location.search).get("edit");

  const cleanBlog = () => {
    if (pageBlock != "edit") {
      setPageBlock("edit");
      setImagen(null);
      setPreviewImage(null);
    }
  };

  const getBlog = async () => {
    return fetch(`${mainUrl}blog/blog/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setContent(data.contenido);
        setTitle(data.titulo);
        setCategory(data.categoria_id);
        setMeta(data.meta);
        setName(data.autor);
        setComments(data.comentarios);
        setDate(data.fecha);
        if (data.imagen.length > 0) {
          setPreviewImage(`${mainUrl}img/${data.imagen}`);
        }
      })
      .catch((error) => console.error(error));
  };

  const getCategories = async () => {
    return fetch(`${mainUrl}blog/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error(error));
  };

  const categoryNameSelector = () => {
    categories.forEach((element) => {
      if (element.categoria_id == category) {
        setcategoryName(element.categoria_nombre);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([getCategories(), getBlog()]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (edit != "true" && id != null) {
      cleanBlog();
      fetchData();
    } else if (id == null){
      const date = new Date();
      const formattedDate = date.toISOString().split('T')[0];
      setDate(formattedDate);
    }
    
  }, []);

  useEffect(() => {
    categoryNameSelector();
  }, [category]);

  const handleNavigate = () => {
    if (pageBlock == "edit") {
      navigate(`/blog/${pageBlock}?id=${id}&load=true`);
    } else navigate(`/blog/${pageBlock}?load=true`);
  };

  return (
    <section className="prevView">
      <div className="blogSubNavbar">
        <RoutesDictionary routes="blog nuevo ver" />
        <div className="buttons">
          <button onClick={handleNavigate} className="edit">
            Editar
          </button>
        </div>
      </div>
      <div className="content">
        <h6>{categoryName} / {date}</h6>
        <h1>{title}</h1>
        <h6>por: {name}</h6>

        {previewImage && (
          <div className="prevImageContainer">
            <img src={previewImage} alt={title} />{" "}
          </div>
        )}

        <section className="body">{HTMLReactParser(content)}</section>
      </div>
    </section>
  );
};
