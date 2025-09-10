import axios from "axios";
import { BASE_URL } from "../data/config";
import { useEffect } from "react";
import {
  matchPath,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router";
import ToastComponent from "../components/ToastComponent";
import { useDispatch } from "react-redux";
import { addToast } from "../redux/toastSlice";

const AdminRoutes = [
  { path: "/admin/order", name: "訂單管理" },
  { path: "/admin/product", name: "商品管理" },
  { path: "/admin/coupon", name: "優惠券管理" },
];

const adminRouteTitles = [
  { path: "/admin", title: "後台首頁｜Storylight 拾光" },
  { path: "/admin/product", title: "商品管理｜Storylight 拾光" },
  { path: "/admin/order", title: "訂單管理｜Storylight 拾光" },
  { path: "/admin/coupon", title: "優惠券管理｜Storylight 拾光" },
  { path: "/admin/login", title: "後台登入｜Storylight 拾光" },
];

export default function AdminLayout() {
  const navigate = useNavigate();

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

  const location = useLocation();

  useEffect(() => {
    const matched = adminRouteTitles.find((r) =>
      matchPath(r.path, location.pathname)
    );
    document.title = matched ? matched.title : "Storylight 拾光";
  }, [location.pathname]);

  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/v2/logout`);

      // 清掉 cookie
      document.cookie =
        "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

      delete axios.defaults.headers.common["Authorization"];
      dispatch(addToast(res.data));
      setTimeout(() => {
        (navigate("/admin/login"), { replace: true });
      }, 2000);
    } catch (err) {
      // 清掉 cookie
      document.cookie =
        "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

      delete axios.defaults.headers.common["Authorization"];

      const errorMessage =
        err.response?.data?.message ||
        "登出失敗，已清除本地登入資訊，請稍候再試";
      dispatch(addToast({ success: false, message: errorMessage }));
      setTimeout(() => {
        (navigate("/admin/login"), { replace: true });
      }, 2000);
    }
  };

  return (
    <>
      <ToastComponent />
      <main className="main">
        <div className="container py-3">
          <div className="row g-3">
            <div className="col-lg-3">
              <aside className="section-aside py-3">
                <h3 className="fs-5 text-center">您好，管理員　：）</h3>
                {/* 登出按鈕 */}
                <div className="text-center mt-3">
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger w-100"
                  >
                    登出
                  </button>
                </div>
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
