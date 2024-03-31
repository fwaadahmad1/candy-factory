import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/constants";
import { AssemblyLineSchema } from "@/app/production/inLine/page";

export const assemblyLineSlice = createApi({
  reducerPath: "assemblyLine",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["AssemblyLine"],
  endpoints: (builder) => ({
    getAssemblyLine: builder.query<Array<AssemblyLineSchema>, any>({
      query: () => "/assembly_line",
      providesTags: [
        {
          type: "AssemblyLine",
          id: "assemblyLine",
        },
      ],
    }),
    getAssemblyLineTimeStamp: builder.query({
      query: ({ assemblyLine }) => `/assembly_line/${assemblyLine}`,
      providesTags: [
        {
          type: "AssemblyLine",
          id: "assemblyLine",
        },
      ],
    }),
    getAssemblyLineSuggestions: builder.query({
      query: ({ candyName }) => `/assembly_line/suggestion/${candyName}`,
      providesTags: [
        {
          type: "AssemblyLine",
          id: "assemblyLineSuggestion",
        },
      ],
    }),
    addAssemblyLine: builder.mutation({
      query: (name: string) => {
        return {
          url: "/assembly_line",
          method: "POST",
          body: {
            name,
          },
        };
      },
      invalidatesTags: [
        {
          type: "AssemblyLine",
          id: "assemblyLine",
        },
      ],
    }),
    addCandyToAssemblyLine: builder.mutation({
      query: ({ assemblyLine, candyType, order }) => {
        return {
          url: `/assembly_line/start/${assemblyLine}/${candyType}/${Number(
            order,
          )}`,
          method: "PUT",
          body: {},
        };
      },
      invalidatesTags: [
        {
          type: "AssemblyLine",
          id: "assemblyLine",
        },
        {
          type: "AssemblyLine",
          id: "assemblyLineSuggestion",
        },
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
        {
          type: "AssemblyLine",
          id: "assemblyLine",
        },
        {
          type: "AssemblyLine",
          id: "assemblyLineSuggestion",
        },
      ],
    }),
  }),
});

export const {
  useGetAssemblyLineQuery,
  useGetAssemblyLineSuggestionsQuery,
  useAddAssemblyLineMutation,
  useAddCandyToAssemblyLineMutation,
  useAddStopAssemblyLineMutation,
  useGetAssemblyLineTimeStampQuery,
} = assemblyLineSlice;

export const assemblyLineReducer = assemblyLineSlice.reducer;
