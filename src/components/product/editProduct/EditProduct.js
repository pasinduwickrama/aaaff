import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../..//redux/features/product/productSlice";
import ProductForm from "../productForm/ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name);

    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", product?.price);
    formData.append("description", description);
    if (productImage) {
      formData.append("image", productImage);
    }

    console.log(...formData);

    await dispatch(updateProduct({ id, formData }));
    await dispatch(getProducts());
    navigate("/home");
  };

  return (
    <div className='pro-fom'>
      <div className='pro-body'>
        <div>
          <h1>Edit ProductForm</h1>
        </div>
        <div>
          <form onSubmit={saveProduct}>
           <div className='labar-pro'>
           <label>Product Image</label>
            <code className="code-color">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
               
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
           </div>

           <div className='labar-pro'>
           <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
            
          />

           </div>

           <div className='labar-pro'>
           <label>Product Category:</label>
          <input
              type="text"
              placeholder="Product Category"
              name="category"
              value={product?.category}
              onChange={handleInputChange}
            
          />
           </div>

           <div className='labar-pro'>
           <label>Product Price:</label>
          <input
              type="text"
              placeholder="Product Price"
              name="price"
              value={product?.price}
              onChange={handleInputChange}
           
          />
           </div>

           <div className='labar-pro'>
           <label>Product Quantity:</label>
          <input
          type="text"
          placeholder="Product Quantity"
          name="quantity"
          value={product?.quantity}
          onChange={handleInputChange}
           
          />
           </div>

           <div className='labar-pro'>
           <label>Product Description:</label>
          <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  modules={ProductForm.modules}
                  formats={ProductForm.formats}
         
          />
           </div>

           <div className='labar-pro'>
           <button type="submit" >
              Save Product Updade
            </button>
           </div>
           

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
