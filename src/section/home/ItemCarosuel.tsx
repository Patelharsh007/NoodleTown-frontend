import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ScrollerCard from "../../components/ScrollerCard";
import mealItems from "../../data/mealItem";
import { assets } from "../../assets/assets";

const ItemCarosuel: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const getTopCategories = () => {
    // CategoryCount item(object)
    const categoryCount: { [key: string]: number } = {};

    // Count occurrences of each category
    mealItems.forEach((item) => {
      if (categoryCount[item.category]) {
        categoryCount[item.category]++;
      } else {
        categoryCount[item.category] = 1;
      }
    });

    // array of [{name:category,count:count-of-items}]
    const categoryArray = Object.keys(categoryCount).map((category) => ({
      name: category,
      count: categoryCount[category],
    }));

    //sort descending and then get top 6 and then cretes array of only name
    const topCategories = categoryArray
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
      .map((item) => item.name);

    return topCategories;
  };

  // top categories
  const categories = getTopCategories();

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  //filter item based on selected category
  const filteredItems = selectedCategory
    ? mealItems.filter((item) => item.category === selectedCategory)
    : mealItems;

  return (
    <>
      <Box
        margin={"auto"}
        display={"flex"}
        justifyContent={{ xs: "center", sm: "space-between" }}
        alignItems={"center"}
      >
        <Box
          component={"img"}
          src={`${assets.images.popularReceipes.img1}`}
          width={{ xs: "100px", sm: "150px" }}
          display={{ xs: "none", sm: "block" }}
        />
        <Typography
          fontFamily={"Inter"}
          fontWeight={700}
          fontSize={{ xs: "40px", sm: "48px" }}
          lineHeight={{ xs: "50px", sm: "58.09px" }}
          letterSpacing={"0%"}
          textAlign={"center"}
        >
          Popular Recipes
        </Typography>
        <Box
          component={"img"}
          src={`${assets.images.popularReceipes.img2}`}
          width={{ xs: "100px", sm: "150px" }}
          height={{ xs: "120px", sm: "160px", lg: "180px" }}
          display={{ xs: "none", sm: "block" }}
        />
      </Box>
      <Box
        maxWidth={"1400px"}
        margin={"auto"}
        padding={"20px"}
        marginBottom={"20px"}
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        gap={"15px"}
      >
        {categories &&
          categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              sx={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                border:
                  selectedCategory === category
                    ? "2px solid #F6B716"
                    : "2px solid #ECEEF6",
                borderRadius: "45px",
                bgcolor: selectedCategory === category ? "#F6B716" : "#ECEEF6",
                color: selectedCategory === category ? "white" : "inherit",
                textTransform: "none",

                "&:hover": {
                  opacity: 0.8,
                  bgcolor: "#f8c33d",
                  border: "2px solid #f8c33d",
                },
              }}
            >
              {category}
            </Button>
          ))}
      </Box>
      <Box
        maxWidth="1800px"
        margin="auto"
        marginBottom="100px"
        padding="20px"
        sx={{
          position: "relative",
          overflowX: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            right: 0,
            top: 0,
            height: "100%",
            width: "100px",
            // background:
            //   "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))",
            pointerEvents: "none",
            display: { xs: "none", md: "block" },
            zIndex: 1,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "30px",
            overflowX: "auto",
            overflowY: "hidden",
            scrollBehavior: "smooth",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            padding: "4px",
            width: "100%",
            height: "100%",
            justifyContent: {
              sm: "flex-start",
              xm: filteredItems.length <= 5 ? "center" : "flex-start",
            },
            "&:hover": {
              cursor: filteredItems.length > 4 ? "grab" : "default",
            },
            "&:active": {
              cursor: filteredItems.length > 4 ? "grabbing" : "default",
            },
          }}
        >
          {filteredItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                flex: "0 0 auto",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <ScrollerCard Card={item} />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ItemCarosuel;
