import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CategoryPage() {
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
            <div className="row g-3">
              {productsData.map((product) => (
                <div className="product-card row g-3" key={product.id}>
                  {/* 圖片區 */}
                  <div className="col-lg-4 col-sm-6 col-6 d-flex flex-column">
                    <div className="card-img-wrapper">
                      <img src={product.imageUrl} alt={product.title} />
                      <span className="card-img-tag">{product.condition}</span>
                    </div>
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

                  {/* 商品資訊 */}
                  <div className="col-lg-4 col-sm-6 col-6">
                    <div className="card-info h-100 d-flex flex-column">
                      <h3 className="fs-6 mb-2">{product.title}</h3>
                      <ul className="product-list gap-2">
                        <li className="title-cp1">ISBN：{product.isbn}</li>
                        <li className="title-cp1">作者：{product.author}</li>
                        <li className="title-cp1">
                          出版社：{product.publisher}
                        </li>
                        <li className="title-cp1">
                          出版日期：{product.publishDate}
                        </li>
                        <li className="title-cp1">
                          適讀對象：{product.audience}
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
                  <div className="col-lg-4 col-sm-12 col-12 border-custom m-0">
                    <div className="card-content">
                      <p>{product.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
