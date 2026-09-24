const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

// Middleware đọc JSON
app.use(express.json());

// Kết nối MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error.message);
    });

// Route Product
app.use("/api/products", productRoutes);

// Route kiểm tra API
app.get("/", (req, res) => {
    res.json({
        message: "Product API is running"
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});