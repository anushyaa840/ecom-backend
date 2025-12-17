const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    console.log("Attempting to connect to MongoDB Atlas...");
    console.log("Mongo URI:", process.env.MONGO_URI); // 👈 DEBUG LINE

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Database Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectdb;
