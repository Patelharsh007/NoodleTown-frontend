import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import TopBrandUI from "../../components/TopBrandUI";
import { showErrorToast } from "../../components/ToastContainer";
import { useQuery } from "react-query";
import { fetchTopBrands } from "../../util/util";

interface Restaurant {
  restaurantId: string;
  title: string;
  logo: string;
}

const TopBrands = () => {
  const {
    data: restaurants,
    isLoading,
    error,
  } = useQuery("topBrands", fetchTopBrands, {
    onError: (error) => {
      showErrorToast("An error occurred while fetching the top brands.");
    },
  });

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

        {/* if error then display error or else loading data */}
        {error instanceof Error ? (
          <Box
            width="100%"
            height="100px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography color="error">{error.message}</Typography>
          </Box>
        ) : (
          <>
            {isLoading ? (
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
                    sm: {
                      cursor: restaurants.length > 3 ? "grabbing" : "default",
                    },
                    md: {
                      cursor: restaurants.length > 4 ? "grabbing" : "default",
                    },
                  },
                  "&:active": {
                    sm: {
                      cursor: restaurants.length > 3 ? "grabbing" : "default",
                    },
                    md: {
                      cursor: restaurants.length > 4 ? "grabbing" : "default",
                    },
                  },
                }}
              >
                {/* Rendering all brands */}
                {restaurants.length > 0 ? (
                  restaurants.map((restaurant: Restaurant) => (
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
          </>
        )}
      </Box>
    </>
  );
};

export default TopBrands;
