import { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "@/redux/toastSlice";

const UserContext = createContext();

export default function UserProvider({ children }) {
  // 登入狀態（全域管理）
  const [user, setUser] = useState({ username: "" });
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
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };
