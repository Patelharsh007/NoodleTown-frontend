import { Paper, Grid2, Box } from "@mui/material";
import { useSelector } from "react-redux";
import CartCheckOutAddress from "../../components/CartCheckOutAddress";
import OrderSummaryForm from "../../form/OrderSummaryForm";
import { RootState } from "../../redux/Store";

const CartCheckOut = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  return (
    <>
      <Box maxWidth={"1600px"} width={"90%"} margin={"30px auto 70px"}>
        {cartItems.length > 0 && (
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#F9F9F9",
              padding: { xs: "20px", sm: "30px" },
              borderRadius: "17px",
              marginTop: "30px",
            }}
          >
            <Grid2 container spacing={4}>
              {/* this will render a compnent which lists out all adreeses */}
              <CartCheckOutAddress />
              {/* Order summary coupon code entering form */}
              <OrderSummaryForm />
            </Grid2>
          </Paper>
        )}
      </Box>
    </>
  );
};

export default CartCheckOut;
