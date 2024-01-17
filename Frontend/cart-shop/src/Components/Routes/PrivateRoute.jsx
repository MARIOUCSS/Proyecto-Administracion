import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { url } from "../../Reducers/authapi";
import Spinner from "../Spinner";
export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    const autcheck = async () => {
      try {
        const { data } = await axios.get(`${url}/auth/user-auth`, {
          headers: {
            Authorization: tokenFromLocalStorage, // Utiliza el token almacenado en el estado local
          },
        });

        if (data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error al verificar el token:", error);
        setOk(false);
      }
    };
    //Si hay un token comenza en token"" si hay algun valor
    autcheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
}
