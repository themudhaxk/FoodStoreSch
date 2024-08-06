import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";
import axios from "axios";

// Create an Axios instance with withCredentials set to true
const axiosInstance = axios.create({
  withCredentials: true,
});

// Inject the Axios instance into the apiSlice
export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: newCategory,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: updatedCategory,
      }),
    }),
    removeCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
    }),
    fetchCategories: builder.query({
      query: () => `${CATEGORY_URL}/categories`,
    }),
    readCategory: builder.query({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
      }),
    }),
    productCategory: builder.query({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/categories/${categoryId}/products`,
      }),
    }),
  }),
  // Use the Axios instance for API requests
  axiosBaseQuery: (config) => axiosInstance(config),
});

export const {
  useCreateCategoryMutation,
  useFetchCategoriesQuery,
  useUpdateCategoryMutation,
  useRemoveCategoryMutation,
  useReadCategoryQuery,
  useProductCategoryQuery,
} = categoryApiSlice;
