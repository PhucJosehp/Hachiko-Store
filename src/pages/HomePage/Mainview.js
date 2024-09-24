import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink } from "react-router-dom";

const ItemProduct = 8;

export default function Mainview() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(3);
  const [hasMore, setHasMore] = useState(true);
  const curPage = useRef(1);

  useEffect(() => {
    // Fetch total number of products to calculate total pages
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setTotalPages(Math.ceil(res.data.length / ItemProduct));
      })
      .catch((error) => console.error(error));

    // Initial fetch for the first page
    fetchProducts(curPage.current);
  }, []);

  const fetchProducts = (page) => {
    axios
      .get(
        `https://fakestoreapi.com/products?limit=${
          ItemProduct * curPage.current
        }`
      )
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => console.error(error));
  };

  const onFetchMore = () => {
    curPage.current += 1;

    if (curPage.current > totalPages) {
      setHasMore(false);
      return;
    }

    fetchProducts(curPage.current);
  };

  return (
    <div className="p-10">
      <div>
        <div class="breadcrumbs text-sm">
          <ul>
            <li>
              <NavLink
                to="/"
                className="text-[--secondary] text-md hover:underline hover:cursor-pointer"
              >
                Home
              </NavLink>
            </li>
          </ul>
        </div>
        <p className="font-breeSerif text-2xl text-[--secondary]">
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
    </div>
  );
}
