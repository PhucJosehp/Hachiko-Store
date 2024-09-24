import React, { useState, useEffect } from "react";
import axios from "axios";
import CartItems from "./CartItems";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0); // State to track total price

  // const handleCheck = () => {
  //   setCheckAll((e) => !e);
  // };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedItems = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/carts/1")
      .then((res) => {
        const items = res.data.products;

        // Fetch product details for each item using productId
        const productRequests = items.map((item) =>
          axios
            .get(`https://fakestoreapi.com/products/${item.productId}`)
            .then((productRes) => ({
              ...productRes.data,
              quantity: item.quantity, // Use the quantity from the cart API
              selected: false,
            }))
        );

        return Promise.all(productRequests);
      })
      .then((updatedCartItems) => {
        // Set the cart items with product details and quantity from the cart API
        setCartItems(updatedCartItems);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      return acc + (item.price || 0) * (item.quantity || 0); // Safely access price and quantity
    }, 0);

    setTotalPrice(total);
  }, [cartItems, checkAll]); // Update total whenever cartItems or checkAll changes

  return (
    <div className="p-4 mt-10 lg:mt-20 xl:w-[60%] md:w-[80%] w-full m-auto max-w-[1500px] overflow-x-auto flex flex-col gap-6">
      <p className="font-breeSerif text-2xl text-[--secondary]">My Cart</p>

      {/* <label className="bg-white rounded-md text-[--secondary] mt-2 p-3">
        <div className="w-fit cursor-pointer flex items-center gap-2">
          <input
            type="checkbox"
            checked={checkAll}
            className="checkbox checkbox-md border-2"
            onClick={handleCheck}
          />
          <span>Select all products</span>
        </div>
      </label> */}

      <ul className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <CartItems
            key={item.productId}
            item={item}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </ul>
      <div className="border-b-2"></div>
      <div className="text-lg font-bold text-[--secondary] w-full text-right px-12">
        Total Price: $ {totalPrice.toFixed(2)}
      </div>
    </div>
  );
}
