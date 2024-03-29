import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/constants";
import { OrderData } from "@/app/orders/page";

export const orderSlice = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query<Array<OrderData>, any>({
      query: () => "/order",
      providesTags: [
        {
          type: "Orders",
          id: "orderItem",
        },
      ],
    }),
    addOrders: builder.mutation({
      query: (orderData) => {
        return {
          url: "/order",
          method: "POST",
          body: orderData,
        };
      },
      invalidatesTags: [
        {
          type: "Orders",
          id: "orderItem",
        },
      ],
    }),
  }),
});

export const { useGetOrdersQuery, useAddOrdersMutation } = orderSlice;

export const orderReducer = orderSlice.reducer;
