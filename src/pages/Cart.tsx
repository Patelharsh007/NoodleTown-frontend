import React from "react";
import Navbar from "../components/Navbar";
import CartHeader from "../section/cart/CartHeader";
import CartContent from "../section/cart/CartContent";
import CartCheckOut from "../section/cart/CartCheckOut";

const Cart = () => {
  return (
    <>
      <Navbar linkColor="#000000" />
      <CartHeader />
      <CartContent />
      {/* <CartCheckOut /> */}
    </>
  );
};

export default Cart;
