import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/16/solid";

export default function CartItems({ item, onQuantityChange }) {
  const [quantity, setQuantity] = useState(item.quantity);
  //const [check, setCheck] = useState(item.selected);

  // const handleCheck = () => {
  //   if (checkAll) {
  //     handleCheckAll();
  //     setCheck((e) => !e);
  //   } else {
  //     setCheck((e) => !e);
  //   }
  // };

  const increase = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item.productId, newQuantity); // Notify parent about quantity change
  };

  const decrease = () => {
    if (quantity === 1) return;
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    onQuantityChange(item.productId, newQuantity); // Notify parent about quantity change
  };

  return (
    <div>
      <div className="rounded-md py-3 px-12 bg-white flex items-center justify-between">
        <div className="flex gap-4 items-center">
          {/* <input
            type="checkbox"
            checked={checkAll ? checkAll : check}
            onChange={handleCheck}
            className="checkbox checkbox-md border-2"
          /> */}

          <figure className="min-h-20 w-28 flex">
            <img src={item.image} alt="product" className="w-full m-auto " />
          </figure>

          <p className="w-72 text-pretty text-[--secondary] text-base font-semibold h-fit">
            {item.title}
          </p>
        </div>

        <div className="flex gap-8">
          <p className="text-lg font-semibold text-[--secondary]  w-32 m-auto">
            $ {item.price}
          </p>

          <div className="flex gap-2 border border-[--primary] rounded-md">
            <button
              onClick={decrease}
              className="hover:bg-[--hover-primary] hover:text-[--secondary] border-r p-1"
            >
              <MinusIcon className="size-4" />
            </button>
            <p className="w-fit grow-0 p-1">{quantity}</p>
            <button
              onClick={increase}
              className="hover:bg-[--hover-primary] hover:text-[--secondary] border-l p-1"
            >
              <PlusIcon className="size-4" />
            </button>
          </div>

          <p className="text-lg font-semibold text-[--secondary] w-32 m-auto text-right">
            $ {(item.price * quantity).toFixed(2)}
          </p>

          {/*  */}
        </div>
      </div>
    </div>
  );
}
