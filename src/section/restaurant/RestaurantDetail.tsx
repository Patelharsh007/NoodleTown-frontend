import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid2,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchRestaurantDetailById } from "../../util/util";

interface restaurantProps {
  id: string;
}

const RestaurantDetail: React.FC<restaurantProps> = ({ id }) => {
  const navigate = useNavigate();

  //query to get restaurant data by id
  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["restaurantDetails"],
    queryFn: () => fetchRestaurantDetailById(id),
  });

  const handleOrderOnline = () => {
    navigate("/cart");
  };
  const handleDirection = () => {
    if (restaurant) {
      const mapUrl = `https://www.google.com/maps/search/?q=${encodeURIComponent(
        restaurant.title
      )}}`;

      // Open the map in a new tab
      window.open(mapUrl, "_blank");
    } else {
      console.error("Restaurant is null");
    }
  };
  const handleShare = () => {
    // Open the map in a new tab
    window.open("https://www.instagram.com", "_blank");
  };

  // If there is an error (network error or server error)
  if (error) {
    return (
      <Container maxWidth="md" sx={{ marginTop: { xs: "40px" } }}>
        <Typography variant="body1" color="error" textAlign="center">
          No data found. Please check your internet connection or try again
          later.
        </Typography>
      </Container>
    );
  }

  return (
    <>
      {/* Restaurant Info */}
      <Container maxWidth="md" sx={{ marginTop: { xs: "40px" } }}>
        <Grid2 container spacing={"20px"}>
          {/* Restaurant logo */}
          <Grid2
            size={{ xs: 12, sm: 3 }}
            display={"flex"}
            justifyContent={{ xs: "center", sm: "flex-start" }}
            alignItems={{ xs: "center", sm: "self-start" }}
          >
            {isLoading ? (
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={160}
                height={159}
              />
            ) : (
              <Box
                component={"img"}
                src={restaurant?.logo}
                alt={restaurant?.title}
                width={{ xs: "187px", sm: "160px", md: "187px" }}
                height={{ xs: "186px", sm: "159px", md: "186px" }}
              />
            )}
          </Grid2>

          {/* Restaurant info content */}
          <Grid2 size={{ xs: 12, sm: 9 }} width={"100%"}>
            <Stack
              width={"87%"}
              margin="auto"
              gap={"15px"}
              direction={"column"}
            >
              <Typography
                fontFamily={"Poppins"}
                fontWeight={{ xs: 500, sm: 600 }}
                fontSize={{ xs: "28px", sm: "36px" }}
                lineHeight={{ xs: "42px", sm: "54px" }}
                letterSpacing="0%"
                color={"#000000"}
                textAlign={{ xs: "center", sm: "left" }}
              >
                {isLoading ? (
                  <Skeleton animation="wave" width="100%" height={40} />
                ) : (
                  restaurant?.title
                )}
              </Typography>

              {isLoading ? (
                <Skeleton animation="wave" width="100%" />
              ) : (
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  gap="15px"
                >
                  <Typography
                    fontFamily={"Poppins"}
                    fontWeight={300}
                    fontSize={{ xs: "13px", sm: "16px" }}
                    lineHeight={{ xs: "20px", sm: "24px" }}
                    letterSpacing="0%"
                    color="#999999"
                  >
                    {isLoading ? (
                      <Skeleton animation="wave" width="100%" />
                    ) : (
                      restaurant?.cuisines.join(", ")
                    )}
                  </Typography>

                  <Typography
                    fontFamily={"Poppins"}
                    fontWeight={300}
                    fontSize={{ xs: "13px", sm: "16px" }}
                    lineHeight={{ xs: "20px", sm: "24px" }}
                    letterSpacing="0%"
                    color="#999999"
                  >
                    {isLoading ? (
                      <Skeleton animation="wave" width="100%" />
                    ) : (
                      `Average Cost: ${restaurant?.avgCostPerPerson}rs per person`
                    )}
                  </Typography>
                </Stack>
              )}

              <Typography
                fontFamily={"Poppins"}
                fontWeight={300}
                fontSize={{ xs: "13px", sm: "16px" }}
                lineHeight={{ xs: "20px", sm: "24px" }}
                letterSpacing="0%"
                color="#999999"
              >
                {isLoading ? (
                  <Skeleton animation="wave" width="100%" />
                ) : (
                  restaurant?.address
                )}
              </Typography>

              {isLoading ? (
                <Skeleton animation="wave" width="100%" />
              ) : (
                <Typography
                  fontFamily={"Poppins"}
                  fontWeight={300}
                  fontSize={{ xs: "13px", sm: "16px" }}
                  lineHeight={{ xs: "20px", sm: "24px" }}
                  letterSpacing="0%"
                  color="#999999"
                >
                  {restaurant && (
                    <>
                      <span style={{ color: "red" }}>Open Now</span>{" "}
                      {restaurant?.timing} (Today)
                    </>
                  )}
                </Typography>
              )}

              {/* Buttons */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                gap={{ xs: 2, sm: 3 }}
                width="100%"
                alignItems={{ xs: "center" }}
              >
                {isLoading
                  ? // Show skeletons when loading
                    Array.from({ length: 3 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        variant="rectangular"
                        animation="wave"
                        height={40}
                        sx={{
                          width: { xs: "80%", sm: "33%" },
                          border: "2px solid rgba(0, 0, 0, 0.1)",
                          borderRadius: "8px",
                        }}
                      />
                    ))
                  : // Show buttons when restaurant data is available
                    ["Order Online", "Directions", "Share"].map((text) => (
                      <Button
                        key={text}
                        sx={{
                          width: { xs: "80%", sm: "33%" },
                          paddingY: { xs: 1, sm: 1.5 },
                          border: "2px solid #FFA500",
                          color: "#000000",
                          "&:hover": {
                            backgroundColor: "#FFA500",
                            borderColor: "#FFA500",
                            "& .MuiTypography-root": {
                              color: "#FFFFFF",
                            },
                          },
                        }}
                        onClick={() => {
                          if (text === "Order Online") {
                            handleOrderOnline();
                          }
                          if (text === "Directions") {
                            handleDirection();
                          }
                          if (text === "Share") {
                            handleShare();
                          }
                        }}
                      >
                        <Typography
                          fontFamily="Poppins"
                          fontWeight={500}
                          fontSize={{ xs: "14px", sm: "16px", md: "18px" }}
                          color="inherit"
                        >
                          {text}
                        </Typography>
                      </Button>
                    ))}
              </Stack>
            </Stack>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default RestaurantDetail;
