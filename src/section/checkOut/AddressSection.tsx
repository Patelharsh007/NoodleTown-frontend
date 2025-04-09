import React, { useState } from "react";
import { AddressItem } from "../../types/type";
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import { Plus, X } from "lucide-react";
import AddressCard from "./AddressCard";

interface AddressSectionProps {
  addresses: AddressItem[];
  selectedAddressId: string | null;
  onSelectAddress: (addressId: string) => void;
  onAddAddress: (address: Omit<AddressItem, "id">) => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onAddAddress,
}) => {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAddress(newAddress);
    setNewAddress({
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: ""
    });
    setIsAddingAddress(false);
  };

  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId
  );

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Shipping Address
      </Typography>

      {selectedAddress && (
        <Box sx={{ mb: 3, p: 2, backgroundColor: "#FFF4E5", borderRadius: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={2}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#FFA500",
              }}
            />
            <Typography variant="body2" fontWeight={500} color="text.primary">
              Delivering to:
            </Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="body2" fontWeight={500} color="text.primary">
              {selectedAddress.street}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedAddress.country}
            </Typography>
          </Stack>
        </Box>
      )}

      <Box sx={{ mb: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body1" fontWeight={500} color="text.primary">
            Your Addresses
          </Typography>
          <Button
            onClick={() => setIsAddingAddress(!isAddingAddress)}
            variant="text"
            color="warning"
            startIcon={isAddingAddress ? <X /> : <Plus />}
          >
            {isAddingAddress ? "Cancel" : "Add New"}
          </Button>
        </Stack>

        {isAddingAddress ? (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 1,
              backgroundColor: "#F5F5F5",
              display: "grid",
              gap: 2,
            }}
          >
            <TextField
              label="Street"
              name="street"
              value={newAddress.street}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              required
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="City"
                name="city"
                value={newAddress.city}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                label="State"
                name="state"
                value={newAddress.state}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Pincode"
                name="pincode"
                value={newAddress.pincode}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
                inputProps={{ pattern: "[0-9]{6}" }}
              />
              <TextField
                label="Country"
                name="country"
                value={newAddress.country}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
              />
            </Stack>
            <Button
              type="submit"
              variant="contained"
              color="warning"
              sx={{ mt: 2 }}
              fullWidth
            >
              Save Address
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  isSelected={address.id === selectedAddressId}
                  onClick={() => onSelectAddress(address.id)}
                />
              ))
            ) : (
              <Box
                sx={{
                  py: 6,
                  textAlign: "center",
                  backgroundColor: "#F5F5F5",
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  No addresses saved yet.
                </Typography>
              </Box>
            )}

            {!isAddingAddress && addresses.length === 0 && (
              <Button
                onClick={() => setIsAddingAddress(true)}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                startIcon={<Plus />}
              >
                Add your first address
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default AddressSection;

// import {
//   Typography,
//   Stack,
//   Box,
//   Button,
//   Modal,
//   TextField,
//   Divider,
// } from "@mui/material";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux/Store";
// import { showSuccessToast } from "../../components/ToastContainer";
// import { useNavigate } from "react-router-dom";
// import { addAddress } from "../../redux/slices/AddressSlice";

// interface Address {
//   id: string;
//   street: string;
//   city: string;
//   state: string;
//   pincode: string;
// }

// interface AddressSectionProps {
//   onSelectAddress: (addressId: string) => void;
//   selectedAddressId: string | null;
// }

// const AddressSection: React.FC<AddressSectionProps> = ({
//   onSelectAddress,
//   selectedAddressId,
// }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { authUser } = useSelector((state: RootState) => state.authUser);
//   const { addresses } = useSelector((state: RootState) => state.address || []);

//   const [openModal, setOpenModal] = useState(false);
//   const [newAddress, setNewAddress] = useState({
//     street: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   const selectedAddress = addresses.find(
//     (addr: Address) => addr.id === selectedAddressId
//   );

//   const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
//   };

//   const handleAddAddress = async () => {
//     if (!authUser.isAuthenticated) return navigate("/auth");
//     // const response = await fetch("/api/addresses", {
//     //   method: "POST",
//     //   headers: { "Content-Type": "application/json" },
//     //   body: JSON.stringify({ ...newAddress, userId: authUser.id }),
//     // });
//     const savedAddress = { id: Date.now().toString(), ...newAddress };

//     dispatch(addAddress(savedAddress));
//     onSelectAddress(savedAddress.id);
//     setNewAddress({ street: "", city: "", state: "", pincode: "" });
//     setOpenModal(false);
//     showSuccessToast("Address added successfully");
//   };

//   return (
//     <Stack spacing={2}>
//       {/* Shipping Information Box */}
//       <Box
//         sx={{
//           border: "1px solid #ddd",
//           borderRadius: "8px",
//           p: 2,
//           backgroundColor: selectedAddress ? "#f9f9f9" : "#fff",
//         }}
//       >
//         <Typography variant="h6" fontFamily="Poppins" fontWeight={500}>
//           Shipping Information
//         </Typography>
//         {selectedAddress ? (
//           <Typography fontFamily="Poppins" color="#666">
//             {`${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`}
//           </Typography>
//         ) : (
//           <Typography fontFamily="Poppins" color="#999">
//             No address selected
//           </Typography>
//         )}
//       </Box>

//       {/* Address List */}
//       <Typography variant="h6" fontFamily="Poppins" fontWeight={500}>
//         Saved Addresses
//       </Typography>
//       <Stack spacing={2}>
//         {addresses.map((address: Address) => (
//           <Box
//             key={address.id}
//             onClick={() => onSelectAddress(address.id)}
//             sx={{
//               border: "1px solid #ddd",
//               borderRadius: "8px",
//               p: 2,
//               cursor: "pointer",
//               backgroundColor:
//                 selectedAddressId === address.id ? "#FFA500" : "#fff",
//               color: selectedAddressId === address.id ? "#fff" : "#000",
//               "&:hover": { borderColor: "#FFA500" },
//             }}
//           >
//             <Typography fontFamily="Poppins">
//               {`${address.street}, ${address.city}, ${address.state} - ${address.pincode}`}
//             </Typography>
//           </Box>
//         ))}
//       </Stack>

//       {/* Add Address Button */}
//       <Button
//         onClick={() => setOpenModal(true)}
//         sx={{
//           backgroundColor: "#FFA500",
//           color: "#fff",
//           "&:hover": { backgroundColor: "#ff8c00" },
//         }}
//       >
//         Add New Address
//       </Button>

//       {/* Modal for Adding Address */}
//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "white",
//             borderRadius: "8px",
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <Typography variant="h6" fontFamily="Poppins" fontWeight={500} mb={2}>
//             Add New Address
//           </Typography>
//           <Stack spacing={2}>
//             <TextField
//               label="Street"
//               name="street"
//               value={newAddress.street}
//               onChange={handleNewAddressChange}
//               fullWidth
//             />
//             <TextField
//               label="City"
//               name="city"
//               value={newAddress.city}
//               onChange={handleNewAddressChange}
//               fullWidth
//             />
//             <TextField
//               label="State"
//               name="state"
//               value={newAddress.state}
//               onChange={handleNewAddressChange}
//               fullWidth
//             />
//             <TextField
//               label="Pincode"
//               name="pincode"
//               value={newAddress.pincode}
//               onChange={handleNewAddressChange}
//               fullWidth
//             />
//             <Button
//               onClick={handleAddAddress}
//               sx={{
//                 backgroundColor: "#FFA500",
//                 color: "#fff",
//                 "&:hover": { backgroundColor: "#ff8c00" },
//               }}
//             >
//               Save Address
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>
//     </Stack>
//   );
// };

// export default AddressSection;
