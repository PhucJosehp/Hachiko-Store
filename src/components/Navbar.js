import React, { useState, useEffect, useRef } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [openNav, setOpenNav] = useState(window.innerWidth < 960);
  const [categories, setCategories] = useState([]);
  const [toggleBars, setToggleBars] = useState(false);
  const [toggleSubMenu, setToggleSubMenu] = useState(false);
  const navRef = useRef(null);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navbarTabs = [
    { name: "Home", link: "/", hasSubTabs: false },
    { name: "Category", link: null, hasSubTabs: true },
    { name: "Contact", link: "/Contact", hasSubTabs: false },
  ];

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => err);
  }, []);

  const displayListItems = () => {
    return (
      <>
        {navbarTabs.map((item) =>
          item.hasSubTabs ? (
            <div
              key={item.name}
              className={`dropdown ${
                window.innerWidth < 960 ? " dropdown-left " : " dropdown-end "
              } mr-2 btn btn-ghost hover:bg-[var(--hover-white)] p-0`}
            >
              <button
                onClick={() => setToggleSubMenu((e) => !e)}
                className="btn btn-ghost hover:bg-transparent text-xl text-[#131313] font-semibold "
              >
                {item.name}
              </button>
              {toggleSubMenu && (
                <ul className="dropdown-content menu rounded-box z-[1] w-52 shadow mt-2 bg-[--secondary] text-left">
                  {categories.map((item) => (
                    <NavLink
                      to={`/category/${item}`}
                      className="hover:bg-slate-400 text-base p-1 rounded-md capitalize text-[--primary]"
                      key={item}
                    >
                      {item}
                    </NavLink>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <NavLink
              to={item?.link}
              key={item.name}
              className="btn btn-ghost hover:bg-[--hover-white] text-xl text-[--secondary] font-semibold text-left"
            >
              {item.name}
            </NavLink>
          )
        )}
      </>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setOpenNav(window.innerWidth < 960);
      setToggleBars(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setToggleBars(false);
      }
    };
    if (openNav) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openNav]);

  return (
    <div
      className="navbar sticky top-0 z-10 bg-[#DDD0C8] flex justify-between px-10"
      ref={navRef}
    >
      <NavLink to="/" className="flex-none">
        <img src="./logo.png" alt="logo" className="w-24" />
      </NavLink>

      {openNav ? (
        <div className="flex-none">
          <NavLink to="/cart" className="relative p-1">
            <ShoppingCartIcon className="hover:cursor-pointer size-7 text-[#131313] mr-2 mt-1" />
            {cartQuantity > 0 && (
              <div className="absolute top-0 right-0 badge badge-primary badge-sm text-sm font-semibold">
                {cartQuantity}
              </div>
            )}
          </NavLink>

          <div className="dropdown dropdown-end">
            <label className="btn btn-circle p-1 btn-ghost swap swap-rotate hover:bg-[#eff2f9]">
              <input type="checkbox" checked={toggleBars} readOnly />
              <XMarkIcon
                className="size-7 swap-on text-[#131313]"
                onClick={() => setToggleBars((e) => !e)}
              />
              <Bars3Icon
                className="size-7 swap-off text-[#131313]"
                onClick={() => setToggleBars((e) => !e)}
              />
            </label>
            {toggleBars && (
              <ul className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow bg-[#DDD0C8]">
                {displayListItems()}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-none">
          {displayListItems()}{" "}
          <NavLink to="/cart" className="relative p-1">
            <ShoppingCartIcon className="hover:cursor-pointer size-7 text-[#131313] mr-2 mt-1" />
            {cartQuantity > 0 && (
              <div className="absolute top-0 right-0 badge badge-primary badge-sm text-sm font-semibold">
                {cartQuantity}
              </div>
            )}
          </NavLink>
        </div>
      )}
    </div>
  );
}
