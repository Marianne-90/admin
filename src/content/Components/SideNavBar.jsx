import { useContext } from "react";
import { MainContext } from "../../Context/MainContext";
import { useNavigate } from "react-router-dom";

const routes = [
  { name: "Home Page", route: "home" },
  { name: "Blog", route: "blog" },
  { name: "Page Settings", route: "page" },
  { name: "User Settings", route: "user" },
];

export const SideNavbar = () => {
  const navigate = useNavigate();

  const handleDirection = (direction) => {
    navigate(`/${direction}`)
  };

  return (
    <nav className="SideNavbar">
      {routes.map((element, index) => (
        <a onClick={()=>handleDirection(element.route)} key={index}>
          {element.name}
        </a>
      ))}
    </nav>
  );
};
