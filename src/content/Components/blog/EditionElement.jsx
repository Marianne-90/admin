import { useContext, useMemo, useCallback } from "react";
import JoditEditor from "jodit-react";
import { BlogContext } from "../../../context/blogContext/BlogContext";

export const EditionElement = () => {
  const { blogElements, setBlogElements, categories } = useContext(BlogContext);

  const config = useMemo(
    () => ({
      readonly: false,
    }),
    []
  );

  const handleCategoryChange = (event) => {
    let id = Number(event.target.value);

    let obj = { ...blogElements };
    obj["category"] = id;
    setBlogElements(obj);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    let obj = { ...blogElements };
    obj["imagen"] = file;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        obj["previewImage"] = reader.result;
        setBlogElements(obj);
      };
      reader.readAsDataURL(file);
    } else {
      obj["previewImage"] = null;
      setBlogElements(obj);
    }
  };

  const handleDeleteImage = () => {
    let obj = { ...blogElements };
    obj["previewImage"] = null;
    obj["imagen"] = null;
    setBlogElements(obj);
  };


const onBlurEsp = (newContent) => {
  let obj = { ...blogElements };
      obj["content"] = newContent;
      setBlogElements(obj);
};

const onBlurEng = (newContent) => {
  let obj = { ...blogElements };
      obj["content_eng"] = newContent;
      setBlogElements(obj);
};


  const handleOnChange = (e) => {
    let value = e.target.value;
    let key = e.target.id;

    let obj = { ...blogElements };
    obj[key] = value;
    setBlogElements(obj);
  };

  return (
    <div className="content">
      <div className="mainTitle">
        <form onSubmit={(e) => e.preventDefault()}>
          <p>Título En Español:</p>
          <input
            type="text"
            id="title"
            value={blogElements["title"]}
            onChange={handleOnChange}
          />
          <p>Título En Inglés:</p>
          <input
            type="text"
            id="title_eng"
            value={blogElements["title_eng"]}
            onChange={handleOnChange}
          />
          <p>
            <small>
              {" "}
              por: <u>{blogElements["autor"]}</u> <br /> última actualización{" "}
              <u> {blogElements["date"]} </u>
            </small>
          </p>
        </form>
      </div>
      <div className="ajustes">
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            value={blogElements["category"]}
            onChange={handleCategoryChange}
          >
            <option value="">Sin categoría</option>
            {categories.map((cat, index) => (
              <option value={cat.categoria_id} key={index}>
                {cat.categoria_nombre}
              </option>
            ))}
          </select>
          <label htmlFor="meta">Palabras clave o descripción (metadatos)</label>
          <textarea
            id="meta"
            value={blogElements["meta"]}
            onChange={handleOnChange}
          />
        </form>
      </div>

      <div className="mainImage">
        {blogElements["previewImage"] ? (
          <div className="container">
            <img src={blogElements["previewImage"]} alt="Preview" />
            <button onClick={handleDeleteImage}>Eliminar</button>
          </div>
        ) : (
          <label className="custum-file-upload" htmlFor="file">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill=""
                viewBox="0 0 24 24"
              >
                <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  id="SVGRepo_tracerCarrier"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fill=""
                    d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            <div className="text">
              <span>Haz clic para subir la imágen principal</span>
            </div>
            <input type="file" id="file" onChange={handleImageChange} />
          </label>
        )}
      </div>
      <div className="editor">
        <h2 className="blogSubTitle"> contenido en español:</h2>
        <JoditEditor
          value={blogElements["content"]}
          config={config}
          tabIndex={1}
          onBlur={onBlurEsp}
        />
      </div>
      <div className="editor">
        <h2 className="blogSubTitle"> contenido en Inglés:</h2>
        <JoditEditor
          value={blogElements["content_eng"]}
          config={config}
          tabIndex={1}
          onBlur={onBlurEng}
        />
      </div>
    </div>
  );
};
