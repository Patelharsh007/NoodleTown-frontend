import React, { useEffect, useState } from "react";
import { Box, Container, Grid2, Skeleton, Typography } from "@mui/material";
import { showErrorToast } from "../../components/ToastContainer";

interface RestaurantItem {
  id: number;
  restaurantId: string;
  title: string;
  logo: string;
  posterImages: string[];
  cuisines: string[];
  avgCostPerPerson: number;
  address: string;
  isOpen: boolean;
  timing: string;
  menuImages: string[];
  categories: string[];
  isFeatured: boolean;
  rating: number;
}

interface restaurantProps {
  id: string;
}

const RestaurantMenu: React.FC<restaurantProps> = ({ id }) => {
  const [restaurant, setRestaurant] = useState<RestaurantItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => fetchRestaurantDetailById(id), 1000);
    // fetchRestaurantDetailById(id);
  }, [id]);

  const fetchRestaurantDetailById = async (id: string) => {
    try {
      const url = `http://localhost:8080/api/restaurant/${id}`;
      const response = await fetch(url, { method: "GET" });
      const result = await response.json();

      if (result.status === "success") {
        setRestaurant(result.restaurant[0]);
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

  return (
    <>
      <Container maxWidth="lg" sx={{ margin: "80px auto" }}>
        <Typography
          fontFamily={"Poppins"}
          fontWeight={500}
          fontSize={{ xs: "28px", sm: "24px" }}
          lineHeight={{ xs: "40px", sm: "36px" }}
          letterSpacing="0%"
          color={"#000000"}
          textAlign={{ xs: "center", sm: "left" }}
        >
          Menu
        </Typography>

        <Grid2
          container
          spacing={{ xs: "40px", sm: "30px" }}
          padding={{ xs: "10px", sm: "0" }}
        >
          {loading
            ? // Show skeleton while loading
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <Grid2
                    size={{ xs: 12, sm: 6, md: 4 }}
                    marginTop={"30px"}
                    key={index}
                  >
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      sx={{
                        height: { xs: "100%", sm: "500px" },
                        borderRadius: "20px",
                      }}
                    />
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={30}
                      sx={{ marginTop: "16px", marginLeft: "16px" }}
                    />
                  </Grid2>
                ))
            : restaurant?.menuImages.map((image, index) => (
                <Grid2
                  size={{ xs: 12, sm: 6, md: 4 }}
                  marginTop={"30px"}
                  key={index}
                >
                  <Box
                    component={"img"}
                    src={image}
                    alt={restaurant?.title}
                    borderRadius={"20px"}
                    width={"100%"}
                    height={{ xs: "100%", sm: "500px" }}
                    sx={{
                      objectFit: "cover",
                      objectPosition: "center center",
                    }}
                  />
                  <Typography
                    margin={"16px"}
                    fontFamily={"Poppins"}
                    fontWeight={400}
                    fontSize={"16px"}
                    lineHeight={"24px"}
                    letterSpacing="0%"
                    color={"#000000"}
                    textAlign={"center"}
                  >
                    Menu-{index + 1}
                  </Typography>
                </Grid2>
              ))}
        </Grid2>
      </Container>
    </>
  );
};

export default RestaurantMenu;
