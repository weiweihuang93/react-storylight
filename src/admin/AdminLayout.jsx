import { useEffect } from "react";
import { NavLink, Outlet } from "react-router";

const AdminRoutes = [
  { path: "/admin/order", name: "訂單管理" },
  { path: "/admin/product", name: "商品管理" },
];

export default function AdminLayout() {
  useEffect(() => {
    // 設置 body 背景色
    document.body.style.backgroundColor = "#F8F9FA";
    // 可選：設置最小高度
    document.body.style.minHeight = "100vh";

    // 組件卸載時清理
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.minHeight = "";
    };
  }, []);

  return (
    <>
      <main className="main">
        <div className="container py-3">
          <div className="row g-3">
            <div className="col-lg-3">
              <aside className="section-aside py-3">
                <h3 className="fs-5 text-center">您好，管理員　：）</h3>
                <ul className="list-group py-5">
                  {AdminRoutes.map((route) => (
                    <li className="nav-item" key={route.path}>
                      <NavLink
                        to={route.path}
                        end
                        className={({ isActive }) =>
                          `list-group-item list-group-item-action fw-bold py-5 ${
                            isActive ? "active" : ""
                          }`
                        }
                      >
                        {route.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
            <div className="col-lg-9">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
