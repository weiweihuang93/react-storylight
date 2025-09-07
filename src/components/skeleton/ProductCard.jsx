import { NavLink } from "react-router";

export default function ProductCard({ product, isProductInCart, addToCart }) {
  return (
    <>
      <div className="product-card card-transY">
        {/* 圖片區 + 書況標籤 */}
        <NavLink
          className="product-link text-dark"
          to={`/${product.category}/${product.id}`}
        >
          <div className="card-img-wrapper">
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.title} />
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
          <button className="btn btn-icon">
            <i className="material-symbols-outlined">favorite</i>
          </button>
          <button
            onClick={() => addToCart(product.id)}
            className={`btn btn-icon ${isProductInCart ? "active" : ""}`}
            disabled={isProductInCart}
          >
            <i className="material-symbols-outlined">shopping_cart</i>
          </button>
        </div>
      </div>
    </>
  );
}
