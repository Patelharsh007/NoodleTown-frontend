import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { Paper, Box, Typography, Container } from "@mui/material";
import { deleteOrder } from "../../redux/slices/OrderSlice";
import OrderHeader from "../../components/OrderHeader";
import OrderItems from "../../components/OrderItems";
import OrderSummary from "../../components/OrderSummary";

const Orders: React.FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.order.orders);

  const authUser = useSelector((state: RootState) => state.authUser.authUser);

  const user_orders = orders.filter(
    (item) => item.user_email === authUser.email
  );

  const handleDeleteOrder = (orderId: string) => {
    dispatch(deleteOrder(orderId));
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        paddingY: { xs: "16px", sm: "24px", md: "32px" },
        paddingX: { xs: "8px", sm: "16px", md: "px24" },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        fontFamily={"Poppins"}
        fontSize={{ xs: "16px", sm: "32px", md: "36px" }}
        fontWeight={"bold"}
        marginBottom={{ xs: "16px", sm: "24px", md: "32px" }}
      >
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Paper
          sx={{
            padding: { xs: "16px", sm: "24px", md: "32px" },
            textAlign: "center",
          }}
        >
          <Typography color="text.secondary">No orders placed yet.</Typography>
        </Paper>
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={{ xs: "16px", sm: "20px", md: "24px" }}
        >
          {user_orders.map((order) => (
            <Paper
              key={order.id}
              elevation={2}
              sx={{
                overflow: "hidden",
                borderRadius: { xs: "8px", sm: "12px", md: "16px" },
              }}
            >
              {/* Order Header */}
              <OrderHeader order={order} onDeleteOrder={handleDeleteOrder} />

              {/* Ordered itmsss */}
              <OrderItems order={order} />

              {/* Order Summary */}
              <OrderSummary order={order} />
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Orders;
