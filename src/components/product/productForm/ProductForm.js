import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import {
  createProduct,
  selectIsLoading,
} from "../../../redux/features/product/productSlice";
import Header from "../../header/Header";


const initialState = {
  name: "",
  category:"",
  price:"",
};

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { name, category, price, quantity } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateKSKU(category));
    formData.append("category", category);
    formData.append("quantity", Number(quantity));
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", productImage);

    console.log(...formData);

    await dispatch(createProduct(formData));

    navigate("/home");
  };
  return (
    <div>
      <Header />
      <div className='pro-fom'>
  
  <div className='pro-body'>
    <div>
      <h1>ProductForm</h1>
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
          Save Product
        </button>
       </div>
       

      </form>
    </div>
  </div>
</div>
    </div>
  )
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm