import React from "react";
import { AddressItem } from "../../types/type";
import { Box, Typography, IconButton, Paper, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface AddressCardProps {
  address: AddressItem;
  isSelected: boolean;
  onClick: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isSelected,
  onClick,
}) => {
  return (
    <Paper
      onClick={onClick}
      sx={{
        marginY: "20px",
        p: 3,
        borderRadius: 2,
        border: isSelected ? "2px solid #FFA500" : "1px solid #E0E0E0",
        backgroundColor: isSelected ? "#FFF4E5" : "white",
        boxShadow: isSelected ? 3 : 1,
        transition: "all 0.2s ease",
        cursor: "pointer",
        position: "relative",
        "&:hover": {
          borderColor: "#FFA500",
        },
      }}
    >
      {isSelected && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "#FFA500",
            p: 0.5,
            borderBottomLeftRadius: "8px",
          }}
        >
          <CheckCircleIcon sx={{ color: "white", fontSize: 20 }} />
        </Box>
      )}

      <Stack direction="row" spacing={2} alignItems="flex-start">
        <LocationOnIcon
          sx={{
            color: isSelected ? "#FFA500" : "#B0BEC5",
            fontSize: 20,
          }}
        />

        <Box>
          <Stack spacing={1}>
            <Typography variant="body1" fontWeight={500}>
              {address.street}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {address.city}, {address.state}, {address.pincode}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {address.country}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export default AddressCard;
