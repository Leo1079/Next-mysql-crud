import ProductCard from "@/components/ProductCard";
import { pool } from "@/libs/db";

const loadProducts = async () => {
  const data = await pool.query('SELECT * FROM products')
  return data;
};

const ProductPage = async () => {
  const products = await loadProducts();
  return (
    <div className="grid mx-10 grid-cols-1 md:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductPage;
