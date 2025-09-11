import axios from "axios";
import { BASE_URL, API_PATH } from "@/data/config";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import { useNavigate } from "react-router";

import { useDispatch } from "react-redux";
import { addToast } from "@/redux/toastSlice";

export default function PaymentPage() {
  const { order } = useContext(AppContext);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!order?.orderId) {
      navigate("/cart");
      return;
    }

    const handlePayment = async () => {
      try {
        const res = await axios.post(
          `${BASE_URL}/v2/api/${API_PATH}/pay/${order.orderId}`
        );
        dispatch(addToast(res.data));
        setTimeout(() => {
          navigate("/cart/complete", { replace: true });
        }, 2000);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "訂單付款失敗，請稍後再試";
        dispatch(addToast({ success: false, message: errorMessage }));
        setTimeout(() => navigate("/cart"), 2000);
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
