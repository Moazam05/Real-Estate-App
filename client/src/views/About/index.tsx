// MUI Imports
import { Box, Grid } from "@mui/material";
// Custom Imports
import { Heading } from "../../components/Heading";

const About = () => {
  return (
    <Box sx={{ margin: "65px 0 0 0" }}>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Heading>About RealEstate</Heading>
          <Box sx={{ margin: "20px 0", color: "#334155", fontSize: "16px" }}>
            RealEstate is a leading real estate agency that specializes in
            helping clients buy, sell, and rent properties in the most desirable
            neighborhoods. Our team of experienced agents is dedicated to
            providing exceptional service and making the buying and selling
            process as smooth as possible.
            <br />
            <br />
            Our mission is to help our clients achieve their real estate goals
            by providing expert advice, personalized service, and a deep
            understanding of the local market. Whether you are looking to buy,
            sell, or rent a property, we are here to help you every step of the
            way.
            <br />
            <br />
            Our team of agents has a wealth of experience and knowledge in the
            real estate industry, and we are committed to providing the highest
            level of service to our clients. We believe that buying or selling a
            property should be an exciting and rewarding experience, and we are
            dedicated to making that a reality for each and every one of our
            clients.
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              color: "#49454F",
              margin: "5px 0",
            }}
          >
            CEO:{" "}
            <span style={{ fontWeight: 700, marginLeft: "5px" }}>
              Salman Muazam
            </span>
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Box>
  );
};

export default About;
