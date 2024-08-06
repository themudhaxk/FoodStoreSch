import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useProductCategoryQuery, useReadCategoryQuery } from "../../redux/api/categoryApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import ProductCard from "./ProductCard";

const CategoryDetails = () => {
  const { id: categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: products, isLoading, refetch, error } = useProductCategoryQuery(categoryId);
  const { data: category } = useReadCategoryQuery();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Category: {category?.name}</h2>
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
        >
          Go Back
        </Link>
      </div>
      {isLoading ? (
        <div className="flex justify-center mb-4">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.message}</Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-3">
            <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
            <div className="flex flex-wrap">
              {products?.length === 0 ? (
                <Loader />
              ) : (
                products.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
