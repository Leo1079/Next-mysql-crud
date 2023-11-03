"use client";
import { useRef, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const ProductForm = () => {
  const router = useRouter();
  const params = useParams();
  const form = useRef(null);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });
  const [image, setImage] = useState(null);
  const [disabledButton, setDisableButton] = useState(false);
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (params.id) {
      axios.get(`/api/products/${params.id}`).then((res) => {
        setProduct({
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
        });
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Deshabilita el botón al comenzar el envío
    setDisableButton(true);
  
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    if (image) {
      formData.append("image", image);
    }
  
    try {
      if (!params.id) {
        await axios.post("/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        const res = await axios.put("/api/products/" + params.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
  
      // Reestablece el botón a habilitado después de completar el envío
      setDisableButton(false);
  
      router.refresh();
      router.push("/");
    } catch (error) {
      // En caso de error, también debes reestablecer el botón a habilitado
      setDisableButton(false);
      console.error("Error:", error);
    }
  };
  
  return (
    <form
      className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
      ref={form}
    >
      <label
        htmlFor="name"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Product Name:
      </label>
      <input
        name="name"
        type="text"
        placeholder="name"
        onChange={handleChange}
        value={product.name}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
      />
      <label
        htmlFor="price"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Product Price:
      </label>
      <input
        name="price"
        type="text"
        placeholder="0.00"
        onChange={handleChange}
        value={product.price}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
      />
      <label
        htmlFor="description"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Product Description:
      </label>
      <textarea
        name="description"
        rows={3}
        placeholder="Description"
        onChange={handleChange}
        value={product.description}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
      />
      <label
        htmlFor="description"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Product Image:
      </label>

      <input
        type="file"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Product Image"
          className="w-96 object-contain mx-auto my-4"
        />
      )}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled = {!disabledButton}
      >
        {params.id ? "Update Product" : "Save Product"}
      </button>
    </form>
  );
};

export default ProductForm;
