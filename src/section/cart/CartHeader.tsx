import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useCart from "../../hooks/useCartMeal";

const CartHeader: React.FC = () => {
  const { emptyCart, cart, isLoadingCart } = useCart();

  return (
    <>
      <Box maxWidth={"1600px"} width={"90%"} margin={"auto"} marginTop={"50px"}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          marginBottom="30px"
        >
          <Typography
            fontFamily={"Poppins"}
            fontWeight={500}
            fontSize={{ xs: "28px", sm: "32px" }}
            lineHeight={{ xs: "40px", sm: "48px" }}
            letterSpacing={"0%"}
            marginBottom={"30px"}
            textAlign={"left"}
          >
            Your Cart {cart && cart.length > 0 ? `(${cart.length})` : ""}
          </Typography>

          {cart && cart.length > 0 && (
            <Button
              startIcon={<DeleteOutlineIcon />}
              onClick={() => emptyCart()}
              sx={{
                alignSelf: { xs: "flex-end", sm: "center" },
                color: "#666",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "#ffebcc",
                  color: "#FFA500",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: "20px",
                },
              }}
            >
              <Typography
                fontFamily="Poppins"
                fontWeight={400}
                fontSize={{ xs: "14px", sm: "16px" }}
              >
                Clear Cart
              </Typography>
            </Button>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default CartHeader;
