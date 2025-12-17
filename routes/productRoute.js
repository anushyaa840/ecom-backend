import express from 'express';
import { getProduct, getProductById, postProduct, deleteProduct, updateProduct } from '../controller/productController.js';

const router = express.Router();

router.get("/products", getProduct);
router.get("/products/:id", getProductById);
router.post("/products", postProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);

export default router;
