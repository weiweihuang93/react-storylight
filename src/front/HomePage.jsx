import axios from "axios";
import { BASE_URL, API_PATH } from "../data/config";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import categories from "../data/categories";
import { AppContext } from "../context/AppContext";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function HomePage() {
  const { addToCart, cartData } = useContext(AppContext);

  const [productsData, setProductsData] = useState([]);
  const [products10Data, setProducts10Data] = useState([]);
  const [featuredProductsData, setFeaturedProductsData] = useState([]);

  // 取得商品
  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/products/all`
      );
      setProductsData(res.data.products);
      const filter10Products = res.data.products.slice(-10);
      setProducts10Data(filter10Products);

      const filterFeaturedProducts = res.data.products.filter(
        (product) => product.price >= 500
      );
      setFeaturedProductsData(filterFeaturedProducts);
    } catch (err) {}
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // 搜尋商品
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    // 先篩選 使用商品名稱 (title) 或描述 (description) 進行比對
    const filteredAndSorted = productsData
      .filter(
        (product) =>
          product.title.toLowerCase().includes(keyword.toLowerCase()) ||
          product.description.toLowerCase().includes(keyword.toLowerCase())
      )
      // 再排序
      .sort((a, b) => a.price - b.price);

    setResults(filteredAndSorted);
  };

  return (
    <>
      {/* <!-- 輪播圖 --> */}
      <header className="header-banner">
        <div className="header-img">
          <img src="./images/banner.png" alt="header-banner" />
          <div className="overlay"></div>
        </div>
        <div className="header-info">
          <div className="container">
            <h1 className="fs-lg-1 fs-2">遇見未完的故事</h1>
            <h2 className="fs-lg-3 fs-6 mb-4">
              追尋時光，從經典到絕版，帶你發現更多閱讀寶藏
            </h2>
            <form className="d-flex align-items-center" onSubmit={handleSearch}>
              <input
                className="form-control mx-w-search"
                type="search"
                placeholder="請輸入關鍵字"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-accent-300 btn-arrow border-0"
                data-bs-toggle="modal"
                data-bs-target="#searchModal"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
            <Link
              to="/#category"
              className="btn btn-lg btn-accent-300 btn-flex btn-transX mt-4"
            >
              開始探索
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* <!-- 搜尋結果 Modal --> */}
        <div
          className="modal fade"
          id="searchModal"
          tabIndex="-1"
          aria-labelledby="searchModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content rounded-3 shadow">
              {/* header */}
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="searchModalLabel">
                  搜尋結果
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              {/* body */}
              <div className="modal-body">
                <p className="text-muted mb-4">
                  關鍵字：「
                  <span className="fw-semibold text-dark">{keyword}</span>
                  」，共找到{" "}
                  <span className="fw-semibold">{results.length}</span> 筆結果
                </p>

                {/* <!-- 結果清單 --> */}

                {results.length > 0 ? (
                  <div className="list-group">
                    {results.map((product) => (
                      <NavLink
                        key={product.id}
                        to={`/${product.category}/${product.id}`}
                        className="text-decoration-none text-dark"
                      >
                        <div className="list-group-item d-flex align-items-center">
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="me-3 rounded"
                            style={{
                              width: "60px",
                              height: "80px",
                              objectFit: "cover",
                            }}
                          />
                          <div>
                            <h6 className="mb-1 fw-semibold">
                              {product.title}
                            </h6>
                            <small className="text-muted">
                              NT$ {product.price}
                            </small>
                          </div>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                ) : (
                  <p className="text-danger">沒有找到相關商品</p>
                )}
              </div>

              {/* footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  關閉
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 最新消息 */}
      <section id="news" className="section-news py-5">
        <div className="bg-primary-200 py-6">
          <div className="container">
            <div className="section-title mb-6">
              <h2 className="fs-lg-2 fs-3 title-decoration">最新消息</h2>
            </div>

            <ul className="news-list">
              <li className="news-item mb-5">
                <time className="text-accent-300 fw-bold" dateTime="2025-09-01">
                  <p>2025/09</p>
                  <p className="fs-3 text-center">01</p>
                </time>
                <article>
                  <h3 className="fs-lg-4 fs-5 mb-2">網站正式上線啦！</h3>
                  <p className="fs-lg-5 fs-6">
                    歡迎您探索豐富的書籍世界，尋找心儀的好書。
                  </p>
                </article>
              </li>

              <li className="news-item mb-5">
                <time className="text-accent-300 fw-bold" dateTime="2025-09-15">
                  <p>2025/09</p>
                  <p className="fs-3 text-center">15</p>
                </time>
                <article>
                  <h3 className="fs-lg-4 fs-5 mb-2">限時折扣</h3>
                  <p className="fs-lg-5 fs-6">
                    迎接夏季閱讀季，指定書籍享
                    85折優惠，數量有限，趕快把握機會！
                  </p>
                </article>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 書籍分類 */}
      <section id="category" className="section-category">
        <div className="container py-6">
          <div className="section-title mb-6">
            <h2 className="fs-lg-2 fs-3 title-decoration">書籍分類</h2>
          </div>
          <div className="row g-3">
            {categories.map((category) => (
              <div className="col-6 col-lg-4" key={category.api}>
                <NavLink
                  to={`/${category.api}`}
                  className="card-transY category-card p-4 p-lg-6"
                >
                  <span className="material-symbols-outlined fs-1">
                    {category.icon}
                  </span>
                  <h4 className="d-none d-lg-block fs-4">{category.api}</h4>
                  <h4 className="d-block d-lg-none fs-lg-4 fs-5">
                    {category.label}
                  </h4>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 館藏推薦 */}
      <section className="section-product">
        <div className="container py-6">
          <div className="section-title mb-6">
            <h2 className="fs-lg-2 fs-3 title-decoration">館藏推薦</h2>
          </div>

          <Swiper
            className="py-3"
            spaceBetween={16} // 卡片間距
            slidesPerView={1} // 預設一次顯示1張
            loop={featuredProductsData.length > 5}
            breakpoints={{
              768: { slidesPerView: 3 }, // md
              992: { slidesPerView: 4 }, // lg
              1200: { slidesPerView: 5 }, // xl
            }}
          >
            {featuredProductsData.map((product) => {
              const isProductInCart = cartData?.carts?.some(
                (cartItem) => cartItem.product_id === product.id
              );

              return (
                <SwiperSlide key={product.id}>
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
                        <span className="card-img-tag">
                          {product.condition}
                        </span>
                      </div>
                    </NavLink>

                    {/* 商品資訊 */}
                    <div className="card-info">
                      <h3 className="fs-5 mb-2 title-cp2 h-2em">
                        {product.title}
                      </h3>
                      <ul className="product-list">
                        <li className="title-cp1">ISBN：{product.isbn}</li>
                        <li className="title-cp1">作者：{product.author}</li>
                        <li className="title-cp1">
                          出版社：{product.publisher}
                        </li>
                        <li className="title-cp1">
                          出版日期：{product.publishdate}
                        </li>
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
                        <i className="material-symbols-outlined">
                          shopping_cart
                        </i>
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>

      {/* 新書上架 */}
      <section className="section-product">
        <div className="container py-6">
          <div className="section-title mb-6">
            <h2 className="fs-lg-2 fs-3 title-decoration">新書上架</h2>
          </div>

          <Swiper
            className="py-3"
            spaceBetween={16} // 卡片間距
            slidesPerView={1} // 預設一次顯示1張
            loop={products10Data.length > 5}
            breakpoints={{
              768: { slidesPerView: 3 }, // md
              992: { slidesPerView: 4 }, // lg
              1200: { slidesPerView: 5 }, // xl
            }}
          >
            {products10Data.map((product) => {
              const isProductInCart = cartData?.carts?.some(
                (cartItem) => cartItem.product_id === product.id
              );

              return (
                <SwiperSlide key={product.id}>
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
                        <span className="card-img-tag">
                          {product.condition}
                        </span>
                      </div>
                    </NavLink>

                    {/* 商品資訊 */}
                    <div className="card-info">
                      <h3 className="fs-5 mb-2 title-cp2 h-2em">
                        {product.title}
                      </h3>
                      <ul className="product-list">
                        <li className="title-cp1">ISBN：{product.isbn}</li>
                        <li className="title-cp1">作者：{product.author}</li>
                        <li className="title-cp1">
                          出版社：{product.publisher}
                        </li>
                        <li className="title-cp1">
                          出版日期：{product.publishdate}
                        </li>
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
                        <i className="material-symbols-outlined">
                          shopping_cart
                        </i>
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>

      {/* 關於我們｜書籍如何處理？ */}
      <section id="about" className="section-about py-5">
        <div className="bg-primary-200 py-6">
          <div className="container text-center">
            <div className="section-title mb-6">
              <h2 className="fs-lg-2 fs-3">關於我們｜書籍如何處理</h2>
            </div>

            <p className="fs-lg-4 fs-5 mb-6">
              每一本二手書，都是承載知識與故事的珍貴旅伴。
              <span className="d-inline d-md-block">
                我們用心檢查、細心清潔，讓它們以最好的狀態再次被閱讀，延續書的價值與溫度。
              </span>
            </p>

            <div className="row py-5 g-4">
              <div className="col-12 col-md-4 d-flex">
                <div className="about-card card-transY">
                  <div className="bg-diamond-wrapper mb-4">
                    <img src="./images/ic-1.png" alt="安心清潔" />
                  </div>
                  <div className="about-info">
                    <h3 className="title-badge fs-5">安心清潔</h3>
                    <p className="sub-desc">
                      每本書都會進行除塵、去污與消毒處理，確保書頁潔淨，讓您閱讀無負擔。
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4 d-flex">
                <div className="about-card card-transY">
                  <div className="bg-diamond-wrapper mb-4">
                    <img src="./images/ic-2.png" alt="書況分級" />
                  </div>
                  <div className="about-info">
                    <h3 className="title-badge fs-5">書況分級</h3>
                    <p className="sub-desc">
                      我們依照書籍的外觀與內頁狀態進行分級，方便您挑選最適合的版本。
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4 d-flex">
                <div className="about-card card-transY">
                  <div className="bg-diamond-wrapper mb-4">
                    <img src="./images/ic-3.png" alt="快速出貨" />
                  </div>
                  <div className="about-info">
                    <h3 className="title-badge fs-5">快速出貨</h3>
                    <p className="sub-desc">
                      確認訂單後立即處理包裝，讓您不用久等，就能享受閱讀的美好時光。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 標語 */}
      <section className="section-dynamic py-5">
        <div className="bg-neutral-100 py-6">
          <div className="container">
            <div className="dynamic-info">
              <div className="info-txt">
                <p className="fs-lg-3 fs-4 fw-semibold mb-1">
                  找不到你想要的書籍嗎？
                </p>
                <p className="fs-lg-3 fs-4">
                  立即填徵求表單，
                  <span className="d-block d-md-inline">
                    讓賣家主動聯繫您！
                  </span>
                </p>
              </div>
              <button className="btn btn-lg btn-accent-300 btn-flex btn-transX mt-4">
                立即徵求
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- FAQ --> */}
      <section id="faq" className="section-faq">
        <div className="container py-6">
          <div className="section-title mb-6">
            <h2 className="fs-lg-2 fs-3 title-decoration">常見問題</h2>
          </div>

          {/* <!-- 問題 會員相關 --> */}
          <section>
            <h3 className="fs-5 text-accent-300 py-3 ms-2">會員相關</h3>
            <div className="accordion" id="faqAccordion">
              {/* 問題 */}
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <div
                    className="faq-q accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-member1"
                  >
                    需要加入會員才可以購買嗎？
                  </div>
                </h3>
                <div
                  id="faq-member1"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="faq-a accordion-body">
                    <p>
                      是的！為了提供更完善的購物體驗與後續服務，本站採會員制購買，請先註冊成為會員，才能進行下單。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- 問題 書籍相關 --> */}
          <section>
            <h3 className="fs-5 text-accent-300 py-3 ms-2">書籍相關</h3>
            <div className="accordion" id="faqAccordion">
              {/* 問題 */}
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <div
                    className="faq-q accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-status1"
                  >
                    所有書籍都是現貨嗎？
                  </div>
                </h3>
                <div
                  id="faq-status1"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="faq-a accordion-body">
                    <p>
                      是的！我們平台上的所有書籍皆為現貨，下單後即可安排快速出貨，讓您安心購買。
                    </p>
                  </div>
                </div>
              </div>
              {/* 問題 */}
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <div
                    className="faq-q accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-status2"
                  >
                    書籍的保存狀況如何？
                  </div>
                </h3>
                <div
                  id="faq-status2"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="faq-a accordion-body">
                    <ul className="d-flex flex-column gap-3">
                      <li className="fw-bold">
                        為方便您了解書況，依據書籍狀況分類為：
                      </li>
                      <li>A級：書況近乎全新，極少翻閱。</li>
                      <li>
                        B級：書況良好，有輕微使用痕跡，可能出現自然泛黃或書斑，但不影響閱讀。
                      </li>
                      <li>
                        C級：書況普通，可能有筆記、劃線或重點標記，亦可能有書皮磨損、封面折痕、自然泛黃、書斑或輕微髒污，但內容完整，可正常閱讀。
                      </li>
                      <li>
                        D級：書況較舊，多為年份久遠書籍，常見嚴重泛黃、書斑、髒污，或封面、內頁明顯磨損與折痕，但仍保有閱讀價值。
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- 問題 訂購與配送流程 --> */}
          <section>
            <h3 className="fs-5 text-accent-300 py-3 ms-2">訂購與配送</h3>
            <div className="accordion" id="faqAccordion">
              {/* 問題 */}
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <div
                    className="faq-q accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-order1"
                  >
                    我可以怎麼付款？
                  </div>
                </h3>
                <div
                  id="faq-order1"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="faq-a accordion-body">
                    <p>
                      您可以選擇使用信用卡刷卡 或 銀行 ATM
                      轉帳，提供多元安全的付款方式。
                    </p>
                  </div>
                </div>
              </div>
              {/* 問題 */}
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <div
                    className="faq-q accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-order2"
                  >
                    有哪些運送方式？
                  </div>
                </h3>
                <div
                  id="faq-order2"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="faq-a accordion-body">
                    <p>
                      您可以選擇賣家宅配 或 超商取貨，提供彈性便利的配送選項。
                    </p>
                  </div>
                </div>
              </div>
              {/* 問題 */}
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <div
                    className="faq-q accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-order3"
                  >
                    運費如何計算？
                  </div>
                </h3>
                <div
                  id="faq-order3"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="faq-a accordion-body">
                    <p>
                      無論訂購數量，運費皆為 0 元，享受透明又公平的購物體驗。
                    </p>
                  </div>
                </div>
              </div>
              {/* 問題 */}
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <div
                    className="faq-q accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-order4"
                  >
                    出貨時間
                  </div>
                </h3>
                <div
                  id="faq-order4"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="faq-a accordion-body">
                    <p>當日下單完成訂購，訂單將於次 1 個工作日排入出貨流程。</p>
                  </div>
                </div>
              </div>
              {/* 問題 */}
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <div
                    className="faq-q accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-order5"
                  >
                    買錯了，如何退換貨？
                  </div>
                </h3>
                <div
                  id="faq-order5"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="faq-a accordion-body">
                    <p>
                      您可以登入平台申請退換貨服務，若有任何疑問，也歡迎隨時留言，我們的客服團隊會盡快協助您處理。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
