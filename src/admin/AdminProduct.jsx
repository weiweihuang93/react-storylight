import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const categories = [
  { label: "全部", api: "全部商品", icon: "category" },
  { label: "親子", api: "親子童書", icon: "nature_people" },
  { label: "商業", api: "商業理財", icon: "query_stats" },
  { label: "藝術", api: "藝術領域", icon: "palette" },
  { label: "社會", api: "社會科學", icon: "people" },
  { label: "心理", api: "心理勵志", icon: "favorite" },
  { label: "自然", api: "自然科學", icon: "wb_sunny" },
  { label: "生活", api: "生活休閒", icon: "sports_martial_arts" },
  { label: "宗教", api: "宗教文化", icon: "temple_buddhist" },
  { label: "哲學", api: "哲學思想", icon: "psychology" },
  { label: "文學", api: "文學小說", icon: "history_edu" },
  { label: "學習", api: "工具學習", icon: "book_3" },
];

export default function AdminProduct() {
  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/products/all`
      );
      setAllProducts(Object.values(res.data.products));
    } catch (err) {}
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <section className="section-seller py-3 vh-100">
        <div className="container">
          <div className="dashboard-card mb-5">
            <h2 className="fs-4 mb-3">儀錶板</h2>
            <ul className="card-list">
              <li>
                <p className="fs-5 text-accent-300 fw-bold">100本</p>
                <p>上架數量</p>
              </li>
              <li>
                <p className="fs-5 text-accent-300 fw-bold">10</p>
                <p>售完數量</p>
              </li>
              <li>
                <p className="fs-5 text-accent-300 fw-bold">100本</p>
                <p>啟用數量</p>
              </li>
              <li>
                <p className="fs-5 text-accent-300 fw-bold">100本</p>
                <p>未啟用數量</p>
              </li>
            </ul>
          </div>
          <div className="dashboard-card">
            <h2 className="fs-4 mb-3">商品管理</h2>
            <div className="row g-3">
              <div className="col-12 col-md-5">
                <div className="form-search d-flex w-100">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="請輸入書名"
                  />
                  <button className="btn">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-5">
                <select className="form-select">
                  <option disabled>請選擇分類</option>
                  {categories.map((category) => (
                    <option key={category.api}>{category.api}</option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2">
                <button className="btn btn-accent-100 w-100 text-white">
                  新增產品
                </button>
              </div>
              {/* 商品資料渲染 */}
              <div className="col-12">
                {/* 標題 */}
                <div className="product-header py-3">
                  <span className="product-name">產品名稱</span>
                  <span className="product-price d-none d-md-flex">
                    <button>▼</button>
                    售價
                    <button>▲</button>
                  </span>
                  <span className="product-qty d-none d-md-block">數量</span>
                  <span className="product-status d-none d-md-block">狀態</span>
                  <span className="product-action">操作</span>
                </div>
                {/* 內容 */}
                <div className="product-body">
                  {allProducts &&
                    allProducts.map((product) => (
                      <div className="product-item py-3">
                        <span className="product-name">
                          {product.title}
                          <small className="tag-category ms-2">
                            {product.category}
                          </small>
                        </span>
                        <span className="product-price d-none d-md-block">
                          {product.price}
                        </span>
                        <span className="product-qty d-none d-md-block">
                          {product.num}
                        </span>
                        <span
                          className={`product-status d-none d-md-block ${
                            product.is_enabled
                              ? "text-success fw-bold"
                              : "text-danger fw-bold"
                          }`}
                        >
                          {product.is_enabled ? "已啟用" : "未啟用"}
                        </span>
                        <span className="product-action">
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary ">
                              編輯
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              刪除
                            </button>
                          </div>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
