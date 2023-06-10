import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

const routes = [
  { name: "Blogs", route: "blog/main" },
  { name: "Nuevo", route: "blog/new" },
  { name: "Comentarios", route: "blog/comments" },
  { name: "Blog Settings", route: "blog/settings" },
];

export const BlogNavBar = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleDirection = (direction) => {
    navigate(`/${direction}`);
  };

  const handleOnSearch = (e) => {
    e.preventDefault();
    console.log("handleOnSearch");
  };

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <nav className="BlogNavBar">
      <div className="routes">
        {routes.map((element, index) => (
          <a onClick={() => handleDirection(element.route)} key={index}>
            {element.name}
          </a>
        ))} </div>
        <div className="search">
          <form className="form" action="POST" onSubmit={handleOnSearch}>
            <label htmlFor="search">
              <input
                required
                value={search}
                onChange={handleOnChange}
                autoComplete="off"
                placeholder="Buscar Blogs"
                id="search"
                type="text"
              />
              <button type="submit" className="icon">
                <svg
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="swap-on"
                >
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </button>
              <button
                type="reset"
                className="close-btn"
                onClick={() => setSearch("")}
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </label>
          </form>
        </div>
    </nav>
  );
};
