import { Divider, Grid, Box, Typography } from "@mui/material";
import { OrderItem } from "../../types/type";

interface OrderSummaryProps {
  order: OrderItem;
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#f9fafb",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <Grid container spacing={4}>
        {/* Order Items Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: 2 }}>
            Items
          </Typography>
          <Box sx={{ marginBottom: 3 }}>
            {order.items.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 2,
                }}
              >
                <Typography variant="body2">
                  <span style={{ fontWeight: 500 }}>{item.quantity}x</span>{" "}
                  {item.itemName}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  ₹{item.itemTotal.toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="body2">
                ₹{order.subTotal.toFixed(2)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Discount
              </Typography>
              <Typography variant="body2">
                -₹{order.discount.toFixed(2)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 500,
              }}
            >
              <Typography variant="body2">Total</Typography>
              <Typography variant="body2">₹{order.total.toFixed(2)}</Typography>
            </Box>
          </Box>
        </Grid>

        {/* Delivery Address Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: 2 }}>
            Delivery Address
          </Typography>
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: 2,
              borderRadius: 2,
              border: "1px solid #e5e7eb",
            }}
          >
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              {order.address.street}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              {order.address.city}, {order.address.state}
            </Typography>
            <Typography variant="body2">
              PIN: {order.address.pincode}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderSummary;
