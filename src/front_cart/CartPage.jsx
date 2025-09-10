import axios from "axios";
import { BASE_URL, API_PATH } from "../data/config";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AppContext } from "../context/AppContext";
import ScreenLoading from "../components/ScreenLoading";

import { useDispatch } from "react-redux";
import { addToast } from "../redux/toastSlice";

export default function CartPage() {
  const { user, cartData, getCartData, isScreenLoading, setIsScreenLoading } =
    useContext(AppContext);

  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(null);

  const dispatch = useDispatch();

  const delAllCart = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
      dispatch(addToast(res.data));
      await getCartData();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "清空失敗，請稍後再試";
      dispatch(addToast({ success: false, message: errorMessage }));
    } finally {
      setIsScreenLoading(false);
    }
  };

  const delIdCart = async (cart_id) => {
    setIsScreenLoading(true);
    try {
      const res = await axios.delete(
        `${BASE_URL}/v2/api/${API_PATH}/cart/${cart_id}`
      );
      dispatch(addToast(res.data));
      await getCartData();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "刪除失敗，請稍後再試";
      dispatch(addToast({ success: false, message: errorMessage }));
    } finally {
      setIsScreenLoading(false);
    }
  };

  const handleCoupon = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/coupon`, {
        data: {
          code: couponCode.trim(),
        },
      });
      setDiscount(res.data);
      dispatch(addToast(res.data));
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "套用優惠券失敗，請稍後再試";
      dispatch(addToast({ success: false, message: errorMessage }));
    } finally {
      setIsScreenLoading(false);
    }
  };

  const handleNextStep = () => {
    if (!user.username) {
      navigate(`/login?redirect=/cart/order`);
    } else {
      navigate("/cart/order");
    }
  };

  return (
    <>
      {isScreenLoading && <ScreenLoading />}
      <section className="section-cart pb-6">
        <div className="container">
          <div className="row g-3">
            {cartData.carts.length > 0 ? (
              <>
                <div className="col-xl-8">
                  <div className="card-base p-5 h-100">
                    <div className="cart-title mb-4">
                      <h2 className="fs-4">購物車</h2>
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
                      {cartData.carts.map((cart) => (
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
                    <div className="card-base border p-5">
                      {/* 標題 */}
                      <h3 className="fs-4 pb-2 border-bottom">結帳明細</h3>

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
                            disabled={!couponCode}
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
                      className="btn-transX cart-button btn btn-accent-300 mt-4"
                    >
                      下一步，填寫訂單資料
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="col-12">
                <div className="card-base text-center p-5">
                  <h2 className="fs-4 mb-4">購物車是空的</h2>
                  <p className="text-muted mb-4">
                    您還沒有將任何商品加入購物車，快去挑選喜歡的商品吧！
                  </p>
                  <Link
                    to="/全部商品"
                    className="btn-transX btn btn-accent-300 mt-4 d-inline-block"
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
