import ProductCard from "@/components/product-card";
import { pool } from "@/libs/db";

const loadProducts = async () => {
  try {
    const rows = await pool.query("SELECT * FROM products");
    console.log(rows)
    return rows;
  } catch (error) {
    console.log(error)
  }
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
