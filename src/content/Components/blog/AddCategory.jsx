import { useContext, useState } from "react";
import { BlogContext } from "../../../context/blogContext/BlogContext";
import { MainContext } from "../../../context/MainContext";
import Swal from "sweetalert2";

export const AddCategory = () => {
  const { setCategories, setLoading } = useContext(BlogContext);
  const { mainUrl, id } = useContext(MainContext);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const getCategories = async () => {
    return fetch(`${mainUrl}blog/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
    formData.append("usuario", id);
    formData.append("categoria", category);
    formData.append("descripcion", description);

    try {
      const response = await fetch(`${mainUrl}blog/addcategory`, {
        method: "POST",
        body: formData,
        mode: "cors", // activa la política de cors
      });

      const data = await response.json();
      Swal.fire("Solicitud Enviada", data.message);
      await getCategories();
      setLoading(false);
    } catch (error) {
      Swal.fire("ERROR", "Ha ocurrido un error con la solicitud", "error");
      console.log("Ha ocurrido un error:", error);
      setLoading(false);
    }
  };

  return (
    <section className="addCategory">
      <h2>Añadir nueva</h2>
      <form action="POST" onSubmit={handleSubmit}>
        <p>Categoría</p>
        <input
          type="text"
          className="nombre"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          maxLength={60}
        />
        <p>Descripción</p>
        <textarea
          type="text"
          className="categoria_descripcion"
          name="categoria_descripcion"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={400}
        />
        <button type="submit">Guardar</button>
      </form>
    </section>
  );
};
