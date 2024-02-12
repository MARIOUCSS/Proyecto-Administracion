import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Checksuccess() {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    if (count === 0) {
      navigate("/");
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
          <span class="visually-hidden">{`redireccionando en ${count} second`}</span>
        </div>
      </div>
    </>
  );
}

export default Checksuccess;
