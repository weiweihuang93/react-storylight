import { NavLink } from "react-router";
import ReactLoading from "react-loading";
import { useContext, memo } from "react";
import { CartContext } from "@/context/CartContext";

function ProductCard({ product, isFavorite, toggleFavorite }) {
  const { addToCart, cartProductIds, loadingId } = useContext(CartContext);

  // 使用 Set 進行 O(1) 查詢，取代原本的 O(n) 遍歷
  const isProductInCart = cartProductIds.has(product.id);

  return (
    <div className="product-card card-transY">
      {/* 圖片區 + 書況標籤 */}
      <NavLink
        className="product-link text-dark"
        to={`/${product.category}/${product.id}`}
      >
        <div className="card-img-wrapper">
          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.title}
              loading="lazy"
            />
          )}
          <span className="card-img-tag">{product.condition}</span>
        </div>
      </NavLink>

      {/* 商品資訊 */}
      <div className="card-info">
        <h3 className="fs-5 mb-2 title-cp2 h-2em">{product.title}</h3>
        <ul className="product-list">
          <li className="title-cp1">ISBN：{product.isbn}</li>
          <li className="title-cp1">作者：{product.author}</li>
          <li className="title-cp1">出版社：{product.publisher}</li>
          <li className="title-cp1">出版日期：{product.publishdate}</li>
          <li className="title-cp1">語言：{product.language}</li>
        </ul>
        <p className="fs-5 text-danger fw-bold text-center">
          <span className="material-symbols-outlined text-primary fs-5 me-3">
            paid
          </span>
          {product.price}
        </p>
      </div>

      {/* 操作按鈕 */}
      <div className="card-operation">
        <button
          onClick={() => toggleFavorite(product.id)}
          className={`btn btn-icon ${isFavorite ? "active" : ""}`}
        >
          <i className="material-symbols-outlined">favorite</i>
        </button>
        <button
          onClick={() => addToCart(product.id)}
          className={`btn btn-icon ${isProductInCart ? "active" : ""}`}
          disabled={isProductInCart || loadingId === product.id}
        >
          <i className="material-symbols-outlined">
            {loadingId === product.id ? (
              <ReactLoading
                className="spinner-center"
                type="spin"
                height={24}
                width={24}
                color="#fff"
              />
            ) : (
              "shopping_cart"
            )}
          </i>
        </button>
      </div>
    </div>
  );
}

// 使用 memo 避免不必要的重新渲染
export default memo(ProductCard);
