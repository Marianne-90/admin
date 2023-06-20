import { useContext } from "react";
import { BlogContext } from "../../../context/blogContext/BlogContext";
import { MainContext } from "../../../context/MainContext";
import Swal from "sweetalert2";

export const CategoryElement = ({
  categoria_nombre,
  categoria_descripcion,
  categoria_id,
  index,
  id,
}) => {
  const { categories, setCategories, setLoading } = useContext(BlogContext);
  const { mainUrl } = useContext(MainContext);

  const getCategories = async () => {
    return fetch(`${mainUrl}blog/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error(error));
  };

  const onChangeCategory = (e, index) => {
    let element = e.target.name;
    let value = e.target.value;
    let newCategories = [...categories];
    newCategories[index][element] = value;
    setCategories(newCategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
    formData.append("usuario", id);
    formData.append("id", categoria_id);
    formData.append("categoria", categoria_nombre);
    formData.append("descripcion", categoria_descripcion);

    try {
      const response = await fetch(`${mainUrl}blog/updatecategory`, {
        method: "POST",
        body: formData,
        mode: "cors", // activa la política de cors
      });

      const data = await response.json();
      Swal.fire("Solicitud Enviada", data.message);
      setLoading(false);
    } catch (error) {
      Swal.fire("ERROR", "Ha ocurrido un error con la solicitud", "error");
      console.log("Ha ocurrido un error:", error);
      setLoading(false);
    }
  };

  const handleOnDelete = async () => {
    setLoading(true);

    let confirmation = false;

    await Swal.fire({
      title: "Estas Segurx?",
      text: "Esta acción no se podrá revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, elimiar!",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmation = true;
      }
    });

    if (confirmation) {
      const formData = new FormData();
      formData.append("usuario", id);
      formData.append("id", categoria_id);

      try {
        const response = await fetch(`${mainUrl}blog/deletecategory`, {
          method: "POST",
          body: formData,
          mode: "cors", // activa la política de cors
        });

        const data = await response.json();
        Swal.fire("Solicitud Enviada", data.message);
        getCategories();
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

  return (
    <form action="POST" onSubmit={handleSubmit}>
      <div className="inputContainer">
        <div>
          <p>Categoría</p>
          <input
            type="text"
            className="nombre"
            name="categoria_nombre"
            value={categoria_nombre}
            onChange={(e) => onChangeCategory(e, index)}
            maxLength={60}
          />
        </div>
        <div>
          <p>Descripción</p>
          <textarea
            type="text"
            className="categoria_descripcion"
            name="categoria_descripcion"
            value={categoria_descripcion}
            onChange={(e) => onChangeCategory(e, index)}
            maxLength={400}
          />
        </div>
      </div>
      <button onClick={handleOnDelete} className="cancel">Eliminar</button>
      <button type="submit">Guardar</button>
    </form>
  );
};
