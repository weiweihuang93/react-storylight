import axios from "axios";
import { BASE_URL, API_PATH } from "@/data/config";
import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import { AppContext } from "@/context/AppContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import SkeletonProduct from "@/components/skeleton/SkeletonProduct";
import ProductCard from "@/components/skeleton/ProductCard";
import ReactLoading from "react-loading";

export default function ProductPage() {
  const { addToCart, cartData, loadingId, favorites, toggleFavorite } =
    useContext(AppContext);

  const [productLoading, setProductLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);

  const [productData, setProductData] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const { categoryName, productId } = useParams();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // 取得商品Id
  const getProductId = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/product/${productId}`
      );
      setProductData(res.data.product);
    } catch (err) {
    } finally {
      setProductLoading(false);
    }
  };

  // 取得分類商品
  const getCategoryProducts = async (category) => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`, {
        params: { category },
      });

      const filter10Products = res.data.products.slice(-10);
      setProductsData(filter10Products);
    } catch (err) {
    } finally {
      setCategoryLoading(false);
    }
  };

  useEffect(() => {
    setCategoryLoading(true);
    getCategoryProducts(categoryName);
  }, [categoryName]);

  useEffect(() => {
    setThumbsSwiper(null); // 先清掉舊的縮圖
    getProductId();

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
            {productLoading ? (
              <div className="row g-3">
                {/* 左邊圖片區 Skeleton */}
                <div className="col-lg-6 col-12">
                  <div className="d-flex flex-column">
                    <div className="skeleton skeleton-main"></div>
                    <div className="skeleton-thumbs">
                      {[...Array(4)].map((_, index) => (
                        <div
                          key={index}
                          className="skeleton skeleton-thumb-img"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 商品描述 Skeleton */}
                <div className="col-lg-6 col-12">
                  <div className="card-info h-100 py-0 d-flex flex-column">
                    {/* 標題 */}
                    <div className="skeleton skeleton-text title"></div>

                    {/* 內容 */}
                    <div className="card-content">
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-text"></div>
                    </div>

                    {/* 商品細節 */}
                    <ul className="product-list mb-4">
                      {Array.from({ length: 6 }).map((__, i) => (
                        <li key={i} className="skeleton skeleton-text"></li>
                      ))}
                    </ul>

                    {/* 購買操作區 */}
                    <div className="card-shop mb-2">
                      <div className="skeleton-quantity">
                        <div className="skeleton skeleton-btn"></div>
                        <div className="skeleton skeleton-number"></div>
                        <div className="skeleton skeleton-btn"></div>
                      </div>

                      {/* 價格區 */}
                      <div className="skeleton-price-column">
                        <div className="skeleton skeleton-price"></div>
                        <div className="skeleton skeleton-price"></div>
                      </div>
                    </div>
                    {/* 操作按鈕 */}
                    <div className="card-operation mt-auto">
                      <div className="skeleton skeleton-btn"></div>
                      <div className="skeleton skeleton-btn"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              productData && (
                <div className="" key={productData.id}>
                  <div className="row g-3">
                    {/* 圖片區 */}
                    <div className="col-lg-6 col-12">
                      <div className=" d-flex flex-column">
                        {/* 主圖片 Swiper */}
                        <Swiper
                          modules={[Thumbs]}
                          spaceBetween={10}
                          thumbs={{ swiper: thumbsSwiper }}
                          className="product-main-swiper mb-3"
                        >
                          {[
                            productData.imageUrl,
                            ...(productData.imagesUrl || []),
                          ]
                            .filter((url) => url)
                            .map((url, index) => (
                              <SwiperSlide key={index}>
                                <div className="card-img-wrapper">
                                  <img src={url} alt={`book-${index}`} />
                                  <span className="card-img-tag">
                                    {productData.condition}
                                  </span>
                                </div>
                              </SwiperSlide>
                            ))}
                        </Swiper>
                        {/* 縮圖區 */}
                        <Swiper
                          modules={[Thumbs]}
                          onSwiper={setThumbsSwiper}
                          spaceBetween={10}
                          slidesPerView={4}
                          className="product-thumb-swiper"
                        >
                          {[
                            productData.imageUrl,
                            ...(productData.imagesUrl || []),
                          ]
                            .filter((url) => url)
                            .map((url, index) => (
                              <SwiperSlide key={index}>
                                <img src={url} alt={`thumb-${index}`} />
                              </SwiperSlide>
                            ))}
                        </Swiper>
                      </div>
                    </div>

                    {/* 商品資訊 */}
                    <div className="col-lg-6 col-12">
                      <div className="card-info h-100 py-0 d-flex flex-column">
                        <h3 className="fs-5 mb-2 title-cp2 h-2em">
                          {productData.title}
                        </h3>
                        <p style={{ whiteSpace: "pre-line" }} className="mb-3">
                          {productData.mainDescription?.replace(
                            /<\/?br\s*\/?>/gi,
                            "\n"
                          )}
                        </p>
                        <ul className="product-list gap-3 border-top mt-auto">
                          <li className="title-cp1">
                            ISBN：{productData.isbn}
                          </li>
                          <li className="title-cp1">
                            作者：{productData.author}
                          </li>
                          <li className="title-cp1">
                            出版社：{productData.publisher}
                          </li>
                          <li className="title-cp1">
                            出版日期：{productData.publishdate}
                          </li>
                          <li className="title-cp1">
                            語言：{productData.language}
                          </li>
                          <li className="title-cp1 text-accent-300">
                            更多書況說明：
                            {productData.conditionDescription
                              ? productData.conditionDescription
                              : "無"}
                          </li>
                        </ul>
                        {/* 購買操作區 */}
                        <div className="card-shop">
                          {/* 數量選擇 */}
                          <div className="card-quantity-wrapper">
                            <button
                              type="button"
                              className="btn btn-outline-accent-300"
                            >
                              －
                            </button>
                            <span className="fs-6 fw-bold mx-3">
                              {productData.qty}
                            </span>
                            <button
                              type="button"
                              className="btn btn-outline-accent-300"
                            >
                              ＋
                            </button>
                          </div>
                          {/* 價格區 */}
                          <div className="text-end mb-3">
                            <del className="me-3">
                              NT {productData.origin_price}
                            </del>
                            <p className="fs-5 text-danger fw-bold text-center">
                              <span className="material-symbols-outlined text-primary fs-5 me-3">
                                paid
                              </span>
                              {productData.price}
                            </p>
                          </div>
                        </div>

                        {/* 操作按鈕 */}
                        <div className="card-operation mt-auto">
                          <button
                            onClick={() => toggleFavorite(productData.id)}
                            className={`btn btn-icon ${
                              favorites[productData.id] ? "active" : ""
                            }`}
                          >
                            <i className="material-symbols-outlined">
                              favorite
                            </i>
                          </button>
                          <button
                            onClick={() => addToCart(productData.id)}
                            className={`btn btn-icon ${
                              cartData?.carts?.some(
                                (cartItem) =>
                                  cartItem.product_id === productData.id
                              )
                                ? "active"
                                : ""
                            }`}
                            disabled={
                              loadingId === productData.id ||
                              cartData?.carts?.some(
                                (cartItem) =>
                                  cartItem.product_id === productData.id
                              )
                            }
                          >
                            <i className="material-symbols-outlined">
                              {loadingId === productData.id ? (
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
                    </div>

                    {/* 商品描述 */}
                    <div className="col-12">
                      <div className="product-info py-7">
                        <div className="section-title mb-6">
                          <h2 className="fs-lg-4 fs-5 title-decoration">
                            書籍簡介
                          </h2>
                        </div>
                        <p style={{ whiteSpace: "pre-line" }}>
                          {productData.description?.replace(
                            /<\/?br\s*\/?>/gi,
                            "\n"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
          <Swiper
            className="py-3"
            spaceBetween={16}
            slidesPerView={1}
            loop={productsData.length >= 5}
            breakpoints={{
              768: { slidesPerView: 3 },
              992: { slidesPerView: 4 },
              1200: { slidesPerView: 5 },
            }}
          >
            {categoryLoading
              ? Array.from({ length: 5 }).map((_, idx) => (
                  <SwiperSlide key={idx}>
                    <SkeletonProduct />
                  </SwiperSlide>
                ))
              : productsData.map((product) => {
                  const isProductInCart = cartData.carts.some(
                    (cartItem) => cartItem.product_id === product.id
                  );

                  return (
                    <SwiperSlide key={product.id}>
                      <ProductCard
                        product={product}
                        isProductInCart={isProductInCart}
                        addToCart={addToCart}
                        isFavorite={!!favorites[product.id]}
                        toggleFavorite={toggleFavorite}
                        loadingId={loadingId}
                      />
                    </SwiperSlide>
                  );
                })}
          </Swiper>
        </div>
      </section>
    </>
  );
}
