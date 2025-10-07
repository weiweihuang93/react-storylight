import axios from "axios";
import { BASE_URL, API_PATH } from "@/data/config";
import { createContext, useEffect, useState } from "react";

const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 取得商品
  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/products/all`
      );
      setProductsData(res.data.products);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ productsData, loading }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext };
