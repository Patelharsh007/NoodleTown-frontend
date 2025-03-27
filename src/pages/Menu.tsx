import React from "react";
import Navbar from "../components/Navbar";
import TopBrands from "../section/menu/TopBrands";
import FoodByWeather from "../section/menu/FoodByWeather";
import FoodCategoryGroup from "../section/menu/FoodCategoryGroup";

const Menu = () => {
  return (
    <>
      <Navbar linkColor="#000000" />
      <TopBrands />
      <FoodByWeather />
      <FoodCategoryGroup />
    </>
  );
};

export default Menu;
