import { createContext, useState } from "react";

const OrderContext = createContext();

export default function OrderProvider({ children }) {
  const [order, setOrder] = useState({ username: "" });

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export { OrderContext };
