const Product = require("../models/Product");

// CREATE
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);

        const savedProduct = await product.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// READ ALL
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// READ ONE
const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
            pid: req.params.pid
        });

        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// UPDATE
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { pid: req.params.pid },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// DELETE
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({
            pid: req.params.pid
        });

        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm"
            });
        }

        res.status(200).json({
            message: "Xóa sản phẩm thành công"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};