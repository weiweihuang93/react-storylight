import axios from "axios";
import { BASE_URL, API_PATH } from "../data/config";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

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
