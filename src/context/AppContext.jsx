import axios from "axios";
import { BASE_URL, API_PATH } from "@/data/config";
import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "@/redux/toastSlice";

const AppContext = createContext();

export default function AppProvider({ children }) {
  // 登入狀態（全域管理）
  const [user, setUser] = useState({ username: "" });
  // 收藏
  const [favorites, setFavorites] = useState({});

  // 讀取 localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // 切換收藏
  const toggleFavorite = (productId) => {
    let newFavorites;
    setFavorites((prevState) => {
      newFavorites = {
        ...prevState,
        [productId]: !prevState[productId],
      };
      return newFavorites;
    });

    // 同步 localStorage
    localStorage.setItem("favorites", JSON.stringify(newFavorites));

    // 呼叫 toast
    if (newFavorites[productId]) {
      dispatch(
        addToast({
          success: true,
          message: "已加入收藏",
        })
      );
    } else {
      dispatch(
        addToast({
          success: true,
          message: "已取消收藏",
        })
      );
    }
  };

  // 取得訂單
  const [order, setOrder] = useState({ username: "" });

  const dispatch = useDispatch();

  // 模擬登入
  const login = (username, password) => {
    if (username && password) {
      setUser({ username }); // 儲存登入使用者
      dispatch(
        addToast({
          success: true,
          message: `${username} 登入成功！`,
        })
      );
    } else {
      dispatch(
        addToast({
          success: false,
          message: "請輸入帳號密碼",
        })
      );
    }
  };

  // 模擬登出
  const logout = () => {
    setUser({ username: "" });
    dispatch(
      addToast({
        success: true,
        message: "已成功登出",
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        order,
        setOrder,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext };
