import axios from "axios";
import { BASE_URL, API_PATH } from "@/data/config";
import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "@/redux/toastSlice";

const AppContext = createContext();

export default function AppProvider({ children }) {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
}

export { AppContext };
