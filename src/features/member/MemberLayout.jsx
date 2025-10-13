import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { Outlet, NavLink, useNavigate } from "react-router";

export default function MemberLayout() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // 基本驗證
  useEffect(() => {
    if (!user?.username) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  return (
    <div className="app-container bg-neutral-100">
      <div className="py-6">
        <nav className="d-flex justify-content-center gap-3 mb-4">
          <NavLink
            to="/member/favorites"
            className={({ isActive }) =>
              `member-button ${isActive ? "active" : ""}`
            }
          >
            我的收藏
          </NavLink>

          <NavLink
            to="/member/wish"
            className={({ isActive }) =>
              `member-button ${isActive ? "active" : ""}`
            }
          >
            許願徵求
          </NavLink>
          <NavLink
            to="/member/order"
            className={({ isActive }) =>
              `member-button ${isActive ? "active" : ""}`
            }
          >
            訂單紀錄
          </NavLink>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
