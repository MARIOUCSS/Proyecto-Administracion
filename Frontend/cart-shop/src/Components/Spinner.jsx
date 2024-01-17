import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Spinner() {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    if (count === 0) {
      navigate("/login", {
        //DESDE EL ULTIMO SITIO QUE EMPEZASTE
        state: location.pathname,
      });
    }
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <>
      <div
        class="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div class="spinner-border" role="status">
          <span class="visually-hidden">redireccionando en {count} second</span>
        </div>
      </div>
    </>
  );
}

export default Spinner;
