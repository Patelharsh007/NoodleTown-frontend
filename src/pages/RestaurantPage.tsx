import React from "react";
import { Navigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import RestaurantBanner from "../section/restaurant/RestaurantBanner";
import RestaurantDetail from "../section/restaurant/RestaurantDetail";
import RestaurantMenu from "../section/restaurant/RestaurantMenu";
import RestaurantOrderOnline from "../section/restaurant/RestaurantOrderOnline";

const RestaurantPage = () => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar linkColor="#000000" />
      <RestaurantBanner id={id} />
      <RestaurantDetail id={id} />
      <RestaurantMenu id={id} />
      <RestaurantOrderOnline id={id} />
    </>
  );
};

export default RestaurantPage;
