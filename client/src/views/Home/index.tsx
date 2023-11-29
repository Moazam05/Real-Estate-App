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

const Home = () => {
  const navigate = useNavigate();
  SwiperCore.use([Navigation]);

  const images = [
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <Box sx={{ margin: "100px 0 0 0" }}>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Heading sx={{ fontSize: "45px", color: "#334155" }}>
            Find your next <span style={{ color: "#64748b" }}>perfect</span>
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
            }}
            onClick={() => {
              navigate("/search");
            }}
          >
            Let's Start now...
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
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Heading sx={{ color: "#475569" }}>Recent Offer</Heading>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Box>
  );
};

export default Home;
