import * as Yup from "yup";

export const listingSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").nullable(),
  description: Yup.string().required("Description is required").nullable(),
  address: Yup.string().required("Address is required").nullable(),
  regularPrice: Yup.number()
    .required("Regular price is required")
    .nullable()
    .positive("Regular price must be greater than 0"),
  discountedPrice: Yup.mixed()
    .nullable()
    .when("regularPrice", (regularPrice, schema) => {
      return schema.test({
        test: (discountedPrice) => {
          return discountedPrice == null || discountedPrice <= regularPrice;
        },
        message: "Less than or equal to Regular Price",
      });
    }),
  bathrooms: Yup.number()
    .required("Bathrooms is required")
    .nullable()
    .positive("Bathrooms must be greater than 0"),
  bedrooms: Yup.number()
    .required("Bedrooms is required")
    .nullable()
    .positive("Bedrooms must be greater than 0"),
  furnished: Yup.boolean().required("Furnished is required").nullable(),
  parking: Yup.boolean().required("Parking is required").nullable(),
  type: Yup.string().required("Type is required").nullable(),
  offer: Yup.boolean().required("Offer is required").nullable(),
  files: Yup.array()
    .min(2, "At least 2 image is required")
    .max(6, "Maximum 6 images allowed"),
});
