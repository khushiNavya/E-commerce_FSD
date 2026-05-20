import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import { ThemeContext } from "../Store/ThemeProvider";
import { useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import ProductCardSkelton from "../Components/ProductCardSkelton";
import UseProductCategory from "../Hooks/UseProductCategory";
const ProductCategory = () => {
  const { theme } = useContext(ThemeContext);
  const { url: category } = useParams();
  const { loading, productData } = UseProductCategory(category);



  if (loading) {
    return <ProductCardSkelton />
  }
  const light = "flex justify-center items-center flex-col w-screen"
  const dark = "flex justify-center items-center flex-col w-screen bg-gray-500"

  return (
    <div>
      <Navbar />
      <div className={theme == "light" ? light : dark}>
        <div className="flex justify-evenly min-h-screen w-screen gap-5 mt-7  flex-wrap ">
          {
            productData.map((pObj) => (<ProductCard key={pObj.id} data={pObj} />))
          }
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;