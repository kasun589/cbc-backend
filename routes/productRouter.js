import express from "express";
import { createProduct, getProduct, deleteProduct, updateProduct, getProductId } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getProduct);
productRouter.post("/", createProduct);
productRouter.delete("/:productID", deleteProduct);
productRouter.put("/:productID", updateProduct);
productRouter.get("/:productID", getProductId);

export default productRouter;