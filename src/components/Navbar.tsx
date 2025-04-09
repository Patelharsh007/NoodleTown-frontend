import * as React from "react";
import Typography from "@mui/material/Typography";
import FaceIcon from "@mui/icons-material/Face";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { Badge, Stack, Box } from "@mui/material";
import useCart from "../hooks/useCartMeal";

interface NavbarProps {
  linkColor?: string;
}

const Navbar: React.FC<NavbarProps> = ({ linkColor }) => {
  const { cart } = useCart();

  return (
    <>
      <Box maxWidth={"1600px"} width={"90%"} margin={"25px auto"}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          width={"100%"}
          justifyContent={{ xs: "center", sm: "space-between" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Typography
            fontFamily={"Poppins, serif"}
            fontWeight={500}
            fontSize={"20px"}
            lineHeight={"30px"}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#ffc300",
              }}
            >
              Noodletown
            </Link>
          </Typography>

          <Stack
            direction="row"
            spacing={{ xs: 0, sm: 3 }}
            justifyContent={{ xs: "space-between" }}
            width={{ xs: "100%", sm: "auto" }}
          >
            <Typography
              fontFamily={"Poppins, serif"}
              fontWeight={500}
              fontSize={"20px"}
              lineHeight={"30px"}
              letterSpacing={"0%"}
              paddingX={{ xs: 0, sm: "20px" }}
            >
              <Link
                to="/menu"
                style={{
                  textDecoration: "none",
                  color: linkColor,
                }}
              >
                Menu
              </Link>
            </Typography>

            <Stack
              direction="row"
              spacing={{ xs: 0, sm: 3 }}
              justifyContent={{ xs: "flex-end" }}
              width={{ xs: "100%", sm: "auto" }}
            >
              <Link
                to="/user"
                style={{
                  textDecoration: "none",
                  color: linkColor,
                  padding: "0 20px",
                  // paddingX:"20px"
                }}
              >
                <FaceIcon />
              </Link>

              {/* <Stack > */}
              <Link
                to="/cart"
                style={{
                  textDecoration: "none",
                  color: linkColor,
                  padding: "0 15px",
                  // paddingX:"20px",
                }}
              >
                <Badge
                  badgeContent={cart && cart.length}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#ffc300",
                      color: linkColor,
                    },
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </Link>
            </Stack>
            {/* </Stack> */}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Navbar;
