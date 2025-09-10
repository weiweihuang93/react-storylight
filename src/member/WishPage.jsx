import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addToast } from "../redux/toastSlice";

const GOOGLE_BOOKS_API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export default function WishPage() {
  const [requests, setRequests] = useState([]);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    // 模擬提交延遲
    setTimeout(() => {
      dispatch(addToast({ success: true, message: "徵求提交成功！" }));

      // 更新本地狀態模擬列表
      setRequests((prev) => [...prev, { ...data, id: Date.now() }]);

      // 重置表單
      reset();
    }, 500);
  };

  const handleFromISBN = async () => {
    const isbn = watch("isbn");
    if (!isbn) {
      dispatch(addToast({ success: false, message: "請先輸入ISBN" }));
      return;
    }
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${GOOGLE_BOOKS_API_KEY}`
      );
      const apiBook = res.data.items?.[0];
      if (!apiBook) {
        dispatch(
          addToast({
            success: false,
            message: "查無資料，請確認 ISBN 是否正確",
          })
        );
        return;
      }

      setValue("title", apiBook.volumeInfo.title || "", {
        shouldValidate: true,
      });
      setValue("author", apiBook.volumeInfo.authors?.[0] || "", {
        shouldValidate: true,
      });
      setValue("publisher", apiBook.volumeInfo.publisher || "", {
        shouldValidate: true,
      });
      dispatch(
        addToast({
          success: true,
          message: `找到 ${res.data.totalItems} 筆資料，已成功套用`,
        })
      );
    } catch (err) {
      dispatch(
        addToast({
          success: false,
          message: "搜尋時發生錯誤，請稍後再試",
        })
      );
    }
  };

  return (
    <section className="section-order py-6">
      <div className="container">
        <div className="row justify-content-center g-4">
          {/* 模擬已提交列表 */}
          <div className="col-12">
            <div className="card-base p-4 h-100">
              <h2 className="fs-5 text-center mb-4">許願池</h2>
              {requests.length > 0 ? (
                <div className="row g-3">
                  {requests.map((r) => (
                    <div key={r.id} className="col-12 col-md-4">
                      <div className="card p-3 h-100">
                        <h6 className="mb-1">{r.title}</h6>
                        <p className="mb-1">{r.author}</p>
                        <p className="mb-0">{r.price} 元</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted mt-3 text-center">
                  目前還沒有徵求紀錄
                </p>
              )}
            </div>
          </div>

          {/* 表單 */}
          <div className="col-12">
            <div className="card-base p-4 h-100">
              <h1 className="fs-5 text-center mb-4">新增徵求</h1>
              <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                  <label htmlFor="title" className="form-label fw-bold mb-2">
                    書名
                  </label>
                  <input
                    {...register("title", {
                      required: "請輸入書名",
                      minLength: { value: 2, message: "書名最少2個字" },
                      maxLength: { value: 40, message: "書名最多40個字" },
                    })}
                    id="title"
                    type="text"
                    className="form-control"
                    placeholder="請輸入書名"
                  />
                  {errors?.title && (
                    <p className="text-danger my-2">{errors.title.message}</p>
                  )}
                </div>

                <div className="col-12">
                  <label htmlFor="isbn" className="form-label fw-bold mb-2">
                    ISBN
                  </label>
                  <div className="input-group">
                    <input
                      {...register("isbn", {
                        required: "請輸入ISBN",
                        pattern: {
                          value: /^(97(8|9))?\d{9}(\d|X)$/,
                          message: "請輸入正確的ISBN格式",
                        },
                      })}
                      id="isbn"
                      type="text"
                      className="form-control"
                      placeholder="請輸入ISBN書碼"
                    />
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleFromISBN}
                    >
                      搜尋
                    </button>
                  </div>
                  {errors?.isbn && (
                    <p className="text-danger my-2">{errors.isbn.message}</p>
                  )}
                </div>

                {/* 作者、出版社、價格、聯絡人 */}
                <div className="col-md-6">
                  <label htmlFor="author" className="form-label fw-bold mb-2">
                    作者
                  </label>
                  <input
                    {...register("author", {
                      required: "請輸入作者",
                      minLength: { value: 2, message: "作者最少2個字" },
                      maxLength: { value: 20, message: "作者最多20個字" },
                    })}
                    id="author"
                    type="text"
                    className="form-control"
                    placeholder="請輸入作者"
                  />
                  {errors?.author && (
                    <p className="text-danger my-2">{errors.author.message}</p>
                  )}
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="publisher"
                    className="form-label fw-bold mb-2"
                  >
                    出版社
                  </label>
                  <input
                    {...register("publisher", {
                      required: "請輸入出版社",
                      minLength: { value: 2, message: "出版社最少2個字" },
                      maxLength: { value: 20, message: "出版社最多20個字" },
                    })}
                    id="publisher"
                    type="text"
                    className="form-control"
                    placeholder="請輸入出版社"
                  />
                  {errors?.publisher && (
                    <p className="text-danger my-2">
                      {errors.publisher.message}
                    </p>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="price" className="form-label fw-bold mb-2">
                    期望價格
                  </label>
                  <input
                    {...register("price", {
                      required: "請輸入期望價格",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "價格只能輸入數字",
                      },
                      min: { value: 100, message: "最低價格為100元" },
                      max: { value: 9999, message: "最高價格為9999元" },
                    })}
                    id="price"
                    type="number"
                    className="form-control"
                    placeholder="請輸入期望價格"
                  />
                  {errors?.price && (
                    <p className="text-danger my-2">{errors.price.message}</p>
                  )}
                </div>

                <div className="col-12">
                  <label htmlFor="remark" className="form-label fw-bold mb-2">
                    備註
                  </label>
                  <textarea
                    {...register("remark")}
                    id="remark"
                    className="form-control"
                    rows="3"
                    placeholder="填寫更多細節，如是否接受劃線書況等"
                  ></textarea>
                </div>

                <div className="col-md-6">
                  <label htmlFor="name" className="form-label fw-bold mb-2">
                    聯絡人姓名
                  </label>
                  <input
                    {...register("name", {
                      required: "請輸入聯絡人",
                      minLength: { value: 2, message: "姓名最少2個字" },
                    })}
                    id="name"
                    type="text"
                    className="form-control"
                    placeholder="請輸入聯絡人姓名"
                  />
                  {errors?.name && (
                    <p className="text-danger my-2">{errors.name.message}</p>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="tel" className="form-label fw-bold mb-2">
                    電話
                  </label>
                  <input
                    {...register("tel", {
                      required: "請輸入您的電話",
                      pattern: {
                        value: /^(0[2-8]\d{7}|09\d{8})$/,
                        message: "請輸入有效的電話格式",
                      },
                    })}
                    id="tel"
                    type="tel"
                    className="form-control"
                    placeholder="請輸入您的電話"
                  />
                  {errors?.tel && (
                    <p className="text-danger my-2">{errors.tel.message}</p>
                  )}
                </div>

                <div className="col-12 text-center mt-7">
                  <button
                    disabled={!isValid}
                    type="submit"
                    className="btn btn-lg btn-accent-300 w-100"
                  >
                    提交徵求
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
