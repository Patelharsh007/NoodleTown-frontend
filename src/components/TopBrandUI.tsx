import { Stack, Box, Typography } from "@mui/material";
import React from "react";

interface topBrandUiProp {
  restaurant: { id: string; title: string; logo: string };
}

const TopBrandUI: React.FC<topBrandUiProp> = ({ restaurant }) => {
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      width={"auto"}
      height={"auto"}
    >
      <Box
        component={"img"}
        src={restaurant.logo}
        alt={restaurant.title}
        width={{ xs: "100px", sm: "150px", md: "187px" }}
        height={{ xs: "100px", sm: "150px", md: "186px" }}
      />
      <Typography
        marginTop={{ xs: "25px", sm: "40px", md: "50px" }}
        fontFamily={"Poppins"}
        fontWeight={600}
        fontSize={{ xs: "14px", sm: "18px", md: "20px" }}
        lineHeight={{ xs: "22px", sm: "27px", md: "30px" }}
        letterSpacing={"0%"}
      >
        {restaurant.title}
      </Typography>
    </Stack>
  );
};

export default TopBrandUI;
