import { memo } from "react";
import CategoryProductCard from "./CategoryProductCard";

export default memo(function ProductList({ products }) {
  return (
    <div className="row g-3">
      {products.map((product) => (
        <CategoryProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});
