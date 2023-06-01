import { useState } from "react";
import { MainContext } from "./MainContext";

export const MainProvider = ({ children }) => {
  const authStatus = sessionStorage.getItem("status")
    ? JSON.parse(sessionStorage.getItem("status"))
    : false;

  const userName = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : "";

  const [auth, setAuth] = useState(authStatus);
  const [mainUrl, setMainUrl] = useState("https://handler.strudelrestaurante.com/");
  const [loading, setLoading] = useState(false);
  const [miniLoadingp, setMiniLoadingp] = useState(false);
  const [usuario, setUsuario] = useState(userName);

  sessionStorage.setItem("status", JSON.stringify(auth));
  sessionStorage.setItem("user", JSON.stringify(usuario));

  return (
    <MainContext.Provider
      value={{
        auth,
        setAuth,
        mainUrl,
        loading,
        setLoading,
        miniLoadingp,
        setMiniLoadingp,
        usuario,
        setUsuario,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
