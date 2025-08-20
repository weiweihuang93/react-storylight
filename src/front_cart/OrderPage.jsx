export default function OrderPage() {
  return (
    <>
      <section className="section-order pb-6">
        <div className="container">
          <form>
            <div className="row justify-content-center g-3">
              {/* 付款方式 */}
              <div className="col-lg-8">
                <div className="bg-white border rounded p-5 shadow-sm">
                  <h3 className="mb-4">付款方式</h3>
                  <div className="d-flex flex-column gap-3 p-3">
                    <label className="d-flex align-items-center">
                      <input type="radio" value="creditcard" className="me-2" />
                      信用卡
                    </label>
                    <label className="d-flex align-items-center">
                      <input type="radio" value="atm" className="me-2" />
                      ATM轉帳
                    </label>
                  </div>
                  {/* 信用卡付款欄位 */}
                  {/* ATM付款欄位 */}
                </div>
              </div>

              {/* 訂單資料 */}
              <div className="col-lg-8">
                <div className="bg-white border rounded p-5 shadow-sm">
                  <h3 className="mb-4">訂購人資訊</h3>
                  <div className="d-flex flex-column gap-3">
                    <div>
                      <label
                        htmlFor="email"
                        className="form-label fw-bold mb-1"
                      >
                        Email
                      </label>
                      <input
                        className="form-control"
                        id="email"
                        type="email"
                        placeholder="請輸入Email"
                      />
                    </div>
                    <div>
                      <label htmlFor="name" className="form-label fw-bold mb-1">
                        姓名
                      </label>
                      <input
                        className="form-control"
                        id="name"
                        type="text"
                        placeholder="請輸入姓名"
                      />
                    </div>
                    <div>
                      <label htmlFor="tel" className="form-label fw-bold mb-1">
                        電話
                      </label>
                      <input
                        className="form-control"
                        id="tel"
                        type="tel"
                        placeholder="請輸入電話"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="form-label fw-bold mb-1"
                      >
                        地址
                      </label>
                      <input
                        className="form-control"
                        id="address"
                        type="text"
                        placeholder="請輸入地址"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="form-label fw-bold mb-1"
                      >
                        訂單備註
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        cols="30"
                        rows="4"
                        placeholder="請輸入訂單備註"
                      ></textarea>
                    </div>
                  </div>

                  {/* 送出按鈕 */}
                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-lg btn-accent-300 w-100"
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
