// import React, { useState } from "react";
// import {
//   Stack,
//   TextField,
//   Button,
//   InputAdornment,
//   IconButton,
//   CircularProgress,
// } from "@mui/material";
// import {
//   Person,
//   Email,
//   Lock,
//   Visibility,
//   VisibilityOff,
// } from "@mui/icons-material";

// interface SignUpFormProps {
//   onSubmit: (fullName: string, email: string, password: string) => void;
//   loading: boolean;
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
// }

// interface FormData {
//   fullName: string;
//   email: string;
//   password: string;
// }

// export const SignUpForm: React.FC<SignUpFormProps> = ({
//   onSubmit,
//   loading,
//   setLoading,
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState<FormData>({
//     fullName: "",
//     email: "",
//     password: "",
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     onSubmit(formData.fullName, formData.email, formData.password);
//   };

//   return (
//     <Stack spacing={3}>
//       <TextField
//         fullWidth
//         name="fullName"
//         value={formData.fullName}
//         onChange={handleInputChange}
//         placeholder="Full Name"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <Person sx={{ color: "#FFA500" }} />
//             </InputAdornment>
//           ),
//         }}
//         sx={{
//           "& .MuiOutlinedInput-root": {
//             borderRadius: "12px",
//             "& fieldset": {
//               borderColor: "rgba(0, 0, 0, 0.1)",
//             },
//             "&:hover fieldset": {
//               borderColor: "#FFA500",
//             },
//             "&.Mui-focused fieldset": {
//               borderColor: "#FFA500",
//             },
//           },
//         }}
//       />
//       <TextField
//         fullWidth
//         name="email"
//         value={formData.email}
//         onChange={handleInputChange}
//         placeholder="Email"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <Email sx={{ color: "#FFA500" }} />
//             </InputAdornment>
//           ),
//         }}
//         sx={{
//           "& .MuiOutlinedInput-root": {
//             borderRadius: "12px",
//             "& fieldset": {
//               borderColor: "rgba(0, 0, 0, 0.1)",
//             },
//             "&:hover fieldset": {
//               borderColor: "#FFA500",
//             },
//             "&.Mui-focused fieldset": {
//               borderColor: "#FFA500",
//             },
//           },
//         }}
//       />
//       <TextField
//         fullWidth
//         name="password"
//         value={formData.password}
//         onChange={handleInputChange}
//         type={showPassword ? "text" : "password"}
//         placeholder="Password"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <Lock sx={{ color: "#FFA500" }} />
//             </InputAdornment>
//           ),
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 onClick={() => setShowPassword(!showPassword)}
//                 edge="end"
//                 size="small"
//               >
//                 {showPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//         sx={{
//           "& .MuiOutlinedInput-root": {
//             borderRadius: "12px",
//             "& fieldset": {
//               borderColor: "rgba(0, 0, 0, 0.1)",
//             },
//             "&:hover fieldset": {
//               borderColor: "#FFA500",
//             },
//             "&.Mui-focused fieldset": {
//               borderColor: "#FFA500",
//             },
//           },
//         }}
//       />
//       <Button
//         onClick={handleSubmit}
//         disabled={loading}
//         variant="contained"
//         size="large"
//         sx={{
//           bgcolor: "#FFA500",
//           color: "#fff",
//           fontFamily: "Poppins",
//           fontSize: "1rem",
//           py: 1.5,
//           borderRadius: "12px",
//           textTransform: "none",
//           transition: "all 0.3s ease",
//           "&:hover": {
//             bgcolor: "#ff8c00",
//             transform: "translateY(-2px)",
//             boxShadow: "0 5px 15px rgba(255, 165, 0, 0.4)",
//           },
//         }}
//       >
//         {loading ? (
//           <CircularProgress size={24} sx={{ color: "#fff" }} />
//         ) : (
//           "Sign Up"
//         )}
//       </Button>
//     </Stack>
//   );
// };

// import React, { useState } from "react";
// import {
//   Stack,
//   TextField,
//   Button,
//   InputAdornment,
//   IconButton,
//   CircularProgress,
// } from "@mui/material";
// import {
//   Person,
//   Email,
//   Lock,
//   Visibility,
//   VisibilityOff,
// } from "@mui/icons-material";

// interface SignUpFormProps {
//   onSubmit: (fullName: string, email: string, password: string) => void;
//   loading: boolean;
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
// }

// interface FormData {
//   fullName: string;
//   email: string;
//   password: string;
// }

// export const SignUpForm: React.FC<SignUpFormProps> = ({
//   onSubmit,
//   loading,
//   setLoading,
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState<FormData>({
//     fullName: "",
//     email: "",
//     password: "",
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     onSubmit(formData.fullName, formData.email, formData.password);
//   };

//   return (
//     <Stack spacing={3}>
//       <TextField
//         fullWidth
//         name="fullName"
//         value={formData.fullName}
//         onChange={handleInputChange}
//         placeholder="Full Name"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <Person sx={{ color: "#FFA500" }} />
//             </InputAdornment>
//           ),
//         }}
//         sx={{
//           "& .MuiOutlinedInput-root": {
//             borderRadius: "12px",
//             "& fieldset": {
//               borderColor: "rgba(0, 0, 0, 0.1)",
//             },
//             "&:hover fieldset": {
//               borderColor: "#FFA500",
//             },
//             "&.Mui-focused fieldset": {
//               borderColor: "#FFA500",
//             },
//           },
//         }}
//       />
//       <TextField
//         fullWidth
//         name="email"
//         value={formData.email}
//         onChange={handleInputChange}
//         placeholder="Email"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <Email sx={{ color: "#FFA500" }} />
//             </InputAdornment>
//           ),
//         }}
//         sx={{
//           "& .MuiOutlinedInput-root": {
//             borderRadius: "12px",
//             "& fieldset": {
//               borderColor: "rgba(0, 0, 0, 0.1)",
//             },
//             "&:hover fieldset": {
//               borderColor: "#FFA500",
//             },
//             "&.Mui-focused fieldset": {
//               borderColor: "#FFA500",
//             },
//           },
//         }}
//       />
//       <TextField
//         fullWidth
//         name="password"
//         value={formData.password}
//         onChange={handleInputChange}
//         type={showPassword ? "text" : "password"}
//         placeholder="Password"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <Lock sx={{ color: "#FFA500" }} />
//             </InputAdornment>
//           ),
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 onClick={() => setShowPassword(!showPassword)}
//                 edge="end"
//                 size="small"
//               >
//                 {showPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//         sx={{
//           "& .MuiOutlinedInput-root": {
//             borderRadius: "12px",
//             "& fieldset": {
//               borderColor: "rgba(0, 0, 0, 0.1)",
//             },
//             "&:hover fieldset": {
//               borderColor: "#FFA500",
//             },
//             "&.Mui-focused fieldset": {
//               borderColor: "#FFA500",
//             },
//           },
//         }}
//       />
//       <Button
//         onClick={handleSubmit}
//         disabled={loading}
//         variant="contained"
//         size="large"
//         sx={{
//           bgcolor: "#FFA500",
//           color: "#fff",
//           fontFamily: "Poppins",
//           fontSize: "1rem",
//           py: 1.5,
//           borderRadius: "12px",
//           textTransform: "none",
//           transition: "all 0.3s ease",
//           "&:hover": {
//             bgcolor: "#ff8c00",
//             transform: "translateY(-2px)",
//             boxShadow: "0 5px 15px rgba(255, 165, 0, 0.4)",
//           },
//         }}
//       >
//         {loading ? (
//           <CircularProgress size={24} sx={{ color: "#fff" }} />
//         ) : (
//           "Sign Up"
//         )}
//       </Button>
//     </Stack>
//   );
// };

import React, { useState } from "react";
import {
  Stack,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  Box,
  Avatar,
} from "@mui/material";
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  CameraAlt,
} from "@mui/icons-material";

interface SignUpFormProps {
  onSubmit: (formData: FormData) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormData {
  fullName: string;
  email: string;
  password: string;
  profileImage: File | null;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  loading,
  setLoading,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    profileImage: null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }));

    // Set preview for the selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Stack spacing={3}>
      {/* Profile Image Upload */}
      <Box
        textAlign="center"
        display={"flex"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <label htmlFor="profileImage">
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Avatar
            src={preview || "/default-avatar.png"} // Default image if no preview
            sx={{
              width: 100,
              height: 100,
              cursor: "pointer",
              border: "2px solid #FFA500",
            }}
          />
          <IconButton
            component="span"
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "#FFA500",
            }}
          >
            <CameraAlt sx={{ color: "#fff" }} />
          </IconButton>
        </label>
      </Box>
      <TextField
        fullWidth
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        placeholder="Full Name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person sx={{ color: "#FFA500" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            "& fieldset": {
              borderColor: "rgba(0, 0, 0, 0.1)",
            },
            "&:hover fieldset": {
              borderColor: "#FFA500",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FFA500",
            },
          },
        }}
      />
      <TextField
        fullWidth
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email sx={{ color: "#FFA500" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            "& fieldset": {
              borderColor: "rgba(0, 0, 0, 0.1)",
            },
            "&:hover fieldset": {
              borderColor: "#FFA500",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FFA500",
            },
          },
        }}
      />
      <TextField
        fullWidth
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock sx={{ color: "#FFA500" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                size="small"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            "& fieldset": {
              borderColor: "rgba(0, 0, 0, 0.1)",
            },
            "&:hover fieldset": {
              borderColor: "#FFA500",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FFA500",
            },
          },
        }}
      />

      <Button
        onClick={handleSubmit}
        disabled={loading}
        variant="contained"
        size="large"
        sx={{
          bgcolor: "#FFA500",
          color: "#fff",
          fontFamily: "Poppins",
          fontSize: "1rem",
          py: 1.5,
          borderRadius: "12px",
          textTransform: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            bgcolor: "#ff8c00",
            transform: "translateY(-2px)",
            boxShadow: "0 5px 15px rgba(255, 165, 0, 0.4)",
          },
        }}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: "#fff" }} />
        ) : (
          "Sign Up"
        )}
      </Button>
    </Stack>
  );
};
