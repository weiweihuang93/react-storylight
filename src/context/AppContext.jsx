import axios from "axios";
import { BASE_URL, API_PATH } from "../data/config";
import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

export default function AppProvider({ children }) {
  // 登入狀態（全域管理）
  const [user, setUser] = useState(null);
  const [cartData, setCartData] = useState({ carts: [] });

  // 取得訂單
  const [order, setOrder] = useState(null);

  // loading效果
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  // 模擬登入
  const login = (username, password) => {
    if (username && password) {
      setUser({ username }); // 儲存登入使用者
      alert(`${username} 登入成功`);
    } else {
      alert("請輸入帳號密碼");
    }
  };

  // 模擬登出
  const logout = () => {
    setUser(null);
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
      getCartData();
    } catch (err) {}
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
