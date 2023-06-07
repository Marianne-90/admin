import logo from "../../img/logo.jpg";
import { AiOutlineLogout } from "react-icons/ai";
export const TopNavBar = () => {
  return (
    <nav className="TopNavBar">
      <div className="img">
        <img src={logo} alt="logo de solaz" />
      </div>
      <button>
        Salir
        <AiOutlineLogout />
      </button>
    </nav>
  );
};
