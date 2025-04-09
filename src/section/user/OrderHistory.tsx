import { useState } from "react";
import { Badge, Button, Box, Typography } from "@mui/material";
import { OrderItem, OrderStatus } from "../../types/type";
import { format } from "date-fns";
import { ChevronDown, ChevronRight } from "lucide-react";
import OrderSummary from "./OrderSummary";

interface OrderHistoryProps {
  orders: OrderItem[];
}

const OrderHistory = ({ orders }: OrderHistoryProps) => {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "completed":
        return {
          backgroundColor: "#d1fad6",
          color: "#2d6a4f",
          borderColor: "#a5d6a7",
        };
      case "pending":
        return {
          backgroundColor: "#fff4e5",
          color: "#e97d2f",
          borderColor: "#ffbc80",
        };
      case "cancelled":
        return {
          backgroundColor: "#f8d7da",
          color: "#842029",
          borderColor: "#f5c6cb",
        };
      default:
        return {
          backgroundColor: "#e2e8f0",
          color: "#2d3748",
          borderColor: "#cbd5e0",
        };
    }
  };

  const toggleOrderDetails = (orderId: number) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

  if (!orders.length) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 12,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" sx={{ color: "gray.600", mb: 2 }}>
          No orders yet
        </Typography>
        <Typography sx={{ color: "gray.500", mb: 4 }}>
          You haven't placed any orders yet. Start ordering delicious food!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component="a"
          href="/restaurants"
        >
          Browse Restaurants
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 4 }}>
      {orders.map((order) => (
        <Box
          key={order.id}
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              p: 4,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={() => toggleOrderDetails(order.id)}
          >
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Typography variant="h6" sx={{ fontWeight: "500" }}>
                  Order #{order.id}
                </Typography>
                <Badge
                  sx={{
                    ...getStatusColor(order.status),
                    padding: "2px 8px",
                    borderRadius: "16px",
                    fontSize: "0.75rem",
                  }}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </Box>
              <Typography variant="body2" sx={{ color: "gray.500", mb: 1 }}>
                {format(new Date(order.orderedAt), "MMM d, yyyy 'at' h:mm a")}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "500", mt: 1 }}>
                ₹{order.total.toFixed(2)}
                <Typography variant="body2" sx={{ color: "gray.500", ml: 2 }}>
                  ({order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"})
                </Typography>
              </Typography>
            </Box>
            <Box sx={{ mt: 3, sm: { mt: 0 } }}>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  minWidth: "auto",
                  padding: 1,
                }}
              >
                {selectedOrderId === order.id ? (
                  <>
                    Hide Details <ChevronDown />
                  </>
                ) : (
                  <>
                    View Details <ChevronRight />
                  </>
                )}
              </Button>
            </Box>
          </Box>
          {selectedOrderId === order.id && <OrderSummary order={order} />}
        </Box>
      ))}
    </Box>
  );
};

export default OrderHistory;
