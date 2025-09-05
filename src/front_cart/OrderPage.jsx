import axios from "axios";
import { BASE_URL, API_PATH } from "../data/config";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router";

export default function OrderPage() {
  const { user, cartData, setCartData, setOrder } = useContext(AppContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  // 即時監聽付款方式 運送方式
  const paymentMethod = watch("paymentMethod");
  const shippingMethod = watch("shippingMethod");

  const onSubmit = (data) => {
    const {
      name,
      email,
      tel,
      address,
      message,
      paymentMethod,
      shippingMethod,
    } = data;

    const userData = {
      data: {
        user: { name, email, tel, address },
        message,
      },
    };
    submitOrder(userData);
    reset();
  };

  const submitOrder = async (data) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/v2/api/${API_PATH}/order`,
        data
      );
      setOrder(res.data);
      setCartData({ carts: [] });
      navigate("/cart/payment");
    } catch (err) {}
  };

  useEffect(() => {
    if (!user) {
      navigate(`/login?redirect=/cart/order`);
    } else if (cartData.carts.length === 0) {
      navigate("/cart");
    }
  }, []);

  return (
    <>
      <section className="section-order pb-6">
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row justify-content-center g-3">
              {/* 付款方式 */}
              <div className="col-lg-8">
                <div className="card-base p-5">
                  <h2 className="fs-4 mb-4">付款方式</h2>
                  <div className="form-group p-3">
                    {/* 信用卡 */}
                    <div className="mb-3">
                      <label className="d-flex align-items-center">
                        <input
                          {...register("paymentMethod", {
                            required: "請選擇付款方式",
                          })}
                          type="radio"
                          value="creditCard"
                          className="me-2"
                        />
                        信用卡
                      </label>

                      {/* 信用卡付款欄位 */}
                      {paymentMethod === "creditCard" && (
                        <div className="border p-5 mt-3">
                          <h3 className="fs-5 mb-3">信用卡資訊</h3>

                          {/* 卡號 */}
                          <div className="mb-3">
                            <label className="form-label">信用卡號</label>
                            <input
                              type="text"
                              placeholder="請輸入卡號"
                              className="form-control"
                              {...register("creditCardNumber", {
                                required: "信用卡號必填",
                                pattern: {
                                  value: /^\d{16}$/,
                                  message: "信用卡號格式錯誤，需為 16 位數字",
                                },
                              })}
                            />
                            {errors.creditCardNumber && (
                              <p className="text-danger my-2">
                                {errors.creditCardNumber.message}
                              </p>
                            )}
                          </div>

                          {/* 持卡人 */}
                          <div className="mb-3">
                            <label className="form-label">持卡人姓名</label>
                            <input
                              type="text"
                              placeholder="請輸入持卡人姓名"
                              className="form-control"
                              {...register("cardHolder", {
                                required: "持卡人姓名必填",
                                minLength: {
                                  value: 2,
                                  message: "姓名至少需 2 個字",
                                },
                                pattern: {
                                  value: /^[^\d]+$/,
                                  message: "姓名不能包含數字",
                                },
                              })}
                            />
                            {errors.cardHolder && (
                              <p className="text-danger my-2">
                                {errors.cardHolder.message}
                              </p>
                            )}
                          </div>

                          {/* 有效期限 + CVC */}
                          <div className="row">
                            <div className="col">
                              <label className="form-label">有效期限</label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="form-control"
                                {...register("expiryDate", {
                                  required: "有效期限必填",
                                  pattern: {
                                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                    message: "格式必須為 MM/YY",
                                  },
                                })}
                              />
                              {errors.expiryDate && (
                                <p className="text-danger my-2">
                                  {errors.expiryDate.message}
                                </p>
                              )}
                            </div>

                            <div className="col">
                              <label className="form-label">CVC</label>
                              <input
                                type="text"
                                placeholder="三位數"
                                className="form-control"
                                {...register("cvc", {
                                  required: "CVC 必填",
                                  pattern: {
                                    value: /^[0-9]{3}$/,
                                    message: "CVC 必須為 3 位數字",
                                  },
                                })}
                              />
                              {errors.cvc && (
                                <p className="text-danger my-2">
                                  {errors.cvc.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ATM */}
                    <div className="mb-3">
                      <label className="d-flex align-items-center">
                        <input
                          {...register("paymentMethod", {
                            required: "請選擇付款方式",
                          })}
                          type="radio"
                          value="atm"
                          className="me-2"
                        />
                        ATM 轉帳
                      </label>

                      {/* ATM付款欄位 */}
                      {paymentMethod === "atm" && (
                        <div className="border p-5 mt-3">
                          <h3 className="fs-5">ATM 轉帳資訊</h3>
                          <p>
                            銀行代碼：<strong>123</strong>
                          </p>
                          <p>
                            帳戶號碼：<strong>9876543210</strong>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* 表單錯誤提示 */}
                    {errors?.paymentMethod && (
                      <p className="text-danger my-2">
                        {errors.paymentMethod.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* 運送方式 */}
              <div className="col-lg-8">
                <div className="card-base p-5">
                  <h2 className="fs-4 mb-4">運送方式</h2>
                  <div className="form-group p-3">
                    {/* 賣家宅配 */}
                    <div className="mb-3">
                      <label className="d-flex align-items-center">
                        <input
                          {...register("shippingMethod", {
                            required: "請選擇運送方式",
                          })}
                          type="radio"
                          value="homedelivery"
                          className="me-2"
                        />
                        賣家宅配
                      </label>
                    </div>

                    {/* 超商取貨 */}
                    <div className="mb-3">
                      <label className="d-flex align-items-center">
                        <input
                          {...register("shippingMethod", {
                            required: "請選擇運送方式",
                          })}
                          type="radio"
                          value="storedelivery"
                          className="me-2"
                        />
                        超商取貨
                        <small className="ms-3 text-muted">需先付款</small>
                      </label>
                    </div>
                    {/* 表單錯誤提示 */}
                    {errors?.shippingMethod && (
                      <p className="text-danger my-2">
                        {errors.shippingMethod.message}
                      </p>
                    )}
                  </div>

                  {/* 超商取貨付款欄位 watch */}
                  {shippingMethod === "storedelivery" && (
                    <div className="bg-light rounded p-3">
                      <div className="mb-3">
                        <label className="form-label">收件人</label>
                        <input
                          {...register("receiverName", {
                            required: "請輸入收件人",
                            minLength: {
                              value: 2,
                              message: "收件人至少需 2 個字",
                            },
                            pattern: {
                              value: /^[^\d]+$/, // 不允許數字
                              message: "收件人不能包含數字",
                            },
                          })}
                          type="text"
                          className="form-control"
                          placeholder="請輸入收件人"
                        />

                        {errors?.receiverName && (
                          <p className="text-danger my-2">
                            {errors.receiverName.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">手機號碼</label>
                        <input
                          {...register("receiverPhone", {
                            required: "請輸入手機號碼",
                            pattern: {
                              value: /^09\d{8}$/,
                              message:
                                "請輸入有效的手機號碼 (例如：0912345678)",
                            },
                          })}
                          type="text"
                          className="form-control"
                          placeholder="請輸入手機號碼"
                        />
                        {errors?.receiverPhone && (
                          <p className="text-danger my-2">
                            {errors.receiverPhone.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">超商門市</label>
                        <input
                          {...register("storeName", {
                            required: "請輸入超商門市",
                          })}
                          type="text"
                          className="form-control"
                          placeholder="請輸入超商門市"
                        />
                        {errors?.storeName && (
                          <p className="text-danger my-2">
                            {errors.storeName.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 訂單資料 */}
              <div className="col-lg-8">
                <div className="card-base p-5">
                  <h2 className="fs-4 mb-4">訂購人資訊</h2>
                  <div className="form-group p-3">
                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="form-label fw-bold mb-2"
                      >
                        Email
                      </label>
                      <input
                        {...register("email", {
                          required: "Email欄位必填",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Email格式錯誤",
                          },
                        })}
                        id="email"
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        placeholder="請輸入Email"
                      />
                      {errors?.email && (
                        <p className="text-danger my-2">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label fw-bold mb-2">
                        姓名
                      </label>
                      <input
                        {...register("name", {
                          required: "姓名欄位必填",
                          minLength: {
                            value: 2,
                            message: "姓名至少需 2 個字",
                          },
                          pattern: {
                            value: /^[^\d]+$/, // 不允許數字
                            message: "姓名不能包含數字",
                          },
                        })}
                        id="name"
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        placeholder="請輸入姓名"
                      />
                      {errors?.name && (
                        <p className="text-danger my-2">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tel" className="form-label fw-bold mb-2">
                        電話
                      </label>
                      <input
                        {...register("tel", {
                          required: "電話欄位必填",
                          pattern: {
                            value: /^(0[2-8]\d{7}|09\d{8})$/,
                            message: "電話格式錯誤",
                          },
                        })}
                        id="tel"
                        type="tel"
                        className={`form-control ${errors.tel ? "is-invalid" : ""}`}
                        placeholder="請輸入電話"
                      />
                      {errors?.tel && (
                        <p className="text-danger my-2">{errors.tel.message}</p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="address"
                        className="form-label fw-bold mb-2"
                      >
                        地址
                      </label>
                      <input
                        {...register("address", {
                          required: "地址欄位必填",
                          minLength: { value: 5, message: "地址至少需 5 個字" },
                          pattern: {
                            value: /^[\u4e00-\u9fa5A-Za-z0-9\s\-]+$/,
                            message: "地址格式不正確",
                          },
                        })}
                        id="address"
                        type="text"
                        className={`form-control ${errors.address ? "is-invalid" : ""}`}
                        placeholder="請輸入地址"
                      />
                      {errors?.address && (
                        <p className="text-danger my-2">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="message"
                        className="form-label fw-bold mb-2"
                      >
                        訂單備註
                      </label>
                      <textarea
                        {...register("message")}
                        id="message"
                        className="form-control"
                        cols="30"
                        rows="4"
                        placeholder="請輸入留言"
                      ></textarea>
                    </div>
                  </div>

                  {/* 送出按鈕 */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-accent-300 w-100"
                      disabled={!isValid}
                    >
                      送出訂單
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
