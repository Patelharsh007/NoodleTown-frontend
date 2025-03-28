import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import TopBrandUI from "../../components/TopBrandUI";
import { showErrorToast } from "../../components/ToastContainer";

interface Restaurant {
  restaurantId: string;
  title: string;
  logo: string;
}

const TopBrands = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // setTimeout(() => fetchTopBrands(), 1000);
    fetchTopBrands();
  }, []);

  const fetchTopBrands = async () => {
    try {
      const url = "http://localhost:8080/api/restaurant/topbrands";

      const response = await fetch(url, {
        method: "GET",
      });

      const result = await response.json();

      if (result.status === "success") {
        setRestaurants(result.restaurants);
      } else {
        showErrorToast(`${result.message}`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      showErrorToast("An error occurred while fetching the top brands.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Box maxWidth={"1600px"} width={"90%"} margin={"auto"} marginTop={"30px"}>
        <Typography
          fontFamily={"Poppins"}
          fontWeight={500}
          fontSize={{ xs: "28px", sm: "32px" }}
          lineHeight={{ xs: "40px", sm: "48px" }}
          letterSpacing={"0%"}
        >
          Top brands for you
        </Typography>
        {loading ? (
          <Box
            width="100%"
            height="100px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            margin={"30px auto"}
            padding={"auto 30px"}
            display={"flex"}
            gap={{ xs: "45px", sm: "65px", md: "75px" }}
            height={
              restaurants.length > 0
                ? { xs: "170px", sm: "250px", md: "300px" }
                : "100px"
            }
            sx={{
              overflowX: "scroll",
              overflowY: "hidden",
              whiteSpace: "nowrap",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "thin",
              overscrollBehaviorX: "contain",
              scrollbarColor: "#f8f8f8 transparent",
              "&::-webkit-scrollbar-button": {
                display: "none",
              },

              "&:hover": {
                sm: { cursor: restaurants.length > 3 ? "grabbing" : "default" },
                md: {
                  cursor: restaurants.length > 4 ? "grabbing" : "default",
                },
              },
              "&:active": {
                sm: { cursor: restaurants.length > 3 ? "grabbing" : "default" },
                md: {
                  cursor: restaurants.length > 4 ? "grabbing" : "default",
                },
              },
            }}
          >
            {/* Rendering all brands */}
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <Link
                  to={`/restaurant/${restaurant.restaurantId}`}
                  key={restaurant.restaurantId}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <TopBrandUI
                    restaurant={{
                      title: restaurant.title,
                      id: restaurant.restaurantId,
                      logo: restaurant.logo,
                    }}
                  />
                </Link>
              ))
            ) : (
              <Typography>No brands found.</Typography>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default TopBrands;
