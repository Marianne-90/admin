import logo from "../../img/logo.jpg";
import { AiOutlineLogout } from "react-icons/ai";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";



export const TopNavBar = () => {

  const { auth, setAuth, setUsuario } = useContext(MainContext);

  const handleOnLogOut = () => {
    setAuth(!auth);
    setUsuario("");
  };

  return (
    <nav className="TopNavBar">
      <div className="img">
        <img src={logo} alt="logo de solaz" />
      </div>
      <button onClick={handleOnLogOut}>
        Salir
        <AiOutlineLogout />
      </button>
    </nav>
  );
};
