import { useContext } from "react";
import { FavoritesContext } from "@/context/FavoritesContext";
import { CartContext } from "@/context/CartContext";
import ReactLoading from "react-loading";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";

export default function ProductDetailCard({
  productData,
  thumbsSwiper,
  setThumbsSwiper,
}) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { addToCart, cartProductIds, loadingId } = useContext(CartContext);

  return (
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
              {[productData.imageUrl, ...(productData.imagesUrl || [])]
                .filter((url) => url)
                .map((url, index) => (
                  <SwiperSlide key={index}>
                    <div className="card-img-wrapper">
                      <img
                        src={url}
                        alt={`book-${index}`}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
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
              {[productData.imageUrl, ...(productData.imagesUrl || [])]
                .filter((url) => url)
                .map((url, index) => (
                  <SwiperSlide key={index}>
                    <img src={url} alt={`thumb-${index}`} loading="lazy" />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>

        {/* 商品資訊 */}
        <div className="col-lg-6 col-12">
          <div className="card-info h-100 py-0 d-flex flex-column">
            <h3 className="fs-5 mb-2 title-cp2 h-2em">{productData.title}</h3>
            <p style={{ whiteSpace: "pre-line" }} className="mb-3">
              {productData.mainDescription?.replace(/<\/?br\s*\/?>/gi, "\n")}
            </p>
            <ul className="product-list gap-3 border-top mt-auto">
              <li className="title-cp1">ISBN：{productData.isbn}</li>
              <li className="title-cp1">作者：{productData.author}</li>
              <li className="title-cp1">出版社：{productData.publisher}</li>
              <li className="title-cp1">出版日期：{productData.publishdate}</li>
              <li className="title-cp1">語言：{productData.language}</li>
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
                <button type="button" className="btn btn-outline-accent-300">
                  －
                </button>
                <span className="fs-6 fw-bold mx-3">{productData.qty}</span>
                <button type="button" className="btn btn-outline-accent-300">
                  ＋
                </button>
              </div>
              {/* 價格區 */}
              <div className="text-end mb-3">
                <del className="me-3">NT {productData.origin_price}</del>
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
                <i className="material-symbols-outlined">favorite</i>
              </button>
              <button
                onClick={() => addToCart(productData.id)}
                className={`btn btn-icon ${
                  cartProductIds.has(productData.id) ? "active" : ""
                }`}
                disabled={
                  loadingId === productData.id ||
                  cartProductIds.has(productData.id)
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
              <h2 className="fs-lg-4 fs-5 title-decoration">書籍簡介</h2>
            </div>
            <p style={{ whiteSpace: "pre-line" }}>
              {productData.description?.replace(/<\/?br\s*\/?>/gi, "\n")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
