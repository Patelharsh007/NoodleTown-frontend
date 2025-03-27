import { Grid2, Stack, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

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

interface RestaurantOrderCategoriesProps {
  restaurantId?: string;
  meals?: MealItem[];
  Category: string;
  onCategoryClick: (category: string) => void;
}

const RestaurantOrderCategories: React.FC<RestaurantOrderCategoriesProps> = ({
  restaurantId,
  meals,

  Category,
  onCategoryClick,
}) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (meals) {
      const newCategories: string[] = ["Recommended"];
      meals.forEach((meal) => {
        if (!newCategories.includes(meal.category)) {
          newCategories.push(meal.category);
        }
      });
      setCategories(newCategories);
    }
    console.log(categories);
  }, [restaurantId]);

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
          {/* {restaurant?.categories.unshift("Recommended")} */}

          {categories ? (
            categories.map((category, index) => {
              const categoryCount =
                category === "Recommended"
                  ? meals?.filter((meal) => meal.isPopular).length
                  : meals?.filter((meal) => meal.category === category).length;
              if (categoryCount && categoryCount > 0) {
                const isSelected = Category === category;
                return (
                  <Button
                    key={index}
                    onClick={() => onCategoryClick(category)}
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
                      {category} ({categoryCount})
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
