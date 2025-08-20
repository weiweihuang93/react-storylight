import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CartPage() {
  const navigate = useNavigate();

  const [cartData, setCartData] = useState([]);

  // 取得購物車資料
  const getCartData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      console.log("getCartData", res);
      setCartData(res.data.data.carts);
    } catch (err) {
      console.log(err);
    }
  };

  const delAllCart = async () => {
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
      getCartData();
    } catch (err) {
      console.log(err);
    }
  };

  const delIdCart = async (cart_id) => {
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${cart_id}`);
      getCartData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleNextStep = () => {
    if (!user) {
      navigate(`/login?redirect=/cart/order`);
    } else {
      navigate("/cart/order");
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <>
      <section className="section-cart pb-6">
        <div className="container">
          <div className="row g-3">
            <div className="col-xl-8">
              <div className="bg-white rounded p-5 h-100">
                <div className="cart-title mb-4">
                  <h2>購物車</h2>
                  <button
                    onClick={() => delAllCart()}
                    className="btn btn-outline-danger"
                    type="button"
                  >
                    清空購物車
                  </button>
                </div>
                {/* 表頭 */}
                <div className="card-header fw-bold text-center">
                  <p className="cart-info">商品資料</p>
                  <p className="cart-price d-none d-md-block">單價</p>
                  <p className="cart-qty d-none d-md-block">數量</p>
                  <p className="cart-total">小計</p>
                  <p>刪除</p>
                </div>
                {/* 購物車列表 */}
                <div className="card-body">
                  {cartData?.map((cart) => (
                    <div className="cart-item" key={cart.id}>
                      <img
                        src={cart.product.imageUrl}
                        alt={cart.product.title}
                      />
                      <div className="cart-info">
                        <p>{cart.product.maintitle}</p>
                      </div>
                      <p className="cart-price d-none d-md-block">
                        NT${cart.product.price}
                      </p>
                      <p className="cart-qty d-none d-md-block">x {cart.qty}</p>
                      <p className="cart-total">NT${cart.total}</p>
                      <button
                        onClick={() => delIdCart(cart.id)}
                        type="button"
                        className="btn btn-sm btn-outline-danger border-0"
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="bg-white rounded border p-4 sticky">
                {/* 標題 */}
                <h5 className="mb-4 border-bottom pb-2">訂單明細</h5>

                {/* 金額清單 */}
                <div className="d-flex-between mb-3">
                  <span>總計</span>
                  <span>NT$ 2800</span>
                </div>
                <div className="d-flex-between mb-3">
                  <span>運費</span>
                  <span>NT$ 0</span>
                </div>
                <div className="d-flex-between fs-5 fw-bold mb-3">
                  <span>總金額</span>
                  <span>NT$ 2800</span>
                </div>

                {/* 優惠券 */}
                <div className="border-top py-3">
                  <label
                    htmlFor="coupon"
                    className="fs-5 fw-bold form-label text-muted"
                  >
                    折扣碼
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      id="coupon"
                      className="form-control shadow-none"
                      placeholder="請輸入折扣碼"
                    />
                    <button
                      className="btn btn-accent-100 text-white"
                      type="button"
                    >
                      <span className="material-symbols-outlined">redeem</span>
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={handleNextStep}
                className="cart-button btn btn-lg btn-accent-300 mt-4 btn-link-translateX"
              >
                下一步，填寫訂單資料
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
