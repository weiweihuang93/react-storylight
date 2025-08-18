import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CheckedRoute() {
  const [isAuth, setIsAuth] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (!token) {
      setTimeout(() => navigate("/admin/login"), 2000);
      return;
    }

    axios.defaults.headers.common["Authorization"] = token;

    const CheckUserSignin = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/v2/api/user/check`);
        setIsAuth(true);
      } catch (err) {}
    };
    CheckUserSignin();
  }, []);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
}
