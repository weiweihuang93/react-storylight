import axios from "axios";
import { BASE_URL } from "../data/config";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function AdminLogin() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const [token, setToken] = useState();
  const navigate = useNavigate();

  const handleSigninInputChange = (e) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/v2/admin/signin`, account);
      const { token, expired } = res.data;
      setToken(token);
      document.cookie = `hexToken=${token}; expires=${new Date(expired).toUTCString()}`;
      axios.defaults.headers.common["Authorization"] = token;

      // 加上提示文字
      setTimeout(() => navigate("/admin"), 2000);
    } catch (err) {}
  };

  return (
    <>
      <main>
        <div className="bg-neutral-100 vh-center">
          <div className="container d-flex justify-content-center">
            <div className="login-wrapper">
              <div className="card-base p-5">
                <div className="text-center mb-4">
                  <a>
                    <img className="logo" src="./images/logo.png" alt="logo" />
                  </a>
                </div>
                <h1 className="fs-5 text-accent-300 text-center">管理員登入</h1>
                <form onSubmit={handleSignin} className="py-5">
                  {/* 帳號 */}
                  <div className="mb-5">
                    <label
                      htmlFor="adminAccount"
                      className="form-label fw-bold"
                    >
                      管理員帳號
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
                      管理員密碼
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
                <div className="text-center">
                  <Link to="/" className="text-secondary">
                    返回首頁
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
