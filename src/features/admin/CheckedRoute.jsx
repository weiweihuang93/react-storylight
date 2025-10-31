import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router";
import ScreenLoading from "@/components/common/ScreenLoading";
import { useDispatch } from "react-redux";
import { addToast } from "@/redux/toastSlice";
import { AdminContext } from "@/context/AdminContext";

export default function CheckedRoute() {
  const { isAuthenticated, isLoading, checkAuth } = useContext(AdminContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const verify = async () => {
      try {
        await checkAuth();
      } catch (err) {
        dispatch(
          addToast({
            success: false,
            message: err.message || "驗證失敗，請重新登入",
          })
        );
        navigate("/admin/login", { replace: true });
      }
    };
    verify();
  }, []);

  if (isLoading) return <ScreenLoading />;
  if (!isAuthenticated) return null;

  return <Outlet />;
}
