import { adminAxios } from "@/data/adminAxios";
import { BASE_URL } from "@/data/config";
import { createContext, useState } from "react";

const AdminContext = createContext();

export default function AdminAuthProvider({ children }) {
  const [adminAuth, setAdminAuth] = useState({
    isAuthenticated: false,
    isLoading: true,
    token: null,
  });

  const clearToken = () => {
    document.cookie =
      "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    delete adminAxios.defaults.headers.common["Authorization"];
    setAdminAuth({
      isAuthenticated: false,
      isLoading: false,
      token: null,
    });
  };

  const setToken = (token, expired) => {
    document.cookie = `hexToken=${token}; expires=${new Date(
      expired
    ).toUTCString()}; path=/;`;
    adminAxios.defaults.headers.common["Authorization"] = token;
    setAdminAuth({
      isAuthenticated: true,
      isLoading: false,
      token,
    });
  };

  const login = async (account) => {
    try {
      const res = await adminAxios.post(`${BASE_URL}/v2/admin/signin`, account);
      const { token, expired } = res.data;
      setToken(token, expired);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await adminAxios.post("/v2/logout");
    } finally {
      clearToken();
    }
  };

  const checkAuth = async () => {
    setAdminAuth((prev) => ({ ...prev, isLoading: true }));

    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (!token) {
      clearToken();
      throw new Error("尚未登入");
    }

    adminAxios.defaults.headers.common["Authorization"] = token;

    try {
      await adminAxios.post("/v2/api/user/check");
      setAdminAuth({
        isAuthenticated: true,
        isLoading: false,
        token,
      });
    } catch (err) {
      clearToken();
      throw new Error("驗證失敗");
    }
  };

  return (
    <AdminContext.Provider
      value={{
        ...adminAuth,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export { AdminContext };
