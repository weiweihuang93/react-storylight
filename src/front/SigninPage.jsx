import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addToast } from "../redux/toastSlice";

export default function SigninPage() {
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignin = (e) => {
    e.preventDefault();
    if (account.username && account.password) {
      // 模擬註冊成功 發送toast
      dispatch(
        addToast({
          success: true,
          message: "註冊成功！即將導向登入頁面...",
        })
      );
      setTimeout(() => navigate("/login"), 2000);
    } else {
      dispatch(
        addToast({
          success: false,
          message: "請輸入帳號密碼",
        })
      );
    }
  };

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
                <h1 className="fs-5 text-accent-300 text-center">會員註冊</h1>
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
                    <button
                      type="submit"
                      className="btn btn-accent-300 w-100"
                      disabled={!account.username || !account.password}
                    >
                      註冊
                    </button>
                  </div>
                </form>
                <div className="d-flex justify-content-center gap-2">
                  <p>已經是會員了？</p>
                  <Link to="/login" className="text-primary">
                    點此登入
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
