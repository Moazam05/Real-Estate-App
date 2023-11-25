// React Imports
import { useState, useRef, useEffect } from "react";
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
import {
  getStorage,
  ref,
  getDownloadURL,
  UploadTask,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

interface ISProfileForm {
  userName: string;
  email: string;
  password: string;
}

// Firebase Storage
// allow read;
// allow write: if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches('image/.*')

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null | any>(null);

  const userName = useTypedSelector(selectedUserName);
  const userEmail = useTypedSelector(selectedUserEmail);
  const userAvatar = useTypedSelector(selectedUserAvatar);

  // states
  const [file, setFile] = useState<File | null>(null);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [filePercentage, setFilePercentage] = useState(0);
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

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleFileUpload = async (file: File) => {
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

      // Attach event handlers using the task method
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setFilePercentage(progress);
        },
        (error) => {
          // Error function
          console.error(error);
          setFileUploadError(true);
        },
        async () => {
          // complete function
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setFormData({ ...formData, avatar: downloadURL });
            setFile(null);
          } catch (error) {
            // Handle any errors during getDownloadURL
            console.error(error);
          }
        }
      );
    } catch (error) {
      // Handle any errors in the try block
      console.error("File Upload Error", error);
    }
  };

  const hideShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  console.log(formData.avatar);

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
            <Tooltip title="Upload Image" placement="right">
              <Box sx={{ marginTop: "30px", cursor: "pointer" }}>
                <input
                  onChange={(e) => {
                    if (e.target.files) {
                      setFile(e.target.files[0]);
                    }
                  }}
                  hidden
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  name=""
                  id=""
                />
                <img
                  onClick={() => fileRef.current.click()}
                  height={95}
                  width={95}
                  src={formData.avatar || userAvatar}
                  alt="user"
                  style={{ borderRadius: "50%" }}
                />
              </Box>
            </Tooltip>
            <Box sx={{ marginTop: "7px" }}>
              {fileUploadError ? (
                <Box sx={{ color: "#d32f2f", fontWeight: 400 }}>
                  File Upload Error
                  <span style={{ marginLeft: "3px" }}>
                    (Image be less than 2Mb)
                  </span>
                </Box>
              ) : filePercentage > 0 && filePercentage < 100 ? (
                <Box
                  sx={{ color: "#334155", fontweight: 400 }}
                >{`Uploading ${filePercentage}%`}</Box>
              ) : filePercentage === 100 ? (
                <Box sx={{ color: "#1db45a", fontWeight: 500 }}>
                  Image Successfully Uploaded!
                </Box>
              ) : (
                ""
              )}
            </Box>

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
                            padding: "5px 20px",
                            textTransform: "capitalize",
                            cursor: "pointer",
                          }}
                          startIcon={
                            <IoLogOutOutline style={{ fontSize: "18px" }} />
                          }
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
