// MUI Imports
import { Box, Grid } from "@mui/material";
// React Imports
import { useNavigate } from "react-router-dom";
// Custom Imports
import { Heading, SubHeading } from "../../components/Heading";
// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { PiShootingStarThin } from "react-icons/pi";
import { useSearchListingsQuery } from "../../redux/api/listingApiSlice";
import OverlayLoader from "../../components/Spinner/OverlayLoader";
// React Icons
import { FaLocationDot } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { thousandSeparatorNumber } from "../../utils";

const iconStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  color: "#334155",
  fontWeight: "bold",
  fontSize: "13px",
};

const images = [
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Home = () => {
  const navigate = useNavigate();
  SwiperCore.use([Navigation]);

  const offerString = "offer=true&limit=4";
  const rentString = "type=rent&limit=4";
  const saleString = "type=sale&limit=4";

  const { data: offerData, isLoading: offerLoading } =
    useSearchListingsQuery(offerString);

  const { data: rentData, isLoading: rentLoading } =
    useSearchListingsQuery(rentString);

  const { data: saleData, isLoading: saleLoading } =
    useSearchListingsQuery(saleString);

  return (
    <Box sx={{ margin: "100px 0 0 0" }}>
      {(offerLoading || rentLoading || saleLoading) && <OverlayLoader />}
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Heading sx={{ fontSize: "45px", color: "#334155" }}>
            Find your next <span style={{ color: "#64748b" }}>Perfect</span>
          </Heading>
          <Heading sx={{ fontSize: "45px", color: "#334155" }}>
            place with ease
          </Heading>
          <SubHeading sx={{ margin: "20px 0", color: "#64748b" }}>
            RealEstate will help you find your home fast, easy and comfortable.
            <br />
            Our expert support are always available.
          </SubHeading>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginTop: "25px",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => {
              navigate("/search");
            }}
          >
            <PiShootingStarThin size={25} color="#103e4b" /> Let's Start now...
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              width: "100%",
              height: "350px",
              borderRadius: "5px",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1618219788702-20a1ef509691?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="listing"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={2}></Grid>
      </Grid>

      <Grid container sx={{ margin: "75px 0" }}>
        <Grid item xs={12}>
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
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginBottom: "100px" }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Heading sx={{ color: "#475569" }}>Recent Offer</Heading>
          <Box
            sx={{
              color: "#1e40af",
              fontSize: "13px",
              fontWeight: 400,
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => {
              navigate(`/search?offer=true`);
            }}
          >
            Show more offers
          </Box>
          <Box sx={{ margin: "15px 0" }}>
            <Grid container spacing={2}>
              {offerData?.data?.map((item: any, index: number) => (
                <Grid item xs={4} key={index}>
                  <Box
                    sx={{
                      background: "#fff",
                      borderRadius: "5px",
                      // width: "340px",
                      marginBottom: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(`/listing/${item._id}`);
                    }}
                  >
                    <Box
                      sx={{
                        height: "200px",
                        overflow: "hidden",
                        position: "relative",
                        "&:hover img": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <img
                        src={item?.imageUrls[0]}
                        alt="listing"
                        height="100%"
                        width="100%"
                        style={{
                          objectFit: "cover",
                          borderRadius: "5px",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </Box>
                    <Box sx={{ padding: "20px 15px" }}>
                      <SubHeading
                        sx={{
                          fontWeight: 600,
                          fontSize: "18px",
                          color: "#334155",
                        }}
                      >
                        {item?.name?.length > 30
                          ? item?.name?.substring(0, 30) + "..."
                          : item?.name}
                      </SubHeading>
                      <Box
                        sx={{
                          marginTop: "5px",
                          color: "#4b5563",
                          fontSize: "13px",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <FaLocationDot style={{ color: "#15803d" }} />
                        {item?.address}
                      </Box>
                      <Box
                        sx={{
                          marginTop: "5px",
                          color: "#4b5563",
                          fontSize: "13px",
                          height: "55px",
                        }}
                      >
                        {item?.description?.length > 150
                          ? item?.description?.substring(0, 150) + "..."
                          : item?.description}
                      </Box>
                      <Box
                        sx={{
                          color: "#64748b",
                          fontWeight: 600,
                          fontSize: "16px",
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "5px",
                        }}
                      >
                        Rs.{" "}
                        {thousandSeparatorNumber(
                          item?.regularPrice - item?.discountedPrice
                        )}{" "}
                        {item?.type === "rent" ? "/ month" : ""}
                        <Box>
                          {item?.type === "rent" ? (
                            <Box
                              sx={{
                                background: "#0078a5",
                                fontSize: "12px",
                                color: "#fff",
                                borderRadius: "50%",
                                padding: "5px 10px",
                                display: "inline-block",
                              }}
                            >
                              Rent
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                background: "#7fb742",
                                fontSize: "12px",
                                color: "#fff",
                                borderRadius: "50%",
                                padding: "5px 10px",
                                display: "inline-block",
                              }}
                            >
                              Sale
                            </Box>
                          )}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          marginTop: "7px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Box sx={iconStyle}>
                            <FaBed
                              style={{ color: "#334155", marginTop: "3px" }}
                            />
                            {item?.bedrooms} Beds
                          </Box>
                          <Box sx={iconStyle}>
                            <FaBath
                              style={{ color: "#334155", marginTop: "3px" }}
                            />
                            {item?.bathrooms} Baths
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* Rent Data */}
          <Heading sx={{ color: "#475569", marginTop: "20px" }}>
            Places for Rent
          </Heading>
          <Box
            sx={{
              color: "#1e40af",
              fontSize: "13px",
              fontWeight: 400,
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => {
              navigate(`/search?type=rent`);
            }}
          >
            Show more offers for rent
          </Box>
          <Box sx={{ margin: "15px 0" }}>
            <Grid container spacing={2}>
              {rentData?.data?.map((item: any, index: number) => (
                <Grid item xs={4} key={index}>
                  <Box
                    sx={{
                      background: "#fff",
                      borderRadius: "5px",
                      marginBottom: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(`/listing/${item._id}`);
                    }}
                  >
                    <Box
                      sx={{
                        height: "200px",
                        overflow: "hidden",
                        position: "relative",
                        "&:hover img": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <img
                        src={item?.imageUrls[0]}
                        alt="listing"
                        height="100%"
                        width="100%"
                        style={{
                          objectFit: "cover",
                          borderRadius: "5px",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </Box>
                    <Box sx={{ padding: "20px 15px" }}>
                      <SubHeading
                        sx={{
                          fontWeight: 600,
                          fontSize: "18px",
                          color: "#334155",
                        }}
                      >
                        {item?.name?.length > 30
                          ? item?.name?.substring(0, 30) + "..."
                          : item?.name}
                      </SubHeading>
                      <Box
                        sx={{
                          marginTop: "5px",
                          color: "#4b5563",
                          fontSize: "13px",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <FaLocationDot style={{ color: "#15803d" }} />
                        {item?.address}
                      </Box>
                      <Box
                        sx={{
                          marginTop: "5px",
                          color: "#4b5563",
                          fontSize: "13px",
                          height: "55px",
                        }}
                      >
                        {item?.description?.length > 150
                          ? item?.description?.substring(0, 150) + "..."
                          : item?.description}
                      </Box>
                      <Box
                        sx={{
                          color: "#64748b",
                          fontWeight: 600,
                          fontSize: "16px",
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "5px",
                        }}
                      >
                        Rs. {thousandSeparatorNumber(item?.regularPrice)}{" "}
                        {item?.type === "rent" ? "/ month" : ""}
                        <Box>
                          {item?.type === "rent" ? (
                            <Box
                              sx={{
                                background: "#0078a5",
                                fontSize: "12px",
                                color: "#fff",
                                borderRadius: "50%",
                                padding: "5px 10px",
                                display: "inline-block",
                              }}
                            >
                              Rent
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                background: "#7fb742",
                                fontSize: "12px",
                                color: "#fff",
                                borderRadius: "50%",
                                padding: "5px 10px",
                                display: "inline-block",
                              }}
                            >
                              Sale
                            </Box>
                          )}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          marginTop: "7px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Box sx={iconStyle}>
                            <FaBed
                              style={{ color: "#334155", marginTop: "3px" }}
                            />
                            {item?.bedrooms} Beds
                          </Box>
                          <Box sx={iconStyle}>
                            <FaBath
                              style={{ color: "#334155", marginTop: "3px" }}
                            />
                            {item?.bathrooms} Baths
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* Sale Data */}
          <Heading sx={{ color: "#475569", marginTop: "20px" }}>
            Places for Sale
          </Heading>
          <Box
            sx={{
              color: "#1e40af",
              fontSize: "13px",
              fontWeight: 400,
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => {
              navigate(`/search?type=sale`);
            }}
          >
            Show more offers for sale
          </Box>
          <Box sx={{ margin: "15px 0" }}>
            <Grid container spacing={2}>
              {saleData?.data?.map((item: any, index: number) => (
                <Grid item xs={4} key={index}>
                  <Box
                    sx={{
                      background: "#fff",
                      borderRadius: "5px",
                      marginBottom: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(`/listing/${item._id}`);
                    }}
                  >
                    <Box
                      sx={{
                        height: "200px",
                        overflow: "hidden",
                        position: "relative",
                        "&:hover img": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <img
                        src={item?.imageUrls[0]}
                        alt="listing"
                        height="100%"
                        width="100%"
                        style={{
                          objectFit: "cover",
                          borderRadius: "5px",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </Box>
                    <Box sx={{ padding: "20px 15px" }}>
                      <SubHeading
                        sx={{
                          fontWeight: 600,
                          fontSize: "18px",
                          color: "#334155",
                        }}
                      >
                        {item?.name?.length > 30
                          ? item?.name?.substring(0, 30) + "..."
                          : item?.name}
                      </SubHeading>
                      <Box
                        sx={{
                          marginTop: "5px",
                          color: "#4b5563",
                          fontSize: "13px",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <FaLocationDot style={{ color: "#15803d" }} />
                        {item?.address}
                      </Box>
                      <Box
                        sx={{
                          marginTop: "5px",
                          color: "#4b5563",
                          fontSize: "13px",
                          height: "55px",
                        }}
                      >
                        {item?.description?.length > 150
                          ? item?.description?.substring(0, 150) + "..."
                          : item?.description}
                      </Box>
                      <Box
                        sx={{
                          color: "#64748b",
                          fontWeight: 600,
                          fontSize: "16px",
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "5px",
                        }}
                      >
                        Rs. {thousandSeparatorNumber(item?.regularPrice)}{" "}
                        {item?.type === "rent" ? "/ month" : ""}
                        <Box>
                          {item?.type === "rent" ? (
                            <Box
                              sx={{
                                background: "#0078a5",
                                fontSize: "12px",
                                color: "#fff",
                                borderRadius: "50%",
                                padding: "5px 10px",
                                display: "inline-block",
                              }}
                            >
                              Rent
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                background: "#7fb742",
                                fontSize: "12px",
                                color: "#fff",
                                borderRadius: "50%",
                                padding: "5px 10px",
                                display: "inline-block",
                              }}
                            >
                              Sale
                            </Box>
                          )}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          marginTop: "7px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Box sx={iconStyle}>
                            <FaBed
                              style={{ color: "#334155", marginTop: "3px" }}
                            />
                            {item?.bedrooms} Beds
                          </Box>
                          <Box sx={iconStyle}>
                            <FaBath
                              style={{ color: "#334155", marginTop: "3px" }}
                            />
                            {item?.bathrooms} Baths
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </Box>
  );
};

export default Home;
