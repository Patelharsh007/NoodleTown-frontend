import { useState } from "react";
import { OrderItem } from "../../types/type";
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
  orders: OrderItem[];
}

const OrderHistory = ({ orders }: OrderHistoryProps) => {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return {
          bgcolor: "success.light",
          color: "success.dark",
        };
      case "pending":
        return {
          bgcolor: "warning.light",
          color: "warning.dark",
        };
      case "cancelled":
        return {
          bgcolor: "error.light",
          color: "error.dark",
        };
      default:
        return {
          bgcolor: "grey.100",
          color: "grey.800",
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {orders.map((order) => (
        <Paper
          key={order.id}
          elevation={0}
          sx={{
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: 3,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight={500}>
                  Order #{order.id}
                </Typography>
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
              </Stack>
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
            </Box>

            <Button
              variant="outlined"
              size="small"
              onClick={() => toggleOrderDetails(order.id)}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {selectedOrderId === order.id ? (
                <>
                  Hide Details <ChevronDown size={20} />
                </>
              ) : (
                <>
                  View Details <ChevronRight size={20} />
                </>
              )}
            </Button>
          </Box>

          {selectedOrderId === order.id && (
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
