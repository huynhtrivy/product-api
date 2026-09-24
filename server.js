const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

// Middleware đọc JSON
app.use(express.json());

// Chỉ kết nối MongoDB thật khi không ở môi trường test
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.log("MongoDB connection error:", error.message);
    });
}

// Route Product
app.use("/api/products", productRoutes);

// Route kiểm tra API
app.get("/", (req, res) => {
  res.json({
    message: "Product API is running - Version 2.0 Auto CD",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  });
});

const PORT = process.env.PORT || 3000;

// Chỉ mở port khi không ở môi trường test
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export app để Jest / Supertest gọi kiểm thử
module.exports = app;
