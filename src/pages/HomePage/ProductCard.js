import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { addToCart } from "../../lib/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";

export default function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const quantity = 1;

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity })); // Dispatch action
  };

  const addToCartHandle = async () => {
    setIsLoading(true); // Disable button by setting isLoading to true

    await AddToCart(); // Wait for AddToCart API call to complete
  };

  const AddToCart = () => {
    axios
      .post("https://fakestoreapi.com/carts", {
        userId: 5,
        date: new Date(),
        products: [
          {
            productId: product.id,
            quantity: quantity,
          },
        ],
      })
      .then(() => {
        // Only trigger these after the API call is successful
        handleAddToCart(product);
        setTimeout(() => {
          toast.success("Added to cart successfully");
          setIsLoading(false);
        }, 100);
      })
      .catch((error) => {
        // Only show error toast in case of failure
        toast.error(error.response?.data?.error?.message || "Undefined error");
      });
  };
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="bg-white">
        <NavLink to={`/category/${product.category}/${product.id}`}>
          <img
            src={product.image}
            alt="product"
            className="h-96 w-full object-contain"
          />
        </NavLink>
      </figure>
      <div className="card-body">
        <h2 className="card-title inline-block text-pretty ">
          {product.title}
          <span className="badge badge-secondary bg-red-500 animate-heartbeat -mt-1 ml-2">
            New
          </span>
        </h2>
        <div className="badge badge-outline capitalize my-2">
          {product.category}
        </div>
        <p className="h-1 overflow-y-auto  scrollbar-webkit-main">
          {/* {product.description} */}
        </p>
        <div className="card-actions justify-between items-center mt-2 sticky bottom-0 ">
          <div className="badge badge-accent text-lg p-3 font-medium underline">
            $ {product.price}
          </div>
          <button
            onClick={addToCartHandle}
            className="btn btn-sm hover:bg-[--hover-primary] bg-[--primary] text-[--secondary] lg:text-[14px] text-[12px] disabled:bg-gray-400 disabled:text-slate-900"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-bars"></span>
                loading
              </>
            ) : (
              <>
                <ShoppingCartIcon className="lg:size-5 size-4" />
                Add to cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
