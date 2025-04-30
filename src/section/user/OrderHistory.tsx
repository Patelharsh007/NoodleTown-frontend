import React, { useState } from "react";
import { Order } from "../../types/type";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  Chip,
  CircularProgress,
} from "@mui/material";
import { RemoveRedEye as Eye, Inventory as Package } from "@mui/icons-material";
import OrderDetail from "./OrderDetail";
import { getOrders } from "../../util/util";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { formatDate } from "date-fns";
import { useNavigate } from "react-router-dom";

const OrderHistory: React.FC = () => {
  const authUser = useSelector((state: RootState) => state.authUser.authUser);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", authUser.email],
    queryFn: getOrders,
    staleTime: 5 * 60 * 1000,
  });

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  const getStatusColor = (status: string = "") => {
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

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        py={6}
      >
        <CircularProgress size={48} sx={{ color: "primary.main" }} />
        <Typography variant="body2" color="text.secondary" mt={2}>
          Loading your orders...
        </Typography>
      </Box>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        py={6}
        textAlign="center"
      >
        <Box bgcolor="grey.100" borderRadius="50%" p={1.5}>
          <Package sx={{ fontSize: 32, color: "grey.400" }} />
        </Box>
        <Typography variant="h6" fontWeight={500} color="text.primary" mt={2}>
          No orders yet
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mt={0.5}
          maxWidth="sm"
        >
          You haven't placed any orders yet. Start ordering delicious food!
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/menu");
          }}
          sx={{
            mt: 3,
            bgcolor: "warning.main",
            "&:hover": { bgcolor: "warning.dark" },
          }}
        >
          Browse Restaurants
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          Your Orders
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {orders.length} {orders.length === 1 ? "order" : "orders"}
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        {orders.map((order: Order) => {
          const { bgcolor, color } = getStatusColor(order.status);

          return (
            <Card key={order.id} variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 0 }}>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  bgcolor="grey.50"
                  p={2}
                  borderBottom={1}
                  borderColor="divider"
                >
                  <Box mb={{ xs: 1, sm: 0 }}>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body1" fontWeight={500}>
                        Order #{order.id}
                      </Typography>
                      <Chip
                        size="small"
                        label={
                          order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)
                        }
                        sx={{
                          ml: 1,
                          backgroundColor: bgcolor,
                          color: color,
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(order.ordered_at, "dd/MM/yyyy")}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Eye fontSize="small" />}
                    onClick={() => openOrderDetails(order)}
                    sx={{
                      borderColor: "warning.light",
                      color: "warning.main",
                      "&:hover": {
                        bgcolor: "warning.50",
                        borderColor: "warning.main",
                      },
                    }}
                  >
                    View Details
                  </Button>
                </Box>

                <Box p={2}>
                  <Box
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    gap={2}
                  >
                    <Box>
                      <Box display="flex" alignItems="center">
                        <Typography variant="body2" fontWeight={500}>
                          Items:{" "}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          ml={0.5}
                        >
                          {order.items.length}{" "}
                          {order.items.length === 1 ? "item" : "items"}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={1}
                        sx={{
                          maxWidth: 300,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {order.items.map((item) => item.item_name).join(", ")}
                      </Typography>
                    </Box>

                    <Box textAlign={{ xs: "left", sm: "right" }}>
                      <Typography variant="body2" color="text.secondary">
                        Total amount
                      </Typography>
                      <Typography
                        variant="h6"
                        color="warning.main"
                        fontWeight={600}
                      >
                        ₹{order.total.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                    {order.items.slice(0, 3).map((item) => (
                      <Box
                        key={item.id}
                        width={40}
                        height={40}
                        borderRadius={1}
                        overflow="hidden"
                        border={1}
                        borderColor="grey.200"
                      >
                        <img
                          src={item.image}
                          alt={item.item_name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/100x100/eeeeee/cccccc?text=Food";
                          }}
                        />
                      </Box>
                    ))}
                    {order.items.length > 3 && (
                      <Box
                        width={40}
                        height={40}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={1}
                        border={1}
                        borderColor="grey.200"
                        bgcolor="grey.50"
                      >
                        <Typography
                          variant="caption"
                          fontWeight={500}
                          color="text.secondary"
                        >
                          +{order.items.length - 3}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Dialog
        open={!!selectedOrder}
        onClose={closeOrderDetails}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "background.default",
            color: "warning.main",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          Order Details
          {selectedOrder && (
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              ml={1}
            >
              #{selectedOrder?.id}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent sx={{ p: 3, pb: 4 }}>
          {selectedOrder && <OrderDetail order={selectedOrder} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OrderHistory;
