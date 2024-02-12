import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FilterProduct } from "../Reducers/productslice";
function SearchImput() {
  const [key, setKey] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(FilterProduct(key))
      .then(() => {
        navigate("/search");
      })
      .catch((error) => {
        console.error("Error al crear el producto:", error);
        // Puedes mostrar un mensaje de error al usuario si es necesario
      });
  };
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control mt-1 m-1"
          type="search"
          placeholder="Search"
          aria-label="Search"
          //value=""inicio con el onchange lo modifici copio lo inioodel stado u cambio el keyword
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchImput;
