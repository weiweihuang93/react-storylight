import axios from "axios";
import { BASE_URL, API_PATH } from "@/data/config";
import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import categories from "@/data/categories";
import { AppContext } from "@/context/AppContext";

export default function CategoryPage() {
  const { addToCart, cartData, favorites, toggleFavorite } =
    useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const { categoryName } = useParams();
  const [productsData, setProductsData] = useState([]);

  // 取得全部商品
  const getAllProducts = async () => {
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

  // 取得分類商品
  const getCategoryProducts = async (category) => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`, {
        params: { category },
      });
      setProductsData(res.data.products);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (!categoryName || categoryName === "全部商品") {
      getAllProducts();
    } else {
      getCategoryProducts(categoryName);
    }
  }, [categoryName]);

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
            <div className="row g-3">
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <div className="col-12" key={index}>
                    <div className="product-card card-transY skeleton-card">
                      <div className="row g-3">
                        {/* 圖片區 */}
                        <div className="col-lg-4 col-sm-6 col-6 d-flex flex-column">
                          <div className="card-img-wrapper">
                            <div className="skeleton skeleton-img"></div>
                          </div>
                          <div className="card-operation mt-auto">
                            <div className="skeleton skeleton-btn"></div>
                            <div className="skeleton skeleton-btn"></div>
                          </div>
                        </div>

                        {/* 商品資訊 */}
                        <div className="col-lg-4 col-sm-6 col-6">
                          <div className="card-info h-100 d-flex flex-column">
                            <div className="skeleton skeleton-text title"></div>
                            <ul className="product-list">
                              {Array.from({ length: 5 }).map((__, i) => (
                                <li
                                  key={i}
                                  className="skeleton skeleton-text"
                                ></li>
                              ))}
                            </ul>
                            <div className="skeleton skeleton-price mt-auto"></div>
                          </div>
                        </div>

                        {/* Content 區 */}
                        <div className="col-lg-4 col-sm-12 col-12 border-custom">
                          <div className="card-content">
                            <div className="skeleton skeleton-text"></div>
                            <div className="skeleton skeleton-text"></div>
                            <div className="skeleton skeleton-text"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : productsData.length === 0 ? (
                <div className="text-center py-5">
                  <p className="fs-5 text-secondary">
                    此分類暫無商品，敬請期待！
                  </p>
                </div>
              ) : (
                productsData.map((product) => {
                  const isProductInCart = cartData.carts.some(
                    (cartItem) => cartItem.product_id === product.id
                  );

                  return (
                    <div className="col-12" key={product.id}>
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
                                />
                                <span className="card-img-tag">
                                  {product.condition}
                                </span>
                              </div>
                            </NavLink>
                            <div className="card-operation mt-auto">
                              <button
                                onClick={() => toggleFavorite(product.id)}
                                className={`btn btn-icon ${
                                  favorites[product.id] ? "active" : ""
                                }`}
                              >
                                <i className="material-symbols-outlined">
                                  favorite
                                </i>
                              </button>
                              <button
                                onClick={() => addToCart(product.id)}
                                className={`btn btn-icon ${
                                  isProductInCart ? "active" : ""
                                }`}
                                disabled={isProductInCart}
                              >
                                <i className="material-symbols-outlined">
                                  shopping_cart
                                </i>
                              </button>
                            </div>
                          </div>

                          {/* 商品資訊 */}
                          <div className="col-lg-4 col-sm-6 col-6">
                            <div className="card-info h-100 d-flex flex-column">
                              <h1 className="fs-5 mb-2 title-cp2 h-2em">
                                {product.title}
                              </h1>
                              <ul className="product-list gap-2">
                                <li className="title-cp1">
                                  ISBN：{product.isbn}
                                </li>
                                <li className="title-cp1">
                                  作者：{product.author}
                                </li>
                                <li className="title-cp1">
                                  出版社：{product.publisher}
                                </li>
                                <li className="title-cp1">
                                  出版日期：{product.publishdate}
                                </li>
                                <li className="title-cp1">
                                  語言：{product.language}
                                </li>
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
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
