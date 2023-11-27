import { useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Heading, SubHeading } from "../../../components/Heading";
import {
  useDeleteListingMutation,
  useGetListingQuery,
} from "../../../redux/api/listingApiSlice";
import { selectedUserId } from "../../../redux/auth/authSlice";
import useTypedSelector from "../../../hooks/useTypedSelector";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import ToastAlert from "../../../components/ToastAlert/ToastAlert";
import DotLoader from "../../../components/Spinner/dotLoader";

const AllListings = () => {
  const navigate = useNavigate();
  const userId = useTypedSelector(selectedUserId);

  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  const { data, isLoading, isSuccess } = useGetListingQuery(userId);

  const [deleteListing, { isLoading: isDeleting }] = useDeleteListingMutation();

  const DeleteListingHandler = async (id: string) => {
    try {
      const listing: any = await deleteListing(id);
      if (listing?.data === null) {
        setToast({
          ...toast,
          message: "Listing Deleted Successfully",
          appearence: true,
          type: "success",
        });
      }
      if (listing?.error) {
        setToast({
          ...toast,
          message: listing?.error?.message,
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Delete Listing Error", error);
      setToast({
        ...toast,
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

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
                        disabled={isDeleting}
                        onClick={() => {
                          DeleteListingHandler(item?._id);
                        }}
                      >
                        {isDeleting ? (
                          <DotLoader color="#fff" size={12} />
                        ) : (
                          "Delete"
                        )}
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
      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </Box>
  );
};

export default AllListings;
