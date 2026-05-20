import express from "express"
import {getProductById, getProductBySearch, getProductByCategory, getProducts, createProduct, modifyProduct, replaceProduct, deleteProduct} from "../Controllers/Product.controller.js"

const ProductRouter = express.Router();

ProductRouter.get("/:id", getProductById)
  .get("/search/:search", getProductBySearch)
  .get("/", getProducts) // query params --> limit and skip
  .get("/category/:category", getProductByCategory)
  .post("/", createProduct)
  .patch("/", modifyProduct)
  .put("/:id", replaceProduct)
  .delete("/:id", deleteProduct);

  export default ProductRouter;