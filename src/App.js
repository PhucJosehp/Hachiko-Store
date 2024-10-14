import "./assets/App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";

import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import CustomToaster from "./components/CustomToast";

const Category = lazy(() => import("./pages/Category/Category"));
const LazyHomePage = lazy(() => import("./pages/HomePage/HomePage"));
const LazyCart = lazy(() => import("./pages/Cart/Cart"));
const ProductDetail = lazy(() => import("./pages/ProductDetail/ProductDetail"));

function App() {
  return (
    <>
      <Routes>
        <Route
          element={
            <div className="w-full h-full min-h-screen bg-[#f5f5f5] min-w-[1100px]">
              <Navbar />
              <CustomToaster />
              <Outlet />
              <Footer />
            </div>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <LazyHomePage />
              </Suspense>
            }
          />
          <Route
            path="/category/:id"
            element={
              <Suspense fallback={<Loading />}>
                <Category />
              </Suspense>
            }
          />
          <Route
            path="category/:id/:id"
            element={
              <Suspense fallback={<Loading />}>
                <ProductDetail />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<Loading />}>
                <LazyCart />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
