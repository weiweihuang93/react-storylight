import CartProvider from "../context/CartContext";
import FavoritesProvider from "../context/FavoritesContext";
import OrderProvider from "../context/OrderContext";
import ProductProvider from "../context/ProductContext";
import UserProvider from "../context/UserContext";

export default function FrontProviders({ children }) {
  return (
    <UserProvider>
      <FavoritesProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>{children}</OrderProvider>
          </CartProvider>
        </ProductProvider>
      </FavoritesProvider>
    </UserProvider>
  );
}
