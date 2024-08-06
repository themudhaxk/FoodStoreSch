import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice.js";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu.jsx";
import { FiUploadCloud } from "react-icons/fi";
import Sidebar from "./Sidebar.jsx";

const ProductUpdate = () => {
  const params = useParams();

  const { data: productData, refetch } = useGetProductByIdQuery(params._id);

  const [images, setImages] = useState(productData?.images || []);
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [stock, setStock] = useState(productData?.countInStock);

  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData?.name);
      setDescription(productData?.description);
      setPrice(productData?.price);
      setBrand(productData?.brand);
      setCategory(productData?.categories?.category);
      setQuantity(productData?.quantity);
      setOldImages(productData?.images);
      setStock(productData?.countInStock);
    }
  }, [productData]);

  uploadProductImage;

  {
    /*  const handleUpdate = async () => {
    try {
      const res = await updateProduct({
        _id: params._id,
        image,
        name,
        description,
        price,
        brand,
        category,
        quantity,
        countInStock: stock,
      }).unwrap()
      toast.success("Product updated successfully")
      navigate("/products")
      console.log(res)
    } catch (error) {
      toast.error("Something went wrong")
    }
  }*/
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("countInStock", stock);

      images.forEach((image) => {
        formData.append("images", image);
      });

      const { data } = await updateProduct({ productId: params._id, formData });

      if (data.error) {
        toast.error("Product update failed. Try Again.");
      } else {
        toast.success("Product successfully updated");
        navigate("/admin/allproductslist");
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Product update failed. Try Again.");
    }
  };

  const handleDelete = async () => {
    try {
      let alert = window.confirm(
        "Are you sure you want to delete this product?"
      );

      if (!alert) return;

      const { data } = await deleteProduct(params._id);
      toast.success("Product deleted successfully");
      navigate("/admin/allproductslist");
    } catch (error) {
      console.error(error);
      toast.error("Product delete failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
      <div className="col-12 col-md-2 mt-4">
					{/* <Sidebar /> */}
				</div>
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">
            <span className="">Create Product</span>
            
            {/* {image && (
              <div className='text-center'>
                <img 
                  src={image} 
                  alt="product" 
                  className='block mx-auto max-h-[200px]' 
                />
              </div>
            )} */}
            <div>
            {oldImages &&
              oldImages.map((img) => (
                <img
                  key={img}
                  src={img.url}
                  alt={img.url}
                  className="mt-3 mr-2 inline-flex"
                  width="150"
                  height=""
                />
              ))}
              </div>
              <div>
            {imagesPreview.map((img) => (
              <img
                src={img}
                key={img}
                alt="Images Preview"
                className="mt-3 mr-2 inline-flex"
                width="150"
                height=""
              />
            ))}
            </div>
            <div className="mb-3">
              <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                {images ? images.name : "Upload Image"}

                <input
                  type="file"
                  name="image"
                  accept="image/"
                  onChange={uploadFileHandler}
                  className={!images ? "hidden" : "text-white"}
                  multiple
                />
              </label>
            </div>
            <div className="p-3">
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name">Name </label>
                  <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="two">
                  <label htmlFor="name block">Price </label>
                  <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name block">Quantity </label>
                  <br />
                  <input
                    type="number"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="two">
                  <label htmlFor="name block">Brand </label>
                  <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>
              <label htmlFor="" className="my-5">
                Description
              </label>
              <textarea
                type="text"
                className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white h-[15rem]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <div className="flex justify-between">
                <div>
                  <label htmlFor="name block">Count In Stock</label>
                  <br />
                  <input
                    type="number"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <br />
                <br />
                <div className="ml-4">
                  <label htmlFor="name block">Category</label>
                  <br />
                  <select
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="">
                <button
                  onClick={handleUpdate}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 hover:bg-green-700 mr-6"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 hover:bg-pink-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
