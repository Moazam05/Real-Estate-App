// React Imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// Material UI Imports
import {
  Box,
  Avatar,
  Grid,
  IconButton,
  MenuItem,
  Menu,
  styled,
  MenuProps,
  Tooltip,
} from "@mui/material";
// Component Imports
import { Heading } from "../Heading";
import SearchBar from "../SearchBar";
// Hooks Imports
import useTypedSelector from "../../hooks/useTypedSelector";
// Redux Imports
import {
  selectedUserAvatar,
  selectedUserName,
  setUser,
} from "../../redux/auth/authSlice";
// Icons Imports
import { ImProfile } from "react-icons/im";
import { IoLogOutOutline } from "react-icons/io5";

const menuStyle = {
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
};

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(() => ({
  "& .MuiPaper-root": {
    borderRadius: 12,
    width: 250,
    background: "#fff",
    color: "#334155",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "10px 5px",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
      },
    },
  },
}));

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatar = useTypedSelector(selectedUserAvatar);
  const userName = useTypedSelector(selectedUserName);

  const [searchText, setSearchText] = useState<any>("");
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleSearch = (event: any) => {
    let value = event.target.value.toLowerCase();
    setSearchText(value);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchText", searchText);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTextFromUrl = urlParams.get("searchText");
    if (searchTextFromUrl) {
      setSearchText(searchTextFromUrl);
    }
  }, []);

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
              <SearchBar
                handleSearch={handleSearch}
                searchText={searchText}
                placeholder="Search..."
              />
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
                      navigate("/listings");
                    }}
                  >
                    Listings
                  </Box>
                  <Box
                    sx={menuStyle}
                    onClick={() => {
                      navigate("/create-listing");
                    }}
                  >
                    Create Listing
                  </Box>
                  <Box sx={{ cursor: "pointer" }}>
                    <IconButton
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                      color="inherit"
                    >
                      <Avatar alt="User Avatar" src={avatar} />
                    </IconButton>
                    <StyledMenu
                      onClick={() => setAnchorEl(null)}
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                    >
                      <MenuItem
                        sx={{
                          "&:hover": {
                            background: "unset",
                            cursor: "unset",
                          },
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <img
                            height={30}
                            width={30}
                            src={avatar}
                            alt="user"
                            style={{ borderRadius: "50%" }}
                          />
                          <Box>{userName}</Box>
                        </Box>
                      </MenuItem>
                      <MenuItem
                        sx={{
                          "&:hover": {
                            background: "unset",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            gap: "3px",
                            marginTop: "5px",
                          }}
                        >
                          <Tooltip title="See Profile" placement="bottom">
                            <Box
                              sx={{
                                background: "#eff1f7",
                                borderTopLeftRadius: "12px",
                                borderBottomLeftRadius: "12px",
                                width: "100%",
                                padding: "5px 10px",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                              onClick={() => {
                                navigate("/profile");
                              }}
                            >
                              <ImProfile />
                              Profile
                            </Box>
                          </Tooltip>
                          <Tooltip title="Logout Profile" placement="bottom">
                            <Box
                              sx={{
                                background: "#eff1f7",
                                borderTopRightRadius: "12px",
                                borderBottomRightRadius: "12px",
                                width: "100%",
                                padding: "5px 10px",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                              onClick={() => {
                                dispatch(setUser(null));
                                localStorage.removeItem("user");
                                setAnchorEl(null);
                                navigate("/");
                              }}
                            >
                              <IoLogOutOutline /> Logout
                            </Box>
                          </Tooltip>
                        </Box>
                      </MenuItem>
                    </StyledMenu>
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
