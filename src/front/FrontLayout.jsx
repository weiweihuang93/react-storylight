import { useContext, useEffect } from "react";
import { Link, matchPath, Outlet, useLocation } from "react-router";
import { AppContext } from "../context/AppContext";
import ToastComponent from "../components/ToastComponent";

const routeTitles = [
  { path: "/", title: "首頁｜Storylight 拾光" },
  { path: "/signin", title: "註冊｜Storylight 拾光" },
  { path: "/login", title: "登入｜Storylight 拾光" },
  { path: "/member", title: "會員中心｜Storylight 拾光" },
  { path: "/cart", title: "購物車｜Storylight 拾光" },
  { path: "/cart/order", title: "訂單頁｜Storylight 拾光" },
  { path: "/cart/payment", title: "付款頁｜Storylight 拾光" },
  { path: "/cart/complete", title: "完成訂單｜Storylight 拾光" },
  { path: "/:categoryName", title: "商品分類｜Storylight 拾光" },
  { path: "/:categoryName/:productId", title: "商品詳情｜Storylight 拾光" },
];

export default function FrontLayout() {
  const { cartData, user, logout } = useContext(AppContext);

  function ScrollToHash() {
    const { hash } = useLocation();

    useEffect(() => {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }, [hash]);

    return null;
  }

  const location = useLocation();

  useEffect(() => {
    const matched = routeTitles.find((r) =>
      matchPath(r.path, location.pathname)
    );
    document.title = matched ? matched.title : "Storylight 拾光";
  }, [location.pathname]);

  return (
    <>
      <ToastComponent />
      {/* nav */}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container d-flex align-items-center justify-content-between">
          {/* 選單 */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* logo */}
          <Link to="/">
            <img className="logo" src="./images/logo.png" alt="logo" />
          </Link>

          {/* 導覽選單 */}
          <div
            className="collapse navbar-collapse order-3 order-lg-2 py-2"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/#category" className="nav-link">
                  所有商品
                  <span className="nav-sub">All Products</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/#news" className="nav-link">
                  最新消息
                  <span className="nav-sub">News</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/#about" className="nav-link">
                  關於我們
                  <span className="nav-sub">About Us</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/#faq" className="nav-link">
                  常見問題
                  <span className="nav-sub">FAQ</span>
                </Link>
              </li>
              <li className="nav-item d-md-block d-lg-none">
                <Link to="/login" className="nav-link text-accent-300">
                  登入 / 註冊
                  <span className="nav-sub">Sign In / Join</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* memberbar */}
          <div className="memberbar order-2 order-lg-3">
            <ul>
              <li className="icon-badge">
                <Link to="/cart" className="d-flex">
                  <span className="material-symbols-outlined">
                    shopping_cart{" "}
                    <span className="badge badge-secondary badge-count">
                      {cartData?.carts?.length}
                    </span>
                  </span>
                </Link>
              </li>
              <li className="dropdown login-dropdown">
                <a
                  className="dropdown-toggle d-flex"
                  id="memberDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="material-symbols-outlined">person</span>
                </a>

                <div
                  className="dropdown-menu dropdown-menu-position"
                  aria-labelledby="memberDropdown"
                >
                  <h6 className="dropdown-header">
                    <img
                      className="avatar"
                      src="./images/avatar-1.png"
                      alt="avatar"
                    />
                    {user.username
                      ? `歡迎回來，${user.username}`
                      : "訪客模式中"}
                  </h6>

                  {/* 共用區塊 */}
                  <Link to="/member" className="dropdown-item">
                    <span className="material-symbols-outlined me-2">
                      account_circle
                    </span>
                    我的帳戶
                  </Link>
                  <Link to="/member" className="dropdown-item">
                    <span className="material-symbols-outlined me-2">
                      article
                    </span>
                    訂單紀錄
                  </Link>
                  <div className="dropdown-divider"></div>

                  {/* 登入 / 登出差異 */}
                  {user.username ? (
                    <a className="dropdown-item" onClick={logout}>
                      <span className="material-symbols-outlined me-2">
                        logout
                      </span>
                      登出
                    </a>
                  ) : (
                    <Link to="/login" className="dropdown-item">
                      <span className="material-symbols-outlined me-2">
                        login
                      </span>
                      登入
                    </Link>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <ScrollToHash />
        <Outlet />
      </main>

      {/* footer */}
      <footer className="footer">
        <div className="bg py-6">
          {/* <img className="wave" src="/images/footer.png" alt="" /> */}
          <div className="container">
            <div className="footer-info">
              <Link to="/" className="logo-link">
                <img
                  className="logo"
                  src="./images/logo-white.png"
                  alt="logo"
                />
              </Link>
              <div className="info-txt">
                <div className="contact-info">
                  <a>
                    <img
                      className="contact"
                      src="./images/ic-social-fb.png"
                      alt="contact-fb"
                    />
                  </a>
                  <a>
                    <img
                      className="contact"
                      src="./images/ic-social-ig.png"
                      alt="contact-ig"
                    />
                  </a>
                  <a>
                    <img
                      className="contact"
                      src="./images/ic-social-line.png"
                      alt="contact-line"
                    />
                  </a>
                </div>
                <p className="fs-5">拾光尋書，等你續寫</p>
              </div>
            </div>
            <hr />
            <div className="copyright text-center">
              <p>作品僅作學習使用，無商業用途，若有侵權請來信告知</p>
              <p>Copyright © WEIWEI 2025 All Right Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
