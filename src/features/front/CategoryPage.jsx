import { useContext, useEffect, useMemo, useState } from "react";
import { NavLink, useParams } from "react-router";
import categories from "@/data/categories";

import { ProductContext } from "@/context/ProductContext";
import SkeletonCategoryProduct from "@/components/product/SkeletonCategoryProduct";
import CategoryProductCard from "@/components/product/CategoryProductCard";
import Pagination from "@/components/common/Pagination";

export default function CategoryPage() {
  const { productsData, loading } = useContext(ProductContext);

  const { categoryName } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  // 當分類改變，重設分頁
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryName]);

  // 過濾分類
  const categoryProducts = useMemo(() => {
    if (!categoryName || categoryName === "全部商品") {
      return productsData;
    }
    return productsData.filter((product) => product.category === categoryName);
  }, [productsData, categoryName]);

  // 分頁處理
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return categoryProducts.slice(start, start + perPage);
  }, [categoryProducts, currentPage]);

  return (
    <>
      <section className="category-navbar py-5">
        <div className="container">
          {/* 分類按鈕 */}
          <div className="d-flex gap-2 overflow-auto">
            {categories.map((category) => (
              <NavLink
                key={category.api}
                to={`/${category.api}`}
                className={({ isActive }) =>
                  `category-button text-nowrap ${isActive ? "active" : ""}`
                }
              >
                <span className="material-symbols-outlined">
                  {category.icon}
                </span>
                <h2 className="fs-6">{category.label}</h2>
              </NavLink>
            ))}
          </div>
        </div>
      </section>
      {/* 產品卡片 */}
      <section className="section-product">
        <div className="bg-neutral-100 py-6">
          <div className="container">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCategoryProduct key={index} />
              ))
            ) : categoryProducts.length === 0 ? (
              <div className="text-center py-5">
                <p className="fs-5 text-secondary">
                  此分類暫無商品，敬請期待！
                </p>
              </div>
            ) : (
              <>
                <div className="row g-3">
                  {currentProducts.map((product) => (
                    <CategoryProductCard key={product.id} product={product} />
                  ))}
                </div>
                <Pagination
                  pagination={{
                    current_page: currentPage,
                    total_pages: Math.ceil(categoryProducts.length / perPage),
                    has_pre: currentPage > 1,
                    has_next:
                      currentPage <
                      Math.ceil(categoryProducts.length / perPage),
                  }}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
