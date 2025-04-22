import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import BestDelieveredBox from "../../components/BestDelieveredBox";
import { useQuery } from "@tanstack/react-query";
import { fetchBestDelievered } from "../../util/util";
import BestDeliveredSkeleton from "../../skeleton/BestDeliveredSkeleton";
import { MealItem } from "../../types/type";

const BestDelievered: React.FC = () => {
  const {
    data: bestMeals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["BestDeivered"],
    queryFn: fetchBestDelievered,
    staleTime: 5 * 60 * 1000, // 5min
  });

  if (error) {
    return (
      <Container maxWidth="md" sx={{ marginTop: { xs: "40px" } }}></Container>
    );
  }

  return (
    <>
      <Box
        maxWidth={"1400px"}
        margin={"20px auto"}
        padding={"30px"}
        display={{ xs: "none", sm: "block", md: "block" }}
      >
        <Stack padding={"20px 20px"} margin={"50px 20px"}>
          <Typography
            fontFamily={"Poppins"}
            fontSize={"48px"}
            fontWeight={700}
            lineHeight={"72px"}
            letterSpacing={0}
            color={"#ffc300"}
            textAlign={"left"}
          >
            Our best delivered cuisines
          </Typography>
          <Typography
            fontFamily={"Poppins"}
            fontSize={"16px"}
            fontWeight={400}
            lineHeight={"24px"}
            letterSpacing={0}
            textAlign={"left"}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore
          </Typography>
        </Stack>

        <Box
          id="best-delievered-container"
          maxWidth={"1400px"}
          margin={"0 auto"}
          padding={"0 20px"}
          display={"flex"}
          flexDirection={{ sm: "column", md: "row" }}
          justifyContent={"space-between"}
          alignItems={"center"}
          position={"relative"}
          sx={{
            "& > :nth-of-type(1)::after,& > :nth-of-type(2)::after": {
              content: '""',
              position: "absolute",
              top: { sm: "100%", md: "40%" },
              left: { sm: "0%", md: "0%", lg: "105%", xl: "110%" },
              width: { sm: "100%", md: "0%", lg: "50%", xl: "90%" },
              height: "2px",
              backgroundColor: "#ffc300",
              zIndex: -1,
            },
          }}
        >
          {isLoading ? (
            <BestDeliveredSkeleton />
          ) : (
            <>
              {bestMeals &&
                bestMeals?.map((item: MealItem) => {
                  return (
                    <BestDelieveredBox
                      box={{
                        id: item.mealId,
                        imageurl: item.image,
                        title: item.title,
                      }}
                      key={item.title}
                    />
                  );
                })}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default BestDelievered;
