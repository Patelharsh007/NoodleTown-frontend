import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { emptyCartBackend, getUserCart } from "../../util/util";
import {
  showSuccessToast,
  showErrorToast,
} from "../../components/ToastContainer";
import { RootState } from "../../redux/Store";
import { useSelector } from "react-redux";

const CartHeader: React.FC = () => {
  const queryClient = useQueryClient();

  const auth = useSelector((state: RootState) => state.authUser.authUser);

  const { data, isLoading, error } = useQuery({
    queryKey: ["cartItems", auth.email],
    queryFn: getUserCart,
    staleTime: 1 * 60 * 1000,
  });

  const clearCart = useMutation({
    mutationFn: emptyCartBackend,
    onSuccess: (clearCart) => {
      showSuccessToast(clearCart.message);
      queryClient.invalidateQueries({ queryKey: ["cartItems", auth.email] });
    },
    onError: (error) => {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "An error occurred while adding item to the cart."
      );
    },
  });

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
            Your Cart {data && data.length > 0 ? `(${data.length})` : ""}
          </Typography>

          {data && data.length > 0 && (
            <Button
              startIcon={<DeleteOutlineIcon />}
              onClick={() => clearCart.mutate()}
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
