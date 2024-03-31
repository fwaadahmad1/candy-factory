import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addSettingsSlice = createApi({
  reducerPath: "addSettings",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["AddSettings"],
  endpoints: (builder) => ({
    getAddSettings: builder.query({
      query: () => "/setting",
      providesTags: [
        {
          type: "AddSettings",
          id: "addSettings",
        },
      ],
    }),
    addAddSettings: builder.mutation({
      query: (candyData) => {
        return {
          url: "/setting",
          method: "POST",
          body: candyData,
        };
      },
      invalidatesTags: [
        {
          type: "AddSettings",
          id: "addSettings",
        },
      ],
    }),
  }),
});

export const { useGetAddSettingsQuery, useAddAddSettingsMutation } =
  addSettingsSlice;

export const addSettingsReducer = addSettingsSlice.reducer;
