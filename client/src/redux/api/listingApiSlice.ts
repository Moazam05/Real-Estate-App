import { apiSlice } from "./apiSlice";

export const listingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createListing: builder.mutation({
      query: (data) => {
        return {
          url: "listings",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Listing"],
    }),
    getListing: builder.query({
      query: (userId) => {
        return {
          url: `listings/${userId}`,
          method: "GET",
        };
      },
      providesTags: ["Listing"],
    }),
    deleteListing: builder.mutation({
      query: (listingId) => {
        return {
          url: `listings/${listingId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Listing"],
    }),
  }),
});

export const {
  useCreateListingMutation,
  useGetListingQuery,
  useDeleteListingMutation,
} = listingApiSlice;
