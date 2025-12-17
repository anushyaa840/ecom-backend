// routes/productRoute.js
const express = require("express");
const { getProduct, getProductById, postProduct, deleteProduct, updateProduct } = require("../controller/productController");

const router = express.Router();

router.get("/getproduct", getProduct);
router.get("/getproduct/:id", getProductById);
router.post("/postproduct", postProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.put("/updateproduct/:id", updateProduct);

module.exports = router;
