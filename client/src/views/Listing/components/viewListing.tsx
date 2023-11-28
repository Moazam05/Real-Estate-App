import { useParams } from "react-router-dom";
import { useGetSingleListingQuery } from "../../../redux/api/listingApiSlice";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import { Box, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { Heading, SubHeading } from "../../../components/Heading";
import { thousandSeparatorNumber } from "../../../utils";
import { FaLocationDot } from "react-icons/fa6";
import { FaBath } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";

const iconStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  color: "#15803d",
  fontWeight: "bold",
};

const ViewListing = () => {
  const { id } = useParams();
  SwiperCore.use([Navigation]);

  const { data, isLoading } = useGetSingleListingQuery(id);

  const images = data?.data?.imageUrls;

  return (
    <>
      {isLoading && <OverlayLoader />}
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
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <Heading>{`${data?.data?.name} - Rs.${thousandSeparatorNumber(
                data?.data?.regularPrice
              )}/`}</Heading>
              <Box
                sx={{
                  marginTop: "10px",
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
                    Rs. {data?.data?.discountedPrice} discount
                  </Box>
                )}
              </Box>
              <Box sx={{ display: "flex", gap: "2px" }}>
                <SubHeading>Description -</SubHeading>
                <Box sx={{ color: "#1e293b" }}>{data?.data?.description}</Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  marginTop: "10px",
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
            <Grid item xs={2}></Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ViewListing;
