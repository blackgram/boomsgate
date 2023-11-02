import React, { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

const StateContext = ({ children }) => {
  const [showCart, setshowCart] = useState(false);
  const [cartItems, setcartItems] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);
  const [totalQuantities, settotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id)
    settotalPrice((prevtotalPrice) => prevtotalPrice + product.price * quantity)
    settotalQuantities((prevtotalQuantities) => prevtotalQuantities + quantity)

    if (checkProductInCart) {

        const updatedCartItems = cartItems.map((cartProduct) => {
            if (cartProduct._id === product._id) return {
                ...cartProduct,
                quantity: cartProduct.quantity + quantity
            }
        })

        setcartItems(updatedCartItems)
      } else {
        product.quantity = quantity;
        
        setcartItems([ ...cartItems, {...product} ])
      }
      toast.success(`${qty} ${product.name} added to cart `)
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return  prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setshowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export {Context, StateContext}
export const useStateContext = () => useContext(Context)