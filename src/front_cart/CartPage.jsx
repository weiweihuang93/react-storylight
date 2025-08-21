import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AppContext } from "../context/AppContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CartPage() {
  const { user, cartData, getCartData } = useContext(AppContext);

  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(null);

  const delAllCart = async () => {
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
      getCartData();
    } catch (err) {}
  };

  const delIdCart = async (cart_id) => {
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${cart_id}`);
      getCartData();
    } catch (err) {}
  };

  const handleCoupon = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/coupon`, {
        data: {
          code: couponCode,
        },
      });
      setDiscount(res.data);
      alert(res.data.message);
    } catch (err) {}
  };

  const handleNextStep = () => {
    if (!user) {
      navigate(`/login?redirect=/cart/order`);
    } else {
      navigate("/cart/order");
    }
  };

  return (
    <>
      <section className="section-cart pb-6">
        <div className="container">
          <div className="row g-3">
            {cartData?.carts?.length > 0 ? (
              <>
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
                      {cartData?.carts?.map((cart) => (
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
                          <p className="cart-qty d-none d-md-block">
                            x {cart.qty}
                          </p>
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
                  <div className="sticky">
                    <div className="bg-white rounded border p-4">
                      {/* 標題 */}
                      <h3 className="border-bottom pb-2">結帳明細</h3>

                      {/* 金額清單 */}
                      <div className="py-3 border-bottom">
                        <div className="d-flex-between py-3">
                          <span>總計</span>
                          <span>NT$ {cartData.final_total}</span>
                        </div>

                        <div className="d-flex-between">
                          <span>運費</span>
                          <span>NT$ 0</span>
                        </div>
                      </div>

                      {/* 優惠券 */}
                      <div className="py-3">
                        <label
                          htmlFor="coupon"
                          className="fs-5 fw-bold form-label text-muted"
                        >
                          折扣碼
                        </label>
                        <div className="input-group">
                          <input
                            onChange={(e) => setCouponCode(e.target.value)}
                            value={couponCode}
                            type="text"
                            id="coupon"
                            className="form-control shadow-none"
                            placeholder="請輸入折扣碼"
                          />
                          <button
                            onClick={handleCoupon}
                            className="btn btn-accent-100 text-white"
                            type="button"
                          >
                            <span className="material-symbols-outlined">
                              redeem
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* 折扣 */}
                      {discount && (
                        <div className="d-flex-between text-accent-300 py-3 border-bottom">
                          <span>－ 折扣</span>
                          <span>{discount.message}</span>
                        </div>
                      )}

                      {/* 折扣後金額 */}
                      <div className="d-flex-between fs-5 fw-bold py-3">
                        <span>應付金額</span>
                        <span>
                          NT${" "}
                          {discount
                            ? discount.data.final_total
                            : cartData.final_total}
                        </span>
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
              </>
            ) : (
              <div className="col-12">
                <div className="bg-white rounded p-5 text-center">
                  <h2 className="mb-4">購物車是空的</h2>
                  <p className="text-muted mb-4">
                    您還沒有將任何商品加入購物車，快去挑選喜歡的商品吧！
                  </p>
                  <Link
                    to="/全部商品"
                    className="btn-link-style btn btn-lg btn-accent-300 mt-4 d-inline-block"
                  >
                    前往購物
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
