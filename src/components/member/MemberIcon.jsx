import { useContext } from "react";
import { avatar } from "@/data/images.js";
import { Link } from "react-router";
import { UserContext } from "@/context/UserContext";

export default function MemberIcon() {
  const { user, logout } = useContext(UserContext);
  return (
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
        {/* 使用者資訊 */}
        <h6 className="dropdown-header">
          <img className="avatar" src={avatar} alt="avatar" />
          {user.username ? `歡迎回來，${user.username}` : "訪客模式中"}
        </h6>

        {/* 登入後才顯示會員專屬選項 */}
        {user.username && (
          <>
            <Link to="/member/favorites" className="dropdown-item">
              <span className="material-symbols-outlined me-2">favorite</span>
              我的收藏
            </Link>
            <Link to="/member/wish" className="dropdown-item">
              <span className="material-symbols-outlined me-2">
                folded_hands
              </span>
              許願徵求
            </Link>
            <Link to="/member/order" className="dropdown-item">
              <span className="material-symbols-outlined me-2">article</span>
              訂單紀錄
            </Link>

            <div className="dropdown-divider"></div>
          </>
        )}

        {/* 登入 / 登出 */}
        {user.username ? (
          <a className="dropdown-item" onClick={logout}>
            <span className="material-symbols-outlined me-2">logout</span>
            登出
          </a>
        ) : (
          <Link
            to="/login?redirect=/member/favorites"
            className="dropdown-item"
          >
            <span className="material-symbols-outlined me-2">login</span>
            登入
          </Link>
        )}
      </div>
    </li>
  );
}
