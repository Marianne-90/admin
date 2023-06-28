import { RoutesDictionary } from "./RoutesDictionary";
import { BlogContext } from "../../../context/blogContext/BlogContext";
import { MainContext } from "../../../context/MainContext";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


export const Coments = () => {
  const [navDir, setNavDir] = useState("blog comentarios");
  const location = useLocation();
  const navigate = useNavigate();

  const handleOrder = (e) => {
    let target = e.target.name;
    navigate(`/blog/comments?filter=${target}`);

    //*! esto lo soluciono en css pero la primera vez que se añadía aparecía en minúsculas y esto lo resuelve
    target = target.replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
    setNavDir(`blog comentarios ${target}`);
  };

  return (
    <section className="comments">
      <div className="blogSubNavbar">
        <RoutesDictionary routes={navDir} />
        <div className="buttons">

          <button id="descargarComment">Descargar CSV</button>
        </div>
        <nav>
          <p>ordenar por:</p>
          <a name="publicaciones" onClick={handleOrder}>
            publicaciones
          </a>
          <a name="fecha-a" onClick={handleOrder}>
            fecha A.
          </a>
          <a name="fecha-d" onClick={handleOrder}>
            fecha D.
          </a>
        </nav>
      </div>
    </section>
  );
};
