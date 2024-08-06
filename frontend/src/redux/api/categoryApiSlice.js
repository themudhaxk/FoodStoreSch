import {apiSlice} from "./apiSlice"
import { CATEGORY_URL } from "../constants"

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: `${CATEGORY_URL}`,
                method: "POST",
                body: newCategory,
            })
        }),
        
        updateCategory: builder.mutation({
            query: ({ categoryId, updatedCategory }) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: "PUT",  
                body: updatedCategory,
            })
        }),

        removeCategory: builder.mutation({
            query: (categoryId) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: "DELETE",
            })
        }),

        fetchCategories: builder.query({
            query: () =>  `${CATEGORY_URL}/categories`,
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
})

export const {
    useCreateCategoryMutation,
    useFetchCategoriesQuery,
    useUpdateCategoryMutation,
    useRemoveCategoryMutation,
    useReadCategoryQuery,
    useProductCategoryQuery
} = categoryApiSlice