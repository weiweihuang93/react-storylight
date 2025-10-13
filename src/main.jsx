import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router";
import routes from "./routes/index.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

import UserProvider from "./context/UserContext.jsx";
import FavoritesProvider from "./context/FavoritesContext.jsx";
import ProductProvider from "./context/ProductContext.jsx";
import CartProvider from "./context/CartContext.jsx";
import OrderProvider from "./context/OrderContext.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/stylesheets/all.scss";

const router = createHashRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <UserProvider>
        <FavoritesProvider>
          <ProductProvider>
            <CartProvider>
              <OrderProvider>
                <RouterProvider router={router} />
              </OrderProvider>
            </CartProvider>
          </ProductProvider>
        </FavoritesProvider>
      </UserProvider>
    </Provider>
  </StrictMode>
);
