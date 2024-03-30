import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/constants";

export const ingredientSlice = createApi({
  reducerPath: "ingredient",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["Ingredient"],
  endpoints: (builder) => ({
    getIngredient: builder.query({
      query: () => "/ingredient",
      providesTags: [
        {
          type: "Ingredient",
          id: "ingredient",
        },
      ],
    }),
    addIngredient: builder.mutation({
      query: (candyData) => {
        return {
          url: "/ingredient",
          method: "POST",
          body: candyData,
        };
      },
      invalidatesTags: [
        {
          type: "Ingredient",
          id: "ingredient",
        },
      ],
    }),
    updateIngredient: builder.mutation({
      query: (ingredientData) => {
        return {
          url: `/ingredient/update/${ingredientData.name}`,
          method: "PUT",
          body: ingredientData,
        };
      },
      invalidatesTags: [
        {
          type: "Ingredient",
          id: "ingredient",
        },
      ],
    }),
  }),
});

export const {
  useAddIngredientMutation,
  useGetIngredientQuery,
  useUpdateIngredientMutation,
} = ingredientSlice;

export const ingredientReducer = ingredientSlice.reducer;
