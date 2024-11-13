const Product = require('../models/Product');

const createProduct = async (req, res) => {
    const { name, description, price, quantity } = req.body;
    const newProduct = new Product({
        name,
        description,
        price,
        quantity,
        owner: req.user._id
    });

    await newProduct.save();
    res.status(201).json(newProduct);
};

const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product || product.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;

    await product.save();
    res.json({ message: 'Product updated successfully' });
};

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    
    const product = await Product.findById(productId);
    if (!product || product.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    await product.remove();
    res.json({ message: 'Product deleted successfully' });
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
