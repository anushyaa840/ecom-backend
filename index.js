const express = require("express");
const ProductRoute = require("./routes/productRoute");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express(); // ✅ declare ONCE

// connect to database
const connectDB = require("./config/db");
connectDB();

// CORS
app.use(cors({
  origin: (origin, cb) => cb(null, origin),
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve images from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/v1", ProductRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
