import axios from "axios";
import { BASE_URL, API_PATH } from "@/data/config";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import SkeletonProduct from "@/components/skeleton/SkeletonProduct";
import ProductCard from "@/components/skeleton/ProductCard";
import { Link } from "react-router";

export default function FavoritesPage() {
  const { addToCart, cartData, favorites, toggleFavorite } =
    useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [productsData, setProductsData] = useState([]);

  // 取得商品
  const getAllProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/products/all`
      );
      setProductsData(res.data.products);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // 取得收藏的商品 ID
  const favoriteId = Object.keys(favorites).filter((id) => favorites[id]);

  // 篩選收藏商品
  const favoriteProducts = productsData.filter((product) =>
    favoriteId.includes(product.id.toString())
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
            favoriteProducts.map((product) => {
              const isProductInCart = cartData.carts.some(
                (cartItem) => cartItem.product_id === product.id
              );
              return (
                <div className="col-12 col-md-4" key={product.id}>
                  <ProductCard
                    product={product}
                    isProductInCart={isProductInCart}
                    addToCart={addToCart}
                    isFavorite={!!favorites[product.id]}
                    toggleFavorite={toggleFavorite}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
