import axios from "axios";
import { BASE_URL, API_PATH } from "../data/config";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router";

export default function PaymentPage() {
  const { order } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!order?.orderId) {
      navigate("/cart");
    }
    const handlePayment = async () => {
      try {
        await axios.post(`${BASE_URL}/v2/api/${API_PATH}/pay/${order.orderId}`);
        navigate("/cart/complete", { replace: true });
      } catch (err) {
        console.error("付款失敗", err);
        navigate("/cart");
      }
    };

    const timer = setTimeout(handlePayment, 3000);
    return () => clearTimeout(timer);
  }, [order]);

  return (
    <>
      <section className="section-order pb-6">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="bg-white border rounded p-5 text-center shadow-sm">
                <h3 className="mb-5">正在處理付款...</h3>
                <h5 className="mb-5">訂單編號：{order.orderId}</h5>
                <p className="mb-5">請稍候，我們正在處理您的付款。</p>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
