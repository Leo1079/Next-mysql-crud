"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

const Buttons = ({ productId }) => {
  const router = useRouter();
  return (
    <div>
      <button
        className="bg-red-500 hover:bg-red-700 py-2 px-3 rounded text-white"
        onClick={async () => {
          const res = await axios.delete(`/api/products/${productId}`);
          if (res.status === 204) {
            router.refresh();
            router.push("/products");
          }
        }}
      >
        Delete
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-800 ml-2 py-2 px-5 rounded text-white"
        onClick={() => {
          router.push(`/products/edit/${productId}`);
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default Buttons;
