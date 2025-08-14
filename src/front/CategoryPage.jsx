export default function CategoryPage() {
  return (
    <>
      <section className="category-navbar py-5">
        <div className="container">
          {/* 分類按鈕 */}
          <div className="d-flex gap-2  overflow-auto">
            <a className="category-button text-nowrap">
              <span className="material-symbols-outlined"></span>
              <h4 className="fs-6">全部</h4>
            </a>
            <a className="category-button text-nowrap">
              <span className="material-symbols-outlined">nature_people</span>
              <h4 className="fs-6">親子</h4>
            </a>
            <a className="category-button text-nowrap">
              <span className="material-symbols-outlined">query_stats</span>
              <h4 className="fs-6">商業</h4>
            </a>
            <a className="category-button text-nowrap">
              <span className="material-symbols-outlined">palette</span>
              <h4 className="fs-6">藝術</h4>
            </a>
            <a className="category-button text-nowrap">
              <span className="material-symbols-outlined">people</span>
              <h4 className="fs-6">社會</h4>
            </a>
            <a className="category-button text-nowrap">
              <span className="material-symbols-outlined">build</span>
              <h4 className="fs-6">應用</h4>
            </a>
            <a className="category-button text-nowrap">
              <span className="material-symbols-outlined">wb_sunny</span>
              <h4 className="fs-6">自然</h4>
            </a>
            <a className="category-button text-nowrap">
              <span className="material-symbols-outlined">
                sports_martial_arts
              </span>
              <h4 className="fs-6">生活</h4>
            </a>
            <a className="category-button text-nowrap">
              <span className="material-symbols-outlined">account_balance</span>
              <h4 className="fs-6">宗教</h4>
            </a>
            <a className="category-button text-nowrap">
              <span className="material-symbols-outlined">psychology</span>
              <h4 className="fs-6">哲學</h4>
            </a>
            <a className="category-button text-nowrap">
              <span className="material-symbols-outlined">book_3</span>
              <h4 className="fs-6">文學</h4>
            </a>
            <a className="category-button text-nowrap">
              <span className="material-symbols-outlined">book_3</span>
              <h4 className="fs-6">工具</h4>
            </a>
            <a className="category-button text-nowrap">
              <span className="material-symbols-outlined">more_horiz</span>
              <h4 className="fs-6">查看</h4>
            </a>
          </div>
        </div>
      </section>

      {/* 產品卡片 */}
      <section className="section-product">
        <div className="bg-neutral-100 py-6">
          <div className="container">
            <div className="product-card">
              <div className="row">
                {/* 圖片區 */}
                <div className="col-lg-4 col-6">
                  {/* 圖片區 + 書況標籤 */}
                  <div className="card-img-wrapper">
                    <img src="./images/book.png" alt="book" />
                    <span className="card-img-tag">A</span>
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
                {/* 商品資訊 */}
                <div className="col-lg-4 col-6">
                  <div className="card-info h-100 d-flex flex-column">
                    <h3 className="fs-6 mb-2">
                      被討厭的勇氣：自我啟發之父「阿德勒」的教導
                    </h3>
                    <ul>
                      <li>ISBN：9789866481451</li>
                      <li>作者：蔣志榆</li>
                      <li>出版社：我識</li>
                      <li>出版日期：2014/01/15</li>
                      <li>適讀對象：成人(一般)</li>
                    </ul>
                    <p className="fs-5 text-danger fw-bold text-center mt-auto">
                      <span className="material-symbols-outlined text-primary fs-5">
                        paid
                      </span>
                      300
                    </p>
                  </div>
                </div>
                {/* Content 區 */}
                <div className="col-lg-4">
                  <div className="card-content h-100">
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing
                      elit...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
