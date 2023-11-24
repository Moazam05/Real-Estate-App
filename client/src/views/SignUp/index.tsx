import { useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import { Heading, SubHeading } from "../../components/Heading";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
// Formik Imports
import { Form, Formik, FormikProps } from "formik";
import { onKeyDown } from "../../utils";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import ToastAlert from "../../components/ToastAlert/ToastAlert";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signUpSchema } from "./components/validationSchema";

interface ISSignUpForm {
  userName: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const navigate = useNavigate();

  // states
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formValues, setFormValues] = useState<ISSignUpForm>({
    userName: "",
    email: "",
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

  const SignUpHandler = async (data: ISSignUpForm) => {};
  return (
    <Box sx={{ margin: "75px 0" }}>
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
            <Heading sx={{ fontSize: "30px" }}>Sign Up</Heading>
            <Box sx={{ width: "100%" }}>
              <Formik
                initialValues={formValues}
                onSubmit={(values: ISSignUpForm) => {
                  SignUpHandler(values);
                }}
                validationSchema={signUpSchema}
              >
                {(props: FormikProps<ISSignUpForm>) => {
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
                            "&:hover": {
                              background: "#334155",
                            },
                          }}
                        >
                          {/* {isLoading ? "Login..." : "Login"} */}
                          Sign Up
                        </Button>
                      </Box>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          padding: "5px 30px",
                          textTransform: "capitalize",
                          margin: "5px 0 20px 0",
                          background: "#de4a39",
                          height: "40px",
                          color: "#fff",
                          "&:hover": {
                            background: "#de4a39",
                          },
                        }}
                        startIcon={<FaGoogle style={{ fontSize: "15px" }} />}
                        onClick={() => {
                          alert("Google");
                        }}
                      >
                        Continue With Google
                      </Button>
                      <Box
                        sx={{
                          margin: "0 0 10px 0",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Don't Have an account?
                        <Box
                          sx={{
                            marginLeft: "5px",
                            color: "#70b3f3",
                            fontWeight: 500,
                            cursor: "pointer",
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                          onClick={() => {
                            navigate("/login");
                          }}
                        >
                          Login
                        </Box>
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

export default SignUp;
