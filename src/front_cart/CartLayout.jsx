import { Outlet, useLocation } from "react-router";

export default function CartLayout() {
  const location = useLocation();

  const steps = [
    { path: "/cart", title: "確認商品" },
    { path: "/cart/order", title: "填寫訂單" },
    { path: "/cart/payment", title: "訂單付款" },
    { path: "/cart/complete", title: "訂單完成" },
  ];

  return (
    <>
      <div className="bg-neutral-100">
        <section className="section-progress py-6">
          <div className="container">
            <div className="row row-cols-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`col ${location.pathname === step.path ? "active" : ""}`}
                >
                  <div className="circle">{index + 1}</div>
                  <div className="title">
                    <h1 className="fs-6">{step.title}</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Outlet />
      </div>
    </>
  );
}
