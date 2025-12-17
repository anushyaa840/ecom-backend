import productModel from '../model/Product.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fallback = JSON.parse(readFileSync(path.join(__dirname, '../data/fallbackProducts.json'), 'utf-8'));

export const getProduct = async (req, res) => {
    try {
        const product = await productModel.find();
        res.json(product)
    } catch (error) {
        console.error('DB error, returning fallback products', error.message);
        return res.json(fallback);
    }
}

export const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productModel.findById(id);
        if (!product) {
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

export const postProduct = async (req, res) => {
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

export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const deleted = await productModel.findByIdAndDelete(id);
    if (!deleted) {
        return res.status(404).json({ message: "Product not found" })
    }
    res.status(204).json({ message: "Record deleted" })
}

export const updateProduct = async (req, res) => {
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