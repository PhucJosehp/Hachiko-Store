/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../HomePage/ProductCard";

const ItemProduct = 8;

export default function Category() {
  let location = useLocation();
  const pathName = location.pathname.split("/")[2];

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const curPage = useRef(1);

  useEffect(() => {
    // Fetch total number of products to calculate total pages
    axios
      .get(`https://fakestoreapi.com/products/category/${pathName}`)
      .then((res) => {
        setTotalPages(Math.ceil(res.data.length / 8));
      })
      .catch((error) => console.error(error));

    // Initial fetch for the first page
    fetchProducts(curPage.current);
  }, [pathName]);

  const fetchProducts = (page) => {
    axios
      .get(
        `https://fakestoreapi.com/products/category/${
          location.pathname.split("/")[2]
        }?limit=${ItemProduct * curPage.current}`
      )
      .then((res) => {
        setProducts(res.data);
        setHasMore(curPage.current > totalPages);
      })
      .catch((error) => console.error(error));
  };

  const onFetchMore = () => {
    curPage.current += 1;

    if (curPage.current >= totalPages) {
      setHasMore(false);
      return;
    }

    fetchProducts(curPage.current);
  };

  return (
    <div className="p-10">
      <div class="breadcrumbs text-md">
        <ul>
          <li>
            <NavLink
              to="/"
              className="text-[--secondary] hover:underline hover:cursor-pointer"
            >
              Home
            </NavLink>
          </li>
          <li>
            <p className="text-[--secondary] capitalize">
              {pathName.replace("%20", " ")}
            </p>
          </li>
        </ul>
      </div>
      <p className="font-breeSerif text-2xl text-[--secondary] mb-10">
        Featured Products
      </p>

      <InfiniteScroll
        dataLength={products.length} // Updated dataLength to products array length
        next={onFetchMore}
        hasMore={hasMore}
        loader={
          <div className="flex items-center gap-2 m-auto w-fit mt-4">
            <span className="loading loading-spinner loading-lg"></span>
            Loading
          </div>
        }
      >
        <div className="flex flex-wrap gap-8 w-[100%] justify-center m-auto">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
