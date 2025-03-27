import React from "react";
import HeroSection from "../section/home/HeroSection";
import DiningOut from "../section/home/DiningOut";
import BestDelievered from "../section/home/BestDelievered";
import ItemCarosuel from "../section/home/ItemCarosuel";
import HomePageImages from "../section/home/HomePageImages";
import InstagramBox from "../section/home/InstagramBox";
import Footer from "../section/home/Footer";

const Home = () => {
  return (
    <>
      <HeroSection />
      <DiningOut />
      <BestDelievered />
      <ItemCarosuel />
      <HomePageImages />
      <InstagramBox />
      <Footer />
    </>
  );
};

export default Home;
