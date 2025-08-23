import FrontLayout from "../front/FrontLayout";
import HomePage from "../front/HomePage";
import CategoryPage from "../front/CategoryPage";
import ProductPage from "../front/ProductPage";
import NotFound from "../front/Notfound";
import LoginPage from "../front/LoginPage";
import SigninPage from "../front/SigninPage";
import AdminLogin from "../admin/AdminLogin";
import CheckedRoute from "../admin/CheckedRoute";
import AdminLayout from "../admin/AdminLayout";
import AdminProduct from "../admin/AdminProduct";
import CartLayout from "../front_cart/CartLayout";
import CartPage from "../front_cart/CartPage";
import OrderPage from "../front_cart/OrderPage";
import PaymentPage from "../front_cart/PaymentPage";
import CompletePage from "../front_cart/CompletePage";
import MemberPage from "../front/MemberPage";

const routes = [
  {
    path: "/",
    element: <FrontLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: ":categoryName",
        element: <CategoryPage />,
      },
      {
        path: ":categoryName/:productId",
        element: <ProductPage />,
      },
      {
        path: "signin",
        element: <SigninPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "member",
        element: <MemberPage />,
      },
      {
        path: "cart",
        element: <CartLayout />,
        children: [
          { path: "", element: <CartPage /> },
          { path: "order", element: <OrderPage /> },
          { path: "payment", element: <PaymentPage /> },
          { path: "complete", element: <CompletePage /> },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <CheckedRoute />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          {
            path: "product",
            element: <AdminProduct />,
          },
        ],
      },
      ,
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
