import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AppContext } from "../context/AppContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, user } = useContext(AppContext);
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const handleSigninInputChange = (e) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleSignin = (e) => {
    e.preventDefault();
    login(account.username, account.password);
  };

  // 登入後自動跳回原本頁面
  useEffect(() => {
    if (user?.username) {
      const searchParams = new URLSearchParams(location.search);
      const redirect = searchParams.get("redirect") || "/member";
      navigate(redirect, { replace: true });
    }
  }, [user]);

  return (
    <>
      <main>
        <div className="bg-neutral-100">
          <div className="container d-flex justify-content-center">
            <div className="login-wrapper py-7">
              <div className="card-base p-5">
                <div className="text-center mb-4">
                  <a>
                    <img className="logo" src="./images/logo.png" alt="logo" />
                  </a>
                </div>
                <h1 className="fs-5 text-accent-300 text-center">會員登入</h1>
                <form onSubmit={handleSignin} className="py-5">
                  {/* 帳號 */}
                  <div className="mb-5">
                    <label
                      htmlFor="adminAccount"
                      className="form-label fw-bold"
                    >
                      會員帳號
                    </label>
                    <input
                      value={account.username}
                      onChange={handleSigninInputChange}
                      name="username"
                      type="text"
                      className="form-control"
                      id="adminAccount"
                      placeholder="請輸入帳號"
                    />
                  </div>

                  {/* 密碼 */}
                  <div className="mb-5">
                    <label
                      htmlFor="adminPassword"
                      className="form-label fw-bold"
                    >
                      會員密碼
                    </label>
                    <input
                      value={account.password}
                      onChange={handleSigninInputChange}
                      name="password"
                      type="password"
                      className="form-control"
                      id="adminPassword"
                      placeholder="請輸入密碼"
                    />
                  </div>

                  {/* 登入按鈕 */}
                  <div>
                    <button type="submit" className="btn btn-accent-300 w-100">
                      登入
                    </button>
                  </div>
                </form>
                <div className="d-flex justify-content-center gap-2">
                  <p>新朋友嗎？</p>
                  <Link to="/signin" className="text-primary">
                    點此註冊
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
