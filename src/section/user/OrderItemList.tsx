import React from "react";
import { OrderItem } from "../../types/type";
import { Box, Typography, Paper } from "@mui/material";

interface OrderItemsListProps {
  items: OrderItem[];
}

const OrderItemsList: React.FC<OrderItemsListProps> = ({ items }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {items.map((item) => (
        <Paper
          key={item.id}
          elevation={0}
          sx={{
            overflow: "hidden",
            border: 1,
            borderColor: "grey.200",
            borderRadius: 1,
          }}
        >
          <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                height: 64,
                width: 64,
                flexShrink: 0,
                overflow: "hidden",
                borderRadius: 1,
              }}
            >
              <img
                src={item.image}
                alt={item.itemName}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/100x100/eeeeee/cccccc?text=Food";
                }}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1" fontWeight={500}>
                {item.itemName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                ₹{item.price} × {item.quantity}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body1" fontWeight={500}>
                ₹{item.itemTotal.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Paper>
      ))}

      <Box sx={{ bgcolor: "grey.50", p: 2, borderRadius: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary">
            Subtotal
          </Typography>
          <Typography variant="body2">
            ₹{items.reduce((acc, item) => acc + item.itemTotal, 0).toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderItemsList;
