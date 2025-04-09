import React from "react";
import { OrderItem } from "../../types/type";
import { MapPin } from "lucide-react";
import { Box, Typography, Grid, Divider, Chip } from "@mui/material";

interface OrderDetailProps {
  order: OrderItem;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  return (
    <Box borderTop={1} borderColor="grey.300" bgcolor="grey.50" p={4}>
      <Grid container spacing={6}>
        {/* Left: Order items and summary */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Order Items
          </Typography>
          <Box bgcolor="white" borderRadius={2} border={1} p={3} mb={3}>
            {order.items.map((item) => (
              <Box
                key={item.id.toString()}
                display="flex"
                justifyContent="space-between"
                py={2}
                borderBottom={1}
                borderColor="grey.100"
                sx={{
                  "&:last-child": {
                    borderBottom: "none",
                  },
                }}
              >
                <Box display="flex" alignItems="flex-start">
                  <Typography
                    variant="body2"
                    color="orange"
                    fontWeight="medium"
                    mr={2}
                  >
                    {item.quantity}×
                  </Typography>
                  <Typography variant="body2">{item.itemName}</Typography>
                </Box>
                <Typography variant="body2" fontWeight="medium">
                  ₹{item.itemTotal.toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box bgcolor="white" borderRadius={2} border={1} p={3}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="body2" color="textSecondary">
                Subtotal
              </Typography>
              <Typography variant="body2">
                ₹{order.subTotal.toFixed(2)}
              </Typography>
            </Box>
            {order.discount > 0 && (
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body2" color="green">
                  Discount
                </Typography>
                <Typography variant="body2">
                  -₹{order.discount.toFixed(2)}
                </Typography>
              </Box>
            )}
            {order.deliveryCharges && (
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body2" color="textSecondary">
                  Delivery Fee
                </Typography>
                <Typography variant="body2">
                  ₹{order.deliveryCharges.toFixed(2)}
                </Typography>
              </Box>
            )}
            <Divider sx={{ mt: 2 }} />
            <Box
              display="flex"
              justifyContent="space-between"
              pt={2}
              fontWeight="medium"
            >
              <Typography variant="body2">Total</Typography>
              <Typography variant="body2" color="orange">
                ₹{order.total.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right: Delivery address */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Delivery Address
          </Typography>
          <Box bgcolor="white" borderRadius={2} border={1} p={3}>
            <Box display="flex">
              <MapPin
                size={18}
                className="text-gray-400 flex-shrink-0 mt-1 mr-2"
              />
              <Box>
                <Typography variant="body2" mb={1}>
                  {order.address.street}
                </Typography>
                <Typography variant="body2" mb={1}>
                  {order.address.city}, {order.address.state}
                </Typography>
                <Typography variant="body2" mb={1}>
                  {order.address.pincode}
                </Typography>
                {order.address.country && (
                  <Typography variant="body2">
                    {order.address.country}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetail;
