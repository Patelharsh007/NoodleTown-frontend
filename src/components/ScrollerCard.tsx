import React from "react";
import { ShoppingBag } from "@mui/icons-material";
import { Box, Typography, Stack } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/CartSlice";
import { showInfoToast } from "./ToastContainer";

import { RootState } from "../redux/Store";
import { Link } from "react-router-dom";

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
  restaurant?: {
    title: string;
  };
}

interface ScrollerCardProp {
  Card: MealItem;
}

const ScrollerCard: React.FC<ScrollerCardProp> = ({ Card }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const isItemInCart = (mealId: string) => {
    return cartItems.some((item) => item.id === mealId);
  };

  const handleAddToCart = () => {
    if (isItemInCart(Card.mealId)) {
      dispatch(removeFromCart(Card.mealId));
      showInfoToast(`${Card.title} removed from cart`);
    } else {
      dispatch(
        addToCart({
          itemId: Card.mealId,
          id: Card.mealId,
          price: Card.price,
          quantity: 1,
          image: Card.image,
          name: Card.title,
          restaurantId: Card.restaurantId,
          category: Card.category,
          description: Card.shortDescription,
        })
      );
    }
  };

  return (
    <Box height={"550px"} mx="auto">
      <Box
        id={"outer-container-to-make-design"}
        width={"280px"}
        height={"510px"}
        position={"relative"}
        margin={"auto 20px"}
        padding={"auto 20px"}
      >
        <Box
          id={"main-container"}
          width={"280px"}
          height={"510px"}
          border={"2px solid rgba(236,238,246,1)"}
          borderRadius={"20px"}
          sx={{
            overflowX: "hidden",
            overflowY: "hidden",
            background: "rgb(255, 255, 255)",
          }}
        >
          <Box
            marginTop={"22px"}
            marginLeft={"22px"}
            width={"70px"}
            height={"31px"}
            borderRadius={"3px"}
            sx={{
              ...(Card.isPopular && {
                boxShadow: "0px 4px 8px 0px #191F2C40",
                backgroundColor: "#191F2C",
              }),
            }}
          >
            <Typography
              color={"#fff"}
              fontFamily="Inter"
              fontWeight={600}
              fontSize={"12px"}
              lineHeight={"16.8px"}
              letterSpacing={"0%"}
              textAlign={"center"}
              padding={"7px 0"}
            >
              {Card.isPopular ? <>Popular</> : <></>}
            </Typography>
          </Box>
          <Link
            to={`/product/${Card.mealId}`}
            style={{ textDecoration: "none" }}
          >
            <Box
              component={"img"}
              src={Card.image}
              alt={Card.title}
              width={"200px"}
              height={"208px"}
              margin={"20px 40px 0"}
              borderRadius={"10px"}
              boxShadow={"10px 5px 10px 0px #8F5C201A"}
              sx={{
                objectFit: "cover",
                objectPosition: "center center",
                overflowY: "hidden",
              }}
            />
          </Link>

          {/* <Box height={"150px"} margin={"25px 20px"}> */}
          <Stack marginTop={"20px"} spacing={"10px"}>
            <Typography
              fontFamily={"Inter"}
              fontWeight={600}
              fontSize={"18px"}
              lineHeight={"25.2px"}
              letterSpacing={"0%"}
              textAlign={"center"}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                // minHeight: { xs: "48px", sm: "56px", md: "60px" },
                maxWidth: "100%",
              }}
            >
              {Card.restaurant?.title}
            </Typography>
            <Typography
              fontFamily={"Inter"}
              fontWeight={600}
              fontSize={"18px"}
              lineHeight={"25.2px"}
              letterSpacing={"0%"}
              textAlign={"center"}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                // minHeight: { xs: "48px", sm: "56px", md: "60px" },
                maxWidth: "100%",
              }}
            >
              {Card.title}
            </Typography>

            <Typography
              marginTop={"10px"}
              fontFamily={"Inter"}
              fontWeight={400}
              fontSize={"15px"}
              lineHeight={"16.8px"}
              letterSpacing={"0%"}
              textAlign={"center"}
              sx={{
                whiteSpace: "normal",
                wordWrap: "break-word",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
              }}
            >
              {Card.shortDescription}
            </Typography>

            <Typography
              marginTop={"30px"}
              padding={"15px"}
              fontFamily={"Inter"}
              fontWeight={300}
              fontSize={"24px"}
              lineHeight={"33.6px"}
              letterSpacing={"0%"}
              textAlign={"center"}
            >
              ₹ {Card.price}
            </Typography>
          </Stack>
          {/* </Box> */}

          <Box
            id={"triangle"}
            height={"50px"}
            width={"50px"}
            position={"absolute"}
            top={"95.5%"}
            left={"40%"}
            borderRight={"2px solid rgba(236, 238, 246, 1)"}
            borderBottom={"2px solid rgba(236, 238, 246, 1)"}
            borderRadius={"0 0 20px 0"}
            sx={{
              backgroundColor: " rgb(255, 255, 255)",
              transform: "rotate(45deg)",
            }}
          />
          <Box
            component={"button"}
            onClick={handleAddToCart}
            id={"circle"}
            width={"33px"}
            height={"33px"}
            borderRadius={"50%"}
            border={"2px solid rgba(236, 238, 246, 1)"}
            position={"absolute"}
            top={"97%"}
            left={"43.5%"}
            zIndex={3}
            sx={{
              cursor: "pointer",
              backgroundColor: isItemInCart(Card.mealId) ? "#F6B716" : "#fff",
              color: isItemInCart(Card.mealId) ? "#fff" : "#000000",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: isItemInCart(Card.mealId)
                  ? "#ff8c00"
                  : "#F6B716",
                color: isItemInCart(Card.mealId) ? "#fff" : "#000000",

                transform: "scale(1.1)",
                "& .MuiSvgIcon-root": {
                  color: "#ffffff",
                },
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
          >
            <ShoppingBag
              sx={{
                fontSize: "18px",
                position: "absolute",
                top: "5px",
                left: "5px",
                transition: "color 0.3s ease",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ScrollerCard;
