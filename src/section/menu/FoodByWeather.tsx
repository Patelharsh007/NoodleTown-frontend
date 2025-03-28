import React, { useEffect, useState } from "react";
import { Box, Grid2, Skeleton, Stack, Typography } from "@mui/material";

import FoodByWeatherCard from "../../components/FoodByWeatherCard";

import mealItems from "../../data/mealItem";
import { showErrorToast } from "../../components/ToastContainer";

interface MealItem {
  id: number;
  mealId: string;
  restaurantId: string;
  category: string;
  image: string;
  title: string;
  shortDescription: string;
  fullDescription: string[];
  price: number;
  isPopular: boolean;
}

const FoodByWeather: React.FC = () => {
  const [meal, setMeal] = useState<MealItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  const weatherMeal = meal?.sort(() => Math.random() - 0.5).slice(0, 6);

  const fetchRandomMeal = async () => {
    try {
      const url = `http://localhost:8080/api/meal/allMeals`;
      const response = await fetch(url, { method: "GET" });
      const result = await response.json();

      if (result.status === "success") {
        setMeal(result.meals);
      } else {
        showErrorToast(result.message);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
      showErrorToast("Some error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!meal) {
    fetchRandomMeal();
  }
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

        {loading ? (
          <Grid2
            container
            spacing={{ xs: "20px", sm: "40px", md: "50px" }}
            marginY={"50px"}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <Grid2 key={index} size={{ xs: 6, sm: 4 }}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  sx={{ height: { xs: "200px", sm: "220px", md: "260px" } }}
                />

                <Skeleton
                  variant="text"
                  width="60%"
                  height={30}
                  sx={{ marginBottom: "10px" }}
                />

                {/* Short Description Skeleton */}
                <Skeleton variant="text" width="80%" height={20} />
              </Grid2>
            ))}
          </Grid2>
        ) : (
          <>
            {weatherMeal && weatherMeal?.length > 0 ? (
              <Grid2
                container
                spacing={{ xs: "20px", sm: "40px", md: "50px" }}
                marginY={"50px"}
              >
                {weatherMeal?.map((food) => (
                  <FoodByWeatherCard Card={food} key={food.id} />
                ))}
              </Grid2>
            ) : (
              <>No Food Found....</>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default FoodByWeather;
