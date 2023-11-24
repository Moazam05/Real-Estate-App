// React Imports
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// React Icons
import { FaGoogle } from "react-icons/fa";
// MUI Imports
import { Button } from "@mui/material";
// Firebase Imports
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// Firebase Config
import { app } from "../../firebase";
// Redux
import { useGoogleLoginMutation } from "../../redux/api/authApiSlice";
import { setUser } from "../../redux/auth/authSlice";
// Custom Imports
import DotLoader from "../Spinner/dotLoader";

const GoogleOAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [google, { isLoading }] = useGoogleLoginMutation();

  const googleHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const res = await signInWithPopup(auth, provider);
      const payload = {
        name: res.user.displayName,
        email: res.user.email,
        photo: res.user.photoURL,
      };
      const user: any = await google(payload);
      dispatch(setUser(user.data));
      navigate("/");
      localStorage.setItem("user", JSON.stringify(user.data));
    } catch (error) {
      console.error("Google GoogleOAuth Error: ", error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        fullWidth
        disabled={isLoading}
        sx={{
          padding: "5px 30px",
          textTransform: "capitalize",
          margin: "5px 0 20px 0",
          background: "#de4a39",
          height: "40px",
          color: "#fff",
          lineHeight: "0",
          "&:hover": {
            background: "#de4a39",
          },
        }}
        startIcon={<FaGoogle style={{ fontSize: "15px" }} />}
        onClick={googleHandler}
      >
        {isLoading ? (
          <DotLoader color="#fff" size={12} />
        ) : (
          "Continue With Google"
        )}
      </Button>
    </>
  );
};

export default GoogleOAuth;
