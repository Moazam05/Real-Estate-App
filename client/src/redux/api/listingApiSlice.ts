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
    getSingleListing: builder.query({
      query: (listingId) => {
        return {
          url: `listings/listing/${listingId}`,
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
    updateListing: builder.mutation({
      query: (data) => {
        return {
          url: `listings/${data.id}`,
          method: "PUT",
          body: data.payload,
        };
      },
      invalidatesTags: ["Listing"],
    }),
    searchListings: builder.query({
      query: (searchTerm) => {
        return {
          url: `listings/get/${searchTerm?.searchQuery}`,
          method: "GET",
        };
      },
      providesTags: ["Listing"],
    }),
  }),
});

export const {
  useCreateListingMutation,
  useGetListingQuery,
  useDeleteListingMutation,
  useUpdateListingMutation,
  useGetSingleListingQuery,
  useSearchListingsQuery,
} = listingApiSlice;
