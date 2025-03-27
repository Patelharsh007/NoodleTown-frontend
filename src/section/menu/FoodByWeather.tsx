import React from "react";
import { Box, Grid2, Typography } from "@mui/material";

import FoodByWeatherCard from "../../components/FoodByWeatherCard";

import mealItems from "../../data/mealItem";

const FoodByWeather: React.FC = () => {
  const num1 = Math.random();

  const weatherMeals = mealItems.sort(() => num1 - 0.5).slice(0, 6);

  return (
    <>
      <Box
        maxWidth={"1600px"}
        width={"90%"}
        margin={"auto"}
        marginTop={"50px"}
        padding={"10px"}
      >
        <Typography
          fontFamily={"Poppins"}
          fontWeight={500}
          fontSize={{ xs: "28px", sm: "32px" }}
          lineHeight={{ xs: "40px", sm: "48px" }}
          letterSpacing={"0%"}
        >
          Food according to Weather
        </Typography>

        <Grid2
          container
          spacing={{ xs: "20px", sm: "40px", md: "50px" }}
          marginY={"50px"}
        >
          {weatherMeals.map((food) => (
            <FoodByWeatherCard Card={food} key={food.id} />
          ))}
        </Grid2>
      </Box>
    </>
  );
};

export default FoodByWeather;
