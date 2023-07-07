import { useState, useEffect, useContext } from "react";
import { RoutesDictionary } from "./RoutesDictionary";
import { useNavigate, useLocation } from "react-router-dom";
import { BlogContext } from "../../../context/blogContext/BlogContext";
import { MainContext } from "../../../context/MainContext";
import { PrevViewElement } from "./PrevViewElement";

export const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const filter = new URLSearchParams(location.search).get("filter");
  const search = new URLSearchParams(location.search).get("search");

  const { setBlogList, loading, setLoading, blogList } =
    useContext(BlogContext);
  const { mainUrl } = useContext(MainContext);

  const [navDir, setNavDir] = useState("blog página-princial");
  const [orderValue, setOrderValue] = useState("");

  const getBlogs = async (order) => {
    return fetch(`${mainUrl}blog/bloglist/${order}`)
      .then((response) => response.json())
      .then((data) => {
         setBlogList(data);
      })
      .catch((error) => console.error(error));
  };

  const searchBlogs = async (search) => {
    return fetch(`${mainUrl}blog/search/${search}`)
      .then((response) => response.json())
      .then((data) => {
        setBlogList(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const get = async () => {
      if (search != null) {
        setLoading(true);
        setNavDir(`blog página-princial Búsqueda`);
        setOrderValue(search);
        await searchBlogs(search);
        setLoading(false);
      }
    };
    get();
  }, [search]);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      if (filter != null) {
        setOrderValue(filter);
        await getBlogs(filter);
      } else if (search == null) {
        await getBlogs("fecha-a");
      }
      setLoading(false);
    };
    get();
  }, [filter]);

  const handleOrder = (e) => {
    let target = e.target.name;
    navigate(`/blog/main?filter=${target}`);
    //*! categoría iba sin acento aquí se lo agrego
    if (target == "categoria") target = "categoría";

    //*! esto lo soluciono en css pero la primera vez que se añadía aparecía en minúsculas y esto lo resuelve
    target = target.replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });

    setNavDir(`blog página-princial ${target}`);
  };

  if (loading) {
    return (
      <div className="loaderContent">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <section className="main">
      <div className="blogSubNavbar">
        <RoutesDictionary routes={navDir} />
        <nav>
          <p>ordenar por:</p>
          <a name="categoria" onClick={handleOrder}>
            categoría
          </a>
          <a name="autor" onClick={handleOrder}>
            autor
          </a>
          <a name="fecha-a" onClick={handleOrder}>
            fecha A.
          </a>
          <a name="fecha-d" onClick={handleOrder}>
            fecha D.
          </a>
          <a name="estado" onClick={handleOrder}>
            estado
          </a>
        </nav>
      </div>
      <h1 className="blogTitle">
        Listado de Blogs
        {orderValue.length > 1 && <small> Resultados de: {orderValue}</small>}
      </h1>
      <div className="content">
        {search != null && blogList[0]["blogs"].length < 1 ? (
          <h1 className="blogSubTitle margintop50px">No hay resultados de búsqueda :c ...</h1>
        ) : (
          <PrevViewElement />
        )}
      </div>
    </section>
  );
};
