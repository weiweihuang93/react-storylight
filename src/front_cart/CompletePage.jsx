import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CompletePage() {
  const { order } = useContext(AppContext);
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    getOrderId();
  }, [order]);

  const getOrderId = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/order/${order.orderId}`
      );
      setOrderData(res.data.order);
    } catch (err) {}
  };

  return (
    <>
      <section className="section-order pb-6">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="bg-white border rounded p-5 text-center shadow-sm">
                <div className="d-flex flex-column align-items-center mb-3">
                  <span className="material-symbols-outlined fs-1 text-success bg-light rounded-circle p-3 mb-3">
                    check_circle
                  </span>
                  <h3 className="mb-0">已收到您的訂單，感謝你的購買</h3>
                </div>

                <div className="order-content bg-light border rounded p-4">
                  <h5 className="mb-3">訂單資訊</h5>
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
                    <li>
                      <span>運送方式：</span>
                      <span>{orderData.shippingMethod || "宅配"}</span>
                    </li>
                    <li className="d-flex justify-content-between text-danger">
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

                <div className="order-content mt-4 p-4 border rounded bg-light">
                  <h5 className="mb-3">訂單明細</h5>
                  <ul className="order-list">
                    {orderData.products &&
                      Object.values(orderData.products).map((item) => (
                        <li key={item.product_id}>
                          <span>
                            {item.product?.title || "商品名稱"} x{" "}
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
