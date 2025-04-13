import React, { useEffect, useState, useContext, useMemo, memo } from "react";

import UserContext from "../../contexts/UserContext";
import "./CartPage.css";
import config from "../../config.json";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import remove from "../../assets/delete.png";
import CartContext from "../../contexts/CartContext";
import { checkoutApi } from "../../services/orderServices";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);
  const user = useContext(UserContext);

  const [shippingCharge, setShippingCharge] = useState(5);

  const subTotal = useMemo(() => {
    let total = 0;
    if (cart) {
      cart.forEach((item) => {
        total += item.product.price * item.quantity;
      });
    }
    return total;
  }, [cart]);

  const checkout = () => {
    const oldCart = [...cart];
    setCart([]);
    checkoutApi()
      .then(() => {
        toast.success("Order placed successfully!");
      })
      .catch(() => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
  };

  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`${config.backendURL}/${user?.user.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">{user?.user.name}</p>
          <p className="user_email">{user?.user.email}</p>
        </div>
      </div>
      <Table heading={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart &&
            cart.map(({ product, quantity }) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td className="align_center table_quantity_input">
                  <QuantityInput
                    quantity={quantity}
                    stock={product.stock}
                    setQuantity={updateCart}
                    cartPage={true}
                    productId={product._id}
                  />
                </td>
                <td>{product.price * quantity}</td>
                <td>
                  <img
                    src={remove}
                    alt="remove emoji"
                    className="remove_icon"
                    onClick={() => removeFromCart(product._id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <table className="cart_bill">
        <tbody>
          <tr>
            <td>SubTotal</td>
            <td>${subTotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>${shippingCharge}</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${subTotal + shippingCharge}</td>
          </tr>
        </tbody>
      </table>

      <button className="search_button checkout_button" onClick={checkout}>
        Checkout
      </button>
    </section>
  );
};

export default memo(CartPage);
