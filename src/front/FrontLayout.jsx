import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";

export default function FrontLayout() {
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

  return (
    <>
      {/* nav */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
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

          {/* memberbar */}
          <div className="memberbar d-lg-none">
            <ul>
              <li className="icon-badge">
                <span className="material-symbols-outlined">shopping_cart</span>
              </li>
              <li className="icon-badge">
                <span className="material-symbols-outlined">person</span>
              </li>
            </ul>
          </div>

          {/* 導覽選單 */}
          <div
            className="collapse navbar-collapse py-2"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                {/* <NavLink className="nav-link" to="/全部商品"> */}
                <Link className="nav-link" to="/#category">
                  所有商品
                  <span className="nav-sub">All Products</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/#news">
                  最新消息
                  <span className="nav-sub">News</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/#about">
                  關於我們
                  <span className="nav-sub">About Us</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/#faq">
                  常見問題
                  <span className="nav-sub">FAQ</span>
                </Link>
              </li>
              <li className="nav-item d-md-block d-lg-none">
                <a className="nav-link text-accent-300" href="#">
                  登入 / 註冊
                  <span className="nav-sub">Sign In / Join</span>
                </a>
              </li>
            </ul>
          </div>

          {/* memberbar */}
          <div className="memberbar d-none d-lg-inline-block">
            <ul>
              <li className="icon-badge">
                <span className="material-symbols-outlined">shopping_cart</span>
              </li>
              <li className="icon-badge">
                <span className="material-symbols-outlined">person</span>
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
              <p>@gmail.com，我們將立即移除</p>
              <p>Copyright © WEIWEI 2025 All Right Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
