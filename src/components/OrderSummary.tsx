import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { OrderItem } from "../types/type";

interface OrderItemsProps {
  order: OrderItem;
}

const OrderSummary: React.FC<OrderItemsProps> = ({ order }) => {
  return (
    <Box
      padding={{ xs: "12px", sm: "16px", md: "20px" }}
      sx={{
        backgroundColor: "rgba(244, 244, 244, 0.8)",
      }}
    >
      <Stack
        spacing={"8px"}
        maxWidth={{ xs: "100%", sm: "300px" }}
        marginLeft={{ xs: 0, sm: "auto" }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography
            variant="body2"
            color="text.secondary"
            fontSize={{ xs: "12px", sm: "14px" }}
          >
            Subtotal
          </Typography>
          <Typography variant="body2" fontSize={{ xs: "12px", sm: "14px" }}>
            ${order.subTotal.toFixed(2)}
          </Typography>
        </Stack>
        {order.discount > 0 && (
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              color="success.main"
              fontSize={{ xs: "12px", sm: "14px" }}
            >
              Discount
            </Typography>
            <Typography
              variant="body2"
              color="success.main"
              fontSize={{ xs: "12px", sm: "14px" }}
            >
              -${order.discount.toFixed(2)}
            </Typography>
          </Stack>
        )}
        <Stack
          direction="row"
          justifyContent="space-between"
          paddingTop={"16px"}
        >
          <Typography
            variant="subtitle1"
            fontWeight={"bold"}
            fontSize={{ xs: "14px", sm: "16px", md: "18px" }}
          >
            Total
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight={"bold"}
            fontSize={{ xs: "14px", sm: "16px", md: "18px" }}
          >
            ${order.total.toFixed(2)}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default OrderSummary;
