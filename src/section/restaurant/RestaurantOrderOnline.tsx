import { Container, Grid2, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../../redux/slices/CartSlice";
import { RootState } from "../../redux/Store";

import RestaurantMenuCategories from "../../components/RestaurantMenuCategories";
import RestaurantMenuItems from "../../components/RestaurantMenuItems";
import { fetchMenuCategories } from "../../util/util";
import { MealItem } from "../../types/type";
import RestaurantMenuItemsSkeleton from "../../skeleton/RestaurantMenuItemsSkeleton";

import { fetchMenu } from "../../util/util";

interface restaurantProps {
  id: string;
}

const RestaurantOrderOnline: React.FC<restaurantProps> = ({ id }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Recommended");

  const {
    data: categoriesCount,
    isLoading: categoryLoad,
    error: categoryError,
  } = useQuery({
    queryKey: ["MenuCategories", id],
    queryFn: () => fetchMenuCategories(id),
    staleTime: 2 * 60 * 1000,
  });

  const {
    data: meals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["filterMenu", id, selectedCategory],
    queryFn: () => fetchMenu(id, selectedCategory),
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  if (error) {
    return (
      <Container maxWidth="md" sx={{ marginTop: { xs: "40px" } }}></Container>
    );
  }

  return (
    <>
      <Container sx={{ padding: "20px" }}>
        <Typography
          fontFamily={"Poppins"}
          fontWeight={500}
          fontSize={{ xs: "28px", sm: "24px" }}
          lineHeight={{ xs: "40px", sm: "36px" }}
          letterSpacing="0%"
          color={"#000000"}
          textAlign={{ xs: "center", sm: "left" }}
        >
          Order Online
        </Typography>
        <Grid2 container width={"100%"} marginY={"40px"}>
          <RestaurantMenuCategories
            categoriesCount={categoriesCount}
            Category={selectedCategory}
            onCategoryClick={handleCategoryClick}
            isLoading={isLoading}
          />
          <>
            <Grid2
              size={{ xs: 12, sm: 9 }}
              paddingLeft={{ xs: "0px", sm: "30px" }}
              marginTop={{ xs: "30px", sm: "0px" }}
              sx={{
                height: { xs: "auto", sm: "80vh" },
                overflowY: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                fontFamily="Poppins"
                fontWeight={500}
                fontSize={{ xs: "26px", sm: "28px", md: "32px" }}
                lineHeight={{ xs: "38px", sm: "44px", md: "48px" }}
              >
                {selectedCategory}
              </Typography>

              <Grid2
                container
                size={12}
                spacing={{ xs: 1, sm: 2 }}
                marginTop={{ xs: "20px", sm: "30px" }}
                direction={{ xs: "column", sm: "row" }}
                paddingRight={{ xs: "0", sm: "16px" }}
                sx={{
                  overflowY: { sm: "auto" },
                  maxHeight: { sm: "75vh" },
                  whiteSpace: { sm: "normal" },
                  msOverflowStyle: { sm: "none" },
                  scrollbarWidth: { sm: "thin" },
                  overscrollBehaviorY: { sm: "auto" },
                  scrollbarColor: { sm: "#f8f8f8 transparent" },
                  overflowX: "hidden",
                  "& .MuiTypography-root": {
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  },
                  "&::-webkit-scrollbar": {
                    display: { sm: "none" },
                  },
                  "&::-webkit-scrollbar-button": {
                    display: { sm: "none" },
                  },
                  scrollBehavior: "smooth",
                }}
              >
                {/* Skeleton Loader when data is loading */}
                {isLoading ? (
                  <RestaurantMenuItemsSkeleton />
                ) : (
                  meals &&
                  meals.map((meal: MealItem) => {
                    return <RestaurantMenuItems key={meal.id} meal={meal} />;
                  })
                )}
              </Grid2>
            </Grid2>
          </>
        </Grid2>
      </Container>
    </>
  );
};

export default RestaurantOrderOnline;
