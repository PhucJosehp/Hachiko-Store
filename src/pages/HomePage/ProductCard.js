import React from "react";
import { NavLink } from "react-router-dom";

export default function ProductCard({ product }) {
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
        </div>
      </div>
    </div>
  );
}
