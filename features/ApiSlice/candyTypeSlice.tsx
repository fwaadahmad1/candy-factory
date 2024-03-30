import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/constants";
import { CandySchema } from "@/app/candytype/page";

export const candyTypeSlice = createApi({
  reducerPath: "candyType",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["CandyType"],
  endpoints: (builder) => ({
    getCandyType: builder.query<CandySchema[], any>({
      query: () => "/candy",
      providesTags: [
        {
          type: "CandyType",
          id: "candyType",
        },
      ],
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
        {
          type: "CandyType",
          id: "candyType",
        },
      ],
    }),
    deleteCandyType: builder.mutation({
      query: (candyData: CandySchema) => {
        return {
          url: `candy/delete/${candyData.name}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [
        {
          type: "CandyType",
          id: "candyType",
        },
      ],
    }),
  }),
});

export const {
  useAddCandyTypeMutation,
  useGetCandyTypeQuery,
  useDeleteCandyTypeMutation,
} = candyTypeSlice;

export const candyTypeReducer = candyTypeSlice.reducer;
