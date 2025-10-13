import { createContext, useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "@/redux/toastSlice";

const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {
  // 收藏
  const [favorites, setFavorites] = useState({});
  const dispatch = useDispatch();

  // 讀取 localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // 使用 useCallback 穩定函數引用
  const toggleFavorite = useCallback(
    (productId) => {
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
    },
    [dispatch]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export { FavoritesContext };
