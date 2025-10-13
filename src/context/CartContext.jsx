import axios from "axios";
import { BASE_URL, API_PATH } from "@/data/config";
import { createContext, useEffect, useState, useMemo, useCallback } from "react";

import { useDispatch } from "react-redux";
import { addToast } from "@/redux/toastSlice";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartData, setCartData] = useState({ carts: [] });
  const [loadingId, setLoadingId] = useState(null);
  const dispatch = useDispatch();

  // 使用 Set 快速查詢商品是否在購物車中 O(1)
  const cartProductIds = useMemo(() => {
    return new Set(cartData.carts.map((item) => item.product_id));
  }, [cartData.carts]);

  // 取得購物車資料
  const getCartData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      setCartData(res.data.data);
    } catch (err) {}
  };

  // 使用 useCallback 穩定函數引用
  const addToCart = useCallback(
    async (productId) => {
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
    },
    [dispatch]
  );

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        addToCart,
        loadingId,
        getCartData,
        cartProductIds, // 提供 Set 給子元件使用
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };
