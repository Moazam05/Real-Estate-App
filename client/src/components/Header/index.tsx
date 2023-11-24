// React Imports
import { useNavigate } from "react-router-dom";
// Material UI Imports
import { Box, Avatar, Tooltip, Grid } from "@mui/material";
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
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid item xs={4}>
            <Box
              onClick={() => {
                navigate("/");
              }}
              sx={{ display: "flex", cursor: "pointer" }}
            >
              <Heading sx={{ color: "#64748b" }}>Real</Heading>
              <Heading sx={{ color: "#334155" }}>Estate</Heading>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <SearchBar placeholder="Search..." />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "end",
              }}
            >
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
                <>
                  <Box
                    sx={menuStyle}
                    onClick={() => {
                      navigate("/about");
                    }}
                  >
                    Create Listing
                  </Box>
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
                </>
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
          </Grid>
        </Grid>
      </Box>
    </header>
  );
};

export default Header;
