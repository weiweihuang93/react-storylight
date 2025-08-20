export default function PaymentPage() {
  return (
    <>
      <section className="section-order pb-6">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="bg-white border rounded p-5 text-center shadow-sm">
                <h3 className="mb-5">正在處理付款...</h3>
                <h5 className="mb-5">訂單編號：</h5>
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
