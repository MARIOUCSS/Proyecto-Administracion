import React from "react";
import { useSelector } from "react-redux";
import { url } from "../Reducers/authapi";
import axios from "axios";
function Paybotton({ cartItems }) {
  const user = useSelector((state) => state.auth);
  const Limpiarlocalstorage = () => {
    localStorage.clear();
  };
  const handCheck = () => {
    // console.log(cartItems);
    axios
      .post(`${url}/stripe/create-checkout-session`, {
        cartItems,
        userId: user._id,
      })
      .then((res) => {
        if (res.data.url) {
          console.log(res.data.url);
          window.location.href = res.data.url;
          Limpiarlocalstorage();
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <>
      <button onClick={() => handCheck()}>Check out</button>
    </>
  );
}

export default Paybotton;
