import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { Link } from "react-router";

export default function CartIcon() {
  const { cartData } = useContext(CartContext);

  const count = cartData?.carts?.length || 0;

  return (
    <li className="icon-badge">
      <Link to="/cart" className="d-flex">
        <span className="material-symbols-outlined">
          shopping_cart{" "}
          <span className="badge badge-secondary badge-count">{count}</span>
        </span>
      </Link>
    </li>
  );
}
