import { Grid2, Stack, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

interface RestaurantOrderCategoriesProps {
  restaurantId?: string;
  categoriesCount: { category: string; count: number }[];
  Category: string;
  onCategoryClick: (category: string) => void;
}

const RestaurantOrderCategories: React.FC<RestaurantOrderCategoriesProps> = ({
  categoriesCount,
  Category,
  onCategoryClick,
}) => {
  return (
    <>
      <Grid2
        size={{ xs: 12, sm: 3 }}
        position={"relative"}
        // for line beside the side menu categories
        sx={{
          "&::after": {
            display: { xs: "none", sm: "block" },
            position: "absolute",
            top: 0,
            left: "103%",
            content: '""',
            height: "100%",
            border: "2px solid #FFC300",
            zIndex: 3,
          },
        }}
      >
        <Stack marginTop={{ xs: "0px", sm: "50px" }} spacing={1}>
          {categoriesCount ? (
            categoriesCount.map((categoryCount) => {
              {
                const isSelected = Category === categoryCount.category;
                return (
                  <Button
                    key={categoryCount.category}
                    onClick={() => onCategoryClick(categoryCount.category)}
                    sx={{
                      color: isSelected ? "#FFFFFF" : "#000000",
                      backgroundColor: isSelected ? "#FFC300" : "transparent",
                      "&:hover": {
                        backgroundColor: "#FFC300",
                        borderColor: "#FFC300",
                        "& .MuiTypography-root": {
                          color: "#FFFFFF",
                        },
                      },
                    }}
                  >
                    <Typography
                      fontFamily="Poppins"
                      fontWeight={400}
                      fontSize={{ xs: "20px", sm: "18px", md: "20px" }}
                      lineHeight={{ xs: "30px", sm: "28px", md: "30px" }}
                      color="inherit"
                    >
                      {categoryCount.category} ({categoryCount.count})
                    </Typography>
                  </Button>
                );
              }
            })
          ) : (
            <p>Loading...</p>
          )}
        </Stack>
      </Grid2>
    </>
  );
};

export default RestaurantOrderCategories;
