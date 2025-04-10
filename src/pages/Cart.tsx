import React from "react";
import Navbar from "../components/Navbar";
import CartHeader from "../section/cart/CartHeader";
import CartContent from "../section/cart/CartContent";

const Cart = () => {
  return (
    <>
      <Navbar linkColor="#000000" />
      <CartHeader />
      <CartContent />
    </>
  );
};

export default Cart;
