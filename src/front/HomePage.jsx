import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function HomePage() {
  const [productsData, setProductsData] = useState([]);

  // 取得商品
  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/products/all`
      );
      console.log(res);

      const filter10Products = res.data.products.slice(-10);
      setProductsData(filter10Products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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
            <form className="d-flex align-items-center">
              <input
                className="form-control mx-w-search"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-accent-300 btn-arrow">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
            <button className="btn-link-style btn btn-lg btn-accent-300 mt-4">
              開始探索
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </header>

      {/* 最新消息 */}
      <section className="section-news py-5">
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
      <section className="section-category">
        <div className="container py-6">
          <div className="section-title mb-6">
            <h2 className="fs-lg-2 fs-3 title-decoration">書籍分類</h2>
          </div>
          <div className="row g-3">
            <div className="col-6 col-lg-4">
              <a className="card-trans-style category-card p-4 p-lg-6">
                <span className="material-symbols-outlined fs-1">
                  nature_people
                </span>
                <h4 className="fs-lg-4 fs-5">
                  <span className="d-none d-md-inline-block">親子</span>童書
                </h4>
              </a>
            </div>
            <div className="col-6 col-lg-4">
              <a className="card-trans-style category-card p-4 p-lg-6">
                <span className="material-symbols-outlined fs-1">
                  query_stats
                </span>
                <h4 className="fs-lg-4 fs-5">
                  商業<span className="d-none d-md-inline-block">理財</span>
                </h4>
              </a>
            </div>
            <div className="col-6 col-lg-4">
              <a className="card-trans-style category-card p-4 p-lg-6">
                <span className="material-symbols-outlined fs-1">palette</span>
                <h4 className="fs-lg-4 fs-5">
                  藝術<span className="d-none d-md-inline-block">領域</span>
                </h4>
              </a>
            </div>
            <div className="col-6 col-lg-4">
              <a className="card-trans-style category-card p-4 p-lg-6">
                <span className="material-symbols-outlined fs-1">people</span>
                <h4 className="fs-lg-4 fs-5">
                  社會<span className="d-none d-md-inline-block">科學</span>
                </h4>
              </a>
            </div>
            <div className="col-6 col-lg-4">
              <a className="card-trans-style category-card p-4 p-lg-6">
                <span className="material-symbols-outlined fs-1">build</span>
                <h4 className="fs-lg-4 fs-5">
                  應用<span className="d-none d-md-inline-block">科學</span>
                </h4>
              </a>
            </div>
            <div className="col-6 col-lg-4">
              <a className="card-trans-style category-card p-4 p-lg-6">
                <span className="material-symbols-outlined fs-1">wb_sunny</span>
                <h4 className="fs-lg-4 fs-5">
                  自然<span className="d-none d-md-inline-block">科學</span>
                </h4>
              </a>
            </div>
            <div className="col-6 col-lg-4">
              <a className="card-trans-style category-card p-4 p-lg-6">
                <span className="material-symbols-outlined fs-1">
                  sports_martial_arts
                </span>
                <h4 className="fs-lg-4 fs-5">
                  <span className="d-none d-md-inline-block">生活</span>休閒
                </h4>
              </a>
            </div>
            <div className="col-6 col-lg-4">
              <a className="card-trans-style category-card p-4 p-lg-6">
                <span className="material-symbols-outlined fs-1">
                  account_balance
                </span>
                <h4 className="fs-lg-4 fs-5">
                  宗教<span className="d-none d-md-inline-block">文化</span>
                </h4>
              </a>
            </div>
            <div className="col-6 col-lg-4">
              <a className="card-trans-style category-card p-4 p-lg-6">
                <span className="material-symbols-outlined fs-1">
                  psychology
                </span>
                <h4 className="fs-lg-4 fs-5">
                  哲學<span className="d-none d-md-inline-block">思想</span>
                </h4>
              </a>
            </div>
            <div className="col-6 col-lg-4">
              <a className="card-trans-style category-card p-4 p-lg-6">
                <span className="material-symbols-outlined fs-1">book_3</span>
                <h4 className="fs-lg-4 fs-5">
                  文學<span className="d-none d-md-inline-block">小說</span>
                </h4>
              </a>
            </div>
            <div className="col-6 col-lg-4">
              <a className="card-trans-style category-card p-4 p-lg-6">
                <span className="material-symbols-outlined fs-1">book_3</span>
                <h4 className="fs-lg-4 fs-5">
                  工具<span className="d-none d-md-inline-block">學習</span>
                </h4>
              </a>
            </div>
            <div className="col-6 col-lg-4">
              <a className="card-trans-style category-card p-4 p-lg-6">
                <span className="material-symbols-outlined fs-1">
                  more_horiz
                </span>
                <h4 className="fs-lg-4 fs-5">
                  <span className="d-none d-md-inline-block">查看</span>更多
                </h4>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 新書上架SWIPER / 館藏推薦 */}
      <section className="section-product">
        <div className="container py-6">
          <div className="section-title mb-6">
            <h2 className="fs-lg-2 fs-3 title-decoration">館藏推薦</h2>
          </div>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
            {productsData.map((product) => (
              <div className="col" key={product.id}>
                <div className="product-card">
                  {/* 圖片區 + 書況標籤 */}
                  <div className="card-img-wrapper">
                    <img src={product.imageUrl} alt={product.title} />
                    <span className="card-img-tag">{product.condition}</span>
                  </div>

                  {/* 商品資訊 */}
                  <div className="card-info">
                    <h3 className="fs-6 mb-2 title-cp2 h-2em">
                      {product.title}
                    </h3>
                    <ul className="product-list">
                      <li className="title-cp1">ISBN：{product.isbn}</li>
                      <li className="title-cp1">作者：{product.author}</li>
                      <li className="title-cp1">出版社：{product.publisher}</li>
                      <li className="title-cp1">
                        出版日期：{product.publishdate}
                      </li>
                      <li className="title-cp1">
                        適讀對象：{product.suitable}
                      </li>
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
                    <button className="btn btn-icon">
                      <i className="material-symbols-outlined">shopping_cart</i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 關於我們｜書籍如何處理？ */}
      <section className="section-about py-5">
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
                <div className="card-trans-style about-card">
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
                <div className="card-trans-style about-card">
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
                <div className="card-trans-style about-card">
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
              <button className="btn-link-style btn btn-lg btn-accent-300">
                立即徵求
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- FAQ --> */}
      <section className="section-faq">
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
                      是的，為了提供更完善的購物體驗與後續服務，本站採會員制購買，請先註冊成為會員，才能進行下單。
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
                      <li>A級：極少翻閱，書況接近新書。</li>
                      <li>
                        B級：有輕微使用痕跡，可能有自然泛黃、書斑，不影響閱讀。
                      </li>
                      <li>
                        C級：可能含有筆記、劃線或重點標記。可能有書皮磨損、封面折痕、自然泛黃、書斑、髒污。但內容完整且可正常閱讀。
                      </li>
                      <li>
                        D級：較舊書況，年份較久遠，嚴重泛黃、書斑、髒污、封面或內頁磨損折痕，但仍保有閱讀價值。
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
                    <p>您可以選擇使用信用卡刷卡、銀行轉帳、超商付款取貨。</p>
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
                    <p>中華郵政、超商付款取貨等多種方式，方便您選擇。</p>
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
                      無論訂購數量多少，運費皆為固定收費 60
                      元，讓您享受透明、公平的運費價格。
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
                    <p>當日下單完成訂購，訂單將於次個工作日排入出貨流程。</p>
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
