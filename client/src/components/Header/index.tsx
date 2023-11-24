// React Imports
import { useNavigate } from "react-router-dom";
// Material UI Imports
import { Box, Avatar, Tooltip } from "@mui/material";
// Component Imports
import { Heading } from "../Heading";
import SearchBar from "../SearchBar";
import useTypedSelector from "../../hooks/useTypedSelector";
import { selectedUserAvatar } from "../../redux/auth/authSlice";

const menuStyle = {
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
};

const Header = () => {
  const navigate = useNavigate();
  const avatar = useTypedSelector(selectedUserAvatar);

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
          {avatar ? (
            <Box sx={{ cursor: "pointer" }}>
              <Tooltip title="Profile">
                <Avatar
                  alt="User Avatar"
                  src={avatar}
                  onClick={() => {
                    navigate("/profile");
                  }}
                />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={menuStyle}
              onClick={() => {
                navigate("/login");
              }}
            >
              Log in
            </Box>
          )}
        </Box>
      </Box>
    </header>
  );
};

export default Header;
