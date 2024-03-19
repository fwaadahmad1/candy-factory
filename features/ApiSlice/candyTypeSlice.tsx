import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const candyTypeSlice = createApi({
  reducerPath: "candyType",
  baseQuery: fetchBaseQuery({

    baseUrl: "https://15.206.80.216",

  }),
  tagTypes: ["CandyType"],
  endpoints: (builder) => ({
    getCandyType: builder.query({
      query: () => "/candy",
      providesTags: [{ type: "CandyType", id: "candyType" }],
    }),
    addCandyType: builder.mutation({
        query: (candyData) => {
          console.log(candyData);
          return {
            url: "/candy",
            method: "POST",
            body: candyData,
          };
        },
        invalidatesTags: [
          { type: "CandyType", id: "candyType" },
        ],
      }),
  }),
});

export const {
  useAddCandyTypeMutation,
  useGetCandyTypeQuery,
} = candyTypeSlice;

export const candyTypeReducer = candyTypeSlice.reducer;
