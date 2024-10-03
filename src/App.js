import "./assets/App.css";
import { Outlet, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import Category from "./pages/Category/Category";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import CustomToaster from "./components/CustomToast";
import Cart from "./pages/Cart/Cart";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="category/:id/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
