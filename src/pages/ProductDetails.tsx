import React from "react";
import { Navigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Product from "../section/product/Product";

const ProductDetails = () => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Navbar linkColor="#000000" />
      <Product id={id} />
    </>
  );
};

export default ProductDetails;
