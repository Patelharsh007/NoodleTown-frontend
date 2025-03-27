import { Grid2, Box, Typography, Stack } from "@mui/material";
import React from "react";

interface foodCategoryGroupProp {
  Card: {
    groupName: string;
    groupDetails: string;
    groupImage: string;
  };
}

const FoodCategoryGroupCard: React.FC<foodCategoryGroupProp> = ({ Card }) => {
  return (
    <>
      <Grid2
        size={{ xs: 12, sm: 4 }}
        position={"relative"}
        borderRadius={"19px"}
        height={{ xs: "250px", sm: "350px", md: "540px" }}
        sx={{
          overflow: "hidden",
        }}
      >
        {/* Overlay */}
        <Box
          position={"absolute"}
          left={0}
          top={0}
          width={"100%"}
          height={"100%"}
          zIndex={1}
          sx={{
            background: "rgba(0, 0, 0, 0.4)",
          }}
        />

        {/* Image */}
        <Box
          component={"img"}
          src={Card.groupImage}
          width={"100%"}
          height={"100%"}
          sx={{
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Text Stack */}
        <Stack
          position={"absolute"}
          bottom={{ xs: "20px", sm: "30px", md: "40px" }}
          left={{ xs: "15px", sm: "20px", md: "25px" }}
          zIndex={2}
        >
          <Typography
            fontFamily={"Poppins"}
            fontWeight={600}
            fontSize={{ xs: "14px", sm: "16px", md: "20px" }}
            lineHeight={{ xs: "16px", sm: "20px", md: "30px" }}
            color={"#ffffff"}
            paddingX={"5px"}
          >
            {Card.groupName}
          </Typography>
          <Typography
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={{ xs: "8px", sm: "12px", md: "16px" }}
            lineHeight={{ xs: "12px", sm: "18px", md: "24px" }}
            color={"#ffffff"}
            paddingX={"5px"}
            sx={{ mt: { xs: 0.5, sm: 1 } }}
          >
            {Card.groupDetails}
          </Typography>
        </Stack>
      </Grid2>
    </>
  );
};

export default FoodCategoryGroupCard;
