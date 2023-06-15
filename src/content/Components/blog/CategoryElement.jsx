import { useContext } from "react";
import { BlogContext } from "../../../context/blogContext/BlogContext";

export const CategoryElement = ({
  categoria_nombre,
  categoria_descripcion,
  categoria_id,
  index,
}) => {
  const { categories, setCategories } = useContext(BlogContext);

  const onChangeCategory = (e, index) => {
      let element = e.target.name;
      let value = e.target.value;
      let newCategories = [...categories];
      newCategories[index][element] = value;
      setCategories(newCategories);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit');
  };

  return (
    <form action="POST" onSubmit={handleSubmit}>
      <input
        type="text"
        className="nombre"
        name="categoria_nombre"
        value={categoria_nombre}
        onChange={(e) => onChangeCategory(e, index)}
      />
      <textarea
        type="text"
        className="categoria_descripcion"
        name="categoria_descripcion"
        value={categoria_descripcion}
        onChange={(e) => onChangeCategory(e, index)}
      />
      <button>Eliminar</button>
      <button type="submit">Guardar</button>
    </form>
  );
};
