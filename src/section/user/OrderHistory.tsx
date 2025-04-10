import { useState } from "react";
import { Order } from "../../types/type";
import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import { ChevronDown, ChevronRight } from "lucide-react";
import OrderDetail from "./OrderDetail";

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
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

  if (!orders.length) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          backgroundColor: "background.paper",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No orders yet
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          You haven't placed any orders yet. Start ordering delicious food!
        </Typography>
        <Button
          variant="outlined"
          href="/restaurants"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 4,
            gap: 1,
            color: "#FFA500",
            backgroundColor: "#FFF4E0",
            borderColor: "#FFA500",
            "&:hover": {
              backgroundColor: "#FFE4B5",
            },
          }}
        >
          Browse Restaurants
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {orders.map((order) => (
        <Paper
          key={order.id}
          elevation={1}
          sx={{
            mb: 2,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {new Date(order.orderedAt).toLocaleDateString()}
                </Typography>
                <Typography variant="h6" fontWeight={500}>
                  ₹{order.total.toFixed(2)}
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 2 }}
                  >
                    ({order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"})
                  </Typography>
                </Typography>
              </Stack>
              <Box display="flex" alignItems="center" gap={2}>
                <Chip
                  label={
                    order.status.charAt(0).toUpperCase() + order.status.slice(1)
                  }
                  size="small"
                  sx={{
                    ...getStatusColor(order.status),
                    fontWeight: 500,
                    borderRadius: 1,
                  }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => toggleOrderDetails(Number(order.id))}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    minWidth: 0,
                    p: 1,
                  }}
                >
                  {expandedOrderId === order.id ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
          {expandedOrderId === order.id && (
            <>
              <Divider />
              <OrderDetail order={order} />
            </>
          )}
        </Paper>
      ))}
    </Box>
  );
};

export default OrderHistory;
