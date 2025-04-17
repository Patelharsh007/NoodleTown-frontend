import React from "react";
import Navbar from "../components/Navbar";
import CheckOut from "../section/checkOut/CheckOut";
import EmptyCart from "../components/EmptyCart";
import CheckoutSkeleton from "../skeleton/CheckoutSkeleton";
import useCart from "../hooks/useCartMeal";

const CheckOutPage = () => {
  const { cart, isLoadingCart } = useCart();

  return (
    <>
      <Navbar linkColor="#000000" />
      {isLoadingCart ? (
        <CheckoutSkeleton />
      ) : cart && cart.length > 0 ? (
        <CheckOut />
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default CheckOutPage;
