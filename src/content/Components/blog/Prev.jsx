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
  const [routeState, setRouteState] = useState("Editar");

  const navigate = useNavigate();

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const edit = queryParams.get("edition");
  const len = queryParams.get("len");

  const getBlog = async () => {
    let obj = { ...blogElements };
    return fetch(`${mainUrl}blog/blog/${id}`)
      .then((response) => response.json())
      .then((data) => {
        obj["content"] = data.contenido;
        obj["content_eng"] = data.contenido_eng;
        obj["title"] = data.titulo;
        obj["title_eng"] = data.titulo_eng;
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
        if (len === null || len === "esp") {
          setcategoryName(element.categoria_nombre);
        } else if (len === "eng") {
          setcategoryName(element.categoria_nombre_eng);
        }
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
      setRouteState("Nuevo")
    }
  }, []);

  useEffect(() => {
    categoryNameSelector();
  }, [blogElements.category , len]);

  const handleNavigate = () => {
    if (pageBlock == "edit") {
      navigate(`/blog/${pageBlock}?id=${id}&load=true`);
    } else navigate(`/blog/${pageBlock}?load=true`);
  };

  const handleChangeLenguaje = () => {
    let string = "";
    let path = location.pathname;
    let changeLen = "";

    if (len === null || len === "esp") {
      changeLen = "eng";
    } else if (len === "eng") {
      changeLen = "esp";
    }
    

    queryParams.forEach((value, key) => {
      if (key !== "len") {
        let param = `&${key}=${value}`;
        string = `${string}${param}`;
      }
    });

    navigate(`${path}?len=${changeLen}${string}`);
  };

  return (
    <section className="prevView">
      <div className="blogSubNavbar">
        <RoutesDictionary routes={`Blog ${routeState} Ver`}/>
        <div className="buttons">
          <button onClick={handleChangeLenguaje} className="save">
            {len === "eng" ? "Español" : "English"}
          </button>
          <button onClick={handleNavigate} className="edit">
            Editar
          </button>
        </div>
      </div>
      <div className="content">
        <h6>
          {categoryName} / {blogElements.date}
        </h6>
        <h1>{len === "eng"? blogElements.title_eng : blogElements.title}</h1>
        <h6>{len === "eng"? "By: " : "Por: "}{blogElements.autor}</h6>

        {blogElements.previewImage && (
          <div className="prevImageContainer">
            <img src={blogElements.previewImage} alt={blogElements.title} />{" "}
          </div>
        )}

        <section className="body">
          {len === "eng"? HTMLReactParser(blogElements.content_eng) : HTMLReactParser(blogElements.content) }
        </section>
      </div>
    </section>
  );
};
