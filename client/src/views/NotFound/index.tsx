// React Imports
import { useNavigate } from "react-router-dom";
// React Icons
import { FaExclamationTriangle } from "react-icons/fa";
// MUI Imports
import { Box, Button } from "@mui/material";
// Component Imports
import { SubHeading } from "../../components/Heading";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "75vh",
      }}
    >
      <Box sx={{ width: "300px", textAlign: "center" }}>
        <FaExclamationTriangle style={{ color: "#64748b", fontSize: "5em" }} />
        <h1>404</h1>
        <SubHeading sx={{ marginBottom: "30px" }}>
          Sorry, this page does not exist
        </SubHeading>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
