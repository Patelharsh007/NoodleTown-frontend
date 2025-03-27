import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React from "react";
import { OrderItem } from "../types/type";

interface OrderItemsProps {
  order: OrderItem;
}

const OrderItems: React.FC<OrderItemsProps> = ({ order }) => {
  return (
    <>
      <Box sx={{ p: { xs: "12px", sm: "16px", md: "20px" } }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    padding: { xs: "8px", sm: "16px" },
                  }}
                >
                  Item
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    padding: { xs: "8px", sm: "16px" },
                  }}
                >
                  Qty
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    padding: { xs: "8px", sm: "16px" },
                  }}
                >
                  Price
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    padding: { xs: "8px", sm: "16px" },
                  }}
                >
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      fontSize: { xs: "12px", sm: "14px" },
                      padding: { xs: "8px", sm: "16px" },
                    }}
                  >
                    {item.itemName}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontSize: { xs: "12px", sm: "14px" },
                      padding: { xs: "8px", sm: "16px" },
                    }}
                  >
                    {item.quantity}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontSize: { xs: "12px", sm: "14px" },
                      padding: { xs: "8px", sm: "16px" },
                    }}
                  >
                    ${item.price.toFixed(2)}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontSize: { xs: "12px", sm: "14px" },
                      padding: { xs: "8px", sm: "16px" },
                    }}
                  >
                    ${item.itemTotal.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default OrderItems;
