import React from "react";
import {
  Grid2,
  Stack,
  Typography,
  ButtonGroup,
  Button,
  Divider,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useCart from "../hooks/useCartMeal";
import { CartItem } from "../types/type";

interface CartCardProp {
  item: CartItem;
}

const CartCard: React.FC<CartCardProp> = ({ item }) => {
  const { data, isLoading, error, incrementItem, decrementItem } = useCart(
    item.mealId
  );

  return (
    <Grid2 key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Box
        padding={{ xs: "15px", sm: "30px" }}
        borderRadius={"17px"}
        sx={{ backgroundColor: "#F9F9F9" }}
      >
        <Link to={`/product/${item.mealId}`}>
          <Box
            component={"img"}
            alt={item.mealId}
            src={item.meal.image}
            marginBottom={"30px"}
            height={{ xs: "250px", sm: "190px" }}
            width={"100%"}
            borderRadius={"16px"}
            sx={{
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />
        </Link>
        <Stack spacing={{ xs: 1.5, sm: 2 }}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize={{ xs: "16px", sm: "18px", md: "20px" }}
              lineHeight={{ xs: "24px", sm: "28px", md: "30px" }}
              letterSpacing={"0%"}
              color={"#000000"}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                maxWidth: "70%",
                minHeight: "52px",
              }}
            >
              {item.meal.title}
            </Typography>
            <Typography
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize={{ xs: "16px", sm: "18px", md: "20px" }}
              lineHeight={{ xs: "24px", sm: "28px", md: "30px" }}
              letterSpacing={"0%"}
              color={"#FFA500"}
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              ₹{item.meal.price}
            </Typography>
          </Stack>
          <Typography
            fontFamily={"Poppins"}
            fontWeight={400}
            fontSize={{ xs: "12px", sm: "14px" }}
            lineHeight={{ xs: "19px", sm: "21px" }}
            letterSpacing={"0%"}
            color={"#848484"}
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 2,
              textOverflow: "ellipsis",
            }}
          >
            {item.meal.shortDescription}
          </Typography>

          {/* Quantity Controls */}
          <ButtonGroup
            sx={{
              width: { xs: "100%", sm: "auto" },
              "& .MuiButton-root": {
                flex: { xs: 1, sm: "initial" },
              },
            }}
          >
            <Button
              onClick={() => decrementItem(item.mealId)}
              variant="outlined"
              sx={{
                backgroundColor: "#F3F3F3",
                border: "2px solid #F3F3F3",
                minWidth: { xs: "40px", sm: "auto" },
                "& .MuiSvgIcon-root": {
                  color: "#999999",
                },
                "&:hover": {
                  backgroundColor: "#d3d3d3",
                  border: "2px solid #d3d3d3",
                },
              }}
            >
              <RemoveIcon />
            </Button>
            <Button
              variant="text"
              sx={{
                minWidth: { xs: "40px", sm: "auto" },
                color: "#000000",
              }}
            >
              {item && data && data.cartItem.quantity}
            </Button>
            <Button
              onClick={() => incrementItem(item.mealId)}
              variant="outlined"
              sx={{
                backgroundColor: "#FFA500",
                border: "2px solid #FFA500",
                minWidth: { xs: "40px", sm: "auto" },
                "& .MuiSvgIcon-root": {
                  color: "#FFFFFF",
                },
                "&:hover": {
                  backgroundColor: "#ff8c00",
                  border: "2px solid #ff8c00",
                },
              }}
            >
              <AddIcon />
            </Button>
          </ButtonGroup>

          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize={{ xs: "12px", sm: "14px" }}
              lineHeight={{ xs: "19px", sm: "21px" }}
              letterSpacing={"0%"}
              color={"#848484"}
            >
              SubTotal
            </Typography>
            <Typography
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize={{ xs: "16px", sm: "18px", md: "20px" }}
              lineHeight={{ xs: "24px", sm: "28px", md: "30px" }}
              letterSpacing={"0%"}
              color={"#FFA500"}
            >
              ₹{item.meal.price * item.quantity}
            </Typography>
          </Stack>
          <Divider variant="middle" />
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize={{ xs: "12px", sm: "14px" }}
              lineHeight={{ xs: "19px", sm: "21px" }}
              letterSpacing={"0%"}
              color={"#848484"}
            >
              Total
            </Typography>
            <Typography
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize={{ xs: "16px", sm: "18px", md: "20px" }}
              lineHeight={{ xs: "24px", sm: "28px", md: "30px" }}
              letterSpacing={"0%"}
              color={"#FFA500"}
            >
              ₹{item.meal.price * item.quantity}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Grid2>
  );
};

export default CartCard;
