import React, { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
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

const RestaurantBanner: React.FC<restaurantProps> = ({ id }) => {
  const [restaurant, setRestaurant] = useState<RestaurantItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setTimeout(() => fetchRestaurantDetailById(id), 1000);
    fetchRestaurantDetailById(id);
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
      {loading ? (
        <Box
          width={"100%"}
          margin={{ xs: "30px auto", sm: "50px auto" }}
          display={"grid"}
          gridTemplateAreas={{
            xs: '"first" "second" "third"',
            sm: '"first second" "first third"',
          }}
          gridTemplateColumns={{ xs: "1fr", sm: "1.1fr 0.9fr" }}
          gap={"10px"}
        >
          {/* Skeleton loader for images */}
          <Skeleton
            variant="rectangular"
            width="100%"
            sx={{
              gridArea: "first",
              height: { xs: "200px", sm: "500px", lg: "600px" },
            }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            sx={{
              gridArea: "second",
              height: { xs: "200px", sm: "245px", lg: "295px" },
            }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            sx={{
              gridArea: "third",
              height: { xs: "200px", sm: "245px", lg: "295px" },
            }}
          />
        </Box>
      ) : restaurant ? (
        <Box
          width={"100%"}
          margin={{ xs: "30px auto", sm: "50px auto" }}
          display={"grid"}
          gridTemplateAreas={{
            xs: '"first" "second" "third"',
            sm: '"first second" "first third"',
          }}
          gridTemplateColumns={{ xs: "1fr", sm: "1.1fr 0.9fr" }}
          gap={"10px"}
        >
          {/* Check for posterImages existence */}
          {restaurant?.posterImages?.[0] && (
            <Box
              component={"img"}
              src={restaurant?.posterImages[0]}
              alt="Restaurant meals"
              width={"100%"}
              height={{ xs: "200px", sm: "500px", lg: "600px" }}
              gridArea={"first"}
              overflow={"hidden"}
              sx={{
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
          )}
          {restaurant?.posterImages?.[1] && (
            <Box
              component={"img"}
              src={restaurant?.posterImages[1]}
              alt="Restaurant meals"
              width={"100%"}
              height={{ xs: "200px", sm: "245px", lg: "295px" }}
              gridArea={"second"}
              overflow={"hidden"}
              sx={{
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
          )}
          {restaurant?.posterImages?.[2] && (
            <Box
              component={"img"}
              src={restaurant?.posterImages[2]}
              alt="Restaurant meals"
              width={"100%"}
              height={{ xs: "200px", sm: "245px", lg: "295px" }}
              gridArea={"third"}
              overflow={"hidden"}
              sx={{
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
          )}
        </Box>
      ) : (
        <div>Restaurant not found.</div>
      )}
    </>
  );
};

export default RestaurantBanner;
