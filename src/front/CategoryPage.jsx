import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";

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

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [productsData, setProductsData] = useState([]);

  // 取得全部商品
  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/products/all`
      );
      const filter10Products = res.data.products.slice(-10);
      setProductsData(filter10Products);
    } catch (err) {}
  };

  // 取得分類商品
  const getCategoryProducts = async (category) => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`, {
        params: { category },
      });
      const filter10Products = res.data.products.slice(-10);
      setProductsData(filter10Products);
    } catch (err) {}
  };

  useEffect(() => {
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
                <h4 className="fs-6">{category.label}</h4>
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
              {productsData.map((product) => (
                <div className="col-12" key={product.id}>
                  <div className="product-card">
                    <NavLink
                      className="product-link text-dark"
                      to={`/${product.category}/${product.id}`}
                    >
                      <div className=" row g-3" key={product.id}>
                        {/* 圖片區 */}
                        <div className="col-lg-4 col-sm-6 col-6 d-flex flex-column">
                          <div className="card-img-wrapper">
                            <img src={product.imageUrl} alt={product.title} />
                            <span className="card-img-tag">
                              {product.condition}
                            </span>
                          </div>
                          <div className="card-operation mt-auto">
                            <button className="btn btn-icon">
                              <i className="material-symbols-outlined">
                                favorite
                              </i>
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
                            <h3 className="fs-5 mb-2 title-cp2 h-2em">
                              {product.title}
                            </h3>
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
                        <div className="col-lg-4 col-sm-12 col-12 border-custom">
                          <div className="card-content">
                            <p>{product.content}</p>
                          </div>
                        </div>
                      </div>
                    </NavLink>
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
