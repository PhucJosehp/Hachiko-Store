import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { NavLink } from "react-router-dom";
import RelativeProduct from "./RelativeProduct";
import { PlusIcon, MinusIcon } from "@heroicons/react/16/solid";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../../lib/cartSlice"; // Ensure the correct path to the cartSlice
import { useFetchData } from "../../hooks/useFetchData";

export default function ProductDetail() {
  // const [product, setProduct] = useState({
  //   id: 1,
  //   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //   price: 109.95,
  //   description:
  //     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //   category: "men's clothing",
  //   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //   rating: {
  //     rate: 3.9,
  //     count: 120,
  //   },
  // });
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity })); // Dispatch action
  };

  const increase = () => {
    setQuantity((e) => e + 1);
  };

  const descrease = () => {
    if (quantity === 1) return;
    setQuantity((e) => e - 1);
  };

  let location = useLocation();
  const pathName = location.pathname.split("/")[3];
  const product = useFetchData(`https://fakestoreapi.com/products/${pathName}`);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get(`https://fakestoreapi.com/products/${pathName}`)
  //     .then((res) => {
  //       setProduct(res.data);
  //     })
  //     .catch(() => {
  //       toast.error("Failed to load product");
  //     });
  // }, [pathName]);

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

  const addToCartHandle = async () => {
    setIsLoading(true); // Disable button by setting isLoading to true

    await AddToCart(); // Wait for AddToCart API call to complete
  };

  return (
    <div className="p-4 mt-10 lg:mt-20 xl:w-[60%] md:w-[80%] w-full m-auto max-w-[1500px] overflow-x-auto bg-white">
      {product ? (
        <>
          <div className="breadcrumbs text-sm text-[--secondary]">
            <ul className="flex flex-wrap">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink
                  to={`/category/${product.category}`}
                  className="capitalize"
                >
                  {product.category}
                </NavLink>
              </li>
              <li>{product.title}</li>
            </ul>
          </div>

          <div className="card card-side bg-[--secondary] shadow-xl m-auto mt-2">
            <figure className="bg-white min-w-[25%] xl:min-w-[30%] max-w-[50%] xl:w-[50%] grow-1">
              <img src={product.image} alt="Product" className="w-[50%]" />
            </figure>
            <div className="flex flex-col card-body justify-between relative">
              <div className="card-body">
                <h2 className="card-title lg:text-xl text-base inline-block text-pretty">
                  {product.title}
                  <span className="badge badge-secondary bg-red-500 animate-heartbeat -mt-1 ml-2">
                    New
                  </span>
                </h2>
                <div className="flex lg:flex-row flex-col gap-x-4">
                  <div className="flex gap-2 lg:items-start items-center">
                    <span className="underline lg:text-[18px] text-[14px]">
                      {product.rating.rate}
                    </span>

                    <StarRatings
                      numberOfStars={5}
                      rating={product.rating.rate}
                      starSpacing="1px"
                      starDimension="14px"
                      starRatedColor="#f5c60d"
                    />
                  </div>

                  <div className="hidden lg:block text-[18px]">|</div>
                  <div className="flex gap-2 lg:text-[18px] text-[14px]">
                    <p className="underline w-fit grow-0">
                      {product.rating.count}
                    </p>
                    <p>Ratings</p>
                  </div>
                </div>
                <div className="badge badge-outline capitalize my-2 lg:text-[14px] text-[12px]">
                  {product.category}
                </div>
                <div className="lg:text-4xl text-[28px] my-1 underline">
                  $ {product.price}
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <p className="grow-0">Quantity</p>
                <div className="flex gap-2 border border-[--primary] rounded-md">
                  <button
                    onClick={descrease}
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
              </div>

              <div className="card-actions justify-start sticky bottom-7 right-7">
                <button
                  onClick={addToCartHandle}
                  className="btn hover:bg-[--hover-primary] bg-[--primary] text-[--secondary] lg:text-[14px] text-[12px] disabled:bg-gray-400 disabled:text-slate-900"
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
          <p className="m-auto h-fit lg:text-base text-[12px] text-[--secondary] mt-4">
            Description: {product.description}
          </p>

          <RelativeProduct />
        </>
      ) : (
        <p>
          <span className="loading loading-bars loading-md"></span>
          Loading...
        </p>
      )}
    </div>
  );
}
