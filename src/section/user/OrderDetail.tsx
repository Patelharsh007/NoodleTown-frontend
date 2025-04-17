import React from "react";
import { Order } from "../../types/type";

import { Box, Typography, Chip, Divider, Paper } from "@mui/material";

import {
  Check,
  AccessTime,
  Close,
  RotateRight,
  LocalShipping,
  Help,
} from "@mui/icons-material";
import { formatDate } from "date-fns";
import OrderItemsList from "./OrderItemList";

interface OrderDetailProps {
  order: Order;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check fontSize="small" />;
      case "pending":
        return <AccessTime fontSize="small" />;
      case "cancelled":
        return <Close fontSize="small" />;
      case "processing":
        return <RotateRight fontSize="small" />;
      case "shipped":
        return <LocalShipping fontSize="small" />;
      default:
        return <Help fontSize="small" />;
    }
  };

  const getOrderStatusColor = (status: string = "") => {
    switch (status.toLowerCase()) {
      case "completed":
        return { bgcolor: "#E8F5E9", color: "#2E7D32" };
      case "pending":
        return { bgcolor: "#FFF3E0", color: "#E65100" };
      case "cancelled":
        return { bgcolor: "#FFEBEE", color: "#C62828" };
      case "processing":
        return { bgcolor: "#E3F2FD", color: "#1565C0" };
      case "shipped":
        return { bgcolor: "#F3E5F5", color: "#6A1B9A" };
      default:
        return { bgcolor: "#F5F5F5", color: "#616161" };
    }
  };

  const getPaymentStatusColor = (status: string = "") => {
    switch (status.toLowerCase()) {
      case "completed":
        return { bgcolor: "#E8F5E9", color: "#2E7D32" };
      case "pending":
        return { bgcolor: "#FFF3E0", color: "#E65100" };
      case "cancelled":
        return { bgcolor: "#FFEBEE", color: "#C62828" };

      default:
        return { bgcolor: "#F5F5F5", color: "#616161" };
    }
  };

  const { bgcolor, color } = getPaymentStatusColor(order.status);
  const { bgcolor: bgcolor1, color: color1 } = getOrderStatusColor(
    order.status
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxHeight: "70vh",
        overflow: "auto",
        pr: 1,
        scrollbarColor: { sm: "#f8f8f8 transparent" },
        scrollbarWidth: "thin",
        scrollBehavior: "smooth",
      }}
    >
      {/* Order Summary */}
      <Paper
        elevation={0}
        sx={{ p: 3, border: 1, borderColor: "grey.100", borderRadius: 1 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h6">Order #{order.id}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Placed on {formatDate(order.orderedAt, "dd/MM/yyyy")}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Chip
              icon={getStatusIcon(order.status)}
              label={
                order.status.charAt(0).toUpperCase() + order.status.slice(1)
              }
              sx={{
                backgroundColor: bgcolor1,
                color: color1,
                fontWeight: 500,
                "& .MuiChip-icon": { color: color },
              }}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Address and Payment Info */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="subtitle2" color="text.primary">
              Shipping Address
            </Typography>
            <Box sx={{ mt: 1.5, color: "text.secondary" }}>
              <Typography variant="body2">{order.address.street}</Typography>
              <Typography variant="body2">
                {order.address.recipientName}
                {""}
                {order.address.city}, {order.address.state}{" "}
                {order.address.pincode}
              </Typography>
              <Typography variant="body2">{order.address.country}</Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.primary">
              Payment Information
            </Typography>
            <Box sx={{ mt: 1.5, color: "text.secondary" }}>
              <Typography variant="body2">
                <span style={{ fontWeight: 500 }}>Status: </span>
                <span
                  style={{
                    color:
                      order.paymentStatus === "completed"
                        ? "#2e7d32"
                        : "#ed6c02",
                  }}
                >
                  {order.paymentStatus.charAt(0).toUpperCase() +
                    order.paymentStatus.slice(1)}
                </span>
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 0.5, wordBreak: "break-all" }}
              >
                <span style={{ fontWeight: 500 }}>ID: </span>
                {order.stripePaymentId}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Order Items */}
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Order Items
        </Typography>
        <OrderItemsList items={order.items} />

        <Paper
          elevation={0}
          sx={{ mt: 3, p: 3, border: 1, borderColor: "grey.100" }}
        >
          <Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", py: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="body2">
                ₹{order.subTotal.toFixed(2)}
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", py: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                Shipping
              </Typography>
              <Typography variant="body2">
                ₹{order.delivery.toFixed(2)}
              </Typography>
            </Box>
            {order.discount > 0 && (
              <>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Discount
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    -₹{order.discount.toFixed(2)}
                  </Typography>
                </Box>
              </>
            )}
            <Divider />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", py: 1 }}
            >
              <Typography variant="subtitle2">Total</Typography>
              <Typography
                variant="subtitle1"
                color="error.main"
                fontWeight={700}
              >
                ₹{order.total.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default OrderDetail;
