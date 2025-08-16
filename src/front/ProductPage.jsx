import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";

export default function ProductPage() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [productData, setProductData] = useState(null);
  const { categoryName, productId } = useParams();

  // 取得商品Id
  const getProductId = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/product/${productId}`
      );
      console.log(res);
      setProductData(res.data.product);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductId();
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
                  <li className="breadcrumb-item text-dark">
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
      <section className="section-product">
        <div className="bg-neutral-100 py-6">
          <div className="container">
            {productData && (
              <div className="" key={productData.id}>
                <div className="row g-3">
                  {/* 圖片區 */}
                  <div className="col-lg-6 col-12 d-flex flex-column">
                    {/* 主圖片 Swiper */}
                    <Swiper
                      modules={[Thumbs]}
                      spaceBetween={10}
                      loop
                      thumbs={{ swiper: thumbsSwiper }}
                      className="product-main-swiper mb-3"
                    >
                      {[
                        productData.imageUrl,
                        ...(productData.imagesUrl || []),
                      ].map((url, index) => (
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
                      ].map((url, index) => (
                        <SwiperSlide key={index}>
                          <img src={url} alt={`thumb-${index}`} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  {/* 商品資訊 */}
                  <div className="col-lg-6 col-12">
                    <div className="card-info h-100 py-0 d-flex flex-column">
                      <h3 className="fs-5 mb-2 title-cp2 h-2em">
                        {productData.title}
                      </h3>
                      <p className="mb-3">{productData.content}</p>
                      <ul className="product-list gap-3 border-top">
                        <li className="title-cp1">ISBN：{productData.isbn}</li>
                        <li className="title-cp1">
                          作者：{productData.author}
                        </li>
                        <li className="title-cp1">
                          出版社：{productData.publisher}
                        </li>
                        <li className="title-cp1">
                          出版日期：{productData.publishDate}
                        </li>
                        <li className="title-cp1">
                          適讀對象：{productData.audience}
                        </li>
                        <li className="title-cp1">
                          語言：{productData.language}
                        </li>
                        <li className="title-cp1 text-accent-300">
                          更多書況說明：有折書角
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
                          <span className="fs-6 fw-bold mx-3">10</span>
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
                        <button className="btn btn-icon">
                          <i className="material-symbols-outlined">favorite</i>
                        </button>
                        <button className="btn btn-icon">
                          <i className="material-symbols-outlined">
                            shopping_cart
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
                      <p>{productData.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 更多相似產品 */}
    </>
  );
}
