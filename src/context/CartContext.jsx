import axios from "axios";
import { BASE_URL, API_PATH } from "@/data/config";
import { createContext, useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { addToast } from "@/redux/toastSlice";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartData, setCartData] = useState({ carts: [] });
  const [loadingId, setLoadingId] = useState(null);
  const dispatch = useDispatch();

  // 取得購物車資料
  const getCartData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      setCartData(res.data.data);
    } catch (err) {}
  };

  const addToCart = async (productId) => {
    setLoadingId(productId);
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
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <CartContext.Provider value={{ cartData, addToCart, loadingId }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };
