import { RoutesDictionary } from "./RoutesDictionary";
import { BlogContext } from "../../../context/blogContext/BlogContext";
import { MainContext } from "../../../context/MainContext";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CommentElement } from "./CommentElement";
import * as XLSX from 'xlsx';
import { Excel } from "./Excel";


export const Coments = () => {
  const [navDir, setNavDir] = useState("blog comentarios");
  const [orderValue, setOrderValue] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { mainUrl } = useContext(MainContext);
  const { loading, setLoading, comentsList, setComentsList } = useContext(BlogContext);

  const filter = new URLSearchParams(location.search).get("filter");
  const blog_id = new URLSearchParams(location.search).get("id");

  const getComments = async (order) => {
    return fetch(`${mainUrl}blog/comments/${order}`)
      .then((response) => response.json())
      .then((data) => {
        setComentsList(data);
      })
      .catch((error) => console.error(error));
  };

  const getCommentById = async (id) => {
    return fetch(`${mainUrl}blog/comment/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setComentsList(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const get = async () => {
      if (blog_id != null) {
        setLoading(true);
        setNavDir(`blog comentarios blog-id-${blog_id}`);
        setOrderValue(blog_id);
        await getCommentById(blog_id);
        setLoading(false);
      }
    };
    get();
  }, [blog_id]);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      if (filter != null) {
        setOrderValue(filter);
        await getComments(filter);
      } else if (blog_id == null) {
        await getComments("fecha-a");
      }
      setLoading(false);
    };
    get();
  }, [filter]);

  const handleOrder = (e) => {
    let target = e.target.name;
    navigate(`/blog/comments?filter=${target}`);

    //*! esto lo soluciono en css pero la primera vez que se añadía aparecía en minúsculas y esto lo resuelve
    target = target.replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
    setNavDir(`blog comentarios ${target}`);
  };

  if (loading) {
    return (
      <div className="loaderContent">
        <div className="loader"></div>
      </div>
    );
  }



    const handleDownload = () => {
      // Datos de ejemplo
      const data = [
        ['Nombre', 'Apellido', 'Edad'],
        ['John', 'Doe', 25],
        ['Jane', 'Smith', 30],
        ['Bob', 'Johnson', 35]
      ];
  
      // Crear un libro de trabajo
      const workbook = XLSX.utils.book_new();
  
      // Crear una hoja de cálculo
      const worksheet = XLSX.utils.aoa_to_sheet(data);
  
      // Agregar la hoja de cálculo al libro de trabajo
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Comentarios');
  
      // Convertir el libro de trabajo a un archivo de Excel
      const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  
      // Descargar el archivo
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const fileName = 'comentarios.xlsx';
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // Para navegadores de Microsoft
        window.navigator.msSaveBlob(blob, fileName);
      } else {
        // Para otros navegadores
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    };


  return (
    <section className="comments">
      <div className="blogSubNavbar">
        <RoutesDictionary routes={navDir} />
        <div className="buttons">
        <Excel download={[...comentsList]}/>

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

      <h1 className="blogTitle">Listado de Comentarios</h1>

      <div className="content">
        {blog_id != null && comentsList.length < 1 ? (
          <h1 className="blogSubTitle margintop50px">No hay comentarios todavía :c ...</h1>
        ) : (
          <CommentElement/>
        )}
      </div>




    </section>
  );
};
