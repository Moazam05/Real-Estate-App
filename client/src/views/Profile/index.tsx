// React Imports
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// Formik Imports
import { Form, Formik, FormikProps } from "formik";
// Component Imports
import { Heading, SubHeading } from "../../components/Heading";
import { signUpSchema } from "../SignUp/components/validationSchema";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import ToastAlert from "../../components/ToastAlert/ToastAlert";
import DotLoader from "../../components/Spinner/dotLoader";
// Utils Imports
import { onKeyDown } from "../../utils";
// Hooks Imports
import useTypedSelector from "../../hooks/useTypedSelector";
// React Icons
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { MdOutlineDeleteSweep } from "react-icons/md";
// Firebase Storage
import {
  getStorage,
  ref,
  getDownloadURL,
  UploadTask,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
// Redux Imports
import {
  useDeleteMutation,
  useUpdateMutation,
} from "../../redux/api/userApiSlice";
import {
  selectedUserAvatar,
  selectedUserName,
  selectedUserEmail,
  setUser,
  selectedUserId,
} from "../../redux/auth/authSlice";
// MUI Imports
import { Box, Grid, Button, Tooltip } from "@mui/material";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement | null | any>(null);

  const userName = useTypedSelector(selectedUserName);
  const userEmail = useTypedSelector(selectedUserEmail);
  const userAvatar = useTypedSelector(selectedUserAvatar);
  const userId = useTypedSelector(selectedUserId);

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
      setToast({
        ...toast,
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  const hideShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  // Update Profile API bind
  const [updateProfile, { isLoading }] = useUpdateMutation();

  const ProfileHandler = async (data: ISProfileForm) => {
    const payload = {
      username: data.userName,
      email: data.email,
      password: data.password,
      avatar: formData.avatar || userAvatar,
    };

    try {
      const user: any = await updateProfile({
        id: userId,
        payload,
      });
      if (user?.data?.status) {
        setToast({
          ...toast,
          message: "User Updated Successfully",
          appearence: true,
          type: "success",
        });
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
      console.error("Profile Upload Error:", error);
      setToast({
        ...toast,
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  // Delete Account API bind
  const [deleteAccount, { isLoading: deleteLoading }] = useDeleteMutation();

  const deleteHandler = async () => {
    try {
      const user: any = await deleteAccount(userId);
      if (user?.data === null) {
        setToast({
          ...toast,
          message: "Account Deleted Successfully",
          appearence: true,
          type: "success",
        });
        dispatch(setUser(null));
        localStorage.removeItem("user");
        navigate("/login");
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
      console.error("Delete Account Error:", error);
      setToast({
        ...toast,
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

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
                            "Update"
                          )}
                        </Button>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <Button
                          sx={{
                            textTransform: "capitalize",
                          }}
                          variant="outlined"
                          color="error"
                          disabled={deleteLoading}
                          startIcon={<MdOutlineDeleteSweep />}
                          onClick={deleteHandler}
                        >
                          Delete Account
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
