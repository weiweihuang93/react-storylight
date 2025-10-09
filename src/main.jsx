import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router";
import routes from "./routes/index.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import ProductProvider from "./context/ProductContext.jsx";
import AppProvider from "./context/AppContext.jsx";
import CartProvider from "./context/CartContext.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/stylesheets/all.scss";

const router = createHashRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ProductProvider>
        <CartProvider>
          <AppProvider>
            <RouterProvider router={router} />
          </AppProvider>
        </CartProvider>
      </ProductProvider>
    </Provider>
  </StrictMode>
);
