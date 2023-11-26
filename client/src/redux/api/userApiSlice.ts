import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
        console.log("data", data);
        return {
          url: `users/delete/${data}`,
          method: "DELETE",
          body: data,
        };
      },
    }),
  }),
});

export const { useUpdateMutation, useDeleteMutation } = userApiSlice;