import { Box, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Heading, SubHeading } from "../../../components/Heading";
import { useGetListingQuery } from "../../../redux/api/listingApiSlice";
import { selectedUserId } from "../../../redux/auth/authSlice";
import useTypedSelector from "../../../hooks/useTypedSelector";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const AllListings = () => {
  const navigate = useNavigate();
  const userId = useTypedSelector(selectedUserId);

  const { data, isLoading, isSuccess } = useGetListingQuery(userId);

  return (
    <Box sx={{ marginTop: "50px" }}>
      {isLoading && <OverlayLoader />}
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Heading>Your Listings</Heading>
          </Box>
          {isSuccess && data?.data?.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "20px 15px 20px",
                borderRadius: "5px",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                border: "1px solid #ccc",
                margin: "20px 0",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              No Listings to show
              <Button
                onClick={() => {
                  navigate("/create-listing");
                }}
                sx={{ textTransform: "capitalize", margin: "10px 0 0" }}
              >
                Create Listing
              </Button>
            </Box>
          ) : (
            <>
              {data?.data?.map((item: any) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "20px",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "15px 20px",
                      borderRadius: "5px",
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                      border: "1px solid #ccc",
                      margin: "20px 0",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box>
                        <img
                          src={item?.imageUrls[0]}
                          width={100}
                          height={100}
                          alt="listing"
                          style={{ borderRadius: "5px" }}
                        />
                      </Box>
                      <Box>
                        <Heading sx={{ fontSize: "20px" }}>
                          {item?.name}
                        </Heading>
                        <SubHeading sx={{ fontWeight: 500, marginTop: "5px" }}>
                          {item?.description}
                        </SubHeading>
                      </Box>
                    </Box>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ textTransform: "capitalize" }}
                        startIcon={<MdDeleteOutline />}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outlined"
                        color="success"
                        sx={{ textTransform: "capitalize" }}
                        startIcon={<CiEdit />}
                      >
                        Edit
                      </Button>
                    </Box>
                  </Box>
                );
              })}
            </>
          )}
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Box>
  );
};

export default AllListings;
