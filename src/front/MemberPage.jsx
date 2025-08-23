import axios from "axios";
import { BASE_URL, API_PATH } from "../data/config";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router";

export default function MemberPage() {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [orderData, setOrderData] = useState({});

  // 搜尋訂單
  const handleSearch = async () => {
    if (!search) return;
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/order/${search}`
      );
      setOrderData(res.data.order);
    } catch (err) {
      console.error(err);
    }
  };

  // 基本驗證：如果沒登入就跳轉
  useEffect(() => {
    if (!user?.username) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  return (
    <>
      <main className="bg-neutral-100">
        <div className="py-6">
          <nav className="d-flex justify-content-center gap-3 mb-4">
            <button className="btn btn-outline-secondary">我的帳戶</button>
            <button className="btn btn-accent-300 active">訂單紀錄</button>
          </nav>
          <section className="section-order">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="card-base p-5">
                    <h1 className="fs-4 mb-4">訂單紀錄</h1>

                    {/* 搜尋框 */}
                    <div className="form-search d-flex w-100 mb-4">
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="search"
                        className="form-control"
                        placeholder="請輸入訂單編號"
                      />
                      <button className="btn" onClick={handleSearch}>
                        <span className="material-symbols-outlined">
                          search
                        </span>
                      </button>
                    </div>

                    {orderData?.id ? (
                      <>
                        <div className="order-content bg-light border rounded p-5 mb-3">
                          <h2 className="fs-5 mb-3">訂單資訊</h2>
                          <ul className="order-list">
                            <li>
                              <span>訂單編號：</span>
                              <span>{orderData.id}</span>
                            </li>
                            <li>
                              <span>訂單時間：</span>
                              <span>
                                {new Date(
                                  orderData.create_at * 1000
                                ).toLocaleString()}
                              </span>
                            </li>
                            <li className="text-danger">
                              <span>預計出貨時間：</span>
                              <span>1 個工作天內</span>
                            </li>
                            <li>
                              <span>總金額：</span>
                              <span>{orderData.total}</span>
                            </li>
                            <li>
                              <span>付款狀態：</span>
                              <span>
                                {orderData.is_paid ? "已付款" : "未付款"}
                              </span>
                            </li>
                            <li>
                              <span>備註訊息：</span>
                              <span>{orderData.message || "-"}</span>
                            </li>
                          </ul>
                        </div>

                        <div className="order-content bg-light border rounded p-5">
                          <h2 className="fs-5 mb-3">訂單明細</h2>
                          <ul className="order-list">
                            {orderData.products &&
                              Object.values(orderData.products).map((item) => (
                                <li key={item.product_id}>
                                  <span>
                                    {item.product?.maintitle || "商品名稱"} x{" "}
                                    {item.qty || 1}
                                  </span>
                                  <span>NT$ {item.final_total || 0}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <p className="text-danger">
                        請輸入訂單編號以查詢您的訂單。
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
