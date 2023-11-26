// React Imports
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Form, Formik, FormikProps } from "formik";
// MUI Imports
import {
  Box,
  Grid,
  Button,
  FormControlLabel,
  RadioGroup,
  Checkbox,
  Radio,
} from "@mui/material";
import { Heading, SubHeading } from "../../components/Heading";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import { onKeyDown } from "../../utils";
import { listingSchema } from "./components/validationSchema";

interface listingForm {
  name: string;
  description: string;
  address: string;
  regularPrice: number;
  discountedPrice: number;
  bathrooms: number;
  bedrooms: number;
  furnished: boolean;
  parking: boolean;
  type: string;
  offer: boolean;
  imageUrls: string[];
}

const CreateListing = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formValues, setFormValues] = useState<listingForm>({
    name: "",
    description: "",
    address: "",
    regularPrice: 25000,
    discountedPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    offer: false,
    type: "Rent",
    imageUrls: [],
  });

  const listingHandler = async (data: listingForm) => {
    console.log("payload", data);
  };

  return (
    <Box sx={{ marginTop: "50px" }}>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Heading>Create a Listing</Heading>
          </Box>
          <Box sx={{ margin: "30px 0", display: "flex", gap: 2 }}>
            <Formik
              initialValues={formValues}
              onSubmit={(values: listingForm) => {
                listingHandler(values);
              }}
              validationSchema={listingSchema}
            >
              {(props: FormikProps<listingForm>) => {
                const { values, touched, errors, handleBlur, handleChange } =
                  props;

                return (
                  <Form onKeyDown={onKeyDown} style={{ width: "100%" }}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            height:
                              errors.name && touched.name ? "95px" : "90px",
                          }}
                        >
                          <SubHeading sx={{ marginBottom: "5px" }}>
                            Name
                          </SubHeading>
                          <PrimaryInput
                            type="text"
                            label=""
                            name="name"
                            placeholder="Name"
                            value={values.name}
                            helperText={
                              errors.name && touched.name ? errors.name : ""
                            }
                            error={errors.name && touched.name ? true : false}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Box>
                        <Box>
                          <SubHeading sx={{ marginBottom: "5px" }}>
                            Description
                          </SubHeading>
                          <PrimaryInput
                            type="text"
                            label=""
                            name="description"
                            placeholder="Description"
                            multiline={true}
                            minRows={3}
                            value={values.description}
                            helperText={
                              errors.description && touched.description
                                ? errors.description
                                : ""
                            }
                            error={
                              errors.description && touched.description
                                ? true
                                : false
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Box>
                        <Box
                          sx={{
                            height: "85px",
                            marginTop:
                              errors.address && touched.address ? "0" : "15px",
                          }}
                        >
                          <SubHeading sx={{ marginBottom: "5px" }}>
                            Address
                          </SubHeading>
                          <PrimaryInput
                            type="text"
                            label=""
                            name="address"
                            placeholder="Address"
                            value={values.address}
                            helperText={
                              errors.address && touched.address
                                ? errors.address
                                : ""
                            }
                            error={
                              errors.address && touched.address ? true : false
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            width: "100%",
                            marginTop:
                              errors.address && touched.address ? "10px" : "",
                          }}
                        >
                          <Box sx={{ width: "100%" }}>
                            <SubHeading sx={{ marginBottom: "5px" }}>
                              Beds
                            </SubHeading>
                            <PrimaryInput
                              type="number"
                              label=""
                              name="bedrooms"
                              placeholder="Beds"
                              value={values.bedrooms}
                              helperText={
                                errors.bedrooms && touched.bedrooms
                                  ? errors.bedrooms
                                  : ""
                              }
                              error={
                                errors.bedrooms && touched.bedrooms
                                  ? true
                                  : false
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Box>
                          <Box sx={{ width: "100%" }}>
                            <SubHeading sx={{ marginBottom: "5px" }}>
                              Baths
                            </SubHeading>
                            <PrimaryInput
                              type="number"
                              label=""
                              name="bathrooms"
                              placeholder="Baths"
                              value={values.bathrooms}
                              helperText={
                                errors.bathrooms && touched.bathrooms
                                  ? errors.bathrooms
                                  : ""
                              }
                              error={
                                errors.bathrooms && touched.bathrooms
                                  ? true
                                  : false
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            width: "100%",
                            marginTop: "10px",
                          }}
                        >
                          <Box sx={{ width: "50%" }}>
                            <SubHeading sx={{ marginBottom: "5px" }}>
                              Regular Price{" "}
                              {values.type === "Rent" ? (
                                <span
                                  style={{
                                    marginLeft: "5px",
                                    fontSize: "12px",
                                  }}
                                >
                                  (Rs./ Month)
                                </span>
                              ) : (
                                <span
                                  style={{
                                    marginLeft: "5px",
                                    fontSize: "12px",
                                  }}
                                >
                                  (Rs.)
                                </span>
                              )}
                            </SubHeading>
                            <PrimaryInput
                              type="number"
                              label=""
                              name="regularPrice"
                              placeholder="Regular Price"
                              value={values.regularPrice}
                              helperText={
                                errors.regularPrice && touched.regularPrice
                                  ? errors.regularPrice
                                  : ""
                              }
                              error={
                                errors.regularPrice && touched.regularPrice
                                  ? true
                                  : false
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Box>
                          {values.offer && (
                            <Box sx={{ width: "50%" }}>
                              <SubHeading sx={{ marginBottom: "5px" }}>
                                Discounted Price
                              </SubHeading>

                              <PrimaryInput
                                type="number"
                                label=""
                                name="discountedPrice"
                                placeholder="Discounted Price"
                                value={values.discountedPrice}
                                helperText={
                                  errors.discountedPrice &&
                                  touched.discountedPrice
                                    ? errors.discountedPrice
                                    : ""
                                }
                                error={
                                  errors.discountedPrice &&
                                  touched.discountedPrice
                                    ? true
                                    : false
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Box>
                          )}
                        </Box>
                        <Box sx={{ marginTop: "7px" }}>
                          <RadioGroup
                            name="type"
                            value={values.type}
                            onChange={handleChange}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <FormControlLabel
                                value="Rent"
                                control={<Radio />}
                                label="Rent"
                              />
                              <FormControlLabel
                                value="Sell"
                                control={<Radio />}
                                label="Sell"
                              />
                            </Box>
                          </RadioGroup>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Parking Spot"
                              name="parking"
                              checked={values.parking}
                              onChange={handleChange}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Furnished"
                              name="furnished"
                              checked={values.furnished}
                              onChange={handleChange}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Offer"
                              name="offer"
                              checked={values.offer}
                              onChange={handleChange}
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ marginTop: "25px" }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "end",
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
                          "Update"
                        )} */}
                              Create Listing
                            </Button>
                          </Box>
                        </Box>
                      </Grid>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Box>
  );
};

export default CreateListing;
