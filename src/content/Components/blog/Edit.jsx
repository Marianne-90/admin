import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../../../context/blogContext/BlogContext";
import { MainContext } from "../../../context/MainContext";
import { useNavigate, useLocation } from "react-router-dom";
import { RoutesDictionary } from "./RoutesDictionary";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import { EditionElement } from "./EditionElement";

export const Edit = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const load = new URLSearchParams(location.search).get("load");

  const navigate = useNavigate();

  const {
    blogElements,
    setBlogElements,
    loading,
    setLoading,
    setCategories,
    pageBlock,
    setPageBlock,
  } = useContext(BlogContext);

  const { mainUrl, id: userID } = useContext(MainContext);

  const cleanBlog = () => {
    if (pageBlock != "edit") {
      setPageBlock("edit");
      let obj = { ...blogElements };
      obj["imagen"] = null;
      obj["previewImage"] = null;
      return obj;
    }
    return blogElements;
  };

  const getBlog = async () => {
    let obj = await cleanBlog();

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

    if (load != "true") {
      fetchData();
    }
  }, []);

  const handleSave = async (state) => {
    const cleanedContent = DOMPurify.sanitize(blogElements.content);
    const cleanedContent_eng = DOMPurify.sanitize(blogElements.content_eng);


    setLoading(true);
    const formData = new FormData();
    formData.append("usuario_id", userID);
    formData.append("blog_id", id);
    formData.append("categoria_id", blogElements.category);
    formData.append("titulo", blogElements.title);
    formData.append("titulo_eng", blogElements.title_eng);
    formData.append("metadatos", blogElements.meta);
    formData.append("estado", state);
    formData.append("content", cleanedContent);
    formData.append("content_eng", cleanedContent_eng);
    formData.append("img", blogElements.imagen);

    //*! ESTO ES PARA SABER SI DEBO ELIMINAR LA IMAGEN 

    if(blogElements.previewImage === null){
      formData.append("deleteImg", "eliminar");
    } else  formData.append("deleteImg", "");



    try {
      const response = await fetch(`${mainUrl}blog/updateBlog`, {
        method: "POST",
        body: formData,
        mode: "cors", // activa la política de cors
      });

      const data = await response.json();
      Swal.fire("Solicitud Enviada", data.message);

      setLoading(false);

      let obj = { ...blogElements };
      obj["content"] = "";
      obj["content_eng"] = "";
      obj["title"] = "";
      obj["title_eng"] = "";
      obj["category"] = "";
      obj["meta"] = "";
      obj["date"] = "";
      obj["comments"] = 0;
      obj["previewImage"] = null;
      obj["imagen"] = null;

      setBlogElements(obj);

      navigate("/blog/main");
    } catch (error) {
      Swal.fire("ERROR", "Ha ocurrido un error con la solicitud", "error");
      console.log("Ha ocurrido un error:", error);
      setLoading(false);
    }
  };

  const handleDeleteBlog = async () => {
    setLoading(true);

    let confirmation = false;

    await Swal.fire({
      title: "Estas Segurx?",
      text: "Se eliminará el blog y comentarios asociados, ESTA ACCIÓN NO SE PODRÁ REVERTIR",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmation = true;
      }
    });

    if (confirmation) {
      const formData = new FormData();
      formData.append("usuario", userID);
      formData.append("id", id);

      try {
        const response = await fetch(`${mainUrl}blog/deleteBlog`, {
          method: "POST",
          body: formData,
          mode: "cors", // activa la política de cors
        });

        const data = await response.json();
        Swal.fire("Solicitud Enviada", data.message);

        let obj = { ...blogElements };
        obj["content"] = "";
        obj["content_eng"] = "";
        obj["title"] = "";
        obj["title_eng"] = "";
        obj["category"] = "";
        obj["meta"] = "";
        obj["date"] = "";
        obj["comments"] = 0;
        obj["previewImage"] = null;
        obj["imagen"] = null;

        setBlogElements(obj);

        navigate("/blog/main");

        setLoading(false);
      } catch (error) {
        Swal.fire("ERROR", "Ha ocurrido un error con la solicitud", "error");
        console.log("Ha ocurrido un error:", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleComments = () => {
    navigate(`/blog/comments?id=${id}`);
  };

  if (loading) {
    return (
      <div className="loaderContent">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <section className="newBlog">
      <div className="blogSubNavbar">
        <RoutesDictionary routes="Página-Principal blogs editar" />
        <div className="buttons">
          <button
            onClick={() => navigate(`/blog/prev?id=${id}&edition=true`)}
            className="VP"
          >
            Vista Previa
          </button>
          <button className="save" onClick={() => handleSave("activo")}>
            Publicar
          </button>
          <button className="borrador" onClick={() => handleSave("inactivo")}>
            Guardar
          </button>
          <button className="cancel" onClick={handleDeleteBlog}>
            Borrar
          </button>
        </div>
      </div>
      <h1 className="blogTitle">Editar Blog</h1>
      <EditionElement />
      <div id="adminComments">
        <button onClick={handleComments}>
          Administrar {blogElements.comments} comentarios
        </button>
      </div>
    </section>
  );
};
