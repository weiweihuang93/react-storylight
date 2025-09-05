import axios from "axios";
import { BASE_URL, API_PATH } from "../data/config";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router";

export default function CompletePage() {
  const { order } = useContext(AppContext);
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    if (!order?.orderId) {
      navigate("/cart");
      return;
    }
    const getOrderId = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/v2/api/${API_PATH}/order/${order.orderId}`
        );
        setOrderData(res.data.order);
      } catch (err) {
        console.error("取得訂單失敗", err);
        navigate("/cart");
      }
    };
    getOrderId();
  }, [order]);

  return (
    <>
      <section className="section-order pb-6">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card-base border text-center p-5">
                <div className="mb-3">
                  <span className="material-symbols-outlined icon-circle fs-1 mb-3">
                    check_circle
                  </span>
                  <h2 className="fs-4">
                    已收到您的訂單，
                    <span className="d-block d-lg-inline">感謝你的購買</span>
                  </h2>
                </div>

                <div className="order-content bg-light border rounded p-5 mb-3">
                  <h3 className="fs-5 mb-3">訂單資訊</h3>
                  <ul className="order-list">
                    <li>
                      <span>訂單編號：</span>
                      <span>{orderData.id}</span>
                    </li>
                    <li>
                      <span>訂單時間：</span>
                      <span>
                        {new Date(orderData.create_at * 1000).toLocaleString()}
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
                      <span>{orderData.is_paid ? "已付款" : "未付款"}</span>
                    </li>
                    <li>
                      <span>備註訊息：</span>
                      <span>{orderData.message || "-"}</span>
                    </li>
                  </ul>
                </div>

                <div className="order-content bg-light border rounded p-5">
                  <h3 className="fs-5 mb-3">訂單明細</h3>
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

                <div className="mt-5">
                  <Link to="/" className="btn btn-lg btn-accent-300 w-100">
                    返回首頁
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
