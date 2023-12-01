// MUI Imports
import { Box, Grid } from "@mui/material";
// Custom Imports
import { Heading, SubHeading } from "../../components/Heading";

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
              justifyContent: "center",
              alignItems: "center",
              margin: "80px 0 75px 0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "300px",
              }}
            >
              <Box sx={{ width: "75px", height: "75px" }}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/real-estate-54ca1.appspot.com/o/1701424117897salman%20passport.jpg?alt=media&token=a903aba6-b78e-4442-b0c0-f07c0dfa145f"
                  alt="salman"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </Box>
              <SubHeading sx={{ marginTop: "10px" }}>Salman Muazam</SubHeading>
              <Box>0323 4910955</Box>
              <Heading sx={{ fontSize: "14px", marginTop: "10px" }}>
                CEO
              </Heading>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "300px",
              }}
            >
              <Box sx={{ width: "75px", height: "75px" }}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/real-estate-54ca1.appspot.com/o/1701198186809Hassan.jpg?alt=media&token=881f2f1b-b0d4-4933-9b4a-79259d313f42"
                  alt="hassan"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </Box>
              <SubHeading sx={{ marginTop: "10px" }}>Hassan Raza</SubHeading>
              <Box>0300 0315440</Box>
              <Heading sx={{ fontSize: "14px", marginTop: "10px" }}>
                President
              </Heading>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "300px",
              }}
            >
              <Box sx={{ width: "75px", height: "75px" }}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/real-estate-54ca1.appspot.com/o/1701198124445Faizan.jpg?alt=media&token=560ccfc3-f5f4-430c-b55d-d6a0357c7be2"
                  alt="salman"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </Box>
              <SubHeading sx={{ marginTop: "10px" }}>Ch Faizan</SubHeading>
              <Box>0355 5032437</Box>
              <Heading sx={{ fontSize: "14px", marginTop: "10px" }}>
                Marketing Manager
              </Heading>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Box>
  );
};

export default About;
