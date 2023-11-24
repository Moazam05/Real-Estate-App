// React Imports
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// MUI Imports
import { Box, Grid, Button, Tooltip } from "@mui/material";
// React Icons
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
// Formik Imports
import { Form, Formik, FormikProps } from "formik";
import { Heading, SubHeading } from "../../components/Heading";
import { signUpSchema } from "../SignUp/components/validationSchema";
import { onKeyDown } from "../../utils";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
// import DotLoader from "../../components/Spinner/dotLoader";
import ToastAlert from "../../components/ToastAlert/ToastAlert";
import useTypedSelector from "../../hooks/useTypedSelector";
import {
  selectedUserAvatar,
  selectedUserName,
  selectedUserEmail,
  setUser,
} from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";

interface ISProfileForm {
  userName: string;
  email: string;
  password: string;
}

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null | any>(null);

  const userName = useTypedSelector(selectedUserName);
  const userEmail = useTypedSelector(selectedUserEmail);
  const userAvatar = useTypedSelector(selectedUserAvatar);

  // states
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formValues, setFormValues] = useState<ISProfileForm>({
    userName,
    email: userEmail,
    password: "",
  });

  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const hideShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  const ProfileHandler = async (data: ISProfileForm) => {};

  return (
    <Box sx={{ margin: "50px 0 0 0" }}>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Heading sx={{ fontSize: "30px" }}>Profile</Heading>
            <Tooltip title="Upload Image">
              <Box sx={{ marginTop: "30px", cursor: "pointer" }}>
                <input
                  hidden
                  ref={fileRef}
                  type="file"
                  accept="*image"
                  name=""
                  id=""
                />
                <img
                  onClick={() => fileRef.current.click()}
                  height={95}
                  width={95}
                  src={userAvatar}
                  alt="user"
                />
              </Box>
            </Tooltip>
            <Box sx={{ width: "100%" }}>
              <Formik
                initialValues={formValues}
                onSubmit={(values: ISProfileForm) => {
                  ProfileHandler(values);
                }}
                validationSchema={signUpSchema}
              >
                {(props: FormikProps<ISProfileForm>) => {
                  const { values, touched, errors, handleBlur, handleChange } =
                    props;

                  return (
                    <Form onKeyDown={onKeyDown}>
                      <Box sx={{ height: "95px", marginTop: "20px" }}>
                        <SubHeading sx={{ marginBottom: "5px" }}>
                          User Name
                        </SubHeading>
                        <PrimaryInput
                          type="text"
                          label=""
                          name="userName"
                          placeholder="User Name"
                          value={values.userName}
                          helperText={
                            errors.userName && touched.userName
                              ? errors.userName
                              : ""
                          }
                          error={
                            errors.userName && touched.userName ? true : false
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Box>
                      <Box sx={{ height: "95px" }}>
                        <SubHeading sx={{ marginBottom: "5px" }}>
                          Email
                        </SubHeading>
                        <PrimaryInput
                          type="text"
                          label=""
                          name="email"
                          placeholder="Email"
                          value={values.email}
                          helperText={
                            errors.email && touched.email ? errors.email : ""
                          }
                          error={errors.email && touched.email ? true : false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Box>
                      <Box sx={{ height: "95px" }}>
                        <SubHeading sx={{ marginBottom: "5px" }}>
                          Password
                        </SubHeading>
                        <PrimaryInput
                          type={showPassword ? "text" : "password"}
                          label=""
                          name="password"
                          placeholder="Password"
                          value={values.password}
                          helperText={
                            errors.password && touched.password
                              ? errors.password
                              : ""
                          }
                          error={
                            errors.password && touched.password ? true : false
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onClick={hideShowPassword}
                          endAdornment={
                            showPassword ? (
                              <AiOutlineEye color="disabled" />
                            ) : (
                              <AiOutlineEyeInvisible color="disabled" />
                            )
                          }
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "end",
                          marginTop:
                            errors.password && touched.password
                              ? "25px"
                              : "10px",
                        }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          // disabled={isLoading}
                          sx={{
                            padding: "5px 30px",
                            textTransform: "capitalize",
                            margin: "0 0 20px 0",
                            background: "#334155",
                            height: "40px",
                            color: "#fff",
                            lineHeight: "0",
                            "&:hover": {
                              background: "#334155",
                            },
                          }}
                        >
                          {/* {isLoading ? (
                            <DotLoader color="#fff" size={12} />
                          ) : (
                            "Sign Up"
                          )} */}
                          Update
                        </Button>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <Button
                          variant="outlined"
                          color="error"
                          sx={{
                            padding: "5px 30px",
                            textTransform: "capitalize",
                            height: "35px",
                            lineHeight: "0",
                            cursor: "pointer",
                          }}
                          startIcon={<IoLogOutOutline />}
                          onClick={() => {
                            dispatch(setUser(null));
                            localStorage.removeItem("user");
                            navigate("/");
                          }}
                        >
                          Sign Out
                        </Button>
                      </Box>
                    </Form>
                  );
                }}
              </Formik>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}></Grid>
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

export default Profile;
