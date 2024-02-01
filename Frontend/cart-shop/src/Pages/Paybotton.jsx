import React from "react";

function Paybotton({ cartItems }) {
  const handCheck = () => {
    console.log(cartItems);
  };
  return (
    <>
      <button onClick={handCheck}>Check out</button>
    </>
  );
}

export default Paybotton;
