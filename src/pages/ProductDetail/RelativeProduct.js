import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function RelativeProduct() {
  const [product, setProduct] = useState([]);
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const id = parseInt(location.pathname.split("/")[3]);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/category/${category}?limit=8`)
      .then((res) => {
        const relativeProducts = res.data.filter(
          (product) => product.id !== id
        );
        console.log(category);
        setProduct(relativeProducts);
      })
      .then();
  }, [category, id]);

  return (
    <div className="mt-4">
      <div className="font-breeSerif text-[--secondary] text-base lg:text-xl ">
        Relative Product
      </div>
      <ul className=" flex w-full gap-6 overflow-x-auto my-2 ">
        {product.map((item) => (
          <li
            key={item.id}
            className="card bg-base-100 min-w-[250px] w-[31.5%] shadow-xl flex-shrink-0"
          >
            <figure className="px-10 pt-10 bg-white">
              <NavLink to={`/category/${item.category}/${item.id}`}>
                <img
                  src={item.image}
                  alt="Shoes"
                  className="rounded-xl h-52 w-full object-contain"
                />
              </NavLink>
            </figure>
            <div className="card-body items-center text-center grow">
              <h2 className="lg:text-xl text-base grow">{item.title}</h2>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
