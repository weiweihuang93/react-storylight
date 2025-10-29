import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import { ProductContext } from "@/context/ProductContext";
import ProductSwiper from "@/components/product/ProductSwiper";
import SkeletonProductDetail from "@/components/product/SkeletonProductDetail";
import ProductDetailCard from "@/components/product/ProductDetailCard";

export default function ProductPage() {
  const { categoryName, productId } = useParams();
  const { productsData, loading } = useContext(ProductContext);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // 取單一商品資料
  const productData = productsData.find((p) => p.id === productId);

  // 取同分類商品
  const categoryProducts = productsData.filter(
    (product) => product.category === categoryName
  );

  useEffect(() => {
    setThumbsSwiper(null); // 先清掉舊的縮圖

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  return (
    <>
      {/* 麵包屑導航 */}
      <section className="bg-neutral-100 py-3 border-bottom">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">首頁</li>
              {productData && (
                <>
                  <li className="breadcrumb-item">
                    <NavLink
                      className="text-dark"
                      to={`/${productData.category}`}
                    >
                      {productData.category}
                    </NavLink>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {productData.title}
                  </li>
                </>
              )}
            </ol>
          </nav>
        </div>
      </section>

      {/* 產品卡片 */}
      <section className="section-product section-skeleton">
        <div className="bg-neutral-100 py-6">
          <div className="container">
            {!productData ? (
              <SkeletonProductDetail />
            ) : (
              productData && (
                <ProductDetailCard
                  productData={productData}
                  thumbsSwiper={thumbsSwiper}
                  setThumbsSwiper={setThumbsSwiper}
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* 更多相似產品 */}
      <section className="section-product">
        <div className="container py-6">
          <h2 className="fs-lg-4 fs-5 text-accent-300 text-center mb-6">
            瀏覽此商品的人，也瀏覽...
          </h2>
          <ProductSwiper productsData={categoryProducts} loading={loading} />
        </div>
      </section>
    </>
  );
}
