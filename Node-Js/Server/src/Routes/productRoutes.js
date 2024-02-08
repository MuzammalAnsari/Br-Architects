const express = require("express");
const router = express.Router();
const Products = require("../models/productModel");

// Read product data
router.get("/products", async (req, res) => {
    try {
        const productData = await Products.find();
        console.log('productData', productData);
        res.json(productData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create product data
router.post("/createProduct", async (req, res) => {
    try {
        const productData = new Products({
            _id: req.body._id,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            specifications: req.body.specifications,
            tags: req.body.tags
        });

        const data = await productData.save();
        res.status(201).json(data); // 201 Created status code
    } catch (error) {
        res.status(400).json({ error: error.message }); // 400 Bad Request for validation errors
    }
});

router.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const delProduct = await Products.findByIdAndDelete(productId);

        if (!delProduct) {
            return res.status(404).json({ message: "Product not found!" }); // 404 Not Found
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/updateProduct/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const productToBeUpdated = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            specifications: req.body.specifications,
            tags: req.body.tags
        };

        const updatedProduct = await Products.findByIdAndUpdate(productId, productToBeUpdated, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found!" }); // 404 Not Found
        }

        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
