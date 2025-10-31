import AdminAuthProvider from "../context/AdminContext";
import ProductProvider from "../context/ProductContext";

export default function AdminProviders({ children }) {
  return (
    <AdminAuthProvider>
      <ProductProvider>{children}</ProductProvider>
    </AdminAuthProvider>
  );
}
