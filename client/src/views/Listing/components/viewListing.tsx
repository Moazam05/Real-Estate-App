import { useParams } from "react-router-dom";
import { useGetSingleListingQuery } from "../../../redux/api/listingApiSlice";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import { Box, Grid, Divider } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { Heading, SubHeading } from "../../../components/Heading";
import { maskingPhoneNumber, thousandSeparatorNumber } from "../../../utils";
import { FaLocationDot } from "react-icons/fa6";
import { FaBath } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { useGetUserQuery } from "../../../redux/api/userApiSlice";
import { selectedUserId } from "../../../redux/auth/authSlice";
import useTypedSelector from "../../../hooks/useTypedSelector";
import { HiOutlineMail } from "react-icons/hi";
import { IoMdPerson } from "react-icons/io";

const iconStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  color: "#15803d",
  fontWeight: "bold",
};

const ViewListing = () => {
  const { id } = useParams();
  const userId = useTypedSelector(selectedUserId);
  SwiperCore.use([Navigation]);

  const { data, isLoading } = useGetSingleListingQuery(id);
  const images = data?.data?.imageUrls;

  // User API Query
  const { data: userData, isLoading: isUserLoading } = useGetUserQuery(userId);

  return (
    <>
      {(isLoading || isUserLoading) && <OverlayLoader />}
      <Box>
        <Swiper navigation={true}>
          {images?.map((image: any) => (
            <SwiperSlide key={image}>
              <img
                src={image}
                alt="listing"
                width="100%"
                height={500}
                style={{ objectFit: "cover" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Box sx={{ margin: "30px 0" }}>
          <Grid container spacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={7} sx={{ paddingRight: "30px" }}>
              <Heading>{`${data?.data?.name} - Rs.${thousandSeparatorNumber(
                data?.data?.regularPrice
              )}/`}</Heading>
              <Box
                sx={{
                  marginTop: "20px",
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  color: "#475569",
                  fontweight: 600,
                }}
              >
                <FaLocationDot style={{ color: "#15803d" }} />
                {data?.data?.address}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  margin: "10px 0",
                }}
              >
                <Box
                  sx={{
                    background: "#7f1d1d",
                    color: "#fff",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    width: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {data?.data?.type}
                </Box>
                {data?.data?.discountedPrice > 0 && (
                  <>
                    <Box
                      sx={{
                        background: "#14532d",
                        color: "#fff",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        width: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Rs. {thousandSeparatorNumber(data?.data?.discountedPrice)}{" "}
                      discount
                    </Box>
                    <Box
                      sx={{
                        background: "#6CB4EE",
                        color: "#fff",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        width: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Now Rs.{" "}
                      {thousandSeparatorNumber(
                        data?.data?.regularPrice - data?.data?.discountedPrice
                      )}
                      /
                    </Box>
                  </>
                )}
              </Box>
              <Box sx={{ display: "flex", gap: 2, marginTop: "15px" }}>
                <SubHeading>Description </SubHeading>
                <Box sx={{ color: "#1e293b" }}>{data?.data?.description}</Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  marginTop: "15px",
                }}
              >
                <Box sx={iconStyle}>
                  <FaBed style={{ color: "#15803d" }} />
                  {data?.data?.bedrooms} Beds
                </Box>
                <Box sx={iconStyle}>
                  <FaBath style={{ color: "#15803d" }} />
                  {data?.data?.bathrooms} Baths
                </Box>
                <Box sx={iconStyle}>
                  <FaParking style={{ color: "#15803d" }} />
                  {data?.data?.parking ? "Parking" : "No Parking"}
                </Box>
                <Box sx={iconStyle}>
                  <FaChair style={{ color: "#15803d" }} />
                  {data?.data?.furnished ? "Furnished" : "Not Furnished"}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  margin: "0 0 20px 0",
                  background: "#fff",
                  borderRadius: "6px",
                  padding: "15px 20px",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
                  width: "100%",
                }}
              >
                <Heading
                  sx={{
                    margin: "5px 0",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  Owner Details
                </Heading>
                <Divider />
                <Box
                  sx={{
                    margin: "15px 0 10px 0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      minWidth: "100px",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <IoMdPerson /> Name
                  </Box>
                  <Box>{userData?.data?.username}</Box>
                </Box>
                <Box
                  sx={{
                    margin: "15px 0 10px 0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      minWidth: "100px",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <HiOutlineMail /> Email
                  </Box>
                  <Box>{userData?.data?.email}</Box>
                </Box>
                <Box
                  sx={{
                    margin: "15px 0 10px 0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      minWidth: "100px",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <IoIosCall /> Phone
                  </Box>
                  <Box>{maskingPhoneNumber(data?.data?.phoneNumber)}</Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ViewListing;
