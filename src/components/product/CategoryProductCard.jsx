import { useContext } from "react";
import { NavLink } from "react-router";
import ReactLoading from "react-loading";
import { FavoritesContext } from "@/context/FavoritesContext";
import { CartContext } from "@/context/CartContext";

export default function CategoryProductCard({ product }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { addToCart, cartProductIds, loadingId } = useContext(CartContext);

  // 使用 Set 進行 O(1) 查詢
  const isProductInCart = cartProductIds.has(product.id);

  return (
    <div className="product-card card-transY">
      <div className="row g-3">
        {/* 圖片區 */}
        <div className="col-lg-4 col-sm-6 col-6 d-flex flex-column">
          <NavLink
            className="product-link text-dark"
            to={`/${product.category}/${product.id}`}
          >
            <div className="card-img-wrapper">
              <img
                src={product.imageUrl}
                alt={product.title}
                loading="lazy"
              />
              <span className="card-img-tag">{product.condition}</span>
            </div>
          </NavLink>
          <div className="card-operation mt-auto">
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`btn btn-icon ${
                favorites[product.id] ? "active" : ""
              }`}
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

        {/* 商品資訊 */}
        <div className="col-lg-4 col-sm-6 col-6">
          <div className="card-info h-100 d-flex flex-column">
            <h1 className="fs-5 mb-2 title-cp2 h-2em">{product.title}</h1>
            <ul className="product-list gap-2">
              <li className="title-cp1">ISBN：{product.isbn}</li>
              <li className="title-cp1">作者：{product.author}</li>
              <li className="title-cp1">出版社：{product.publisher}</li>
              <li className="title-cp1">出版日期：{product.publishdate}</li>
              <li className="title-cp1">語言：{product.language}</li>
            </ul>
            <p className="fs-5 text-danger fw-bold text-center mt-auto">
              <span className="material-symbols-outlined text-primary fs-5 me-3">
                paid
              </span>
              {product.price}
            </p>
          </div>
        </div>

        {/* Content 區 */}
        <div className="col-lg-4 col-sm-12 col-12 border-custom">
          <div className="card-content">
            <p>{product.mainDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
