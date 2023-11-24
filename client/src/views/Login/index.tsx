// React Imports
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Material UI Imports
import { Box, Grid, Button } from "@mui/material";
// React Icons
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa";
// Formik Imports
import { Form, Formik, FormikProps } from "formik";
// Utils Imports
import { onKeyDown } from "../../utils";
// Redux Imports
import { useLoginMutation } from "../../redux/api/authApiSlice";
import { setUser } from "../../redux/auth/authSlice";
// Component Imports
import { Heading, SubHeading } from "../../components/Heading";
import DotLoader from "../../components/Spinner/dotLoader";
import { loginSchema } from "./components/validationSchema";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import ToastAlert from "../../components/ToastAlert/ToastAlert";

interface ISLoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formValues, setFormValues] = useState<ISLoginForm>({
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

  // Sign Up Api Bind
  const [loginUser, { isLoading }] = useLoginMutation();

  const LoginHandler = async (data: ISLoginForm) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    try {
      const user: any = await loginUser(payload);

      if (user?.data?.status) {
        dispatch(setUser(user?.data));
        localStorage.setItem("user", JSON.stringify(user?.data));
        navigate("/");
      }
      if (user?.error) {
        setToast({
          ...toast,
          message: user?.error?.data?.message,
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      console.error("SignUp Error:", error);
      setToast({
        ...toast,
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  return (
    <Box sx={{ margin: "60px 0" }}>
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
            <Heading sx={{ fontSize: "30px" }}>Login</Heading>
            <Box sx={{ width: "100%" }}>
              <Formik
                initialValues={formValues}
                onSubmit={(values: ISLoginForm) => {
                  LoginHandler(values);
                }}
                validationSchema={loginSchema}
              >
                {(props: FormikProps<ISLoginForm>) => {
                  const { values, touched, errors, handleBlur, handleChange } =
                    props;

                  return (
                    <Form onKeyDown={onKeyDown}>
                      <Box sx={{ height: "95px", marginTop: "20px" }}>
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
                          marginTop: "20px",
                        }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          disabled={isLoading}
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
                          {isLoading ? (
                            <DotLoader color="#fff" size={12} />
                          ) : (
                            "Login"
                          )}
                        </Button>
                      </Box>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          padding: "5px 30px",
                          textTransform: "capitalize",
                          margin: "10px 0 20px 0",
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
                            navigate("/signup");
                          }}
                        >
                          Sign Up
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

export default Login;
