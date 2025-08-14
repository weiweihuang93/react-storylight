import CategoryPage from "../front/CategoryPage";
import FrontLayout from "../front/FrontLayout";
import HomePage from "../front/HomePage";
import NotFound from "../front/Notfound";
import ProductPage from "../front/ProductPage";

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
        path: "category",
        element: <CategoryPage />,
      },
      {
        path: "product",
        element: <ProductPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
