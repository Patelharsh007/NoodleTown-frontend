import { Grid2, Box, Stack, Typography } from "@mui/material";
import React from "react";

import { Link } from "react-router-dom";
import { MealItem } from "../types/type";

interface foodByWeatherCardProp {
  Card: MealItem;
}

const FoodByWeatherCard: React.FC<foodByWeatherCardProp> = ({ Card }) => {
  return (
    <Grid2 size={{ xs: 6, sm: 4 }}>
      <Link to={`/product/${Card.id}`}>
        <Box
          component={"img"}
          src={Card.image}
          alt={"food-by-weather"}
          height={{ xs: "200px", sm: "220px", md: "260px" }}
          width={"100%"}
          borderRadius={"13px"}
          sx={{
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </Link>
      <Stack mt={"20px"}>
        <Typography
          fontFamily={"Poppins"}
          fontWeight={600}
          fontSize={{ xs: "16px", sm: "18px", md: "20px" }}
          lineHeight={{ xs: "18px", sm: "22px", md: "30px" }}
          letterSpacing={"0%"}
          color={"#000000"}
        >
          {Card.title}
        </Typography>
        <Typography
          fontFamily={"Poppins"}
          fontWeight={300}
          fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
          lineHeight={{ xs: "16px", sm: "20px", md: "24px" }}
          letterSpacing={"0%"}
          color={"#999999"}
        >
          {Card.shortDescription}
        </Typography>
      </Stack>
    </Grid2>
  );
};

export default FoodByWeatherCard;
