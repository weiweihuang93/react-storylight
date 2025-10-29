import { useContext } from "react";
import { Link } from "react-router";
import SkeletonProduct from "@/components/product/SkeletonProduct";
import ProductCard from "@/components/product/ProductCard";
import { FavoritesContext } from "@/context/FavoritesContext";
import { ProductContext } from "@/context/ProductContext";

export default function FavoritesPage() {
  const { favorites } = useContext(FavoritesContext);
  const { productsData, loading } = useContext(ProductContext);

  // 取得收藏的商品 ID
  const favoriteId = Object.keys(favorites).filter((id) => favorites[id]);

  // 篩選收藏商品
  const favoriteProducts = productsData.filter((product) =>
    favoriteId.includes(product.id)
  );

  return (
    <section className="section-product py-6">
      <div className="container">
        <div className="row g-4">
          {loading ? (
            // Skeleton 效果
            Array.from({ length: 6 }).map((_, idx) => (
              <div className="col-12 col-md-4" key={idx}>
                <SkeletonProduct />
              </div>
            ))
          ) : favoriteProducts.length === 0 ? (
            // 空收藏清單提示
            <div className="col-12">
              <div className="card-base text-center p-5">
                <h2 className="fs-4 mb-4">收藏清單是空的</h2>
                <p className="text-muted mb-4">
                  您還沒有將任何商品加入收藏清單，快去挑選喜歡的商品吧！
                </p>
                <Link
                  to="/全部商品"
                  className="btn btn-lg btn-accent-300 btn-flex btn-transX mt-4"
                >
                  開始探索
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          ) : (
            // 顯示收藏商品
            favoriteProducts.map((product) => (
              <div className="col-12 col-md-4" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
