import {apiSlice} from "./apiSlice"
import { PRODUCT_URL, UPLOAD_URL } from "../constants"

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (productData) => ({
                url: `${PRODUCT_URL}`,
                method: "POST",
                body: productData,
            }),
            invalidatesTags: ["Product"],
        }),

        updateProduct: builder.mutation({
            query: ({ productId, formData }) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "PUT",  
                body: formData,
            })
        }),

        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "DELETE",
            }),
            providesTags: ["Product"],
        }),

        getProducts: builder.query({
            query: ({keyword}) =>  ({
                url: `${PRODUCT_URL}`,
                params: { keyword },
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Product"],
        }),

        allProducts: builder.query({
            query: () => `${PRODUCT_URL}/allproducts`,
        }),

        getNewProducts: builder.query({
            query: () => `${PRODUCT_URL}/new`,
            keepUnusedDataFor: 5,
        }),

        getTopProducts: builder.query({
            query: () => `${PRODUCT_URL}/top`,
            keepUnusedDataFor: 5,
        }),

        getProductById: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                providestags: (result, error, productId) => [
                    {type: "Product", id: productId},
                ],
            }),
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
              url: `${PRODUCT_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),

        getFilteredProducts: builder.query({
          query: ({ checked, radio }) => ({
            url: `${PRODUCT_URL}/filtered-products`,
            method: "POST",
            body: { checked, radio },
          }),
        }),

        uploadProductImage: builder.mutation({
            query: (data) => ({
              url: `${UPLOAD_URL}`,
              method: "POST",
              body: data,
            }),
        }),

        createReview: builder.mutation({
            query: (data) => ({
              url: `${PRODUCT_URL}/${data.productId}/reviews`,
              method: "POST",
              body: data,
            }),
        }),
    }),
})

export const {
    useCreateProductMutation,
    useGetProductsQuery,
    useAllProductsQuery,
    useGetTopProductsQuery,
    useGetNewProductsQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetFilteredProductsQuery,
    useGetProductByIdQuery,
    useGetProductDetailsQuery,
    useUploadProductImageMutation,
    useCreateReviewMutation,
} = productApiSlice