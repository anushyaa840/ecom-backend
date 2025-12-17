const productModel = require("../model/Product");
const fallback = require('../data/fallbackProducts.json');

exports.getProduct = async (req, res) => {
    try {
        const product = await productModel.find();
        res.json(product)
    } catch (error) {
        console.error('DB error, returning fallback products', error.message);
        // return fallback products so frontend still works
        return res.json(fallback);
    }
}

exports.getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productModel.findById(id);
        if (!product) {
            // try fallback
            const f = fallback.find(p => p._id === id || String(p._id) === String(id));
            if (f) return res.json(f);
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('DB error, attempting fallback by id', error.message);
        const f = fallback.find(p => p._id === req.params.id || String(p._id) === String(req.params.id));
        if (f) return res.json(f);
        res.status(500).json({ error: 'Server error' });
    }
}
exports.postProduct = async (req, res) => {
    const { name, description, image, price, stock, category } = req.body;
    try {
        const newProduct = new productModel({ name, description, image, price, stock, category });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("error in posting");
        res.status(500).json({ error: 'Server error' });
    }
}

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    const deleted = await productModel.findByIdAndDelete(id);
    if (!deleted) {
        return res.status(404).json({ message: "Product not found" })
    }
    res.status(204).json({ message: "Record deleted" })
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, price, image, stock, category } = req.body;

        const updated = await productModel.findByIdAndUpdate(
            id, { name, description, price, image, stock, category }, { new: true }
        )
        if (!updated) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.json(updated)
    } catch (error) {
        console.error("error in posting");
        res.status(500).json({ error: 'Server error' });
    }
}