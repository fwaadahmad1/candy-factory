import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const assemblyLineSlice = createApi({
  reducerPath: "candyType",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000",
  }),
  tagTypes: ["AssemblyLine"],
  endpoints: (builder) => ({
    getAssemblyLine: builder.query({
      query: () => "/assembly_line",
      providesTags: [{ type: "AssemblyLine", id: "assemblyLine" }],
    }),
    addAssemblyLine: builder.mutation({
        query: (candyData) => {
          console.log(candyData);
          return {
            url: "/assembly_line",
            method: "POST",
            body: candyData,
          };
        },
        invalidatesTags: [
          { type: "AssemblyLine", id: "assemblyLine" },
        ],
      }),
  }),
});

export const {
  useAddAssemblyLineMutation,
  useGetAssemblyLineQuery,
} = assemblyLineSlice;

export const candyTypeReducer = assemblyLineSlice.reducer;
