import React from "react";
import { Box } from "@mui/material";

import DiningOutCard from "../../components/DiningOutCard";
import { assets } from "../../assets/assets";

interface dummy_dining_out_data {
  imgurl: string;
  heading: string;
  statement: string;
}

const DiningOut: React.FC = () => {
  const DUMMY_DINING_OUT_DATA: dummy_dining_out_data[] = [
    {
      imgurl: `${assets.images.diningOut.diningOut1}`,
      heading: "Dining Out",
      statement: "Explore curated lists of top restaurants",
    },
    {
      imgurl: `${assets.images.diningOut.diningOut2}`,
      heading: "Dining Out",
      statement: "Explore curated lists of top restaurants",
    },
    {
      imgurl: `${assets.images.diningOut.diningOut3}`,
      heading: "Dining Out",
      statement: "Explore curated lists of top restaurants",
    },
  ];

  return (
    <Box
      maxWidth={"1400px"}
      margin={"20px auto"}
      padding={"20px 27px"}
      position={"relative"}
    >
      <Box
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
            display: "none", // Remove the arrows completely
          },
        }}
      >
        <Box
          margin={"auto"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-around"}
          gap={{
            xs: "45px",
            sm: "50px",
            md: "60px",
            lg: "60px",
          }}
          padding={"30px 15px"}
          sx={{
            "& > *": {
              flexShrink: 0,
            },
          }}
        >
          {DUMMY_DINING_OUT_DATA.map((item) => (
            <DiningOutCard Card={item} key={Math.random()} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DiningOut;
