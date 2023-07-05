import { useNavigate, useLocation } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../../../context/blogContext/BlogContext";
import { RoutesDictionary } from "./RoutesDictionary";
import { MainContext } from "../../../context/MainContext";

export const Prev = () => {
  const { mainUrl } = useContext(MainContext);

  const {
    blogElements,
    setBlogElements,
    loading,
    setLoading,
    setCategories,
    categories,
    pageBlock,
    setPageBlock,
  } = useContext(BlogContext);

  const [categoryName, setcategoryName] = useState("");

  const navigate = useNavigate();

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const edit = new URLSearchParams(location.search).get("edition");

  const getBlog = async () => {
    let obj = { ...blogElements };
    return fetch(`${mainUrl}blog/blog/${id}`)
      .then((response) => response.json())
      .then((data) => {
        obj["content"] = data.contenido;
        obj["title"] = data.titulo;
        obj["category"] = data.categoria_id;
        obj["meta"] = data.meta;
        obj["autor"] = data.autor;
        obj["date"] = data.fecha;
        obj["comments"] = data.comentarios;
        obj["previewImage"] = null;
        obj["imagen"] = null;

        if (data.imagen.length > 0) {
          obj["previewImage"] = `${mainUrl}img/${data.imagen}`;
        }
        setBlogElements(obj);
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
      if (element.categoria_id == blogElements.category) {
        setcategoryName(element.categoria_nombre);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setPageBlock("edit");
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
      fetchData();
    } else if (id == null) {
      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];

      let obj = { ...blogElements };
      obj["date"] = formattedDate;
      setBlogElements(obj);
    }
  }, []);

  useEffect(() => {
    categoryNameSelector();
  }, [blogElements.category]);

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
        <h6>
          {categoryName} / {blogElements.date}
        </h6>
        <h1>{blogElements.title}</h1>
        <h6>por: {blogElements.autor}</h6>

        {blogElements.previewImage && (
          <div className="prevImageContainer">
            <img src={blogElements.previewImage} alt={blogElements.title} />{" "}
          </div>
        )}

        <section className="body">{HTMLReactParser(blogElements.content)}</section>
      </div>
    </section>
  );
};
