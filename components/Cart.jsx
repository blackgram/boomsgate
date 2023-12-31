import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutline,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

import { toast } from "react-hot-toast";

import { useStateContext } from "@/context/StateContext";
import { urlFor } from "@/lib/client";

const Cart = () => {
  const cartRef = useRef();
  const { totalQuantities, totalPrice, cartItems, setshowCart } =
    useStateContext();

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setshowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">{totalQuantities} items</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your Cart is empty. Lets fix that !</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setshowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        {cartItems.length >= 1 &&
          cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img
                src={urlFor(item?.image[0])}
                className="cart-product-image"
              />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>₦{item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                    <p className="quantity-desc">
                      <span className="minus" onClick="">
                        <AiOutlineMinus />
                      </span>
                      <span className="num" onClick="">
                        0
                      </span>
                      <span className="plus" onClick="">
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>
                  <button type="button" className="remove-item" onClick="">
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cart;
