import React from "react";
import Home from "./Screens/Home";
import Pdp from "./Screens/Pdp"
import { Routes, Route } from "react-router-dom";
import ThemeProvider from "./Store/ThemeProvider";
import ProductCategory from "./Screens/ProductCategory";
import Wishlist from "./Screens/Wishlist";
import Cart from "./Screens/Cart";
import Signup from "./Screens/Signup";


const App = () => {

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Pdp />} />
        <Route path="/category/:url" element={<ProductCategory />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
         <Route path="/signup" element={<Signup/>} />
      </Routes>
    </ThemeProvider>
  )
}
export default App;