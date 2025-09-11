import axios from "axios";
import { BASE_URL } from "@/data/config";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import ScreenLoading from "@/components/common/ScreenLoading";
import { useDispatch } from "react-redux";
import { addToast } from "@/redux/toastSlice";

export default function CheckedRoute() {
  const [isAuth, setIsAuth] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (!token) {
      dispatch(
        addToast({
          success: false,
          message: "尚未登入，請先登入後台",
        })
      );
      setTimeout(() => navigate("/admin/login"), 2000);
      return;
    }

    axios.defaults.headers.common["Authorization"] = token;

    const CheckUserSignin = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/v2/api/user/check`);
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);

        // 清掉 cookie
        document.cookie =
          "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

        delete axios.defaults.headers.common["Authorization"];

        const errorMessage =
          err.response?.data?.message || "驗證失敗，請稍後再試";
        dispatch(addToast({ success: false, message: errorMessage }));
        setTimeout(() => {
          (navigate("/admin/login"), { replace: true });
        }, 2000);
      }
    };

    CheckUserSignin();
  }, []);

  return (
    <>
      {isAuth === null && <ScreenLoading />} {/* 驗證中 */}
      {isAuth === false && null} {/* 驗證失敗 → redirect */}
      {isAuth === true && <Outlet />} {/* 驗證成功 → 繼續 */}
    </>
  );
}
