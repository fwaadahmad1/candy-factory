
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/constants";
export const assemblyLineSlice = createApi({
  reducerPath: "assemblyLine",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["AssemblyLine"],
  endpoints: (builder) => ({
    getAssemblyLine: builder.query({
      query: () => "/assembly_line",
      providesTags: [{ type: "AssemblyLine", id: "assemblyLine" }],
    }),
    getAssemblyLineSuggestions: builder.query({
      query: ({candyName}) => `/assembly_line/suggestion/${candyName}`,
      providesTags: [{ type: "AssemblyLine", id: "assemblyLineSuggestion" }],
    }),
    addCandyToAssemblyLine: builder.mutation({
      query: ({assemblyLine , candyType}) => {
        console.log(assemblyLine , candyType);
        return {
          url: `/assembly_line/start/${assemblyLine}/${candyType}`,
          method: "PUT",
          body: {},
        };
      },
      invalidatesTags: [
        { type: "AssemblyLine", id: "assemblyLine" },
        { type: "AssemblyLine", id: "assemblyLineSuggestion" }
      ],
    }),
    addStopAssemblyLine: builder.mutation({
      query: (assemblyLine) => {
        
        return {
          url: `/assembly_line/stop/${assemblyLine}`,
          method: "PUT",
          body: {},
        };
        
      },
      invalidatesTags: [
        { type: "AssemblyLine", id: "assemblyLine" },
        { type: "AssemblyLine", id: "assemblyLineSuggestion" }
      ],
    }),
  }),
});

export const {
  useGetAssemblyLineQuery,
  useGetAssemblyLineSuggestionsQuery,
  useAddCandyToAssemblyLineMutation,
  useAddStopAssemblyLineMutation
} = assemblyLineSlice;

export const assemblyLineReducer = assemblyLineSlice.reducer;
