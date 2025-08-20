export default function CompletePage() {
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

                <div className="order-content mt-4 p-4 border rounded bg-light">
                  <h5 className="mb-3">訂單資訊</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex justify-content-between">
                      <span>訂單編號：</span>
                      <span>123456789</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      <span>訂單時間：</span>
                      <span>2025-08-20 14:30</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      <span>運送方式：</span>
                      <span>宅配</span>
                    </li>
                    <li className="d-flex justify-content-between text-danger">
                      <span>預計出貨時間：</span>
                      <span>2-3 個工作天內</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      <span>總金額：</span>
                      <span>NT$ 3,500</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      <span>付款狀態：</span>
                      <span>已付款</span>
                    </li>
                  </ul>
                </div>

                <div className="order-content mt-4 p-4 border rounded bg-light">
                  <h5 className="mb-3">訂單明細</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex justify-content-between">
                      <span>商品名稱 A x1</span>
                      <span>NT$ 1,500</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      <span>商品名稱 B x2</span>
                      <span>NT$ 2,000</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-5">
                  <a href="/" className="btn btn-lg btn-accent-300 w-100">
                    返回首頁
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
