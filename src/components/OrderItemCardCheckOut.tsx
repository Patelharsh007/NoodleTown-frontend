import React from "react";
import { CartItem } from "../types/type";
import { Avatar, Box, Chip, Grid, Typography } from "@mui/material";

interface OrderItemCardProps {
  item: CartItem;
}

const OrderItemCardCheckOut: React.FC<OrderItemCardProps> = ({ item }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        py: 2,
        borderBottom: "1px solid #E0E0E0",
        "&:last-child": {
          borderBottom: "none",
        },
      }}
    >
      <Avatar
        sx={{
          width: 64,
          height: 64,
          backgroundColor: "#f0f0f0",
          overflow: "hidden",
        }}
        variant="rounded"
        src={item.meal?.image}
        alt={item.meal?.title}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://via.placeholder.com/64?text=Food";
        }}
      />

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body2" fontWeight="medium" noWrap>
              {item.meal?.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" fontWeight="semibold">
              ₹{item.meal?.price! * item.quantity}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              ₹{item.meal?.price} × {item.quantity}
            </Typography>
          </Grid>
          <Grid item>
            <Chip
              label={`Qty: ${item.quantity}`}
              size="small"
              color="default"
              sx={{ borderRadius: "12px", fontSize: "0.75rem" }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default OrderItemCardCheckOut;
