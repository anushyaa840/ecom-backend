// routes/productRoute.js
const express = require("express");
const { getProduct, getProductById, postProduct, deleteProduct, updateProduct } = require("../controller/productController");

const router = express.Router();

router.get("/products", getProduct);
router.get("/products/:id", getProductById);
router.post("/products", postProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);

module.exports = router;
