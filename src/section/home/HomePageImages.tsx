import { Box, Typography } from "@mui/material";
import React from "react";
import { assets } from "../../assets/assets";

const HomePageImages: React.FC = () => {
  return (
    <>
      {/* PizzaImageBanner */}
      <Box
        width={"100%"}
        height={"538px"}
        position={"relative"}
        zIndex={1}
        sx={{
          backgroundImage: `url(${assets.images.bannerPizza})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",

          "&::before": {
            content: '""',
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "538px",
            background: "rgba(0, 0, 0, 0.1)",
            zIndex: -1,
          },
        }}
      >
        <Box
          maxWidth={"1300px"}
          margin={"auto"}
          paddingTop={"197px"}
          paddingLeft={{ xs: "30px", sm: "50px", md: "70px" }}
        >
          <Typography
            width={{ xs: "270px", sm: "570px" }}
            fontFamily={"Poppins"}
            fontSize={{ xs: "40px", sm: "48px" }}
            fontWeight={700}
            lineHeight={{ xs: "60px", sm: "72px" }}
            textAlign={"left"}
            color="white"
          >
            Fastest Food <span style={{ color: "#ffc300" }}>Delivery</span> in
            the town
          </Typography>
        </Box>
      </Box>

      {/* Grid-images layout */}
      <Box
        maxWidth={"1300px"}
        width={{ xs: "80%", sm: "90%", lg: "90%" }}
        margin={{ xs: "100px auto", sm: "150px auto" }}
        padding={{ xs: "25px", sm: "30px", lg: "35px" }}
        display={"grid"}
        gridTemplateAreas={{
          xs: '"first" "second" "third"',
          sm: '"first second" "first third"',
        }}
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
        gap={"18px"}
      >
        <Box
          width={"100%"}
          height={{ xs: "250px", sm: "400px", lg: "550px" }}
          gridArea={"first"}
          overflow={"hidden"}
          position={"relative"}
          sx={{
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "17px",
              background: "rgba(0, 0, 0, 0.2)",
              zIndex: 1,
            },
          }}
        >
          <Box
            component="img"
            src={`${assets.images.gridLayout.img1}`}
            borderRadius={"17px"}
            width={"100%"}
            height={"100%"}
            sx={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <Typography
            maxWidth={{ xs: "200px", sm: "300px", md: "400px" }}
            position={"absolute"}
            left={{ xs: "20px", sm: "40px", md: "60px" }}
            top={"50%"}
            fontFamily={"Poppins"}
            fontWeight={700}
            fontSize={{ xs: "32px", sm: "48px", md: "64px" }}
            lineHeight={{ xs: "48px", sm: "72px", md: "96px" }}
            letterSpacing={"0%"}
            zIndex={2}
            color={"#ffffff"}
            sx={{
              transform: "translateY(-50%)",
            }}
          >
            Buy 2 Get 1 Free
          </Typography>
        </Box>

        <Box
          width={"100%"}
          height={{ xs: "250px", sm: "180px", lg: "265px" }}
          gridArea={"second"}
          overflow={"hidden"}
          // position={"relative"}
        >
          <Box
            component="img"
            src={`${assets.images.gridLayout.img2}`}
            borderRadius={"16px"}
            width={"100%"}
            height={"100%"}
            sx={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Box>

        <Box
          width={"100%"}
          height={{ xs: "250px", sm: "200px", lg: "265px" }}
          gridArea={"third"}
          overflow={"hidden"}
        >
          <Box
            component="img"
            src={`${assets.images.gridLayout.img3}`}
            borderRadius={"16px"}
            width={"100%"}
            height={"100%"}
            sx={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default HomePageImages;
