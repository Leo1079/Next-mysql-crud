import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className=" m-9  block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-3"
    >
      {product.image && (
        <img src={product.image} className="w-full rounded-t-lg " alt="" />
      )}
      <div className="p-4">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {product.name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-200">
          {product.description}
        </p>
        <p className="font-bold text-gray-800 dark:text-gray-100 text-2xl">
          {product.price} $
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
