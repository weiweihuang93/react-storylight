import axios from "axios";
import { BASE_URL, API_PATH } from "../data/config";
import { createContext, useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { addToast } from "../redux/toastSlice";

const AppContext = createContext();

export default function AppProvider({ children }) {
  // 登入狀態（全域管理）
  const [user, setUser] = useState({ username: "" });
  const [cartData, setCartData] = useState({ carts: [] });

  // 取得訂單
  const [order, setOrder] = useState({ username: "" });

  // loading效果
  const [isScreenLoading, setIsScreenLoading] = useState(false);

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

  // 取得購物車資料
  const getCartData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      setCartData(res.data.data);
    } catch (err) {}
  };

  const addToCart = async (productId) => {
    try {
      const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
        data: {
          product_id: productId,
          qty: 1,
        },
      });
      dispatch(addToast(res.data));
      await getCartData();
    } catch (err) {
      dispatch(addToast(err.response.data));
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        cartData,
        getCartData,
        setCartData,
        addToCart,
        order,
        setOrder,
        isScreenLoading,
        setIsScreenLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext };
