import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "頁面不存在｜Storylight 拾光";

    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="container py-7">
        <div className="text-center">
          <h1 className="fs-1 fw-bold text-danger">404</h1>
          <h2 className="mb-3">找不到此頁面</h2>
          <p className="text-muted mb-3">您要造訪的頁面不存在或已被移除</p>
          <p className="text-secondary">5 秒後將自動返回首頁...</p>
          <Link to="/" className="btn btn-accent-300 w-25 mt-6">
            回到首頁
          </Link>
        </div>
      </div>
    </>
  );
}
