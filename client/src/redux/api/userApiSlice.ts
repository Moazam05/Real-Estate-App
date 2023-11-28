import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => {
        return {
          url: `users/${userId}`,
          method: "GET",
        };
      },
    }),
    update: builder.mutation({
      query: (data) => {
        return {
          url: `users/update/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
    }),
    delete: builder.mutation({
      query: (data) => {
        return {
          url: `users/delete/${data}`,
          method: "DELETE",
          body: data,
        };
      },
    }),
  }),
});

export const { useUpdateMutation, useDeleteMutation, useGetUserQuery } =
  userApiSlice;
