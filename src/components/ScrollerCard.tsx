import React, { useEffect, useState } from "react";
import { ShoppingBag } from "@mui/icons-material";
import { Box, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCartMeal";
import { CartItem, MealItem } from "../types/type";

interface ScrollerCardProp {
  Card: MealItem;
}

const ScrollerCard: React.FC<ScrollerCardProp> = ({ Card }) => {
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const { cart, isLoadingCart, errorCart, addToCart, removeFromCart } =
    useCart();

  useEffect(() => {
    if (cart && cart.length > 0) {
      const itemInCart = cart.some(
        (cartItem: CartItem) => cartItem.mealId === Card.mealId
      );
      setIsInCart(itemInCart);
    }
  }, [cart, Card.mealId]);

  const handleBagClick = async () => {
    if (isInCart) {
      removeFromCart(Card.mealId);
    } else {
      addToCart(Card.mealId);
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
            onClick={handleBagClick}
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
              backgroundColor: isInCart ? "#F6B716" : "#fff",
              color: isInCart ? "#fff" : "#000000",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: isInCart ? "#ff8c00" : "#F6B716",
                color: isInCart ? "#fff" : "#000000",

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
