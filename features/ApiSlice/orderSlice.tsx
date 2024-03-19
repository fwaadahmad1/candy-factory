import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderSlice = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://15.206.80.216",

  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "/order",
      providesTags: [{ type: "Orders", id: "orderItem" }],
    }),
    addOrders: builder.mutation({
      query: (orderData) => {
        return {
          url: "/order",
          method: "POST",
          body: orderData,
        };
      },
      invalidatesTags: [{ type: "Orders", id: "orderItem" }],
    }),
  }),
});

export const { useGetOrdersQuery, useAddOrdersMutation } = orderSlice;

export const orderReducer = orderSlice.reducer;
