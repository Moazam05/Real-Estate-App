// React Imports
import { useNavigate } from "react-router-dom";
// Material UI Imports
import { Box } from "@mui/material";
// Component Imports
import { Heading } from "../Heading";
import SearchBar from "../SearchBar";

const menuStyle = {
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
};

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#e2e8f0",
          height: "66px",
          padding: "0 100px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Box
          onClick={() => {
            navigate("/");
          }}
          sx={{ display: "flex", cursor: "pointer" }}
        >
          <Heading sx={{ color: "#64748b" }}>Real</Heading>
          <Heading sx={{ color: "#334155" }}>Estate</Heading>
        </Box>
        <Box sx={{ width: "300px" }}>
          <SearchBar placeholder="Search..." />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={menuStyle}
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Box>
          <Box
            sx={menuStyle}
            onClick={() => {
              navigate("/about");
            }}
          >
            About
          </Box>
          <Box
            sx={menuStyle}
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </Box>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
