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
      providesTags: [{ type: "Ingredient", id: "ingredient" }],
    }),
    addIngredient: builder.mutation({
        query: (candyData) => {
          console.log(candyData);
          return {
            url: "/ingredient",
            method: "POST",
            body: candyData,
          };
        },
        invalidatesTags: [
          { type: "Ingredient", id: "ingredient" },
        ],
      }),
  }),
});

export const {
  useAddIngredientMutation,
  useGetIngredientQuery,
} = ingredientSlice;

export const ingredientReducer = ingredientSlice.reducer;
