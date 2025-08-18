import FrontLayout from "../front/FrontLayout";
import HomePage from "../front/HomePage";
import CategoryPage from "../front/CategoryPage";
import ProductPage from "../front/ProductPage";
import NotFound from "../front/Notfound";
import AdminLogin from "../admin/AdminLogin";
import CheckedRoute from "../admin/CheckedRoute";
import AdminLayout from "../admin/AdminLayout";
import AdminProduct from "../admin/AdminProduct";

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
