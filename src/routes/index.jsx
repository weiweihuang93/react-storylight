import FrontProviders from "../providers/FrontProviders";
import AdminProviders from "../providers/AdminProviders";

import FrontLayout from "../features/front/FrontLayout";
import HomePage from "../features/front/HomePage";
import CategoryPage from "../features/front/CategoryPage";
import ProductPage from "../features/front/ProductPage";
import LoginPage from "../features/front/LoginPage";
import SigninPage from "../features/front/SigninPage";
import NotFound from "../features/front/Notfound";
import CartLayout from "../features/front_cart/CartLayout";
import CartPage from "../features/front_cart/CartPage";
import OrderPage from "../features/front_cart/OrderPage";
import PaymentPage from "../features/front_cart/PaymentPage";
import CompletePage from "../features/front_cart/CompletePage";
import AdminLayout from "../features/admin/AdminLayout";
import CheckedRoute from "../features/admin/CheckedRoute";
import AdminProduct from "../features/admin/AdminProduct";
import AdminOrder from "../features/admin/AdminOrder";
import AdminCoupon from "../features/admin/AdminCoupon";
import AdminLogin from "../features/admin/AdminLogin";
import MemberLayout from "../features/member/MemberLayout";
import MemberOrderPage from "../features/member/MemberOrderPage";
import WishPage from "../features/member/WishPage";
import FavoritesPage from "../features/member/FavoritesPage";

const routes = [
  {
    path: "/",
    element: (
      <FrontProviders>
        <FrontLayout />
      </FrontProviders>
    ),
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
        element: <MemberLayout />,
        children: [
          { path: "favorites", element: <FavoritesPage /> },
          { path: "wish", element: <WishPage /> },
          { path: "order", element: <MemberOrderPage /> },
        ],
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
    element: (
      <AdminProviders>
        <CheckedRoute />
      </AdminProviders>
    ),
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          { path: "product", element: <AdminProduct /> },
          { path: "order", element: <AdminOrder /> },
          { path: "coupon", element: <AdminCoupon /> },
        ],
      },
    ],
  },
  {
    path: "/admin/login",
    element: (
      <AdminProviders>
        <AdminLogin />
      </AdminProviders>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
