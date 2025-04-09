import React from "react";
import { Box, Typography, Chip, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { OrderItem } from "../types/type";

interface OrderHeaderProps {
  order: OrderItem;
  onDeleteOrder: (id: string) => void;
}

const OrderHeader: React.FC<OrderHeaderProps> = ({ order, onDeleteOrder }) => {
  return (
    <>
      <Box
        padding={{ xs: "12px", sm: "16px", md: "20px" }}
        border={2}
        borderColor={"#f3f3f3"}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: "4px", sm: 0 }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Stack direction="row" alignItems="center" spacing={4}>
            <Typography
              variant="body2"
              color="text.secondary"
              fontFamily={"Poppins"}
              fontSize={{ xs: "12px", sm: "14px" }}
            >
              Order ID:
            </Typography>
            <Typography
              variant="body1"
              fontFamily={"Poppins"}
              fontSize={{ xs: "14px", sm: "16px" }}
              fontWeight={"medium"}
            >
              {order.id}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: "4px", sm: "8px" }}
          >
            <Chip
              label={order.status}
              color={"info"}
              sx={{
                fontSize: { xs: "12px", sm: "14px" },
              }}
            />
            <IconButton
              onClick={() => onDeleteOrder(String(order.id))}
              color="error"
              sx={{ fontSize: { xs: "16px", sm: "20px" } }}
            >
              <DeleteIcon sx={{ fontSize: { xs: "16px", sm: "20px" } }} />
            </IconButton>
          </Stack>
        </Stack>

        <Stack
          direction="column"
          spacing={"8px"}
          marginTop={{ xs: "16px", sm: "24px" }}
        >
          <Stack direction="row" spacing={"4px"}>
            <Typography
              variant="body2"
              color="text.secondary"
              fontSize={{ xs: "12px", sm: "14px" }}
            >
              Date:
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              fontSize={{ xs: "12px", sm: "14px" }}
            >
              {new Date(order.orderedAt).toLocaleDateString()}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={"4px"}>
            <Typography
              variant="body2"
              color="text.secondary"
              fontSize={{ xs: "12px", sm: "14px" }}
            >
              Address:
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              fontSize={{ xs: "12px", sm: "14px" }}
              sx={{
                wordBreak: "break-word",
              }}
            >
              {String(order.address)}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default OrderHeader;
